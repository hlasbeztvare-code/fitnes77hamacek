import { db } from "@/lib/db";

export async function getSupplements() {
  return db.product.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function getSupplementBySlug(slug: string) {
  if (!slug || slug === "undefined") return null;
  return db.product.findUnique({
    where: { slug },
  });
}
