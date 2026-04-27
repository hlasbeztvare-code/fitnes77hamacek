import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const orderSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  address: z.string().min(5),
  city: z.string().min(2),
  zip: z.string().regex(/^\d{3}\s?\d{2}$/),
  shippingMethod: z.enum(['zasilkovna', 'ppl', 'pickup']),
  items: z.array(z.object({
    id: z.string(),
    variantCode: z.string().optional(),
    quantity: z.number().min(1),
  })).min(1),
});

// Správné kódy přímo ze Shoptetu (Hlavní ceník CSV export)
const SHOPTET_MANUAL_MAP: Record<string, string> = {
  'creatine-monohydrate---fitness-77': '55',
  'black-dead---pre-workout':          '49',
  'dead-pump---stim-free':             '46',
  'heavy-duty-powerlifting-opasek':    '43',
};

// Kódy variant přesně jak je Shoptet používá (CODE z CSV exportu)
const SHOPTET_VARIANT_MAP: Record<string, string> = {
  'BOR': '58/BOR',
  'GRE': '58/GRE',
  'MAL': '58/MAL',
  'COK': '61/COK',
  'PIS': '61/PIS',
  'SLA': '61/SLA',
};

async function sendToTelegram(orderData: any) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.HAMACEK_CHAT_ID;

  if (!botToken || !chatId) return;

  const itemsList = orderData.items.map((item: any) => `• ${item.name}${item.variantName ? ` (${item.variantName})` : ''} (${item.quantity}ks)`).join('\n');
  const message = `🚀 *NOVÁ OBJEDNÁVKA!* \n\n👤 *Klient:* ${orderData.firstName} ${orderData.lastName}\n📍 *Město:* ${orderData.city}\n📦 *Doprava:* ${orderData.shippingMethod.toUpperCase()}\n\n*POLOŽKY:*\n${itemsList}\n\n💰 *CELKEM: ${orderData.total} Kč*\n\n_Šéfe, jdi do gymu vyskladňovat!_ 🦾`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    });
  } catch (err) {
    console.error('Telegram Notify Error:', err);
  }
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const validated = orderSchema.safeParse(rawBody);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid order data', issues: validated.error.issues },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, address, city, zip, items, shippingMethod } = validated.data;

    const productIds = items.map(item => item.id);
    const dbProducts = await db.product.findMany({
      where: { id: { in: productIds } },
    });

    let calculatedTotal = 0;
    const finalItems = items.map(item => {
      const product = dbProducts.find(p => p.id === item.id);
      if (!product) throw new Error(`Product ${item.id} not found`);
      
      // Resolve variant details if applicable
      let variantName = undefined;
      let variantPrice = product.price;
      
      if (item.variantCode && product.variants) {
        const variants = product.variants as any[];
        const variant = variants.find(v => v.code === item.variantCode);
        if (variant) {
          variantName = variant.name;
          variantPrice = variant.price;
        }
      }

      calculatedTotal += variantPrice * item.quantity;
      
      return {
        id: product.id,
        slug: product.slug,
        name: product.name,
        variantName: variantName,
        variantCode: item.variantCode,
        price: variantPrice,
        quantity: item.quantity,
        shoptetId: product.shoptetId
      };
    });

    const shippingPrice = shippingMethod === 'zasilkovna' ? 89 : (shippingMethod === 'ppl' ? 129 : 0);
    const finalTotal = calculatedTotal + shippingPrice;

    const order = await db.order.create({
      data: {
        firstName,
        lastName,
        email,
        address,
        city,
        zip,
        total: finalTotal,
        itemsJson: JSON.stringify(finalItems),
      },
    });

    // NOTIFY JAROSLAV ON TELEGRAM
    await sendToTelegram({
        ...validated.data,
        items: finalItems,
        total: finalTotal
    });

    // GOLIÁŠ Bridge v8.0: PriceID Resolver — identický s /api/cart/sync
    const shoptetItems = finalItems.map(item => {
      let priceId: string | null = null;

      // 1. Priorita: variantCode přes VARIANT_MAP
      if (item.variantCode) {
        const variantUpper = item.variantCode.toUpperCase();
        if (SHOPTET_VARIANT_MAP[variantUpper]) {
          priceId = SHOPTET_VARIANT_MAP[variantUpper];
        } else if (/^\d+$/.test(item.variantCode)) {
          priceId = item.variantCode;
        }
      }

      // 2. shoptetId z DB
      if (!priceId) priceId = item.shoptetId ?? null;

      // 3. Manual mapa ze slug
      if (!priceId && SHOPTET_MANUAL_MAP[item.slug]) {
        priceId = SHOPTET_MANUAL_MAP[item.slug];
      }

      // 4. Fallback: numerické ID produktu
      if (!priceId && /^\d+$/.test(item.id)) priceId = item.id;

      return { priceId, amount: item.quantity, slug: item.slug };
    }).filter(item => item.priceId);

    return NextResponse.json({ 
        success: true, 
        orderId: order.id,
        shoptetItems,
        shoptetBaseUrl: 'https://obchod.fit77.cz/action/Cart/addBatch/'
    });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Order processing failed' },
      { status: 500 }
    );
  }
}
// „Zameť stopy" — GOLIÁŠ Orders v8.0: Správný VARIANT id resolver. smrk
