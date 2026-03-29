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
        price: 1499,
        compareAtPrice: 1999,
        image: '/images/products/creatine.png',
        stock: 120,
        category: 'supplement',
        featured: true,
      },
      {
        name: 'BCAA Amino Complex',
        slug: 'bcaa-amino-complex',
        shortDescription: 'Regenerace a ochrana svalové hmoty.',
        description: 'BCAA komplex pro regeneraci, ochranu svalů a lepší zvládnutí tréninku.',
        price: 1499,
        compareAtPrice: 1999,
        image: '/images/products/bcaa.png',
        stock: 90,
        category: 'supplement',
        featured: true,
      },
      {
        name: 'Deadpump Pre-Workout',
        slug: 'deadpump-pre-workout',
        shortDescription: 'Výkon, focus a energie před tréninkem.',
        description: 'Nakopávač pro intenzivní výkon, focus a trénink bez kompromisů.',
        price: 1499,
        compareAtPrice: 1999,
        image: '/images/products/deadpump.png',
        stock: 75,
        category: 'supplement',
        featured: true,
      },
      {
        name: 'Whey Protein Jahoda',
        slug: 'whey-protein-jahoda',
        shortDescription: 'Syrovátkový protein s jahodovou příchutí.',
        description: 'Protein pro růst svalů a regeneraci v jahodové variantě.',
        price: 1499,
        compareAtPrice: 1999,
        image: '/images/products/wheyjahoda.png',
        stock: 60,
        category: 'supplement',
        featured: true,
      },
      {
        name: 'Whey Protein Vanilka',
        slug: 'whey-protein-vanilka',
        shortDescription: 'Syrovátkový protein s vanilkovou příchutí.',
        description: 'Protein pro každodenní regeneraci a kvalitní příjem bílkovin.',
        price: 1499,
        compareAtPrice: 1999,
        image: '/images/products/wheyvanilka.png',
        stock: 65,
        category: 'supplement',
        featured: true,
      },
      {
        name: 'Whey Protein Borůvka',
        slug: 'whey-protein-boruvka',
        shortDescription: 'Syrovátkový protein s borůvkovou příchutí.',
        description: 'Proteinová varianta zaměřená na regeneraci a chuť bez kompromisu.',
        price: 1499,
        compareAtPrice: 1999,
        image: '/images/products/wheyboruvka.png',
        stock: 55,
        category: 'supplement',
        featured: true,
      },
      {
        name: 'Proteinová Kaše',
        slug: 'proteinova-kase',
        shortDescription: 'Funkční jídlo pro energii a sytost.',
        description: 'Proteinová kaše jako pohodlné jídlo pro výkon, regeneraci a kontrolu příjmu.',
        price: 1499,
        compareAtPrice: 1999,
        image: '/images/products/kase.png',
        stock: 80,
        category: 'supplement',
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
        price: 18990,
        originalPrice: 29990,
        condition: 'A',
        location: 'Praha',
        image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Leg Press Machine',
        slug: 'leg-press-machine',
        description: 'Použitý leg press se stabilní konstrukcí.',
        price: 15990,
        originalPrice: 24990,
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
        image: '/images/trainers/hlavacek.jpg',
        specialties: ['Síla', 'Performance', 'Disciplína'],
      },
      {
        name: 'Ondřej Soustružník',
        slug: 'ondrej-soustruznik',
        role: 'Fitness trenér 1. třídy',
        bio: 'Absolvent FTVS při UK a zkušený fitness trenér se specializací na individuální tréninkové plány a zlepšení kondice. Kombinuje odborné znalosti o anatomii a fyziologii s praktickými zkušenostmi, aby navrhl efektivní a bezpečný trénink. Klade důraz na správnou techniku, prevenci zranění a postupný pokrok, aby klient dosáhl svých cílů.',
        image: '/images/trainers/soustruznik.jpg',
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
