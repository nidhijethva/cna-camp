import type { CollectionConfig } from "payload";
import { anyone, signedIn } from "../access";
import { sampleField } from "../fields";
import { revalidateCollection } from "../hooks/revalidate";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  admin: { useAsTitle: "name", defaultColumns: ["name", "role", "rating", "isSample"] },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  hooks: revalidateCollection(() => ["/"]),
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "role", type: "text", required: true, admin: { description: "e.g. “Parent · Rajkot”" } },
      ],
    },
    { name: "quote", type: "textarea", required: true },
    {
      type: "row",
      fields: [
        { name: "rating", type: "number", required: true, min: 1, max: 5, defaultValue: 5 },
        { name: "trip", type: "relationship", relationTo: "trips" },
      ],
    },
    { name: "photo", type: "upload", relationTo: "media" },
    {
      name: "consentGiven",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "The reviewer agreed to their name, words and photo appearing on the site." },
    },
    sampleField,
  ],
};
