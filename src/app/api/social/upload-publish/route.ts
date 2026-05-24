import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { publishToSocials } from '@/lib/meta-social';

export async function POST(req: Request) {
  try {
    // ZERO ERROR TOLERANCE: Přidáváme isStory a isReel do destrukce požadavku
    const { imageBase64, message, linkUrl, isStory, isReel } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ success: false, error: 'Chybí obrázek' }, { status: 400 });
    }

    // 1. Zpracování base64 obrázku
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');

    // 2. Uložení obrázku do složky public/uploads
    const filename = `social-${Date.now()}.png`;
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filepath = path.join(uploadsDir, filename);
    fs.writeFileSync(filepath, buffer);

    // 3. Vytvoření veřejné URL pro Meta API
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://fitness77.cz';
    const publicImageUrl = `${appUrl}/uploads/${filename}`;

    // 4. Odeslání na sítě přes Meta Graph API script se všemi příznaky formátu
    const result = await publishToSocials({
      message: message || 'Nová brutalita od Fitness 77!',
      imageUrl: publicImageUrl,
      linkUrl: linkUrl || 'https://fitness77.cz/vip-drop',
      isStory: !!isStory, // vynucení booleanu
      isReel: !!isReel    // vynucení booleanu
    });

    return NextResponse.json({
      success: result.success,
      imageUrl: publicImageUrl,
      meta: result
    });

  } catch (error: any) {
    console.error('❌ Error publishing to socials:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}