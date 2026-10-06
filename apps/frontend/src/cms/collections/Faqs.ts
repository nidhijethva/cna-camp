import type { CollectionConfig } from "payload";
import { anyone, signedIn } from "../access";
import { revalidateSite } from "../hooks/revalidate";

export const Faqs: CollectionConfig = {
  slug: "faqs",
  labels: { singular: "FAQ", plural: "FAQs" },
  admin: {
    group: "Website",
    useAsTitle: "question",
    defaultColumns: ["question", "order", "showOnHome"],
    description: "Shown on the About page. Ticked ones also appear on the home page.",
  },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  defaultSort: "order",
  hooks: revalidateSite,
  fields: [
    { name: "question", type: "text", required: true },
    { name: "answer", type: "textarea", required: true },
    {
      type: "row",
      fields: [
        { name: "order", type: "number", defaultValue: 0, admin: { description: "Lower numbers show first." } },
        { name: "showOnHome", type: "checkbox", defaultValue: false },
      ],
    },
  ],
};
