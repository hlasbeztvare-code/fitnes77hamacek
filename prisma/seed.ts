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
        compareAtPrice: 790,
        image: '/images/products/creatine.webp',
        stock: 120,
        category: 'supplement',
        featured: true,
      },
      {
        name: 'BCAA 4:1:1 + GLUTAMINE – FITNESS 77',
        slug: 'bcaa-amino-complex',
        shortDescription: 'Chraň svaly. Zrychli regeneraci. Udrž výkon.',
        description: 'BCAA 4:1:1 od Fitness 77 je postavené pro ty, kteří nechtějí ztrácet svaly, sílu ani tempo. Každá dávka pracuje ve tvůj prospěch – během tréninku i po něm. Zajišťuje ochranu svalové hmoty při každém tréninku a rychlejší regeneraci díky kombinaci BCAA a glutaminu. Udržujte si stabilní výkon bez zbytečného vyčerpání. Jde o to, kolik z toho tělo udrží.',
        price: 890,
        compareAtPrice: 1190,
        image: '/images/products/bcaa.webp',
        stock: 90,
        category: 'supplement',
        featured: true,
      },
      {
        name: 'Deadpump Pre-Workout',
        slug: 'deadpump-pre-workout',
        shortDescription: 'Extrémní energie, focus a brutální prokrvení.',
        description: 'Deadpump je nekompromisní předtréninkovka navržená pro ty nejtvrdší tréninky. Kombinuje vysoké dávky citrulinu, beta-alaninu a stimulantů pro maximální výkon.',
        price: 1290,
        compareAtPrice: 1590,
        image: '/images/products/Deadpump.webp',
        stock: 75,
        category: 'supplement',
        featured: true,
      },
      {
        name: 'BLACK DEAD – PRE WORKOUT',
        slug: 'black-dead-pre-workout',
        shortDescription: 'Explozivní energie. Brutální pumpa. Maximální fokus.',
        description: 'BLACK DEAD je nejsilnější český pre-workout pro ty, co v gymu nechávají všechno. Žádný kompromis. Žádná slabost. Jen výkon, který tě přepne do režimu, kde se neptáš – jen jedeš. Přináší masivní pumpu, explozivní energii a absolutní fokus, který vás posune za hranici komfortu. Tohle není pro začátečníky. Tohle je pro ty, co chtějí víc než jen "dobrý trénink". Tvůj limit neexistuje. Jen jsi ho ještě nepřekročil.',
        price: 1490,
        compareAtPrice: 1790,
        image: '/images/products/Blackdead.webp',
        stock: 50,
        category: 'supplement',
        featured: true,
      },
      {
        name: 'Whey Protein Isolate',
        slug: 'whey-protein-isolate',
        shortDescription: 'Rychlá regenerace a budování svalové hmoty.',
        description: 'Prémiový syrovátkový protein s vysokým obsahem bílkovin pro maximální regeneraci a růst svalů.',
        price: 0,
        compareAtPrice: 0,
        image: '/images/products/creatine.webp',
        stock: 80,
        category: 'supplement',
        featured: false,
      },
      {
        name: 'EAA Essential Amino',
        slug: 'eaa-essential-amino',
        shortDescription: 'Kompletní aminokyselinový profil pro výkon a regeneraci.',
        description: 'Esenciální aminokyseliny pro podporu anabolismu, rychlejší regeneraci a zachování svalové hmoty.',
        price: 0,
        compareAtPrice: 0,
        image: '/images/products/bcaa.webp',
        stock: 60,
        category: 'supplement',
        featured: false,
      },
      {
        name: 'DEAD PUMP – STIM FREE',
        slug: 'deadpump-v2-pump-formula',
        shortDescription: 'Extrémní pumpa. Čistý výkon. Bez kofeinu.',
        description: 'DEAD PUMP je čistý výkon bez stimulantů. Pumpa, která tě drží od první do poslední série – bez pádu, bez rozhozené hlavy. Co pocítíš: Extrémní napumpování svalů (objem, tvrdost, kontrola), čistý fokus, stabilní výkon 60 minut+ a možnost trénovat kdykoliv, i večer. Realita: Tohle není slabý pumpič. Tohle je kontrolovaný tlak na výkon. Finále: Bez stimulantů. Bez limitů. Jen čistá práce.',
        price: 1190,
        compareAtPrice: 1390,
        image: '/images/products/Deadpump.webp',
        stock: 45,
        category: 'supplement',
        featured: false,
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
        description: 'Profesionální vzpěračský opasek navržený speciálně pro liftery, kteří zvedají fakt těžké váhy. Poskytuje maximální zpevnění středu těla při těžkých dřepech a mrtvých tazích.',
        price: 0,
        compareAtPrice: 0,
        image: '/images/products/pasek.mp4',
        stock: 15,
        category: 'equipment',
        featured: true,
      },
    ],
  });

  // Bazaar
  await prisma.bazaarListing.deleteMany();

  await prisma.bazaarListing.createMany({
    data: [
      {
        title: 'Použitý Concept2 RowErg',
        slug: 'pouzity-concept2-rowerg',
        description: 'Použitý veslařský trenažér v dobrém stavu.',
        price: 0,
        originalPrice: 0,
        condition: 'A',
        location: 'Praha',
        image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Leg Press Machine',
        slug: 'leg-press-machine',
        description: 'Použitý leg press se stabilní konstrukcí.',
        price: 0,
        originalPrice: 0,
        condition: 'B',
        location: 'Praha 7',
        image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=80',
      },
    ],
  });

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
        bio: 'Profesionální trenérka se specializací na silový trénink, kondici a nutriční coaching. Její tréninky nejsou jen o drině, ale o chytrém pohybu a dlouhodobých výsledcích. Pracuje se začátečníky i pokročilými sportovci.',
        image: '/images/trainers/cejnarova.jpg',
        specialties: ['Silový trénink', 'Kondice', 'Zdravý pohyb', 'Výživa', 'Začátečníci'],
      },
    ],
  });

  // Blog
  await prisma.blogPost.deleteMany();

  await prisma.blogPost.createMany({
    data: [
      {
        title: 'Jak vybrat správný kreatin',
        slug: 'jak-vybrat-spravny-kreatin',
        excerpt: 'Kreatin není jen jeden. Podívej se, jak vybrat správnou variantu.',
        category: 'Suplementy',
        image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Kdy dává smysl pre-workout',
        slug: 'kdy-dava-smysl-pre-workout',
        excerpt: 'Pre-workout může pomoct, pokud víš, kdy a proč ho použít.',
        category: 'Performance',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
      },
    ],
  });

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
