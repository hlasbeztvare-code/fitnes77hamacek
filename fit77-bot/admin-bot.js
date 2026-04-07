import 'dotenv/config';
import { Telegraf, Markup, Scenes, session } from 'telegraf';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';
import { fileURLToPath } from 'url';

// CESTY PRO UKLÁDÁNÍ OBRÁZKŮ A VIDEÍ
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, '../public/images/products');
const VIDEOS_DIR = path.join(__dirname, '../public/videos/products');

// Ujistíme se, že složky existují
[PUBLIC_DIR, VIDEOS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// REMOVE.BG API KEY (Uživatel bude muset vložit do .env)
const REMOVE_BG_API_KEY = process.env.REMOVE_BG_API_KEY;

// KONFIGURACE
const prisma = new PrismaClient();
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8663672394:AAHxFgzC0eYJ6JID_ClOM6A8C-FrVX16cog';
const MY_ID = parseInt(process.env.TELEGRAM_ADMIN_ID) || 7968309829;

/**
 * 🛠️ SCÉNA PRO PŘIDÁNÍ PRODUKTU (KROK ZA KROKEM)
 */
const addProductWizard = new Scenes.WizardScene(
  'add_product_wizard',
  // 1. KROK: NÁZEV
  async (ctx) => {
    ctx.wizard.state.data = {};
    await ctx.reply("📝 Zadej *NÁZEV* produktu:", { parse_mode: 'Markdown', ...Markup.keyboard([['❌ Zrušit']]).oneTime().resize() });
    return ctx.wizard.next();
  },
  // 2. KROK: KOMPLETNÍ POPIS (Bot z něj vybere kousek pro grid)
  async (ctx) => {
    if (ctx.message?.text === '❌ Zrušit') return ctx.scene.leave();
    ctx.wizard.state.data.name = ctx.message.text;
    await ctx.reply("� Zadej *KOMPLETNÍ POPIS* produktu:\n(Bot z něj automaticky vybere text pro náhled v mřížce)", { parse_mode: 'Markdown' });
    return ctx.wizard.next();
  },
  // 3. KROK: CENA
  async (ctx) => {
    const fullDesc = ctx.message.text;
    ctx.wizard.state.data.description = fullDesc;
    
    // Automatický výběr popisu pro grid (prvních 100 znaků nebo po první tečku)
    let shortDesc = fullDesc.split('.')[0]; // Vezmeme první větu
    if (shortDesc.length > 100) shortDesc = shortDesc.substring(0, 97) + '...';
    ctx.wizard.state.data.shortDescription = shortDesc;

    await ctx.reply(`💰 Zadej *CENU* pro "${ctx.wizard.state.data.name}":`, { parse_mode: 'Markdown' });
    return ctx.wizard.next();
  },
  // 4. KROK: SKLAD
  async (ctx) => {
    const price = parseFloat(ctx.message.text);
    if (isNaN(price)) return ctx.reply("⚠️ Zadej prosím platné číslo pro cenu:");
    ctx.wizard.state.data.price = price;
    await ctx.reply("📦 Kolik kusů je na *SKLADĚ*?", { parse_mode: 'Markdown' });
    return ctx.wizard.next();
  },
  // 5. KROK: KATEGORIE
  async (ctx) => {
    const stock = parseInt(ctx.message.text);
    if (isNaN(stock)) return ctx.reply("⚠️ Zadej prosím platné číslo pro sklad:");
    ctx.wizard.state.data.stock = stock;
    await ctx.reply("📂 Zadej *KATEGORII*:", { 
      parse_mode: 'Markdown',
      ...Markup.keyboard([['Suplementy', 'Oblečení'], ['Příslušenství', '❌ Zrušit']]).oneTime().resize()
    });
    return ctx.wizard.next();
  },
  // 6. KROK: FOTO
  async (ctx) => {
    if (ctx.message?.text === '❌ Zrušit') return ctx.scene.leave();
    ctx.wizard.state.data.category = ctx.message.text;
    await ctx.reply("🖼️ Teď pošli *FOTKU* z galerie mobilu:", { 
      parse_mode: 'Markdown',
      ...Markup.removeKeyboard() 
    });
    return ctx.wizard.next();
  },
  // 7. KROK: VIDEO (VOLITELNÉ)
  async (ctx) => {
    ctx.wizard.state.photoMessage = ctx.message;
    await ctx.reply("🎥 Chceš přidat i *VIDEO*? Pošli ho, nebo napiš '-' pro přeskočení:", { parse_mode: 'Markdown' });
    return ctx.wizard.next();
  },
  // FINÁLE: ZPRACOVÁNÍ A ULOŽENÍ
  async (ctx) => {
    let finalImageUrl = '/images/placeholder.jpg';
    let finalVideoUrl = null;
    const slug = ctx.wizard.state.data.name.toLowerCase().replace(/ /g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const fileNameBase = `${slug}-${Date.now()}`;

    try {
      // 1. ZPRACOVÁNÍ FOTKY (z předchozího kroku)
      const photoMsg = ctx.wizard.state.photoMessage;
      if (photoMsg?.photo) {
        await ctx.reply("⏳ Zpracovávám fotku (ořez + WebP)...");
        const photo = photoMsg.photo[photoMsg.photo.length - 1];
        const fileLink = await ctx.telegram.getFileLink(photo.file_id);
        const filePathPng = path.join(PUBLIC_DIR, `${fileNameBase}.png`);
        const filePathWebp = path.join(PUBLIC_DIR, `${fileNameBase}.webp`);

        if (REMOVE_BG_API_KEY) {
          const response = await axios.post('https://api.remove.bg/v1.0/removebg', { image_url: fileLink.href, size: 'auto' }, { headers: { 'X-Api-Key': REMOVE_BG_API_KEY }, responseType: 'arraybuffer' });
          fs.writeFileSync(filePathPng, response.data);
          await sharp(filePathPng).trim().resize(800, 800, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).webp({ quality: 85 }).toFile(filePathWebp);
          fs.unlinkSync(filePathPng);
          finalImageUrl = `/images/products/${fileNameBase}.webp`;
        } else {
          const response = await axios.get(fileLink.href, { responseType: 'arraybuffer' });
          await sharp(response.data).resize(800, 800, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).webp({ quality: 85 }).toFile(filePathWebp);
          finalImageUrl = `/images/products/${fileNameBase}.webp`;
        }
      }

      // 2. ZPRACOVÁNÍ VIDEA (pokud je)
      if (ctx.message?.video || ctx.message?.document) {
        const video = ctx.message.video || ctx.message.document;
        if (video.mime_type?.includes('video')) {
          await ctx.reply("⏳ Konvertuji video do WebM...");
          const videoLink = await ctx.telegram.getFileLink(video.file_id);
          const tempPath = path.join(VIDEOS_DIR, `temp-${fileNameBase}${path.extname(videoLink.href)}`);
          const webmPath = path.join(VIDEOS_DIR, `${fileNameBase}.webm`);

          // Stáhnutí videa
          const writer = fs.createWriteStream(tempPath);
          const response = await axios.get(videoLink.href, { responseType: 'stream' });
          response.data.pipe(writer);
          await new Promise((resolve) => writer.on('finish', resolve));

          // Konverze do WebM pomocí FFmpeg
          await new Promise((resolve, reject) => {
            ffmpeg(tempPath)
              .toFormat('webm')
              .videoCodec('libvpx-vp9')
              .addOptions(['-crf 30', '-b:v 0']) // Kvalita vs velikost
              .on('end', resolve)
              .on('error', reject)
              .save(webmPath);
          });

          fs.unlinkSync(tempPath);
          finalVideoUrl = `/videos/products/${fileNameBase}.webm`;
        }
      }

      const d = ctx.wizard.state.data;
      const product = await prisma.product.create({
        data: {
          name: d.name,
          slug: slug,
          price: d.price,
          stock: d.stock,
          category: d.category,
          image: finalImageUrl,
          videoUrl: finalVideoUrl, // Nutno přidat do Prisma schématu!
          shortDescription: d.shortDescription,
          description: d.description
        }
      });
      await ctx.reply(`✅ *PRODUKT PŘIDÁN!*\n\nNázev: ${product.name}\nFoto: ${finalImageUrl}\nVideo: ${finalVideoUrl || 'Není'}`, { parse_mode: 'Markdown' });
    } catch (err) {
      console.error(err);
      await ctx.reply("❌ Chyba při ukládání: " + err.message);
    }
    return ctx.scene.leave();
  }
);

const addBazaarWizard = new Scenes.WizardScene(
  'add_bazaar_wizard',
  // 1. KROK: NÁZEV
  async (ctx) => {
    ctx.wizard.state.data = {};
    await ctx.reply("🏷️ Zadej *NÁZEV* bazarové položky:", { parse_mode: 'Markdown', ...Markup.keyboard([['❌ Zrušit']]).oneTime().resize() });
    return ctx.wizard.next();
  },
  // 2. KROK: POPIS
  async (ctx) => {
    if (ctx.message?.text === '❌ Zrušit') return ctx.scene.leave();
    ctx.wizard.state.data.title = ctx.message.text;
    await ctx.reply("📖 Zadej *POPIS* položky:", { parse_mode: 'Markdown' });
    return ctx.wizard.next();
  },
  // 3. KROK: CENA
  async (ctx) => {
    ctx.wizard.state.data.description = ctx.message.text;
    await ctx.reply("💰 Zadej *CENU* (kolik chceš dostat):", { parse_mode: 'Markdown' });
    return ctx.wizard.next();
  },
  // 4. KROK: PŮVODNÍ CENA (volitelná)
  async (ctx) => {
    const price = parseFloat(ctx.message.text);
    if (isNaN(price)) return ctx.reply("⚠️ Zadej platné číslo:");
    ctx.wizard.state.data.price = price;
    await ctx.reply("💎 Zadej *PŮVODNÍ CENU* (za kolik jsi to koupil), nebo '-':", { parse_mode: 'Markdown' });
    return ctx.wizard.next();
  },
  // 5. KROK: STAV
  async (ctx) => {
    const originalPrice = ctx.message.text === '-' ? null : parseFloat(ctx.message.text);
    if (ctx.message.text !== '-' && isNaN(originalPrice)) return ctx.reply("⚠️ Zadej číslo nebo '-':");
    ctx.wizard.state.data.originalPrice = originalPrice;
    await ctx.reply("🔧 Zadej *STAV* položky:", { 
      parse_mode: 'Markdown',
      ...Markup.keyboard([['Nové', 'Výborný'], ['Dobrý', 'Použitelný'], ['❌ Zrušit']]).oneTime().resize()
    });
    return ctx.wizard.next();
  },
  // 6. KROK: LOKACE
  async (ctx) => {
    if (ctx.message?.text === '❌ Zrušit') return ctx.scene.leave();
    ctx.wizard.state.data.condition = ctx.message.text;
    await ctx.reply("📍 Zadej *LOKACI* (kde je možné vyzvednutí):", { 
      parse_mode: 'Markdown',
      ...Markup.keyboard([['Praha', 'Brno'], ['Ostrava', 'Mladá Boleslav'], ['❌ Zrušit']]).oneTime().resize()
    });
    return ctx.wizard.next();
  },
  // 7. KROK: FOTO
  async (ctx) => {
    if (ctx.message?.text === '❌ Zrušit') return ctx.scene.leave();
    ctx.wizard.state.data.location = ctx.message.text;
    await ctx.reply("🖼️ Pošli *FOTKU* z galerie:", { parse_mode: 'Markdown', ...Markup.removeKeyboard() });
    return ctx.wizard.next();
  },
  // 8. KROK: VIDEO (volitelné)
  async (ctx) => {
    ctx.wizard.state.photoMessage = ctx.message;
    await ctx.reply("🎥 Chceš přidat *VIDEO*? Pošli ho, nebo '-':", { parse_mode: 'Markdown' });
    return ctx.wizard.next();
  },
  // FINÁLE: ULOŽENÍ
  async (ctx) => {
    let finalImageUrl = '/images/placeholder.jpg';
    let finalVideoUrl = null;
    const slug = ctx.wizard.state.data.title.toLowerCase().replace(/ /g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const fileNameBase = `bazar-${slug}-${Date.now()}`;

    try {
      // Zpracování fotky
      const photoMsg = ctx.wizard.state.photoMessage;
      if (photoMsg?.photo) {
        await ctx.reply("⏳ Zpracovávám fotku...");
        const photo = photoMsg.photo[photoMsg.photo.length - 1];
        const fileLink = await ctx.telegram.getFileLink(photo.file_id);
        const filePathWebp = path.join(PUBLIC_DIR, `${fileNameBase}.webp`);

        if (REMOVE_BG_API_KEY) {
          const response = await axios.post('https://api.remove.bg/v1.0/removebg', { image_url: fileLink.href, size: 'auto' }, { headers: { 'X-Api-Key': REMOVE_BG_API_KEY }, responseType: 'arraybuffer' });
          const filePathPng = path.join(PUBLIC_DIR, `${fileNameBase}.png`);
          fs.writeFileSync(filePathPng, response.data);
          await sharp(filePathPng).trim().resize(800, 800, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).webp({ quality: 85 }).toFile(filePathWebp);
          fs.unlinkSync(filePathPng);
        } else {
          const response = await axios.get(fileLink.href, { responseType: 'arraybuffer' });
          await sharp(response.data).resize(800, 800, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).webp({ quality: 85 }).toFile(filePathWebp);
        }
        finalImageUrl = `/images/products/${fileNameBase}.webp`;
      }

      // Zpracování videa
      if (ctx.message?.video || ctx.message?.document) {
        const video = ctx.message.video || ctx.message.document;
        if (video.mime_type?.includes('video')) {
          await ctx.reply("⏳ Konvertuji video...");
          const videoLink = await ctx.telegram.getFileLink(video.file_id);
          const tempPath = path.join(VIDEOS_DIR, `temp-${fileNameBase}${path.extname(videoLink.href)}`);
          const webmPath = path.join(VIDEOS_DIR, `${fileNameBase}.webm`);

          const writer = fs.createWriteStream(tempPath);
          const response = await axios.get(videoLink.href, { responseType: 'stream' });
          response.data.pipe(writer);
          await new Promise((resolve) => writer.on('finish', resolve));

          await new Promise((resolve, reject) => {
            ffmpeg(tempPath).toFormat('webm').videoCodec('libvpx-vp9').addOptions(['-crf 30', '-b:v 0']).on('end', resolve).on('error', reject).save(webmPath);
          });

          fs.unlinkSync(tempPath);
          finalVideoUrl = `/videos/products/${fileNameBase}.webm`;
        }
      }

      const d = ctx.wizard.state.data;
      const item = await prisma.bazaarListing.create({
        data: {
          title: d.title,
          slug: slug,
          description: d.description,
          price: d.price,
          originalPrice: d.originalPrice,
          condition: d.condition,
          location: d.location,
          image: finalImageUrl,
          videoUrl: finalVideoUrl
        }
      });
      await ctx.reply(`✅ *BAZAROVÁ POLOŽKA PŘIDÁNA!*\n\n${item.title}\n💰 ${item.price} Kč\n📍 ${item.location}`, { parse_mode: 'Markdown' });
    } catch (err) {
      console.error(err);
      await ctx.reply("❌ Chyba: " + err.message);
    }
    return ctx.scene.leave();
  }
);

const stage = new Scenes.Stage([addProductWizard, addBazaarWizard]);
const bot = new Telegraf(BOT_TOKEN);

bot.use(session());
bot.use(stage.middleware());

// 🛡️ SECURITY MIDDLEWARE & ERROR HANDLING
bot.use(async (ctx, next) => {
  if (ctx.from?.id !== MY_ID) {
    console.log(`⚠️ Nepovolený pokus o přístup od: ${ctx.from?.id}`);
    return ctx.reply("⛔ Přístup zamítnut. Nejsi majitelem FIT77.");
  }
  try {
    await next();
  } catch (err) {
    console.error("🔥 ERROR V BOTU:", err);
    ctx.reply("⚠️ Systém narazil na chybu, ale běží dál.");
  }
});

// 🏠 START MENU
bot.start((ctx) => {
  return ctx.reply('🚀 FIT77 ADMIN TERMINAL\n\nVybírej palcem:', 
    Markup.inlineKeyboard([
      [Markup.button.callback('📦 Vypsat Sklad', 'view_inventory')],
      [Markup.button.callback('➕ Přidat Nové Zboží', 'add_product')],
      [Markup.button.callback('🏷️ Přidat Bazar', 'add_bazaar')],
      [Markup.button.callback('📈 Rychlý Přehled', 'status')]
    ])
  );
});

bot.action('add_product', (ctx) => ctx.scene.enter('add_product_wizard'));
bot.action('add_bazaar', (ctx) => ctx.scene.enter('add_bazaar_wizard'));
bot.command('novy', (ctx) => ctx.scene.enter('add_product_wizard'));
bot.command('bazar', (ctx) => ctx.scene.enter('add_bazaar_wizard'));

// � SPUŠTĚNÍ
bot.catch((err, ctx) => {
  console.error(`Ooops, error for ${ctx.updateType}`, err);
});

bot.launch().then(() => {
  console.log("🚀 FIT77 Admin Bot běží!");
});

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// �� LOGIKA: VÝPIS PRODUKTŮ S TLAČÍTKY PRO AKCE
bot.action('view_inventory', async (ctx) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { updatedAt: 'desc' }
    });
    
    if (products.length === 0) {
      await ctx.reply("V databázi nejsou žádné produkty.");
      return ctx.answerCbQuery();
    }

    await ctx.reply("📝 *SEZNAM PRODUKTŮ:*", { parse_mode: 'Markdown' });

    for (const p of products) {
      const text = `🔹 *${p.name}*\n💰 Cena: ${p.price} Kč\n📦 Sklad: ${p.stock} ks\n📂 Kat: ${p.category}\n🆔 \`${p.id}\``;
      
      await ctx.reply(text, {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
          [
            Markup.button.callback('➕ Sklad', `inc_${p.id}`),
            Markup.button.callback('✏️ Edit', `edit_${p.id}`),
            Markup.button.callback('🗑️ Smazat', `confirm_del_${p.id}`)
          ]
        ])
      });
    }
    
    await ctx.answerCbQuery();
  } catch (err) {
    console.error(err);
    await ctx.reply("🔥 Chyba při čtení z DB");
    await ctx.answerCbQuery();
  }
});

