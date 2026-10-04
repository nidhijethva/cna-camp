/** Only the production deployment sets this; everything else is noindex + robots disallow. */
export const isIndexable = process.env.SITE_INDEXABLE === "true";

function resolveSiteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (url) return url.replace(/\/$/, "");
  if (isIndexable) throw new Error("NEXT_PUBLIC_SITE_URL must be set when SITE_INDEXABLE=true");
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export const absoluteUrl = (path = "/") => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
