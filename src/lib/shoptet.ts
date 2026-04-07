/**
 * SHOPTET API INTEGRATION
 * 
 * Tento soubor obsahuje funkce pro propojení s Shoptet e-shopem:
 * - Synchronizace produktů a skladů
 * - Vytváření objednávek
 * - Zpracování plateb
 * - Fakturace
 */

import { db } from "./db";

const SHOPTET_API_URL = process.env.SHOPTET_API_URL || 'https://api.myshoptet.com/api';
const SHOPTET_API_KEY = process.env.SHOPTET_API_KEY;
const SHOPTET_ESHOP_ID = process.env.SHOPTET_ESHOP_ID;

// Typy pro Shoptet API
type ShoptetProduct = {
  code: string;
  name: string;
  price: number;
  includingVat: boolean;
  vatRate: number;
  stock: number;
  availability: string;
  description?: string;
  shortDescription?: string;
  images?: string[];
};

type ShoptetOrderItem = {
  code: string;
  name: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
  includingVat: boolean;
};

type ShoptetOrder = {
  externalCode?: string;
  email: string;
  phone?: string;
  billingAddress: {
    name: string;
    street: string;
    city: string;
    zip: string;
    country: string;
  };
  shippingAddress?: {
    name: string;
    street: string;
    city: string;
    zip: string;
    country: string;
  };
  items: ShoptetOrderItem[];
  shippingMethod?: string;
  paymentMethod?: string;
  notes?: string;
};

/**
 * Základní fetch funkce pro Shoptet API
 */
async function shoptetFetch(endpoint: string, options: RequestInit = {}) {
  if (!SHOPTET_API_KEY || !SHOPTET_ESHOP_ID) {
    throw new Error('Shoptet API není nakonfigurováno. Zkontroluj SHOPTET_API_KEY a SHOPTET_ESHOP_ID v .env');
  }

  const url = `${SHOPTET_API_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${SHOPTET_API_KEY}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Shoptet API Error: ${response.status} - ${error}`);
  }

  return response.json();
}

/**
 * Vytvoří objednávku ve Shoptetu
 */
export async function createShoptetOrder(orderData: ShoptetOrder) {
  try {
    const result = await shoptetFetch('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
    
    return {
      success: true,
      orderId: result.data?.id,
      externalCode: result.data?.code,
      paymentUrl: result.data?.paymentUrl,
    };
  } catch (error) {
    console.error('Chyba při vytváření objednávky ve Shoptetu:', error);
    throw error;
  }
}

/**
 * Získá stav objednávky ze Shoptetu
 */
export async function getShoptetOrderStatus(orderCode: string) {
  try {
    const result = await shoptetFetch(`/orders/${orderCode}`);
    return {
      status: result.data?.status,
      paymentStatus: result.data?.paymentStatus,
      shippingStatus: result.data?.shippingStatus,
      trackingUrl: result.data?.trackingUrl,
    };
  } catch (error) {
    console.error('Chyba při získávání stavu objednávky:', error);
    throw error;
  }
}

/**
 * Synchronizuje skladové zásoby ze Shoptetu do naší databáze
 */
export async function syncInventoryFromShoptet() {
  try {
    // Získáme všechny produkty ze Shoptetu
    const result = await shoptetFetch('/products?limit=1000');
    const shoptetProducts = result.data?.products || [];

    // Aktualizujeme sklady v naší databázi
    for (const sp of shoptetProducts) {
      // Najdeme produkt podle kódu (slug) nebo vytvoříme nový
      await db.product.upsert({
        where: { slug: sp.code.toLowerCase().replace(/[^a-z0-9]/g, '-') },
        update: {
          stock: sp.stock || 0,
          price: sp.price || 0,
          name: sp.name,
          // Aktualizujeme další pole podle potřeby
        },
        create: {
          name: sp.name,
          slug: sp.code.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          description: sp.description || sp.name,
          shortDescription: sp.shortDescription || sp.name,
          price: sp.price || 0,
          stock: sp.stock || 0,
          category: 'supplement',
          image: sp.images?.[0] || '/images/placeholder.jpg',
        },
      });
    }

    return { success: true, syncedCount: shoptetProducts.length };
  } catch (error) {
    console.error('Chyba při synchronizaci skladů:', error);
    throw error;
  }
}

/**
 * Aktualizuje sklad v Shoptetu po objednávce
 */
export async function updateShoptetStock(productCode: string, newStock: number) {
  try {
    await shoptetFetch(`/products/${productCode}`, {
      method: 'PUT',
      body: JSON.stringify({
        stock: newStock,
        availability: newStock > 0 ? 'skladem' : 'vyprodano',
      }),
    });
    
    return { success: true };
  } catch (error) {
    console.error(`Chyba při aktualizaci skladu pro ${productCode}:`, error);
    throw error;
  }
}

/**
 * Získá dostupné platební metody ze Shoptetu
 */
export async function getShoptetPaymentMethods() {
  try {
    const result = await shoptetFetch('/payment-methods');
    return result.data?.paymentMethods || [];
  } catch (error) {
    console.error('Chyba při získávání platebních metod:', error);
    // Fallback - vrátíme základní metody
    return [
      { id: 'cash', name: 'Hotově při převzetí', price: 0 },
      { id: 'card', name: 'Kartou online', price: 0 },
      { id: 'bank', name: 'Bankovní převod', price: 0 },
    ];
  }
}

/**
 * Získá dostupné dopravní metody ze Shoptetu
 */
export async function getShoptetShippingMethods() {
  try {
    const result = await shoptetFetch('/shipping-methods');
    return result.data?.shippingMethods || [];
  } catch (error) {
    console.error('Chyba při získávání dopravních metod:', error);
    // Fallback
    return [
      { id: 'personal', name: 'Osobní odběr Mladá Boleslav', price: 0 },
      { id: 'zbox', name: 'Z-BOX', price: 79 },
      { id: 'courier', name: 'Kurýr', price: 129 },
    ];
  }
}

/**
 * Vytvoří URL pro platbu (přesměrování na Shoptet Pay)
 */
export function createShoptetPaymentUrl(orderCode: string) {
  return `${SHOPTET_API_URL}/orders/${orderCode}/pay`;
}
