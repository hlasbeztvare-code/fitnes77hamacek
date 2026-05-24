import sharp from 'sharp';
import path from 'path';

/**
 * Centrální generátor "Světového Vizuálu" pro sociální sítě Fitness 77.
 * Vytváří high-end grafiku s produktem na černém pozadí s brandingem.
 * * ZERRO ERROR TOLERANCE: Plná podpora pro 9:16 Stories/Reels i 4:5 Feed formáty.
 */

export async function generateSocialImage({
  productImage,
  title,
  category,
  template = 'hero',
  format = 'feed' // NOVÝ PARAMETR: 'feed' (1080x1350) nebo 'story' (1080x1920)
}: {
  productImage: string;
  title: string;
  category?: string;
  template?: 'hero' | 'minimalist' | 'industrial' | 'promo';
  format?: 'feed' | 'story';
}) {
  // STRIKTNÍ ARCHITEKTURA PLÁTNA: Rozměry podle zvoleného formátu
  const WIDTH = 1080;
  const HEIGHT = format === 'story' ? 1920 : 1350;

  let canvas = sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 1 },
    },
  });

  const compositions: any[] = [];

  // ─────────────── TEMPLATE LOADING Logic ────────────────────────
  let templateOverlay: Buffer | null = null;
  // Rozlišujeme soubory šablon podle formátu (např. template-hero-story.png)
  const templateFileName = format === 'story' ? `template-${template}-story.png` : `template-${template}.png`;
  const templatePath = path.join(process.cwd(), 'public/images/social-templates', templateFileName);

  try {
    templateOverlay = await sharp(templatePath).toBuffer();
    console.log(`✅ Používám externí šablonu: ${templateFileName}`);
  } catch (e) {
    // Pokud soubor neexistuje, jedeme přes záložní generované SVG
  }

  // ─── TEMPLATE: HERO (Generated Backup) ───────────────────────
  if (template === 'hero' && !templateOverlay) {
    const redBar = Buffer.from(`
      <svg width="${WIDTH}" height="${HEIGHT}">
        <rect x="${WIDTH * 0.5}" y="-10%" width="${WIDTH * 0.7}" height="120%" fill="#e10600" transform="skewX(-12)" opacity="0.9" />
      </svg>
    `);
    compositions.push({ input: redBar, top: 0, left: 0 });

    const glow = Buffer.from(`
      <svg width="${WIDTH}" height="${HEIGHT}">
        <defs><radialGradient id="g"><stop offset="0%" stop-color="#e10600" stop-opacity="0.4"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient></defs>
        <circle cx="${WIDTH / 2}" cy="${HEIGHT / 2}" r="500" fill="url(#g)" />
      </svg>
    `);
    compositions.push({ input: glow, top: 0, left: 0 });
  }

  // ─── TEMPLATE: INDUSTRIAL (Generated Backup) ─────────────────
  if (template === 'industrial' && !templateOverlay) {
    const darkOverlay = Buffer.from(`
      <svg width="${WIDTH}" height="${HEIGHT}">
        <rect width="100%" height="100%" fill="url(#grad)" />
        <defs><linearGradient id="grad" x1="0" y1="0" x2="0" y2="100%"><stop offset="0%" stop-color="#111"/><stop offset="100%" stop-color="#000"/></linearGradient></defs>
      </svg>
    `);
    compositions.push({ input: darkOverlay, top: 0, left: 0 });
  }

  // ─── PRODUCT PROCESSING ───────────────────────────────────────
  let productBuffer;
  let finalProductPath = productImage;

  // Hardcoded override pro BCAA 411 - sjednocení vizuálu všude
  if (title.toUpperCase().includes('BCA') || productImage.toLowerCase().includes('bca')) {
    finalProductPath = '/images/products/bcaa411.webp';
    console.log(`🚀 Social Generator: BCAA Override aktivován`);
  }

  try {
    if (finalProductPath.startsWith('http')) {
      const response = await fetch(finalProductPath);
      productBuffer = Buffer.from(await response.arrayBuffer());
    } else {
      const fullPath = path.join(process.cwd(), 'public', finalProductPath.replace(/^\//, ''));
      productBuffer = await sharp(fullPath).toBuffer();
    }
  } catch (err) {
    productBuffer = Buffer.from('<svg width="200" height="200"><rect width="200" height="200" fill="gray"/></svg>');
  }

  // Velikost produktu: Ve Stories dáváme produktu větší prostor na výšku
  const productResizeHeight = format === 'story' ? 1000 : 800;
  const processedProduct = await sharp(productBuffer)
    .resize(template === 'minimalist' ? 600 : 800, productResizeHeight, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // Dynamická pozice: Ve Stories musí produkt sedět vycentrovaný níže, aby ho nahoře nezakryly ovládací prvky IG
  const productPos = format === 'story'
    ? { top: Math.floor((HEIGHT - productResizeHeight) / 2) + 50, left: 140 }
    : template === 'minimalist'
      ? { top: 200, left: WIDTH - 700 }
      : { top: 150, left: 140 };

  compositions.push({ input: processedProduct, ...productPos });

  // ─── OVERLAY EXTERNAL TEMPLATE IF EXISTS ──────────────────────
  if (templateOverlay) {
    compositions.push({ input: templateOverlay, top: 0, left: 0 });
  }

  // ─── BRANDING & TYPOGRAPHY (Generated Backup) ──────────────────
  if (!templateOverlay) {
    const brandCategory = category || (template === 'industrial' ? 'ENGINEERED PERFORMANCE' : 'PREMIUM QUALITY');

    // Dynamické Y pozice prvků pro spodní lištu, aby se přizpůsobily výšce plátna
    const footerY = HEIGHT - 100;
    const badgeY = HEIGHT - 150;

    const branding = Buffer.from(`
      <svg width="${WIDTH}" height="${HEIGHT}">
        <style>
          .t { fill: white; font-family: sans-serif; font-weight: 900; font-size: 80px; text-transform: uppercase; }
          .c { fill: #e10600; font-family: sans-serif; font-weight: 800; font-size: 30px; letter-spacing: 5px; text-transform: uppercase; }
          .u { fill: #a1a1aa; font-family: sans-serif; font-weight: 400; font-size: 24px; letter-spacing: 2px; }
        </style>
        
        <path d="M40 ${badgeY} L300 ${badgeY} L270 ${badgeY + 80} L10 ${badgeY + 80} Z" fill="#e10600" />
        <text x="55" y="${badgeY + 55}" fill="white" font-family="sans-serif" font-weight="900" font-size="34px">FITNESS 77</text>
        <text x="50" y="100" class="c">${brandCategory}</text>
        <text x="${WIDTH - 250}" y="${badgeY + 55}" class="u">FITNESS77.CZ</text>
      </svg>
    `);
    compositions.push({ input: branding, top: 0, left: 0 });
  }

  return canvas.composite(compositions).webp({ quality: 90 }).toBuffer();
}