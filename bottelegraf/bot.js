require('dotenv').config();
const { Telegraf, Scenes, session } = require('telegraf');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const prisma = new PrismaClient();
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const HAMACEK_ID = process.env.HAMACEK_CHAT_ID;
const HONZA_ID = '7968309829'; // Tvé ID (Honza – šéf techniky)

// Pomocná funkce pro SOS hlášení (ROZDĚLENÉ)
async function sendSOS(errorMsg) {
    // 1. DETAILNÍ REPORT PRO TEBE (HONZA)
    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: HONZA_ID,
            text: `🚨 *TECHNICKÝ POPLACH - FITNESS 77*\n\nChyba: \n\`${errorMsg}\` \n\n_Koukni na to, Honzo!_`,
            parse_mode: 'Markdown'
        });
    } catch (e) { console.error('SOS direct failed'); }

    // 2. UKLIDŇUJÍCÍ ZPRÁVA PRO JAROSLAVA
    if (HAMACEK_ID && HAMACEK_ID !== HONZA_ID) {
        try {
            await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                chat_id: HAMACEK_ID,
                text: `⚠️ *Šéfe, máme malej technickej zásek na webu.*\n\nNičeho se neboj, Honza už o tom ví a právě to dává do kupy. Za chvilku to zase poletí! 🦾`,
                parse_mode: 'Markdown'
            });
        } catch (e) { console.error('Jarda notify failed'); }
    }
}

if (!BOT_TOKEN || !HAMACEK_ID) {
    console.error('Chyba: Chybí klíče v .env');
    process.exit(1);
}

function slugify(text) {
  return text.toString().toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');
}

// --- HLÁŠKY ---
const welcomeQuotes = [
    "Zdar šampione! Jak dneska rostou gains a kšefty? 💪",
    "Čau Jardo! Web běží, svaly jsou napumpovaný, jdeme ovládnout trh! 🔥",
    "Vítej v centrále Fitness 77. Máme tam nějaký nový love v objednávkách?",
    "Hamáček online! Systém nahozen na 300 %. Co budeme sypat do db?"
];

// --- SCÉNY ---
const addProductWizard = new Scenes.WizardScene(
    'ADD_PRODUCT_WIZARD',
    (ctx) => {
        ctx.reply('Kategorie:', { reply_markup: { inline_keyboard: [[{ text: '💊 Suple', callback_data: 'supplement' }], [{ text: '🏋️‍♂️ Gear', callback_data: 'equipment' }]] } });
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (!ctx.callbackQuery) return;
        ctx.wizard.state.category = ctx.callbackQuery.data;
        await ctx.answerCbQuery();
        ctx.reply('Název:');
        return ctx.wizard.next();
    },
    (ctx) => {
        ctx.wizard.state.name = ctx.message.text;
        ctx.reply('Cena:');
        return ctx.wizard.next();
    },
    (ctx) => {
        const p = parseInt(ctx.message.text);
        if (isNaN(p)) return ctx.reply('Číslo!');
        ctx.wizard.state.price = p;
        ctx.reply('Fotku!');
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (!ctx.message?.photo) return ctx.reply('Fotku!');
        const photoId = ctx.message.photo[ctx.message.photo.length - 1].file_id;
        ctx.reply('Zpracovávám...');
        try {
            const file = await ctx.telegram.getFile(photoId);
            const fn = `${Date.now()}.jpg`;
            const fp = `/images/products/${fn}`;
            const lp = path.join(__dirname, '..', 'public', fp);
            const dir = path.dirname(lp);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            const res = await axios({ url: `https://api.telegram.org/file/bot${BOT_TOKEN}/${file.file_path}`, responseType: 'stream' });
            const writer = fs.createWriteStream(lp);
            res.data.pipe(writer);
            await new Promise((res, rej) => { writer.on('finish', res); writer.on('error', rej); });
            await prisma.product.create({
                data: {
                    id: `bot-${Date.now()}`,
                    name: ctx.wizard.state.name,
                    slug: `${slugify(ctx.wizard.state.name)}-${Date.now().toString().slice(-4)}`,
                    price: parseFloat(ctx.wizard.state.price),
                    stock: 99,
                    description: `Profi kousek.`,
                    shortDescription: `Top kvalita.`,
                    image: fp,
                    category: ctx.wizard.state.category,
                }
            });
            ctx.reply(`✅ BOMBA! "${ctx.wizard.state.name}" je na webu. 🚀`);
        } catch (e) { ctx.reply('Chyba.'); }
        return ctx.scene.leave();
    }
);

const updateStockWizard = new Scenes.WizardScene(
    'UPDATE_STOCK_WIZARD',
    async (ctx) => {
        const products = await prisma.product.findMany({ take: 8, orderBy: { updatedAt: 'desc' } });
        if (products.length === 0) return ctx.scene.leave();
        const btns = products.map(p => ([{ text: p.name, callback_data: `stock_${p.id}` }]));
        ctx.reply('Vyber produkt:', { reply_markup: { inline_keyboard: btns } });
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (!ctx.callbackQuery) return;
        ctx.wizard.state.productId = ctx.callbackQuery.data.replace('stock_', '');
        await ctx.answerCbQuery();
        ctx.reply('Nový stav skladu:');
        return ctx.wizard.next();
    },
    async (ctx) => {
        const s = parseInt(ctx.message.text);
        if (isNaN(s)) return ctx.reply('Číslo!');
        await prisma.product.update({ where: { id: ctx.wizard.state.productId }, data: { stock: s } });
        ctx.reply('✅ Sklad upraven.');
        return ctx.scene.leave();
    }
);

