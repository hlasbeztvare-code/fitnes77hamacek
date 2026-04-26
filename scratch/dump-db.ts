import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

const adapter = new PrismaNeon({
  connectionString: process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL || '',
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const products = await prisma.product.findMany({});
  console.log(JSON.stringify(products, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
