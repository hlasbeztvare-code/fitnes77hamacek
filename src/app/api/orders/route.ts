import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const orderSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  address: z.string().min(5),
  city: z.string().min(2),
  zip: z.string().regex(/^\d{3}\s?\d{2}$/),
  items: z.array(z.object({
    id: z.string(),
    quantity: z.number().min(1),
  })).min(1),
});

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

    const { firstName, lastName, email, address, city, zip, items } = validated.data;

    // Verify prices and calculate total from DB
    const productIds = items.map(item => item.id);
    const dbProducts = await db.product.findMany({
      where: { id: { in: productIds } },
    });

    if (dbProducts.length !== items.length) {
      return NextResponse.json(
        { success: false, error: 'Some products were not found' },
        { status: 400 }
      );
    }

    let calculatedTotal = 0;
    const finalItems = items.map(item => {
      const product = dbProducts.find(p => p.id === item.id);
      if (!product) throw new Error('Product not found mapping');
      calculatedTotal += product.price * item.quantity;
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      };
    });

    const order = await db.order.create({
      data: {
        firstName,
        lastName,
        email,
        address,
        city,
        zip,
        total: calculatedTotal,
        itemsJson: JSON.stringify(finalItems),
      },
    });

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Order processing failed' },
      { status: 500 }
    );
  }
}
