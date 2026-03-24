type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
};

type Props = {
  post: BlogPost;
};

export default function BlogCard({ post }: Props) {
  return (
    <article className="overflow-hidden rounded-xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:border-[#E10600] hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
      <div
        className="aspect-video w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${post.image})` }}
      />
      <div className="p-6">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#E10600]">
          {post.category}
        </div>
        <h3 className="mt-3 text-2xl font-bold uppercase">{post.title}</h3>
        <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {post.excerpt}
        </p>
      </div>
    </article>
  );
}
