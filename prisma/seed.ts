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
        name: 'Creatine Monohydrate',
        slug: 'creatine-monohydrate',
        shortDescription: 'Čistý kreatin pro sílu, výkon a progres.',
        description: 'Prémiový kreatin pro sílu, výkon a explozivitu v tréninku.',
        price: 590,
        compareAtPrice: 790,
        image: '/images/products/creatine.webp',
        stock: 120,
        category: 'supplement',
        featured: true,
      },
      {
        name: 'Omega-3 Amino Complex',
        slug: 'omega-3-amino-complex',
        shortDescription: 'Regenerace a podpora srdce a mozgu.',
        description: 'Prémiové Omega-3 mastné kyseliny pro zdraví srdce, mozku a regeneraci po výkonu.',
        price: 490,
        compareAtPrice: 650,
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
        name: 'Black Dead - Pre workout',
        slug: 'black-dead-pre-workout',
        shortDescription: 'Limitovaná edice pro ty, co neznají hranice.',
        description: 'Black Dead představuje vrchol naší nabídky. Maximální koncentrace účinných látek v exkluzivním balení.',
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
        name: 'Deadpump V2 - Pump Formula',
        slug: 'deadpump-v2-pump-formula',
        shortDescription: 'Maximální pumpa bez stimulantů (Stim-free).',
        description: 'Verze V2 se zaměřuje na čistou vaskularitu a napumpování svalů bez obsahu kofeinu. Ideální pro večerní tréninky.',
        price: 1190,
        compareAtPrice: 1390,
        image: '/images/products/deadpump1.webp',
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
