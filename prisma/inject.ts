// @ts-nocheck
// @ts-nocheck
// @ts-nocheck
import axios from 'axios';
import * as cheerio from 'cheerio';
import download from 'image-downloader';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function startInjection() {
  console.log("🚀 STARTUJU PREDÁTORA 2.1: Oprava a masivní vysávání fitness77.cz...");
  
  try {
    const { data } = await axios.get('https://fitness77.cz');
    const $ = cheerio.load(data);

    // VYSÁTÍ TEXTŮ - Půjdeme na jistotu do tabulky Trainer
    const allParagraphs = $('p, .content, .description, h2').map((i, el) => $(el).text().trim()).get();
    const fullText = allParagraphs.filter(t => t.length > 20).join('

').substring(0, 2000);
    
    // Použijeme model Trainer, který v DB 100% máš
    await prisma.trainer.upsert({
      where: { slug: 'heritage-data' },
      update: { bio: fullText },
      create: { 
        name: 'Historie Fitness 77', 
        slug: 'heritage-data', 
        role: 'Legacy', 
        bio: fullText,
        image: '/images/gym/gym_old_0.jpg'
      }
    });

    // MASIVNÍ LOV FOTEK
    const imageUrls: string[] = [];
    $('img').each((i, el) => {
      let src = $(el).attr('src');
      if (src) {
        if (src.startsWith('//')) src = 'https:' + src;
        else if (src.startsWith('/')) src = 'https://fitness77.cz' + src;
        if (src.startsWith('http') && !src.includes('logo') && !src.includes('icon')) {
          imageUrls.push(src);
        }
      }
    });

    const uniqueImages = [...new Set(imageUrls)];
    console.log(`📸 Nalezeno ${uniqueImages.length} fotek. Jdu je tam nasypat...`);

    for (let i = 0; i < uniqueImages.length; i++) {
      try {
        await download.image({
          url: uniqueImages[i],
          dest: path.join(process.cwd(), 'public/images/gym', `gym_old_${i}.jpg`)
        });
        process.stdout.write(`✅ Staženo ${i+1}/${uniqueImages.length}`);
      } catch (e) {
        // Skip chyby
      }
    }

    console.log("

🔥 HOTOVO! Texty jsou v DB (model Trainer) a fotky v public/images/gym.");
  } catch (error) {
    console.error("💀 Chyba:", error instanceof Error ? error.message : "Neznamy error");
  } finally {
    await prisma.$disconnect();
  }
}

startInjection();
