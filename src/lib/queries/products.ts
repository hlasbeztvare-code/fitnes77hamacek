import { db } from "@/lib/db";

// 1. Získání všech produktů (pro hlavní výpis v obchodě)
export async function getProducts() {
  try {
    const products = await db.product.findMany({
      orderBy: {
        createdAt: 'desc', // Nejnovější sypání nahoře
      },
    });
    return products;
  } catch (error) {
    console.error("❌ Chyba při tahání produktů z DB:", error);
    return []; // Fallback, ať web neumře
  }
}

// 2. Klíčová funkce pro detail produktu - hledáme podle SLUGU (to je to v URL)
export async function getProductBySlug(slug: string) {
  try {
    const product = await db.product.findUnique({
      where: {
        slug: slug, // Tady byla ta zrada, musí to sedět na sloupec slug v DB
      },
    });
    return product;
  } catch (error) {
    console.error(`❌ Produkt se slugem ${slug} nenalezen:`, error);
    return null;
  }
}

// 3. Pomocná funkce, kdybys potřeboval hledat podle ID (třeba v administraci)
export async function getProductById(id: string) {
  try {
    return await db.product.findUnique({
      where: { id },
    });
  } catch (error) {
    return null;
  }
}

// 4. Filtrace kategorií (Protein, BCAA, atd.)
export async function getProductsByCategory(category: string) {
  try {
    const products = await db.product.findMany({
      where: {
        category: category,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return products;
  } catch (error) {
    console.error("❌ Chyba při filtraci kategorie:", error);
    return [];
  }
}