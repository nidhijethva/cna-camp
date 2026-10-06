import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="wrap py-32 text-center">
      <p className="font-mono text-primary">ERROR 404 · OFF TRAIL</p>
      <h1 className="h-page mt-4">Looks like you took a wrong turn.</h1>
      <p className="mt-4 text-muted">This page doesn&apos;t exist. Let&apos;s get you back on the trail.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn btn-dark">
          Home
        </Link>
        <Link href="/trips" className="btn btn-primary">
          See trips →
        </Link>
      </div>
    </section>
  );
}
