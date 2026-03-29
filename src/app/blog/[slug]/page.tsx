import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/lib/queries/blog';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) return notFound();

  return (
    <section className="py-16">
      <article className="mx-auto w-[min(900px,calc(100%-32px))]">
        <div
          className="aspect-video w-full rounded-2xl bg-cover bg-center"
          style={{ backgroundImage: `url(${post.image})` }}
        />

        <div className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-[#E10600]">
          {post.category}
        </div>

        <h1 className="mt-4 text-5xl font-bold uppercase">{post.title}</h1>

        <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {post.excerpt}
        </p>
      </article>
    </section>
  );
}