// ⚡ RYCHLÉ AKCE Z TLAČÍTEK
bot.action(/^inc_(.+)$/, async (ctx) => {
  const id = ctx.match[1];
  try {
    const updated = await prisma.product.update({
      where: { id },
      data: { stock: { increment: 1 } }
    });
    await ctx.answerCbQuery(`✅ ${updated.name}: ${updated.stock}ks`);
    // Editujeme zprávu pro vizuální update
    await ctx.editMessageText(`🔹 *${updated.name}*\n💰 Cena: ${updated.price} Kč\n📦 Sklad: ${updated.stock} ks (Aktualizováno!)\n📂 Kat: ${updated.category}\n🆔 \`${updated.id}\``, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [
          Markup.button.callback('➕ Sklad', `inc_${updated.id}`),
          Markup.button.callback('✏️ Edit', `edit_${updated.id}`),
          Markup.button.callback('🗑️ Smazat', `confirm_del_${updated.id}`)
        ]
      ])
    });
  } catch (err) {
    console.error("🔥 Error incrementing stock:", err);
    await ctx.answerCbQuery("❌ Chyba");
  }
});

bot.action(/^edit_(.+)$/, async (ctx) => {
  const id = ctx.match[1];
  try {
    const p = await prisma.product.findUnique({ where: { id } });
    await ctx.reply(`✏️ *EDITACE: ${p.name}*\n\nZkopíruj a uprav:\n\n\`/update ${p.id} | ${p.name} | ${p.price} | ${p.stock} | ${p.category} | ${p.image}\``, { parse_mode: 'Markdown' });
    await ctx.answerCbQuery();
  } catch (err) {
    console.error("🔥 Error in edit action:", err);
    await ctx.answerCbQuery("❌ Chyba");
  }
});

