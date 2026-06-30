import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createComgatePayment } from '@/lib/comgate';
import { getShippingPrice } from '@/lib/shipping';
import { z } from 'zod';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Rate limiting konfigurace (5 požadavků za minutu)
// Povoleno i lokálně bez proměnných - pokud nejsou, Upstash hodí warning ale failne gracefull (využijeme mock)
let ratelimit: Ratelimit | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(5, '1 m'),
    analytics: true,
  });
}

// Zod Schema (strikntí definice vstupu z Frontendu)
// Přijímáme POUZE ID a množství. Cenu si backend vždy zjišťuje z databáze.
const checkoutSchema = z.object({
  items: z.array(z.object({
    id: z.string(),
    quantity: z.number().int().min(1),
    variantCode: z.string().optional(),
  })).min(1, 'Košík je prázdný'),
  shippingMethod: z.enum(['ZASILKOVNA', 'PPL', 'OSOBNI']),
  shippingId: z.string().optional(),
  customerDetails: z.object({
    firstName: z.string().min(1, 'Jméno je povinné'),
    lastName: z.string().min(1, 'Příjmení je povinné'),
    email: z.string().email('Neplatný email'),
    phone: z.string().min(6, 'Telefon je povinný'),
    address: z.string().min(1, 'Adresa je povinná'),
    city: z.string().min(1, 'Město je povinné'),
    zip: z.string().min(1, 'PSČ je povinné'),
  }),
});

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Protection (DDoS prevention)
    if (ratelimit) {
      const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'anonymous';
      const { success } = await ratelimit.limit(`checkout_${ip}`);
      if (!success) {
        return NextResponse.json({ error: 'Příliš mnoho pokusů. Zkuste to prosím za minutu.' }, { status: 429 });
      }
    }

    // 2. Anti-Injection / Anti-Tamper Payload Validation
    const rawBody = await req.json();
    const parseResult = checkoutSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return NextResponse.json({ error: 'Neplatná data požadavku', details: parseResult.error.format() }, { status: 400 });
    }

    const { items, shippingMethod, shippingId, customerDetails } = parseResult.data;

    // 3. Backend-side Source of Truth: Výpočet ceny z Prisma databáze
    const productIds = items.map(item => item.id);
    
    // Rychlý paralelní fetch všech položek v jednom dotazu
    const databaseProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, name: true, price: true, stock: true }
    });

    let calculatedTotal = 0;
    const orderItems = [];

    for (const reqItem of items) {
      const dbProduct = databaseProducts.find(p => p.id === reqItem.id);

      // Zero-Error Tolerance: Pokud ID neexistuje, ihned končíme
      if (!dbProduct) {
        return NextResponse.json({ error: `Kritická chyba: Produkt s ID ${reqItem.id} neexistuje.` }, { status: 400 });
      }

      // Validace skladu
      if (dbProduct.stock < reqItem.quantity) {
        return NextResponse.json({ error: `Kritická chyba: Produkt ${dbProduct.name} není skladem v požadovaném množství.` }, { status: 400 });
      }

      // Pro účely tohoto příkladu používáme základní cenu, i pro varianty. 
      // V případě robustní implementace variant zkontroluj i JSON variants.
      const price = dbProduct.price; 
      
      calculatedTotal += price * reqItem.quantity;
      
      orderItems.push({
        productId: dbProduct.id,
        name: dbProduct.name,
        quantity: reqItem.quantity,
        price: price, // Cena z DB, kterou ukládáme do JSONu objednávky
        variantCode: reqItem.variantCode,
      });
    }

    // 4. Připočtení ceny za dopravu
    const shippingPrice = getShippingPrice(shippingMethod);
    calculatedTotal += shippingPrice;

    // 5. Zápis objednávky do DB & Vygenerování platební relace PARALELNĚ (Optimized Latency)
    const orderId = crypto.randomUUID();

    const [order, payment] = await Promise.all([
      prisma.order.create({
        data: {
          id: orderId,
          firstName: customerDetails.firstName,
          lastName: customerDetails.lastName,
          email: customerDetails.email,
          phone: customerDetails.phone,
          address: customerDetails.address,
          city: customerDetails.city,
          zip: customerDetails.zip,
          total: calculatedTotal,
          itemsJson: JSON.stringify(orderItems),
          status: 'PENDING',
          shippingMethod: shippingMethod,
          shippingId: shippingId,
        }
      }),
      createComgatePayment({
        price: calculatedTotal,
        refId: orderId,
        email: customerDetails.email,
        label: `Objednávka Fit77`,
      })
    ]);

    return NextResponse.json({ 
      success: true, 
      redirectUrl: payment.redirectUrl,
      orderId: order.id 
    });

  } catch (error: any) {
    console.error('Checkout API Error:', error);
    return NextResponse.json({ error: error.message || 'Chyba při vytváření objednávky na serveru' }, { status: 500 });
  }
}
