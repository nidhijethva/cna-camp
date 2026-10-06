import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/blog/PostCard";
import { PageHead } from "@/components/layout/PageHead";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Trip stories, packing tips and nature notes from the CNA Camp team in Rajkot.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHead eyebrow="Blog" title="Stories from the trail" text="Trip stories, packing tips and nature notes from the CNA team." />
      <section className="wrap mt-12">
        {posts.length ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug} className="reveal">
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-card border border-line p-6 text-muted">
            The first stories are on their way. Meanwhile, <Link href="/trips" className="font-semibold text-primary underline">browse our trips</Link>.
          </p>
        )}
      </section>
    </>
  );
}