bot.action(/^confirm_del_(.+)$/, async (ctx) => {
  const id = ctx.match[1];
  await ctx.reply("⚠️ Opravdu smazat?", Markup.inlineKeyboard([
    [Markup.button.callback('✅ ANO, SMAZAT', `del_${id}`), Markup.button.callback('❌ NE', 'cancel')]
  ]));
  await ctx.answerCbQuery();
});

bot.action(/^del_(.+)$/, async (ctx) => {
  const id = ctx.match[1];
  try {
    await prisma.product.delete({ where: { id } });
    await ctx.editMessageText("🗑️ Produkt byl smazán.");
    await ctx.answerCbQuery("Smazáno");
  } catch (err) {
    console.error("🔥 Error in delete action:", err);
    await ctx.answerCbQuery("❌ Chyba při mazání");
  }
});

bot.action('cancel', (ctx) => {
  ctx.editMessageText("Zrušeno.");
  ctx.answerCbQuery();
});

// 🗑️ LOGIKA: SMAZÁNÍ BAZARU
bot.command('smazat_bazar', async (ctx) => {
  const id = ctx.message.text.split(' ')[1];
  if (!id) return ctx.reply("⚠️ Použij: `/smazat_bazar [ID]`");

  try {
    await prisma.bazaarListing.delete({ where: { id } });
    ctx.reply("🗑️ Bazarová položka smazána.");
  } catch (err) {
    console.error("🔥 Error deleting bazaar item:", err);
    ctx.reply("❌ Chyba při mazání.");
  }
});

