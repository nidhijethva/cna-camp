import Link from "next/link";
import { Photo } from "@/components/media/Photo";
import type { PostSummary } from "@/lib/content";
import { formatDate } from "@/lib/format";

export function PostCard({ post }: { post: PostSummary }) {
  const href = `/blog/${post.slug}`;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-light transition hover:-translate-y-1 hover:shadow-card">
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden bg-soft" tabIndex={-1} aria-hidden="true">
        <Photo
          img={post.cover}
          alt=""
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="transition duration-500 group-hover:scale-[1.04]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <time dateTime={post.publishedAt} className="font-mono text-[11.5px] uppercase tracking-[.08em] text-muted">
          {formatDate(post.publishedAt)}
        </time>
        <h3 className="h-card mt-2">
          <Link href={href} className="hover:text-primary">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-[15px] leading-relaxed text-muted">{post.excerpt}</p>
        <p className="mt-5 font-semibold group-hover:text-primary">Read story →</p>
      </div>
    </article>
  );
}
