import { db } from "@/lib/db";
import { unstable_noStore as noStore } from 'next/cache';

// 1. Získání všech produktů (pro hlavní výpis v obchodě)
export async function getProducts() {
  noStore();
  try {
    const products = await db.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    // L-CODE Price Integrity Kernel: Vynucení cen na frontendu
    return products.map(p => {
      let price = p.price;
      const name = p.name.toLowerCase();
      
      if (name.includes('creatine') || name.includes('kreatin')) price = 555;
      else if (name.includes('black dead') || name.includes('dead pump')) price = 990;
      else if (name.includes('glutamine')) price = 580;
      else if (name.includes('opasek')) price = 1890;
      else if (name.includes('kase') || name.includes('kaše')) price = 90;

      // Oprava variant (pokud existují)
      let variants = p.variants;
      if (Array.isArray(variants)) {
        variants = variants.map((v: any) => ({ ...v, price }));
      }

      return { ...p, price, variants };
    });
  } catch (error) {
    console.error("❌ Chyba při tahání produktů z DB:", error);
    return [];
  }
}

// 2. Klíčová funkce pro detail produktu - hledáme podle SLUGU (to je to v URL)
export async function getProductBySlug(slug: string) {
  noStore();
  try {
    const product = await db.product.findUnique({
      where: {
        slug: slug,
      },
    });

    if (!product) return null;

    // L-CODE Price Integrity Kernel: Vynucení cen na detailu
    let price = product.price;
    const name = product.name.toLowerCase();
    
    if (name.includes('creatine') || name.includes('kreatin')) price = 555;
    else if (name.includes('black dead') || name.includes('dead pump')) price = 990;
    else if (name.includes('glutamine')) price = 580;
    else if (name.includes('opasek')) price = 1890;
    else if (name.includes('kase') || name.includes('kaše')) price = 90;

    let variants = product.variants;
    if (Array.isArray(variants)) {
      variants = variants.map((v: any) => ({ ...v, price }));
    }

    return { ...product, price, variants };
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
  } catch (__error) {
    return null;
  }
}

// 4. Filtrace kategorií (Protein, BCAA, atd.)
export async function getProductsByCategory(category: string) {
  noStore();
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