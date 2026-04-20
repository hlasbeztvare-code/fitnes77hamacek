import { MetadataRoute } from 'next'
import { db } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://fitness77.cz'

  // Fetch products for dynamic sitemap
  let productEntries: MetadataRoute.Sitemap = []
  try {
    const products = await db.product.findMany({
      select: { slug: true, updatedAt: true, category: true }
    })
    
    productEntries = products.map((product) => {
      const isEquipment = product.category.toLowerCase() === 'equipment' || 
                         product.category.toLowerCase().includes('vybavení') ||
                         product.slug.toLowerCase().includes('opasek');
      
      const route = isEquipment ? 'equipment' : 'supplements';
      
      return {
        url: `${baseUrl}/${route}/${product.slug}`,
        lastModified: product.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.7,
      };
    })
  } catch (error) {
    console.error('Failed to fetch products for sitemap:', error)
  }

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/gym`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/supplements`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/equipment`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bazaar`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/social`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  return [...staticPages, ...productEntries]
}
