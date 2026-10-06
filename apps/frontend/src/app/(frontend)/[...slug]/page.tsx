import { notFound } from "next/navigation";

/** Sends unknown URLs to the site's own 404 page (needed because the app has two root layouts). */
export default function UnknownPage() {
  notFound();
}
