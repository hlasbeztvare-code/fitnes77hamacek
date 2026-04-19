import { db } from '@/lib/db';

export async function getAllBazaarItems() {
  return db.bazaarListing.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getBazaarItemBySlug(slug: string) {
  return db.bazaarListing.findUnique({
    where: {
      slug,
    },
  });
}
