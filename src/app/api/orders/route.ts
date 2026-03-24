import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const order = await db.order.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        address: body.address,
        city: body.city,
        zip: body.zip,
        total: body.total,
        itemsJson: JSON.stringify(body.items),
      },
    });

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Order creation failed' },
      { status: 500 }
    );
  }
}
