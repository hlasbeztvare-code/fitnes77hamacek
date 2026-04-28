// @ts-nocheck
// @ts-nocheck
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Supplements
  await prisma.product.deleteMany({
    where: {
      category: 'supplement',
    },
  });

  await prisma.product.createMany({
    data: [
      {
        name: 'CREATINE MONOHYDRATE – FITNESS 77',
        slug: 'creatine-monohydrate',
        shortDescription: 'Čistá forma výkonu. Bez kompromisů.',
        description: 'Creatine Monohydrate od Fitness 77 představuje základ, na kterém stojí skutečný výkon. Bez zbytečných přísad, bez kompromisů – pouze ověřená látka v maximální kvalitě. Podporuje fyzický výkon při intenzivním tréninku, zvyšuje sílu a výbušnost. Věříme v jednoduchost, která funguje. Základ výkonu. Ověřená kvalita. Viditelné výsledky.',
        price: 590,
        oldPrice: 790,
        shoptetProductId: '55',
        shoptetPriceId: '58',
        image: '/images/products/creatine-pure.png',
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
        name: 'BCAA 4:1:1 + GLUTAMINE – FITNESS 77',
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
        image: '/images/products/bcaa.png',
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
      {
        name: 'RÝŽOVÁ KAŠE – FITNESS 77',
        slug: 'ryzova-kase',
        shortDescription: 'Rychlá energie. Snadná příprava. Skvělá chuť.',
        description: 'Ideální volba pro rychlý předtréninkový sacharidový základ nebo jako lehce stravitelná snídaně. Rýžová kaše se snadno připravuje a nabízí perfektní start do tvého tréninku.',
        price: 90,
        oldPrice: null,
        shoptetProductId: '61',
        shoptetPriceId: '79', 
        variants: [
          { name: 'Čokoláda', variantCode: 'COK', stock: 50, shoptetPriceId: '79' },
          { name: 'Slaný karamel', variantCode: 'SLA', stock: 50, shoptetPriceId: '82' },
          { name: 'Piškotový dort', variantCode: 'PIS', stock: 50, shoptetPriceId: '85' }
        ],
        image: '/images/products/kase1.png',
        stock: 150,
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
        name: 'BLACK DEAD – PRE WORKOUT',
        slug: 'black-dead-pre-workout',
        shortDescription: 'Explozivní energie. Brutální pumpa. Maximální fokus.',
        description: 'BLACK DEAD je nejsilnější český pre-workout pro ty, co v gymu nechávají všechno. Žádný kompromis. Žádná slabost. Jen výkon, který tě přepne do režimu, kde se neptáš – jen jedeš. Přináší masivní pumpu, explozivní energii a absolutní fokus, který vás posune za hranici komfortu. Tohle není pro začátečníky. Tohle je pro ty, co chtějí víc než jen "dobrý trénink". Tvůj limit neexistuje. Jen jsi ho ještě nepřekročil.',
        price: 1490,
        oldPrice: 1790,
        shoptetProductId: '49',
        shoptetPriceId: '52',
        image: '/images/products/Blackdead.webp',
        stock: 50,
        category: 'supplement',
        featured: true,
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
        name: 'DEAD PUMP – STIM FREE',
        slug: 'deadpump-v2-pump-formula',
        shortDescription: 'Extrémní pumpa. Čistý výkon. Bez kofeinu.',
        description: 'DEAD PUMP je čistý výkon bez stimulantů. Pumpa, která tě drží od první do poslední série – bez pádu, bez rozhozené hlavy. Co pocítíš: Extrémní napumpování svalů (objem, tvrdost, kontrola), čistý fokus, stabilní výkon 60 minut+ a možnost trénovat kdykoliv, i večer. Realita: Tohle není slabý pumpič. Tohle je kontrolovaný tlak na výkon. Finále: Bez stimulantů. Bez limitů. Jen čistá práce.',
        price: 1190,
        oldPrice: 1390,
        shoptetProductId: '46',
        shoptetPriceId: '49',
        image: '/images/products/Deadpump.webp',
        stock: 45,
        category: 'supplement',
        featured: true,
        ingredients: 'L-Citrulin, Glycerol monostearát, AAKG, Extrakt z červené řepy, Vitamín C, Sladidlo (Steviol-glykosidy).',
        nutrition: {
          'L-Citrulin': '8000 mg',
          'Glycerol': '3000 mg',
          'AAKG': '4000 mg',
          'Vitamín C': '250 mg',
          'Červená řepa': '500 mg',
        }
      },
    ],
  });

  // Equipment
  await prisma.product.deleteMany({
    where: {
      category: 'equipment',
    },
  });

  await prisma.product.createMany({
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
  await prisma.bazaarListing.deleteMany();

  // Trainers
  await prisma.trainer.deleteMany();

  await prisma.trainer.createMany({
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
  await prisma.blogPost.deleteMany();

  console.log('✅ Seed hotov');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
