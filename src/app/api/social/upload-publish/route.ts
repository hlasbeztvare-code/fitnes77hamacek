import { NextResponse } from 'next/server';

const FB_PAGE_ID    = process.env.META_FB_PAGE_ID!;
const FB_PAGE_TOKEN = process.env.META_FB_PAGE_ACCESS_TOKEN!;
const IG_ACCOUNT_ID = process.env.META_IG_ACCOUNT_ID!;
const META_API_BASE = 'https://graph.facebook.com/v25.0';

export async function POST(req: Request) {
  try {
    const { imageBase64, message, linkUrl, isStory, isReel } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ success: false, error: 'Chybí obrázek' }, { status: 400 });
    }

    // Převod base64 → Buffer → Blob (pro multipart upload)
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const blob = new Blob([buffer], { type: 'image/png' });

    const postMessage = message || 'Nová brutalita od Fitness 77! 💪\n\n#fitness77 #fitness #mladaboleslav';

    // ── Facebook: přímý multipart upload fotky + post ────────────────
    const fbForm = new FormData();
    fbForm.append('source', blob, 'social.png');
    fbForm.append('message', postMessage);
    fbForm.append('access_token', FB_PAGE_TOKEN);

    const fbRes = await fetch(`${META_API_BASE}/${FB_PAGE_ID}/photos`, {
      method: 'POST',
      body: fbForm,
    });
    const fbData = await fbRes.json();

    if (fbData.error) {
      console.error('❌ FB upload chyba:', fbData.error);
      return NextResponse.json({ success: false, error: fbData.error.message });
    }

    // ── Instagram: potřebuje veřejnou URL ────────────────────────────
    // Použijeme přímé URL produktového obrázku pokud IG ID je nastaveno
    let igResult = null;
    if (IG_ACCOUNT_ID && linkUrl) {
      // Pro IG potřebujeme veřejnou URL - použijeme FB photo URL z právě uploadované fotky
      const fbPhotoId = fbData.id;
      if (fbPhotoId) {
        // Získáme veřejnou URL právě uploadované FB fotky
        const photoInfoRes = await fetch(
          `${META_API_BASE}/${fbPhotoId}?fields=images&access_token=${FB_PAGE_TOKEN}`
        );
        const photoInfo = await photoInfoRes.json();
        const publicUrl = photoInfo?.images?.[0]?.source;

        if (publicUrl) {
          const containerBody: Record<string, string> = {
            caption: postMessage,
          };

          if (isStory) {
            containerBody.image_url = publicUrl;
            containerBody.media_type = 'STORIES';
          } else {
            containerBody.image_url = publicUrl;
          }

          const containerRes = await fetch(`${META_API_BASE}/${IG_ACCOUNT_ID}/media`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...containerBody, access_token: FB_PAGE_TOKEN }),
          });
          const container = await containerRes.json();

          if (container.id) {
            const publishRes = await fetch(`${META_API_BASE}/${IG_ACCOUNT_ID}/media_publish`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ creation_id: container.id, access_token: FB_PAGE_TOKEN }),
            });
            igResult = await publishRes.json();
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      facebook: fbData,
      instagram: igResult,
    });

  } catch (error: any) {
    console.error('❌ Error publishing to socials:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}