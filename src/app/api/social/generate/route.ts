import { NextRequest, NextResponse } from 'next/server';
import { generateSocialImage } from '@/lib/meta-visual-generator';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get('imageUrl');
  const title = searchParams.get('title') || 'Novinka';
  const category = searchParams.get('category') || 'E-SHOP';
  const template = searchParams.get('template') as any || 'hero';

  // NOVÝ PARAMETR: Čteme z URL formát ('feed' nebo 'story')
  const format = searchParams.get('format') === 'story' ? 'story' : 'feed';

  if (!imageUrl) {
    return new NextResponse('Missing imageUrl', { status: 400 });
  }

  try {
    // ZERRO ERROR TOLERANCE: Předáváme format přímo do našeho ostrého sharp generátoru
    const buffer = await generateSocialImage({
      productImage: imageUrl,
      title,
      category,
      template,
      format
    });

    // Určení správného cache klíče podle formátu, aby se nám nemíchal feed se story
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('❌ Generation error:', error);
    return new NextResponse('Generation failed', { status: 500 });
  }
}