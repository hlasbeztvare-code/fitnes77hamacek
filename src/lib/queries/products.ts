import { db } from '@/lib/db';

export async function getAllSupplements() {
  return db.product.findMany({
    where: {
      category: 'supplement',
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getSupplementBySlug(slug: string) {
  return db.product.findUnique({
    where: {
      slug,
    },
  });
}
