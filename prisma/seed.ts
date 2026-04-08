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
        price: 0,
        compareAtPrice: 0,
        image: '/images/products/creatine.webp',
        stock: 120,
        category: 'supplement',
        featured: true,
      },
      {
        name: 'BCAA Amino Complex',
        slug: 'bcaa-amino-complex',
        shortDescription: 'Regenerace a ochrana svalové hmoty.',
        description: 'BCAA komplex pro regeneraci, ochranu svalů a lepší zvládnutí tréninku.',
        price: 0,
        compareAtPrice: 0,
        image: '/images/products/bcaa.webp',
        stock: 90,
        category: 'supplement',
        featured: true,
      },
      {
        name: 'Deadpump Pre-Workout',
        slug: 'deadpump-pre-workout',
        shortDescription: 'Výkon, focus a energie před tréninkem.',
        description: 'Nakopávač pro intenzivní výkon, focus a trénink bez kompromisů.',
        price: 0,
        compareAtPrice: 0,
        image: '/images/products/deadpump.webp',
        stock: 75,
        category: 'supplement',
        featured: true,
      },
      {
        name: 'Black Dead - Pre workout',
        slug: 'black-dead-pre-workout',
        shortDescription: 'Extrémní pre-workout pro maximální výkon a soustředění.',
        description: 'Black Dead je ultimátní předtréninkovka, která tě připraví i na ty nejtvrdší tréninky bez kompromisů.',
        price: 0,
        compareAtPrice: 0,
        image: '/images/products/blackdead.jpg',
        stock: 50,
        category: 'supplement',
        featured: true,
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
        image: '/videos/products/lifting-belt.mp4',
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
        image: '/images/trainers/hlavacek.webp',
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
