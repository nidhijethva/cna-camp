const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");

/** Adds a "Preview" button in the admin that opens the published page on the site. */
export const sitePreview =
  <T extends Record<string, unknown>>(pathFor: (doc: T) => string | null) =>
  (doc: Record<string, unknown>) => {
    const path = pathFor(doc as T);
    return path ? `${siteUrl}${path}` : null;
  };
