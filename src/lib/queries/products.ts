import { db } from "@/lib/db";
import { unstable_noStore as noStore } from 'next/cache';

// Helper: najde mock produkt podle přesného slugu, nebo pro kaše podle prefixu
function findMockOverride(mockProducts: any[], slug: string) {
  const exact = mockProducts.find(m => m.slug === slug);
  if (exact) return exact;
  // Kaše — jakýkoliv slug začínající ryzova-kase → použij první kaše z mocku pro cenu
  if (slug.startsWith('ryzova-kase')) {
    return mockProducts.find(m => m.slug.startsWith('ryzova-kase')) || null;
  }
  return null;
}

// 1. Získání všech produktů (pro hlavní výpis v obchodě)
export async function getProducts() {
  noStore();
  try {
    const dbProducts = await db.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const { products: mockProducts } = require('@/lib/mock/products');

    // SOVEREIGN PRICE OVERRIDE: Prioritizujeme ceny z mocku
    return dbProducts.map(p => {
      // Pro kaše hledáme PŘESNÝ match podle slugu (ne prefix) aby každá příchuť dostala svůj obrázek
      const exactMock = mockProducts.find((m: any) => m.slug === p.slug);
      const manual = exactMock || findMockOverride(mockProducts, p.slug);
      if (manual) {
        return {
          ...p,
          price: manual.price || p.price,
          oldPrice: manual.oldPrice || p.oldPrice,
          name: manual.name || p.name,
          weight: manual.weight || p.weight,
          image: manual.image || p.image,        // ← přidáno: správný obrázek příchutě
          hoverVideo: manual.hoverVideo || p.hoverVideo,
          description: manual.description || p.description,
          ingredients: manual.ingredients || p.ingredients,
          nutrition: manual.nutrition || p.nutrition
        };
      }
      return p;
    });
  } catch (error) {
    console.error("❌ Chyba při tahání produktů z DB, vracím MOCK data:", error);
    const { products } = require('@/lib/mock/products');
    return products;
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

    if (!product) {
      const { products: mockProducts } = require('@/lib/mock/products');
      return mockProducts.find(p => p.slug === slug) || null;
    }

    const { products: mockProducts } = require('@/lib/mock/products');
    const manual = mockProducts.find(m => m.slug === product.slug);

    if (manual) {
      return {
        ...product,
        price: manual.price || product.price,
        oldPrice: manual.oldPrice || product.oldPrice,
        name: manual.name || product.name,
        weight: manual.weight || product.weight,
        hoverVideo: manual.hoverVideo || product.hoverVideo,
        description: manual.description || product.description,
        ingredients: manual.ingredients || product.ingredients,
        nutrition: manual.nutrition || product.nutrition
      };
    }

    return product;
  } catch (error) {
    console.error(`❌ Produkt se slugem ${slug} nenalezen v DB, hledám v MOCKu:`, error);
    const { products } = require('@/lib/mock/products');
    return products.find(p => p.slug === slug) || null;
  }
}

// 3. Hromadné získání produktů podle SLUGů (pro trenérské stacky atd.)
export async function getProductsBySlugs(slugs: string[]) {
  noStore();
  try {
    const dbProducts = await db.product.findMany({
      where: {
        slug: { in: slugs },
      },
    });

    const { products: mockProducts } = require('@/lib/mock/products');

    return dbProducts.map(p => {
      const manual = findMockOverride(mockProducts, p.slug);
      if (manual) {
        return {
          ...p,
          price: manual.price || p.price,
          oldPrice: manual.oldPrice || p.oldPrice,
          name: manual.name || p.name,
          weight: manual.weight || p.weight,
          hoverVideo: manual.hoverVideo || p.hoverVideo,
          description: manual.description || p.description,
          ingredients: manual.ingredients || p.ingredients,
          nutrition: manual.nutrition || p.nutrition
        };
      }
      return p;
    });
  } catch (error) {
    console.error("❌ Chyba při hromadném získání produktů:", error);
    return [];
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
    const dbProducts = await db.product.findMany({
      where: {
        category: category,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const { products: mockProducts } = require('@/lib/mock/products');

    return dbProducts.map(p => {
      const manual = findMockOverride(mockProducts, p.slug);
      if (manual) {
        return {
          ...p,
          price: manual.price || p.price,
          oldPrice: manual.oldPrice || p.oldPrice,
          name: manual.name || p.name,
          weight: manual.weight || p.weight,
          hoverVideo: manual.hoverVideo || p.hoverVideo,
          description: manual.description || p.description,
          ingredients: manual.ingredients || p.ingredients,
          nutrition: manual.nutrition || p.nutrition
        };
      }
      return p;
    });
  } catch (error) {
    console.error("❌ Chyba při filtraci kategorie:", error);
    return [];
  }
}

// 5. Podobné produkty (Related Products) - Fixní řazení a override
export async function getRelatedProducts(currentSlug: string, limit: number = 3) {
  noStore();
  try {
    const allProducts = await getProducts();
    const currentProduct = allProducts.find(p => p.slug === currentSlug);
    
    // Filtrujeme aktuální produkt a seřadíme zbytek (priorita featured)
    return allProducts
      .filter(p => p.slug !== currentSlug)
      .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
      .slice(0, limit);
  } catch (error) {
    console.error("❌ Chyba při získávání souvisejících produktů:", error);
    return [];
  }
}