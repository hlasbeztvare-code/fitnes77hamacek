import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL
    }
  }
});

async function main() {
  console.log('🌱 Start seeding products (Direct Connection)...');

  // 1. Delete existing supplements
  try {
    await prisma.product.deleteMany({
      where: { category: 'supplement' }
    });
  } catch (e) {
    console.error('Error deleting products:', e);
  }

  // 2. Create products with correct prices and videos
  const products = [
    {
      name: 'CREATINE MONOHYDRATE / ČISTÝ',
      slug: 'creatine-monohydrate',
      shortDescription: 'Čistá forma výkonu. Bez kompromisů.',
      description: 'Creatine Monohydrate od Fitness 77 představuje základ, na kterém stojí skutečný výkon. 100% čistota pro tvou sílu a regeneraci.',
      price: 555,
      oldPrice: 590,
      weight: '500G',
      image: '/images/products/kreatinek.png',
      stock: 120,
      category: 'supplement',
      featured: true,
      ingredients: '100% Mikronizovaný Creatine Monohydrate.',
      nutrition: { "Creatine Monohydrate": "100 g", "z toho čistý Kreatin": "88 g" }
    },
    {
      name: 'BCAA + GLUTAMINE / INSTANT / OCHUCENÉ',
      slug: 'bcaa-amino-complex',
      shortDescription: 'Chraň svaly. Zrychli regeneraci. Udrž výkon.',
      description: 'BCAA komplex pro regeneraci a ochranu svalů v nekompromisním poměru 4:1:1 doplněný o čistý L-Glutamin.',
      price: 540,
      oldPrice: 890,
      weight: '500G',
      image: '/images/products/bcccaaa.jpeg',
      stock: 85,
      category: 'supplement',
      featured: true,
      ingredients: 'L-Glutamin, L-Leucin, L-Isoleucin, L-Valin, Kyselina citronová, Sukralosa, Acesulfam K, Aroma, Beta-karoten, Vitamin B6.',
      nutrition: { "Energie": "1153 kJ / 276 kcal", "Bílkoviny": "69 g" },
      variants: [
        { name: 'Grep', variantCode: 'GRE', stock: 10, price: 540 },
        { name: 'Malina', variantCode: 'MAL', stock: 10, price: 540 },
        { name: 'Borůvka', variantCode: 'BOR', stock: 10, price: 540 }
      ]
    },
    {
      name: 'BLACK DEAD',
      slug: 'black-dead-pre-workout',
      shortDescription: 'NEJSILNĚJŠÍ STIMULAČNÍ PRE-WORKOUT NA TRHU.',
      description: 'BLACK DEAD není jen další nakopávač. Je to legální zbraň pro tvůj trénink.',
      price: 899,
      oldPrice: 1290,
      weight: '600G',
      image: '/images/products/Blackdead.webp',
      hoverVideo: '/videos/blackdead.mp4',
      stock: 42,
      category: 'supplement',
      featured: true,
      ingredients: 'L-Citrulin (PURE), Beta-Alanin, Kofein bezvodý.',
      nutrition: { "Kofein bezvodý": "225 mg" }
    },
    {
      name: 'DEAD PUMP',
      slug: 'deadpump-v2-pump-formula',
      shortDescription: 'NEJSILNĚJŠÍ STIM-FREE PUMPA NA TRHU.',
      description: 'DEAD PUMP je ultimátní pre-workout bez stimulantů.',
      price: 999,
      oldPrice: 1350,
      weight: '600G',
      image: '/images/products/deadpump.webp',
      hoverVideo: '/videos/deadpump.mp4',
      stock: 55,
      category: 'supplement',
      featured: true,
      ingredients: 'L-Citrulin (PURE), Betain Anhydrous.',
      nutrition: { "L-Citrulin (PURE)": "13 220 mg" }
    },
    {
      name: 'RÝŽOVÁ KAŠE',
      slug: 'ryzova-kase-cokolada',
      shortDescription: 'Čistá energie z rýže. Lehce stravitelná.',
      description: 'Cream of Rice od Fitness 77.',
      price: 449,
      oldPrice: 590,
      weight: '1000G',
      image: '/images/products/rice-chocolate.jpg',
      stock: 50,
      category: 'supplement',
      featured: true
    },
    {
      name: 'RÝŽOVÁ KAŠE',
      slug: 'ryzova-kase-slany-karamel',
      shortDescription: 'Čistá energie z rýže. Lehce stravitelná.',
      description: 'Cream of Rice od Fitness 77.',
      price: 449,
      oldPrice: 590,
      weight: '1000G',
      image: '/images/products/rice-caramel.jpg',
      stock: 50,
      category: 'supplement',
      featured: true
    },
    {
      name: 'RÝŽOVÁ KAŠE',
      slug: 'ryzova-kase-boruvka',
      shortDescription: 'Čistá energie z rýže. Lehce stravitelná.',
      description: 'Cream of Rice od Fitness 77.',
      price: 449,
      oldPrice: 590,
      weight: '1000G',
      image: '/images/products/rice-blueberry.jpg',
      stock: 50,
      category: 'supplement',
      featured: true
    },
    {
      name: 'RÝŽOVÁ KAŠE',
      slug: 'ryzova-kase-piskotovy-dort',
      shortDescription: 'Čistá energie z rýže. Lehce stravitelná.',
      description: 'Cream of Rice od Fitness 77.',
      price: 449,
      oldPrice: 590,
      weight: '1000G',
      image: '/images/products/rice-cake.jpg',
      stock: 50,
      category: 'supplement',
      featured: true
    },
    {
      name: 'GLUTAMINE',
      slug: 'glutamine',
      shortDescription: 'Čistá regenerace. Ochrana svalů.',
      description: 'L-Glutamin pro tvou regeneraci.',
      price: 555,
      oldPrice: 690,
      weight: '500G',
      image: '/images/products/slozenibcaa.webp',
      stock: 100,
      category: 'supplement',
      featured: true
    }
  ];

  for (const product of products) {
    try {
      await prisma.product.create({
        data: product
      });
      console.log(`✅ Created product: ${product.name}`);
    } catch (e) {
      console.error(`❌ Failed to create ${product.name}:`, e.message);
    }
  }

  console.log('✅ Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
