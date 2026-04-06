import { db } from "@/lib/db";

export async function getProducts() {
  // Žádný mockování, taháme to naostro! *smrk*
  return await db.product.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function getProductBySlug(slug: string) {
  return await db.product.findUnique({
    where: { slug }
  });
}

