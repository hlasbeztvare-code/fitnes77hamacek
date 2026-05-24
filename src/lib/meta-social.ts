/**
 * META GRAPH API – Fitness 77
 * ============================================================
 * Centrální služba pro automatické publikování obsahu
 * na Facebook a Instagram prostřednictvím Meta Graph API.
 * * ZERO ERROR TOLERANCE PIPELINE
 * ============================================================
 */

const META_API_BASE = 'https://graph.facebook.com/v19.0';

const FB_PAGE_ID = process.env.META_FB_PAGE_ID!;
const FB_PAGE_TOKEN = process.env.META_FB_PAGE_ACCESS_TOKEN!;
const IG_ACCOUNT_ID = process.env.META_IG_ACCOUNT_ID!;   // Instagram Business Account ID
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://fitness77.cz';

// ─── typy ────────────────────────────────────────────────────

export type PostPayload = {
  message: string;        // Text příspěvku (využito pro Feed / Reels)
  imageUrl?: string;      // Absolutní URL obrázku nebo videa
  linkUrl?: string;       // URL na web (pro FB link preview / IG stickers)
  isStory?: boolean;      // Postovat jako Story
  isReel?: boolean;       // Postovat jako Reel (pokud je v imageUrl video)
};

type MetaResult = {
  success: boolean;
  fbPostId?: string;
  igPostId?: string;
  error?: string;
};

// ─── helpers ─────────────────────────────────────────────────

function isConfigured(): boolean {
  return !!(FB_PAGE_ID && FB_PAGE_TOKEN);
}

