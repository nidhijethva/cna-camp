import type { CollectionConfig } from "payload";
import { anyone, signedIn } from "../access";
import { sampleField } from "../fields";
import { revalidateSite } from "../hooks/revalidate";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  admin: {
    group: "Website",
    useAsTitle: "name",
    defaultColumns: ["name", "role", "rating", "trip", "isSample"],
    description: "The 3 most recent reviews with consent appear on the home page.",
  },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  defaultSort: "-createdAt",
  hooks: revalidateSite,
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
        { name: "trip", type: "relationship", relationTo: "trips", required: true },
      ],
    },
    {
      name: "consentGiven",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "The reviewer agreed to their name and words appearing on the site. Only ticked reviews are shown." },
    },
    sampleField,
  ],
};