const deleteProductWizard = new Scenes.WizardScene(
    'DELETE_PRODUCT_WIZARD',
    async (ctx) => {
        const products = await prisma.product.findMany({ take: 8, orderBy: { updatedAt: 'desc' } });
        const btns = products.map(p => ([{ text: `Smazat: ${p.name}`, callback_data: `del_${p.id}` }]));
        ctx.reply('⚠️ SMAZAT:', { reply_markup: { inline_keyboard: btns } });
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (!ctx.callbackQuery) return;
        const id = ctx.callbackQuery.data.replace('del_', '');
        await ctx.answerCbQuery();
        await prisma.product.delete({ where: { id: id } });
        ctx.reply('🗑️ Smazáno.');
        return ctx.scene.leave();
    }
);

const bot = new Telegraf(BOT_TOKEN);

// --- NESMRTELNOST (Globální ochrana proti chybám) ---
bot.catch((err, ctx) => {
    console.error(`❌ Telegraf Error pro ${ctx.updateType}:`, err);
    sendSOS(`Telegraf Error: ${err.message}`);
    ctx.reply('Sakra, tady se něco zaseklo, ale už na tom pracuju! Zkus to za chvilku znovu. 🦾');
});

// --- GLOBÁLNÍ ZABEZPEČENÍ (Middleware) ---
bot.use(async (ctx, next) => {
    const userId = ctx.from?.id ? String(ctx.from.id) : null;
    if (!userId) return;

    if (userId !== String(HAMACEK_ID) && userId !== HONZA_ID) {
        console.warn(`[GOLIÁŠ] Unauthorized access attempt by ID: ${userId}`);
        return; 
    }
    return next();
});

const stage = new Scenes.Stage([addProductWizard, updateStockWizard, deleteProductWizard]);
bot.use(session());
bot.use(stage.middleware());

// --- POMOCNÉ PŘÍKAZY ---
bot.command('myid', (ctx) => {
    ctx.reply(`Tvoje Chat ID je: ${ctx.from.id}\n(Přidej si ho do .env jako USER_CHAT_ID)`);
});

bot.start((ctx) => {
    const q = welcomeQuotes[Math.floor(Math.random() * welcomeQuotes.length)];
    ctx.reply(`${q}`, {
        reply_markup: {
            keyboard: [
                [{ text: '➕ Přidat produkt' }, { text: '📦 Upravit sklad' }],
                [{ text: '🗑️ Smazat produkt' }],
                [{ text: '📈 STATISTIKY PRODEJŮ' }, { text: '📦 Objednávky' }]
            ],
            resize_keyboard: true
        }
    });
});

bot.hears('➕ Přidat produkt', (ctx) => ctx.scene.enter('ADD_PRODUCT_WIZARD'));
bot.hears('📦 Upravit sklad', (ctx) => ctx.scene.enter('UPDATE_STOCK_WIZARD'));
bot.hears('🗑️ Smazat produkt', (ctx) => ctx.scene.enter('DELETE_PRODUCT_WIZARD'));

bot.hears('📈 STATISTIKY PRODEJŮ', async (ctx) => {
    try {
        const orders = await prisma.order.findMany();
        
        // Sumy
        const totalRev = orders.reduce((sum, o) => sum + o.total, 0);
        
        // Tržba dnes
        const today = new Date();
        today.setHours(0,0,0,0);
        const todayRev = orders.filter(o => new Date(o.createdAt) >= today).reduce((sum, o) => sum + o.total, 0);
        
        // Tržba tento měsíc
        const thisMonth = new Date();
        thisMonth.setHours(0,0,0,0);
        thisMonth.setDate(1);
        const monthRev = orders.filter(o => new Date(o.createdAt) >= thisMonth).reduce((sum, o) => sum + o.total, 0);

        let msg = `📈 *BUSINESS REPORT - FITNESS 77*\n\n`;
        msg += `💰 *Tržba CELKEM:* ${totalRev.toLocaleString()} Kč\n`;
        msg += `📅 *Tržba DNES:* ${todayRev.toLocaleString()} Kč\n`;
        msg += `🗓️ *Tento MĚSÍC:* ${monthRev.toLocaleString()} Kč\n\n`;
        msg += `🔥 _Jardo, investuj to do reklamy na e-shop, ať to sype ještě víc!_ 🚀`;
        
        ctx.replyWithMarkdown(msg);
    } catch (e) { ctx.reply('Chyba ve statistikách.'); }
});

bot.hears('📦 Objednávky', async (ctx) => {
    try {
        const latest = await prisma.order.findMany({ take: 5, orderBy: { createdAt: 'desc' } });
        if (latest.length === 0) return ctx.reply('Zatím nic.');
        let msg = `📦 *POSLEDNÍ KŠEFITY:*`;
        latest.forEach(o => msg += `\n- ${o.firstName} ${o.lastName} | ${o.total} Kč | ${new Date(o.createdAt).toLocaleDateString('cs')}`);
        ctx.replyWithMarkdown(msg);
    } catch (e) { ctx.reply('Chyba.'); }
});

bot.launch().then(() => console.log('Bot pro JAROSLAVA běží na 300 % a je neprůstřelný...'));

// --- OCHRANA PROCESU (Proti úplnému pádu Node.js) ---
process.on('uncaughtException', (err) => {
    console.error('🔥 KRITICKÁ CHYBA (Uncaught Exception):', err);
    sendSOS(`CRITICAL CRASH: ${err.message}`);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('⚠️ Neošetřený slib (Unhandled Rejection) u:', promise, 'důvod:', reason);
    sendSOS(`Unhandled Rejection: ${reason}`);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));