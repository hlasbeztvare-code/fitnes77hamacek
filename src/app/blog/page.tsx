import BlogCard from '@/components/blog/BlogCard';
import { getAllBlogPosts } from '@/lib/queries/blog';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <section className="py-16">
      <div className="mx-auto w-[min(1200px,calc(100%-32px))]">
        <div className="mb-10">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#E10600]">
            Blog
          </span>
          <h1 className="mt-3 text-5xl font-bold uppercase">
            Obsah, který prodává důvěru
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
            Články, které pomáhají s výběrem, budují expertízu a vedou návštěvníka blíž k nákupu.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
