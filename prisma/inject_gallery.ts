import axios from 'axios';
import * as cheerio from 'cheerio';
import download from 'image-downloader';
import path from 'path';

async function scrapeFullGallery() {
  console.log("🚀 STARTUJU AGRESIVNÍ SNIPER MODE: Vysávám úplně všechno z galerie...");
  
  try {
    // Použijeme User-Agent, aby nás web neblokoval jako bota
    const { data } = await axios.get('https://fitness77.cz/galerie/', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
    });
    const $ = cheerio.load(data);
    const images = new Set<string>();

    // 1. Projdeme všechny IMG tagy a všechny možný atributy
    $('img').each((i, el) => {
      const attrs = [$(el).attr('src'), $(el).attr('data-src'), $(el).attr('data-lazy-src'), $(el).attr('srcset')];
      attrs.forEach(src => {
        if (src) {
          let cleanSrc = src.split(' ')[0]; // Pro srcset veme první link
          if (cleanSrc.startsWith('//')) cleanSrc = 'https:' + cleanSrc;
          else if (cleanSrc.startsWith('/')) cleanSrc = 'https://fitness77.cz' + cleanSrc;
          
          if (cleanSrc.includes('uploads') && !cleanSrc.includes('logo') && !cleanSrc.includes('icon')) {
            images.add(cleanSrc);
          }
        }
      });
    });

    // 2. Projdeme i odkazy (často jsou v galerii velký fotky v <a> tagu)
    $('a').each((i, el) => {
      const href = $(el).attr('href');
      if (href && (href.endsWith('.jpg') || href.endsWith('.jpeg') || href.endsWith('.png'))) {
        let cleanHref = href;
        if (cleanHref.startsWith('//')) cleanHref = 'https:' + cleanHref;
        else if (cleanHref.startsWith('/')) cleanHref = 'https://fitness77.cz' + cleanHref;
        images.add(cleanHref);
      }
    });

    const finalImages = Array.from(images);
    console.log(`📸 ANALÝZA HOTOVA: Nalezeno ${finalImages.length} unikátních fotek.`);

    for (let i = 0; i < finalImages.length; i++) {
      try {
        const ext = path.extname(finalImages[i]) || '.jpg';
        await download.image({
          url: finalImages[i],
          dest: path.join(process.cwd(), 'public/images/gym/gallery', `gym_photo_${i}${ext}`)
        });
        process.stdout.write(`\r✅ [${i+1}/${finalImages.length}] Staženo: ${path.basename(finalImages[i])}`);
      } catch (e) { /* tichý skip chyb */ }
    }

    console.log("\n\n🔥 OPERACE DOKONČENA! Máme plnej zásobník fotek v publicu.");
  } catch (error) {
    console.error("💀 Chyba při náletu:", error instanceof Error ? error.message : String(error));
  }
}

scrapeFullGallery();
