import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createShoptetOrder, updateShoptetStock } from '@/lib/shoptet';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, customer, shippingMethod, paymentMethod } = body;

    // 1. Uložíme objednávku do naší databáze
    const order = await db.order.create({
      data: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        address: customer.address,
        city: customer.city,
        zip: customer.zip,
        total: items.reduce((acc: number, item: { price: number; quantity: number }) => acc + (item.price * item.quantity), 0),
        itemsJson: JSON.stringify(items),
        status: 'pending',
      },
    });

    // 2. Pokud je nakonfigurován Shoptet, vytvoříme objednávku i tam
    if (process.env.SHOPTET_API_KEY) {
      try {
        const shoptetItems = items.map((item: { id: string; name: string; quantity: number; price: number }) => ({
          code: item.id,
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.price,
          vatRate: 21,
          includingVat: true,
        }));

        const shoptetOrder = await createShoptetOrder({
          externalCode: order.id,
          email: customer.email,
          phone: customer.phone,
          billingAddress: {
            name: `${customer.firstName} ${customer.lastName}`,
            street: customer.address,
            city: customer.city,
            zip: customer.zip,
            country: 'CZ',
          },
          shippingAddress: {
            name: `${customer.firstName} ${customer.lastName}`,
            street: customer.address,
            city: customer.city,
            zip: customer.zip,
            country: 'CZ',
          },
          items: shoptetItems,
          shippingMethod: shippingMethod || 'zbox',
          paymentMethod: paymentMethod || 'card',
          notes: `Objednávka z FIT77 webu. ID: ${order.id}`,
        });

        // 3. Aktualizujeme sklady
        for (const item of items) {
          const product = await db.product.findUnique({
            where: { id: item.id },
            select: { stock: true }
          });
          
          if (product && product.stock !== undefined) {
            const newStock = Math.max(0, product.stock - item.quantity);
            await db.product.update({
              where: { id: item.id },
              data: { stock: newStock }
            });
            await updateShoptetStock(item.id, newStock);
          }
        }

        // Aktualizujeme objednávku s Shoptet ID
        await db.order.update({
          where: { id: order.id },
          data: { 
            shoptetOrderId: shoptetOrder.orderId,
            status: 'paid'
          }
        });

        return NextResponse.json({ 
          success: true, 
          orderId: order.id,
          shoptetOrderId: shoptetOrder.orderId,
          paymentUrl: shoptetOrder.paymentUrl,
        });
      } catch (shoptetError) {
        console.error('Shoptet integrace selhala:', shoptetError);
        return NextResponse.json({ 
          success: true, 
          orderId: order.id,
          warning: 'Objednávka uložena lokálně'
        });
      }
    }

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error('Chyba:', error);
    return NextResponse.json(
      { success: false, error: 'Order creation failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const orders = await db.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    return NextResponse.json({ orders });
  } catch (err) {
    console.error('Chyba při načítání objednávek:', err);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
