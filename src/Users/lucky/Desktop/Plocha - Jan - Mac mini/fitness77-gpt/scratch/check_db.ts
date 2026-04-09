import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const trainer = await prisma.trainer.findUnique({
    where: { slug: 'jaroslav-hamacek' },
  });
  console.log('Hamáček in DB:', trainer);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
