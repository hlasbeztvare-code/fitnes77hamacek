import { db } from '../src/lib/db';

async function main() {
  const products = await db.product.findMany({
    where: {
      OR: [
        { name: { contains: 'Creatine' } },
        { name: { contains: 'Dead Pump' } },
        { name: { contains: 'Black Dead' } }
      ]
    },
    select: { name: true, description: true, shortDescription: true }
  });
  console.log(JSON.stringify(products, null, 2));
}

main();
