import sharp from 'sharp';
import path from 'path';

/**
 * Centrální generátor "Světového Vizuálu" pro sociální sítě Fitness 77.
 * Vytváří high-end grafiku s produktem na černém pozadí s brandingem.
 */

export async function generateSocialImage({
  productImage,
  title,
  category,
  template = 'hero'
}: {
  productImage: string;
  title: string;
  category?: string;
  template?: 'hero' | 'minimalist' | 'industrial' | 'promo';
}) {
  const WIDTH = 1080;
  const HEIGHT = 1350;

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
  const templatePath = path.join(process.cwd(), 'public/images/social-templates', `template-${template}.png`);
  
  try {
    // Zkusíme najít externí soubor šablony (např. template-hero.png)
    templateOverlay = await sharp(templatePath).toBuffer();
    console.log(`✅ Používám externí šablonu: ${template}.png`);
  } catch (e) {
    // Pokud soubor neexistuje, použijeme generovanou SVG logiku
  }

  // ─── TEMPLATE: HERO (Generated Backup) ───────────────────────
  if (template === 'hero' && !templateOverlay) {
    const redBar = Buffer.from(`
      <svg width="${WIDTH}" height="${HEIGHT}">
        <rect x="${WIDTH * 0.6}" y="-10%" width="${WIDTH * 0.6}" height="120%" fill="#e10600" transform="skewX(-12)" opacity="0.9" />
      </svg>
    `);
    compositions.push({ input: redBar, top: 0, left: 0 });
    
    const glow = Buffer.from(`
      <svg width="${WIDTH}" height="${HEIGHT}">
        <defs><radialGradient id="g"><stop offset="0%" stop-color="#e10600" stop-opacity="0.4"/><stop offset="100%" stop-color="#000" stop-opacity="0"/></radialGradient></defs>
        <circle cx="540" cy="550" r="450" fill="url(#g)" />
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
    console.log(`🚀 Social Geneator: BCAA Override aktivován`);
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

  const processedProduct = await sharp(productBuffer)
    .resize(template === 'minimalist' ? 600 : 800, 800, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const productPos = template === 'minimalist' 
    ? { top: 200, left: WIDTH - 700 }
    : { top: 150, left: 140 };

  compositions.push({ input: processedProduct, ...productPos });

  // ─── OVERLAY EXTERNAL TEMPLATE IF EXISTS ──────────────────────
  if (templateOverlay) {
    compositions.push({ input: templateOverlay, top: 0, left: 0 });
  }

  // ─── BRANDING (Generated Backup) ──────────────────────────────
  if (!templateOverlay) {
    const branding = Buffer.from(`
      <svg width="${WIDTH}" height="${HEIGHT}">
        <style>
          .t { fill: white; font-family: sans-serif; font-weight: 900; font-size: 80px; text-transform: uppercase; }
          .c { fill: #e10600; font-family: sans-serif; font-weight: 800; font-size: 30px; letter-spacing: 5px; text-transform: uppercase; }
          .u { fill: #a1a1aa; font-family: sans-serif; font-weight: 400; font-size: 24px; letter-spacing: 2px; }
        </style>
        
        <path d="M40 1200 L300 1200 L270 1280 L10 1280 Z" fill="#e10600" />
        <text x="55" y="1255" fill="white" font-family="sans-serif" font-weight="900" font-size="34px">FITNESS 77</text>
        <text x="50" y="100" class="c">${category || (template === 'industrial' ? 'ENGINEERED PERFORMANCE' : 'PREMIUM QUALITY')}</text>
        <text x="${WIDTH - 250}" y="1255" class="u">FITNESS77.CZ</text>
      </svg>
    `);
    compositions.push({ input: branding, top: 0, left: 0 });
  }

  return canvas.composite(compositions).webp({ quality: 90 }).toBuffer();
}
