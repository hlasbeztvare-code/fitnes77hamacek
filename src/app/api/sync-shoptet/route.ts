import { NextResponse } from 'next/server';
import { syncWithShoptet } from '@/lib/sync/shoptet';

export const dynamic = 'force-dynamic';

export async function GET() {
  const result = await syncWithShoptet();
  
  if (result.success) {
    return NextResponse.json({
      message: 'Synchronizace proběhla úspěšně',
      count: result.count
    });
  } else {
    return NextResponse.json({
      message: 'Synchronizace selhala',
      error: result.error
    }, { status: 500 });
  }
}
