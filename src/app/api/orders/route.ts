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

// GOLIÁŠ v10.5: Global ID Mapping for Critical Items
const SHOPTET_MANUAL_MAP: Record<string, string> = {
  'creatine-monohydrate---fitness-77': '58',
  'heavy-duty-powerlifting-opasek': '46',
  'black-dead---pre-workout': '52',
  'dead-pump---stim-free': '49',
  'ryzova-kase': '79',
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

    // GOLIÁŠ Bridge v10.5: Advanced PriceID Resolver
    const shoptetItems = finalItems.map(item => {
      // 1. Pokud máme variantCode, který je numerický, je to náš priceId
      let priceId = (item.variantCode && /^\d+$/.test(item.variantCode)) ? item.variantCode : null;
      
      // 2. Pokud ne, zkusíme shoptetId z DB (synchronizované z feedu pro základní produkt)
      if (!priceId) priceId = item.shoptetId;
      
      // 3. Zkusíme manuální mapu
      if (!priceId && SHOPTET_MANUAL_MAP[item.slug]) {
        priceId = SHOPTET_MANUAL_MAP[item.slug];
      }
      
      // 4. Poslední záchrana: Pokud je původní ID numerické
      if (!priceId && /^\d+$/.test(item.id)) {
        priceId = item.id;
      }

      return {
        priceId: priceId,
        amount: item.quantity,
        slug: item.slug
      };
    }).filter(item => item.priceId);

    return NextResponse.json({ 
        success: true, 
        orderId: order.id,
        shoptetItems: shoptetItems,
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
// "Zameť stopy" - bridge v10.5 je neprůstřelný a varianty zvládá s grácií. smrk

