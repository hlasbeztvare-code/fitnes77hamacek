import { db } from '@/lib/db';

export async function getAllEquipment() {
  return db.product.findMany({
    where: {
      category: 'equipment',
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getEquipmentBySlug(slug: string) {
  return db.product.findFirst({
    where: {
      slug,
      category: 'equipment',
    },
  });
}
