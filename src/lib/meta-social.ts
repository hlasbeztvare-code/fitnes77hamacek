/**
 * META GRAPH API – Fitness 77
 * ============================================================
 * Centrální služba pro automatické publikování obsahu
 * na Facebook a Instagram prostřednictvím Meta Graph API.
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
  linkUrl?: string;       // URL na web (pro FB link preview)
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
  const timeoutId = setTimeout(() => controller.abort(), 15000); // Zvýšeno na 15s pro video uploady

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
  const body: Record<string, string> = {
    message: payload.message,
  };

  if (payload.linkUrl) body.link = payload.linkUrl;
  if (payload.imageUrl) body.picture = payload.imageUrl;

  const data = await metaFetch(`${FB_PAGE_ID}/feed`, body);
  if (data.error) {
    console.error('❌ FB post chyba:', data.error);
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

  // Logika větvení podle formátu obsahu (Rule-Based Architecture)
  if (payload.isStory) {
    // STRIKTNÍ META UKAZATEL: Pro Stories musí být media_type 'STORIES' a NESMÍ obsahovat caption
    containerBody.image_url = payload.imageUrl;
    containerBody.media_type = 'STORIES';
  } else if (payload.isReel) {
    // REELS PROTOKOL: Vyžaduje video_url namísto image_url a media_type 'REELS'
    containerBody.video_url = payload.imageUrl;
    containerBody.media_type = 'REELS';
    containerBody.caption = payload.message;
  } else {
    // Standardní Feed Post
    containerBody.image_url = payload.imageUrl;
    containerBody.caption = payload.message;
  }

  // Krok 1: Vytvořit media container
  const container = await metaFetch(`${IG_ACCOUNT_ID}/media`, containerBody);

  if (container.error || !container.id) {
    console.error('❌ IG container chyba:', container.error);
    return { error: container.error?.message ?? 'Container error' };
  }

  // Krok 2: Publikovat container
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
    console.warn('⚠️  Meta API není nakonfigurováno – chybí základní .env proměnné (FB_PAGE_ID nebo FB_PAGE_TOKEN)');
    return { success: false, error: 'Meta API not configured' };
  }

  const tasks = [];
  tasks.push(postToFacebook(payload));

  if (IG_ACCOUNT_ID) {
    tasks.push(postToInstagram(payload));
  } else {
    console.info('ℹ️  Instagram není nakonfigurován (chybí IG_ACCOUNT_ID), přeskakuji.');
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
    error: !fbOk && (!IG_ACCOUNT_ID || !igOk) ? 'Publikování selhalo' : undefined,
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
    message: `🔥 NOVÉ V SHOPU: ${product.name}\n\n${product.shortDescription}\n\n👉 ${APP_URL}/${categoryPath}/${product.slug}\n\n#fitness77 #fitness #mladaboleslav #gym`,
    imageUrl: premiumImageUrl,
    linkUrl: `${APP_URL}/${categoryPath}/${product.slug}`,
  };
}

/** Akce / promo (Podpora pro vertikální formáty Stories/Reels) */
export function buildPromoPost(text: string, imageUrl?: string, options?: { isStory?: boolean; isReel?: boolean }): PostPayload {
  return {
    message: `${text}\n\n💪 Fitness 77 Mladá Boleslav\n#fitness77 #fitness #mladaboleslav`,
    imageUrl,
    isStory: options?.isStory,
    isReel: options?.isReel,
  };
}