// 🗑️ LOGIKA: SMAZÁNÍ
bot.command('smazat', async (ctx) => {
  const id = ctx.message.text.split(' ')[1];
  if (!id) return ctx.reply("⚠️ Použij: `/smazat [ID]`");

  try {
    await prisma.product.delete({ where: { id } });
    ctx.reply("🗑️ Produkt byl smazán.");
  } catch (err) {
    console.error("🔥 Error deleting product:", err);
    ctx.reply("❌ Chyba při mazání.");
  }
});

// 📈 LOGIKA: RYCHLÝ PŘEHLED
bot.action('status', async (ctx) => {
  try {
    const count = await prisma.product.count();
    const outOfStock = await prisma.product.count({ where: { stock: 0 } });
    const products = await prisma.product.findMany({
      select: { price: true, stock: true }
    });
    
    const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
    const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
    
    let report = `📈 *RYCHLÝ PŘEHLED*\n\n`;
    report += `✅ Produkty v nabídce: *${count}*\n`;
    report += `⚠️ Vyprodáno: *${outOfStock}*\n`;
    report += `📦 Celkem kusů skladem: *${totalStock} ks*\n`;
    report += `💰 Hodnota skladu: *${totalValue.toLocaleString('cs-CZ')} Kč*`;
    
    await ctx.reply(report, { parse_mode: 'Markdown' });
    await ctx.answerCbQuery();
  } catch (err) {
    console.error("🔥 Error getting status:", err);
    await ctx.reply("❌ Chyba při získávání statistik.");
    await ctx.answerCbQuery();
  }
});