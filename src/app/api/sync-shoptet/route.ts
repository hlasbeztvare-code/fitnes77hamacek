import { NextResponse } from 'next/server';
import { syncWithShoptet } from '@/lib/sync/shoptet';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (token !== process.env.SYNC_SECRET) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

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
