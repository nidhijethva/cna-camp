import type { CollectionConfig } from "payload";
import { publishedOrSignedIn, signedIn } from "../access";
import { seoField, slugField } from "../fields";
import { revalidateCollection } from "../hooks/revalidate";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Blog post", plural: "Blog posts" },
  admin: { useAsTitle: "title", defaultColumns: ["title", "publishedAt", "_status"] },
  access: { read: publishedOrSignedIn, create: signedIn, update: signedIn, delete: signedIn },
  versions: { drafts: { autosave: { interval: 2000 } }, maxPerDoc: 30 },
  defaultSort: "-publishedAt",
  hooks: revalidateCollection<{ slug?: string }>((doc) => ["/blog", `/blog/${doc.slug}`]),
  fields: [
    { name: "title", type: "text", required: true },
    { name: "excerpt", type: "textarea", required: true, maxLength: 240 },
    { name: "coverImage", type: "upload", relationTo: "media", required: true },
    { name: "content", type: "richText", required: true },
    { name: "relatedTrips", type: "relationship", relationTo: "trips", hasMany: true },
    seoField,
    slugField("title"),
    {
      name: "publishedAt",
      type: "date",
      index: true,
      admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" } },
      hooks: {
        beforeChange: [({ value, siblingData }) => value ?? (siblingData._status === "published" ? new Date().toISOString() : value)],
      },
    },
    { name: "author", type: "relationship", relationTo: "users", admin: { position: "sidebar" } },
  ],
};
