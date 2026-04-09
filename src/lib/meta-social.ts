/**
 * META GRAPH API – Fitness 77
 * ============================================================
 * Centrální služba pro automatické publikování obsahu
 * na Facebook a Instagram prostřednictvím Meta Graph API.
 *
 * SETUP (po získání přístupu od klienta):
 * 1. Vytvoř Meta App na https://developers.facebook.com
 * 2. Přidej oprávnění: pages_manage_posts, instagram_basic,
 *    instagram_content_publish, pages_read_engagement
 * 3. Vygeneruj Long-Lived Page Access Token
 * 4. Doplň proměnné do .env (viz .env.example)
 *
 * INSTAGRAM požadavky:
 * - Musí být Business nebo Creator účet
 * - Musí být napojen na FB stránku v Business Manageru
 * ============================================================
 */

const META_API_BASE = 'https://graph.facebook.com/v19.0';

const FB_PAGE_ID       = process.env.META_FB_PAGE_ID!;
const FB_PAGE_TOKEN    = process.env.META_FB_PAGE_ACCESS_TOKEN!;
const IG_ACCOUNT_ID    = process.env.META_IG_ACCOUNT_ID!;   // Instagram Business Account ID
const APP_URL          = process.env.NEXT_PUBLIC_APP_URL ?? 'https://fitness77.cz';

// ─── typy ────────────────────────────────────────────────────

export type PostPayload = {
  message: string;        // Text příspěvku
  imageUrl?: string;      // Absolutní URL obrázku (nutné pro IG)
  linkUrl?: string;       // URL na web (pro FB link preview)
  isStory?: boolean;      // Postovat jako Story místo feed postu
};

type MetaResult = {
  success: boolean;
  fbPostId?: string;
  igPostId?: string;
  error?: string;
};

// ─── helpers ─────────────────────────────────────────────────

function isConfigured(): boolean {
  return !!(FB_PAGE_ID && FB_PAGE_TOKEN && IG_ACCOUNT_ID);
}

async function metaFetch(endpoint: string, body: Record<string, string>) {
  const res = await fetch(`${META_API_BASE}/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body, access_token: FB_PAGE_TOKEN }),
  });
  return res.json();
}

// ─── Facebook ────────────────────────────────────────────────

async function postToFacebook(payload: PostPayload): Promise<{ id?: string; error?: string }> {
  const body: Record<string, string> = {
    message: payload.message,
  };

  if (payload.linkUrl)  body.link  = payload.linkUrl;
  if (payload.imageUrl) body.picture = payload.imageUrl;

  const data = await metaFetch(`${FB_PAGE_ID}/feed`, body);
  if (data.error) {
    console.error('❌ FB post chyba:', data.error);
    return { error: data.error.message };
  }
  return { id: data.id };
}

// ─── Instagram ───────────────────────────────────────────────

async function postToInstagram(payload: PostPayload): Promise<{ id?: string; error?: string }> {
  if (!payload.imageUrl) {
    return { error: 'Instagram vyžaduje imageUrl' };
  }

  // Krok 1: Vytvořit media container
  const containerBody: Record<string, string> = {
    image_url: payload.imageUrl,
    caption: payload.message,
  };

  if (payload.isStory) {
    containerBody.media_type = 'IMAGE';
    containerBody.is_carousel_item = 'false';
  }

  const container = await metaFetch(
    `${IG_ACCOUNT_ID}/media`,
    containerBody
  );

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

// ─── Instagram Story ─────────────────────────────────────────

async function postStoryToInstagram(imageUrl: string): Promise<{ id?: string; error?: string }> {
  const container = await metaFetch(`${IG_ACCOUNT_ID}/media`, {
    image_url: imageUrl,
    media_type: 'IMAGE',
  });

  if (!container.id) return { error: 'Story container error' };

  const publish = await metaFetch(`${IG_ACCOUNT_ID}/media_publish`, {
    creation_id: container.id,
  });

  return { id: publish.id };
}

// ─── Hlavní funkce (kombinovaná) ─────────────────────────────

export async function publishToSocials(payload: PostPayload): Promise<MetaResult> {
  if (!isConfigured()) {
    console.warn('⚠️  Meta API není nakonfigurováno – chybí .env proměnné');
    return { success: false, error: 'Meta API not configured' };
  }

  const [fbResult, igResult] = await Promise.allSettled([
    postToFacebook(payload),
    postToInstagram(payload),
  ]);

  const fbOk = fbResult.status === 'fulfilled' && !fbResult.value.error;
  const igOk = igResult.status === 'fulfilled' && !igResult.value.error;

  console.log(`📱 FB: ${fbOk ? '✅' : '❌'}  IG: ${igOk ? '✅' : '❌'}`);

  return {
    success: fbOk || igOk,
    fbPostId: fbResult.status === 'fulfilled' ? fbResult.value.id : undefined,
    igPostId: igResult.status === 'fulfilled' ? igResult.value.id : undefined,
    error: !fbOk && !igOk ? 'Obě sítě selhaly' : undefined,
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
  return {
    message: `🔥 NOVÉ V SHOPU: ${product.name}\n\n${product.shortDescription}\n\n👉 ${APP_URL}/${categoryPath}/${product.slug}\n\n#fitness77 #fitness #mladaboleslav #gym`,
    imageUrl: product.image.startsWith('/')
      ? `${APP_URL}${product.image}`
      : product.image,
    linkUrl: `${APP_URL}/${categoryPath}/${product.slug}`,
  };
}

/** Nový blog post */
export function buildBlogPost(post: {
  title: string;
  excerpt: string;
  slug: string;
  image: string;
}): PostPayload {
  return {
    message: `📖 ${post.title}\n\n${post.excerpt}\n\n👉 ${APP_URL}/blog/${post.slug}\n\n#fitness77 #fitness #mladaboleslav`,
    imageUrl: post.image.startsWith('/')
      ? `${APP_URL}${post.image}`
      : post.image,
    linkUrl: `${APP_URL}/blog/${post.slug}`,
  };
}

/** Akce / promo */
export function buildPromoPost(text: string, imageUrl?: string): PostPayload {
  return {
    message: `${text}\n\n💪 Fitness 77 Mladá Boleslav\n📍 Jiráskova 1320\n☎️ +420 777 105 548\n\n#fitness77 #fitness #mladaboleslav`,
    imageUrl,
  };
}
