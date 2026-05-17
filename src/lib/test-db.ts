
import { PrismaClient } from '@prisma/client';

async function test() {
  const prisma = new PrismaClient();
  try {
    const products = await prisma.product.count();
    console.log(`Connected! Product count: ${products}`);
  } catch (e) {
    console.error('Connection failed:', e);
  } finally {
    await prisma.$disconnect();
  }
}

test();