async function metaFetch(endpoint: string, body: Record<string, string>) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout pro stabilní uploady

  try {
    const res = await fetch(`${META_API_BASE}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, access_token: FB_PAGE_TOKEN }),
      signal: controller.signal,
    });
    return await res.json();
  } catch (error) {
    console.error(`❌ Meta API Fetch chyba [${endpoint}]:`, error);
    return { error: { message: error instanceof Error ? error.message : 'Network or Timeout Error' } };
  } finally {
    clearTimeout(timeoutId);
  }
}

// ─── Facebook ────────────────────────────────────────────────

async function postToFacebook(payload: PostPayload): Promise<{ id?: string; error?: string }> {
  // PROTOKOL 300%: Pokud máme obrázek, střílíme přes /photos endpoint.
  // Tím zabráníme tomu, aby Facebook vytvořil zmetkový Link Post a sežral popisek.
  if (payload.imageUrl) {
    const fullCaption = payload.linkUrl
      ? `${payload.message}\n\n👉 Koupíš zde: ${payload.linkUrl}`
      : payload.message;

    const body: Record<string, string> = {
      url: payload.imageUrl,
      caption: fullCaption, // Photos endpoint striktně vyžaduje text v 'caption'
    };

    const data = await metaFetch(`${FB_PAGE_ID}/photos`, body);
    if (data.error) {
      console.error('❌ FB photos chyba:', data.error);
      return { error: data.error.message };
    }
    return { id: data.id };
  }

  // Záložní čistě textová varianta (pokud by nebyl obrázek)
  const body: Record<string, string> = {
    message: payload.message,
  };
  if (payload.linkUrl) body.link = payload.linkUrl;

  const data = await metaFetch(`${FB_PAGE_ID}/feed`, body);
  if (data.error) {
    console.error('❌ FB feed chyba:', data.error);
    return { error: data.error.message };
  }
  return { id: data.id };
}

// ─── Instagram (Feed, Stories, Reels) ────────────────────────

async function postToInstagram(payload: PostPayload): Promise<{ id?: string; error?: string }> {
  if (!payload.imageUrl) {
    return { error: 'Instagram vyžaduje imageUrl' };
  }

  const containerBody: Record<string, string> = {};

  if (payload.isStory) {
    containerBody.image_url = payload.imageUrl;
    containerBody.media_type = 'STORIES';

    // STRIKTNÍ META PROTOKOL: Pokud máme odkaz, vytvoříme aktivní samolepku (Link Sticker)
    if (payload.linkUrl) {
      containerBody.story_sticker_tray_spec = JSON.stringify({
        stickers: [
          {
            sticker_type: 'WEB_LINK',
            url: payload.linkUrl,
            x: 0.5,  // Střed obrazovky
            y: 0.65, // Umístění v bezpečné zóně pod produkty
            width: 0.6,
            height: 0.1
          }
        ]
      });
    }
  } else if (payload.isReel) {
    containerBody.video_url = payload.imageUrl;
    containerBody.media_type = 'REELS';
    containerBody.caption = payload.linkUrl
      ? `${payload.message}\n\n👉 ODKAZ V BIU 🔗`
      : payload.message;
  } else {
    // Standardní Feed Post - link přepíšeme jako text + jasné směrování na bio profilu
    containerBody.image_url = payload.imageUrl;
    containerBody.caption = payload.linkUrl
      ? `${payload.message}\n\n👉 ODKAZ V BIU 🔗\n(${payload.linkUrl.replace('https://', '')})`
      : payload.message;
  }

  // Krok 1: Vytvoření kontejneru pro média
  const container = await metaFetch(`${IG_ACCOUNT_ID}/media`, containerBody);

  if (container.error || !container.id) {
    console.error('❌ IG container chyba:', container.error);
    return { error: container.error?.message ?? 'Container error' };
  }

  // Krok 2: Ostrá publikace schváleného kontejneru
  const publish = await metaFetch(`${IG_ACCOUNT_ID}/media_publish`, {
    creation_id: container.id,
  });

  if (publish.error) {
    console.error('❌ IG publish chyba:', publish.error);
    return { error: publish.error.message };
  }

  return { id: publish.id };
}

// ─── Hlavní funkce (kombinovaná) ─────────────────────────────

export async function publishToSocials(payload: PostPayload): Promise<MetaResult> {
  if (!isConfigured()) {
    console.warn('⚠️ Meta API není nakonfigurováno – chybí základní .env proměnné');
    return { success: false, error: 'Meta API not configured' };
  }

  const tasks = [];
  tasks.push(postToFacebook(payload));

  if (IG_ACCOUNT_ID) {
    tasks.push(postToInstagram(payload));
  } else {
    console.info('ℹ️ Instagram není nakonfigurován (chybí IG_ACCOUNT_ID), přeskakuji.');
  }

  const results = await Promise.allSettled(tasks);

  const fbResult = results[0];
  const igResult = results[1];

  const fbOk = fbResult && fbResult.status === 'fulfilled' && !fbResult.value.error;
  const igOk = igResult && igResult.status === 'fulfilled' && !igResult.value.error;

  console.log(`📱 FB: ${fbOk ? '✅' : '❌'}  IG: ${igOk ? (IG_ACCOUNT_ID ? '✅' : '➖') : '❌'}`);

  return {
    success: fbOk || igOk,
    fbPostId: (fbResult?.status === 'fulfilled' ? fbResult.value.id : undefined),
    igPostId: (igResult?.status === 'fulfilled' ? igResult.value.id : undefined),
    error: !fbOk && (!IG_ACCOUNT_ID || !igOk) ? 'Publikování kompletně selhalo' : undefined,
  };
}

// ─── Předpřipravené šablony ───────────────────────────────────

/** Nový produkt v eshopu */
export function buildProductPost(product: {
  name: string;
  shortDescription: string;
  slug: string;
  image: string;
  category: string;
}): PostPayload {
  const categoryPath = product.category === 'supplement' ? 'supplements' : 'equipment';
  const premiumImageUrl = `${APP_URL}/api/social/generate?imageUrl=${encodeURIComponent(product.image)}&title=${encodeURIComponent(product.name)}&category=${encodeURIComponent(product.category)}`;

  return {
    message: `🔥 NOVÉ V SHOPU: ${product.name}\n\n${product.shortDescription}\n\n#fitness77 #fitness #mladaboleslav #gym`,
    imageUrl: premiumImageUrl,
    linkUrl: `${APP_URL}/${categoryPath}/${product.slug}`,
  };
}

/** Akce / promo */
export function buildPromoPost(text: string, imageUrl?: string, options?: { isStory?: boolean; isReel?: boolean }): PostPayload {
  return {
    message: `${text}\n\n💪 Fitness 77 Mladá Boleslav\n#fitness77 #fitness #mladaboleslav`,
    imageUrl,
    isStory: options?.isStory,
    isReel: options?.isReel,
  };
}