
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      shoptetId: true,
      slug: true,
    }
  });

  console.log("=== PRODUCTS IN DB ===");
  products.forEach(p => {
    console.log(`${p.shoptetId} | ${p.slug} | ${p.name}`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
