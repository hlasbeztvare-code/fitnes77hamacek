const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const updates = [
    { name: 'Creatine', price: 555 },
    { name: 'Kreatin', price: 555 },
    { name: 'Black Dead', price: 990 },
    { name: 'Dead Pump', price: 990 },
    { name: 'Glutamine', price: 580 }
  ];

  for (const update of updates) {
    const result = await prisma.product.updateMany({
      where: {
        name: { contains: update.name, mode: 'insensitive' }
      },
      data: {
        price: update.price
      }
    });
    console.log(`Updated ${result.count} products for "${update.name}" to ${update.price} Kč.`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
