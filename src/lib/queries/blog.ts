import { db } from '@/lib/db';

export async function getAllBlogPosts() {
  return db.blogPost.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getBlogPostBySlug(slug: string) {
  return db.blogPost.findUnique({
    where: {
      slug,
    },
  });
}
