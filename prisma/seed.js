"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../src/lib/db");
async function main() {
    // Supplements
    await db_1.db.product.deleteMany({
        where: {
            category: 'supplement',
        },
    });
    await db_1.db.product.createMany({
        data: [
            {
                name: 'BLACK DEAD',
                slug: 'black-dead-pre-workout',
                shortDescription: 'Explozivní energie. Brutální pumpa. Maximální fokus.',
                description: 'BLACK DEAD je nejsilnější český pre-workout pro ty, co v gymu nechávají všechno. Žádný kompromis. Žádná slabost. Jen výkon, který tě přepne do režimu, kde se neptáš – jen jedeš. Přináší masivní pumpu, explozivní energii a absolutní fokus, který vás posune za hranici komfortu. Tohle není pro začátečníky. Tohle je pro ty, co chtějí víc než jen "dobrý trénink". Tvůj limit neexistuje. Jen jsi ho ještě nepřekročil.',
                price: 999,
                oldPrice: 1490,
                shoptetProductId: '49',
                shoptetPriceId: '52',
                image: '/images/products/Blackdead.webp',
                stock: 50,
                category: 'supplement',
                featured: true,
                hoverVideo: '/videos/blackdead.mp4',
                ingredients: 'Beta-Alanin, L-Citrulin Malát, AAKG, Taurin, Tyrosin, Kofein bezvodý, Extrakt ze zeleného čaje, Sladidlo (Sukralóza).',
                nutrition: {
                    'Beta-Alanin': '4000 mg',
                    'L-Citrulin Malát': '6000 mg',
                    'AAKG': '3000 mg',
                    'Kofein': '200 mg',
                    'Taurin': '1000 mg',
                    'Tyrosin': '500 mg',
                }
            },
            {
                name: 'DEAD PUMP',
                slug: 'deadpump-v2-pump-formula',
                shortDescription: 'Extrémní pumpa. Čistý výkon. Bez kofeinu.',
                description: 'DEAD PUMP je čistý výkon bez stimulantů. Pumpa, která tě drží od první do poslední série – bez pádu, bez rozhozené hlavy. Co pocítíš: Extrémní napumpování svalů (objem, tvrdost, kontrola), čistý fokus, stabilní výkon 60 minut+ a možnost trénovat kdykoliv, i večer. Realita: Tohle není slabý pumpič. Tohle je kontrolovaný tlak na výkon. Finále: Bez stimulantů. Bez limitů. Jen čistá práce.',
                price: 1099,
                oldPrice: 1390,
                shoptetProductId: '46',
                shoptetPriceId: '49',
                image: '/images/products/deadpump.webp',
                stock: 45,
                category: 'supplement',
                featured: true,
                hoverVideo: '/videos/deadpump.mp4',
                ingredients: 'L-Citrulin, Glycerol monostearát, AAKG, Extrakt z červené řepy, Vitamín C, Sladidlo (Steviol-glykosidy).',
                nutrition: {
                    'L-Citrulin': '8000 mg',
                    'Glycerol': '3000 mg',
                    'AAKG': '4000 mg',
                    'Vitamín C': '250 mg',
                    'Červená řepa': '500 mg',
                }
            },
            {
                name: 'RÝŽOVÁ KAŠE - ČOKOLÁDA',
                slug: 'ryzova-kase-cokolada',
                shortDescription: 'Rychlá energie. Snadná příprava. Skvělá chuť.',
                description: 'Ideální volba pro rychlý předtréninkový sacharidový základ nebo jako lehce stravitelná snídaně. Rýžová kaše se snadno připravuje a nabízí perfektní start do tvého tréninku.',
                price: 449,
                oldPrice: 590,
                shoptetProductId: '61',
                shoptetPriceId: '79',
                image: '/images/products/rice-blueberry.jpg',
                stock: 50,
                category: 'supplement',
                featured: true,
                ingredients: '100% rýžová mouka, kakaový prášek (u příchutě čokoláda), aroma, sladidlo (sukralóza).',
                nutrition: {
                    'Energetická hodnota': '1580 kJ / 372 kcal',
                    'Tuky': '1.5 g',
                    'Z toho nasycené': '0.3 g',
                    'Sacharidy': '80 g',
                    'Z toho cukry': '0.5 g',
                    'Bílkoviny': '7 g',
                    'Sůl': '0.01 g',
                }
            },
            {
                name: 'RÝŽOVÁ KAŠE - SLANÝ KARAMEL',
                slug: 'ryzova-kase-slany-karamel',
                shortDescription: 'Rychlá energie. Snadná příprava. Skvělá chuť.',
                description: 'Ideální volba pro rychlý předtréninkový sacharidový základ nebo jako lehce stravitelná snídaně. Rýžová kaše se snadno připravuje a nabízí perfektní start do tvého tréninku.',
                price: 449,
                oldPrice: 590,
                shoptetProductId: '61',
                shoptetPriceId: '82',
                image: '/images/products/rice-blueberry.jpg',
                stock: 50,
                category: 'supplement',
                featured: true,
                ingredients: '100% rýžová mouka, aroma, sladidlo (sukralóza).',
                nutrition: {
                    'Energetická hodnota': '1580 kJ / 372 kcal',
                    'Tuky': '1.5 g',
                    'Z toho nasycené': '0.3 g',
                    'Sacharidy': '80 g',
                    'Z toho cukry': '0.5 g',
                    'Bílkoviny': '7 g',
                    'Sůl': '0.01 g',
                }
            },
            {
                name: 'RÝŽOVÁ KAŠE - BORŮVKA',
                slug: 'ryzova-kase-boruvka',
                shortDescription: 'Rychlá energie. Snadná příprava. Skvělá chuť.',
                description: 'Ideální volba pro rychlý předtréninkový sacharidový základ nebo jako lehce stravitelná snídaně. Rýžová kaše se snadno připravuje a nabízí perfektní start do tvého tréninku.',
                price: 449,
                oldPrice: 590,
                shoptetProductId: '61',
                shoptetPriceId: '85',
                image: '/images/products/rice-blueberry.jpg',
                stock: 50,
                category: 'supplement',
                featured: true,
                ingredients: '100% rýžová mouka, aroma, sladidlo (sukralóza).',
                nutrition: {
                    'Energetická hodnota': '1580 kJ / 372 kcal',
                    'Tuky': '1.5 g',
                    'Z toho nasycené': '0.3 g',
                    'Sacharidy': '80 g',
                    'Z toho cukry': '0.5 g',
                    'Bílkoviny': '7 g',
                    'Sůl': '0.01 g',
                }
            },
            {
                name: 'GLUTAMINE',
                slug: 'glutamine',
                shortDescription: 'Čistá regenerace. Ochrana svalů. Podpora imunity.',
                description: 'L-Glutamin od Fitness 77 je základní aminokyselina pro každého, kdo to myslí s tréninkem vážně. Podporuje regeneraci po náročném výkonu a chrání svalovou hmoty před rozpadem.',
                price: 890,
                oldPrice: 1090,
                shoptetProductId: '64',
                shoptetPriceId: '88',
                image: '/images/products/slozenibcaa.webp',
                stock: 100,
                category: 'supplement',
                featured: true,
                ingredients: '100% L-Glutamin.',
                nutrition: {
                    'L-Glutamin': '100 g',
                }
            },
            {
                name: 'CREATINE PURE',
                slug: 'creatine-monohydrate',
                shortDescription: 'Čistá forma výkonu. Bez kompromisů.',
                description: 'Creatine Monohydrate od Fitness 77 představuje základ, na kterém stojí skutečný výkon. Bez zbytečných přísad, bez kompromisů – pouze ověřená látka v maximální kvalitě. Podporuje fyzický výkon při intenzivním tréninku, zvyšuje sílu a výbušnost. Věříme v jednoduchost, která funguje. Základ výkonu. Ověřená kvalita. Viditelné výsledky.',
                price: 590,
                oldPrice: 790,
                shoptetProductId: '55',
                shoptetPriceId: '58',
                image: '/images/products/kreatinek.png',
                stock: 120,
                category: 'supplement',
                featured: true,
                ingredients: '100% mikronizovaný kreatin monohydrát (čistota 99.9%). Žádná barviva, žádná sladidla.',
                nutrition: {
                    'Energetická hodnota': '0 kJ / 0 kcal',
                    'Tuky': '0 g',
                    'Sacharidy': '0 g',
                    'Bílkoviny': '0 g',
                    'Kreatin monohydrát': '100 g',
                }
            },
            {
                name: 'BCAA COMPLEX',
                slug: 'bcaa-amino-complex',
                shortDescription: 'Chraň svaly. Zrychli regeneraci. Udrž výkon.',
                description: 'BCAA 4:1:1 od Fitness 77 je postavené pro ty, kteří nechtějí ztrácet svaly, sílu ani tempo. Každá dávka pracuje ve tvůj prospěch – během tréninku i po něm. Zajišťuje ochranu svalové hmoty při každém tréninku a rychlejší regeneraci díky kombinaci BCAA a glutaminu. Udržujte si stabilní výkon bez zbytečného vyčerpání. Jde o to, kolik z toho tělo udrží.',
                price: 890,
                oldPrice: 1190,
                shoptetProductId: '58',
                shoptetPriceId: '67',
                variants: [
                    { name: 'Grep', variantCode: 'GRE', stock: 10, shoptetPriceId: '67' },
                    { name: 'Malina', variantCode: 'MAL', stock: 10, shoptetPriceId: '70' },
                    { name: 'Borůvka', variantCode: 'BOR', stock: 10, shoptetPriceId: '73' }
                ],
                image: '/images/products/bcccaaa.jpeg',
                stock: 90,
                category: 'supplement',
                featured: true,
                ingredients: 'L-Leucin, L-Isoleucin, L-Valin, L-Glutamin, regulátor kyselosti (kyselina citronová), aroma, sladidlo (sukralóza).',
                nutrition: {
                    'Energetická hodnota': '1450 kJ / 346 kcal',
                    'L-Leucin': '40 g',
                    'L-Isoleucin': '10 g',
                    'L-Valin': '10 g',
                    'L-Glutamin': '30 g',
                    'Bílkoviny': '90 g',
                }
            },
        ],
    });
    // Equipment
    await db_1.db.product.deleteMany({
        where: {
            category: 'equipment',
        },
    });
    await db_1.db.product.createMany({
        data: [
            {
                name: 'Heavy Duty Powerlifting Opasek',
                slug: 'heavy-duty-powerlifting-opasek',
                shortDescription: 'Nekompromisní opora pro ty nejtvrdší lifty.',
                description: 'Profesionální vzpěračský opasek navržený speciálně pro liftery, kteří zvedají fakt těžké váhy. Poskytuje maximální zpevnění středu těla při těžkých dřepech a mrtvých tazích. Vyroben z prémiové kůže se zesíleným prošíváním a masivní ocelovou sponou. Šířka 10cm, tloušťka 13mm – splňuje parametry pro závodní lifting.',
                price: 1890,
                oldPrice: 2290,
                shoptetProductId: '43',
                shoptetPriceId: '46',
                image: '/videos/pasek.webm',
                stock: 15,
                category: 'equipment',
                featured: true,
                ingredients: 'Materiál: 100% výběrová hovězí kůže, Spona: Nerezová ocel s rychlopřezkou, Švy: Vysokopevnostní nylon.',
            },
        ],
    });
    // Bazaar
    await db_1.db.bazaarListing.deleteMany();
    // Trainers
    await db_1.db.trainer.deleteMany();
    await db_1.db.trainer.createMany({
        data: [
            {
                name: 'Jaroslav Hamáček',
                slug: 'jaroslav-hamacek',
                role: 'Founder & Head Coach',
                bio: 'Hlavní tvář značky Fitness 77. Zaměřuje se na sílu, disciplínu, výkon a reálný progres bez kompromisu.',
                image: '/images/trainers/hamacek.webp',
                specialties: ['Síla', 'Performance', 'Disciplína'],
            },
            {
                name: 'Ondřej Soustružník',
                slug: 'ondrej-soustruznik',
                role: 'Fitness trenér 1. třídy',
                bio: 'Absolvent FTVS při UK a zkušený fitness trenér se specializací na individuální tréninkové plány a zlepšení kondice. Kombinuje odborné znalosti o anatomii a fyziologii s praktickými zkušenostmi, aby navrhl efektivní a bezpečný trénink. Klade důraz na správnou techniku, prevenci zranění a postupný pokrok, aby klient dosáhl svých cílů.',
                image: '/images/trainers/soustruznik.webp',
                specialties: ['Začátečníci', 'Pokročilí', 'Síla', 'Vytrvalost', 'Kondice'],
            },
            {
                name: 'Beata Cejnarová',
                slug: 'beata-cejnarova',
                role: 'Fitness trenérka / Nutriční koučka',
                bio: 'Profesionální trenérka se specializací na silový trénink, kondici a nutriční coaching. Její tréninky nejsou jen o dřině, ale o chytrém pohybu a dlouhodobých výsledcích. Pracuje se začátečníky i pokročilými sportovci.',
                image: '/images/trainers/cejnarova.webp',
                specialties: ['Silový trénink', 'Kondice', 'Zdravý pohyb', 'Výživa', 'Začátečníci'],
            },
            {
                name: 'Lenka Picková',
                slug: 'lenka-pickova',
                role: 'Fitness trenérka',
                bio: 'Ve své praxi se zaměřuji na individuální přístup ke každému klientovi. Základem spolupráce je vstupní diagnostika těla, analýza pohybových stereotypů a zhodnocení celkové mobility. Díky tomu dokážu nastavit tréninkový plán na míru, který respektuje vaše cíle i aktuální fyzickou kondici. Pomáhám klientům nejen s formováním postavy, ale především se zlepšením kondice, správného držení těla a celkové funkčnosti pohybu. Důraz kladu na správnou techniku cvičení, prevenci zranění a dlouhodobě udržitelné výsledky. Ať už jste na začátku, nebo chcete posunout své výkony dál, ráda vám pomůžu najít správný směr.',
                image: '/images/trainers/lenka.webp',
                specialties: ['Diagnostika', 'Mobilita', 'Formování postavy', 'Správná technika'],
            },
        ],
    });
    // Blog
    await db_1.db.blogPost.deleteMany();
    console.log('✅ Seed hotov');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await db_1.db.$disconnect();
});
