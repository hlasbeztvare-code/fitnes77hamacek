require('dotenv').config();
const { Telegraf, Scenes, session } = require('telegraf');

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const HAMACEK_ID = process.env.HAMACEK_CHAT_ID;

if (!BOT_TOKEN || !HAMACEK_ID) {
    console.error('Chyba: Chybí TELEGRAM_BOT_TOKEN nebo HAMACEK_CHAT_ID v .env');
    process.exit(1);
}

// --- HLÁŠKY PRO JAROSLAVA ---
const welcomeQuotes = [
    "Zdar šampione! Doufám, že dneska nezvedáš jenom telefon, ale i pořádný železo! 💪",
    "Čau Jaroslave! Jsi ready udělat z Fitness 77 světovou jedničku? Jdeme na to!",
    "Systém nahozen na 300 %. Mimochodem, nechybí ti v krvi trocha kreatinu? 💊",
    "Vítej v centrále, šéfe. Web běží, svaly rostou, co budeme sypat do databáze teď?",
    "Zdar! Koukal jsem na tvůj progres... no, mohl bys přidat, ale web ti běží skvěle! 😉",
    "Hamáček online! Pozor, přichází seniorní kód a nekompromisní gains! 🔥"
];

// --- SCÉNA PRO NOVÝ PRODUKT ---
const addProductWizard = new Scenes.WizardScene(
    'ADD_PRODUCT_WIZARD',
    (ctx) => {
        ctx.reply('Zadejte název nového produktu:');
        return ctx.wizard.next();
    },
    (ctx) => {
        ctx.wizard.state.name = ctx.message.text;
        ctx.reply(`Název uložen: ${ctx.wizard.state.name}\nTeď mi napište cenu v Kč:`);
        return ctx.wizard.next();
    },
    (ctx) => {
        const price = parseInt(ctx.message.text);
        if (isNaN(price)) {
            ctx.reply('To nevypadá jako číslo. Zkus to znovu:');
            return;
        }
        ctx.wizard.state.price = price;
        ctx.reply('Paráda. Teď mi pošli fotku produktu:');
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (!ctx.message.photo) {
            ctx.reply('Musíš poslat fotku, abychom to mohli dát na web!');
            return;
        }

        // Získání největší verze fotky
        const photoId = ctx.message.photo[ctx.message.photo.length - 1].file_id;

        // TADY BUDE TVOJE LOGIKA PRO PRISMU
        console.log('Ukládám produkt:', {
            name: ctx.wizard.state.name,
            price: ctx.wizard.state.price,
            photoId: photoId
        });

        ctx.reply(`✅ Hotovo! Produkt "${ctx.wizard.state.name}" za ${ctx.wizard.state.price} Kč byl přidán do systému Fitness 77.`);
        return ctx.scene.leave();
    }
);

// --- INICIALIZACE BOTA ---
const bot = new Telegraf(BOT_TOKEN);
const stage = new Scenes.Stage([addProductWizard]);

bot.use(session());
bot.use(stage.middleware());

// --- HLAVNÍ PŘÍKAZY ---
bot.start((ctx) => {
    if (ctx.from.id.toString() !== HAMACEK_ID) {
        return ctx.reply("Vstup zakázán. Tohle je soukromá administrace Fitness 77.");
    }

    const randomQuote = welcomeQuotes[Math.floor(Math.random() * welcomeQuotes.length)];

    ctx.reply(`${randomQuote}`, {
        reply_markup: {
            keyboard: [
                [{ text: '➕ Nový produkt' }, { text: '📊 Stav skladu' }],
                [{ text: '📦 Bazar' }, { text: '⚙️ Nastavení' }]
            ],
            resize_keyboard: true
        }
    });
});

bot.hears('➕ Nový produkt', (ctx) => ctx.scene.enter('ADD_PRODUCT_WIZARD'));

bot.launch().then(() => {
    console.log('Bot pro Jaroslava běží na 300 %...');
});

// Korektní ukončení
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));