import { db } from '@/lib/db';

export async function getAllTrainers() {
  return db.trainer.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getTrainerBySlug(slug: string) {
  return db.trainer.findUnique({
    where: {
      slug,
    },
  });
}
