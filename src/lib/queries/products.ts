import { db } from "@/lib/db";

export async function getSupplements() {
  try {
    return await db.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Prisma Error:", error);
    return []; 
  }
}

// TADY JE TA CHYBĚJÍCÍ FUNKCE PRO HOME PAGE! (smrk)
export async function getAllSupplements() {
  return getSupplements();
}

export async function getSupplementBySlug(slug: string) {
  if (!slug || slug === "undefined") return null;
  try {
    return await db.product.findUnique({
      where: { slug },
    });
  } catch (error) {
    return null;
  }
}
