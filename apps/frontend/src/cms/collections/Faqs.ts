import type { CollectionConfig } from "payload";
import { anyone, signedIn } from "../access";
import { revalidateCollection } from "../hooks/revalidate";

export const Faqs: CollectionConfig = {
  slug: "faqs",
  labels: { singular: "FAQ", plural: "FAQs" },
  admin: { useAsTitle: "question", defaultColumns: ["question", "category", "order"] },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  defaultSort: "order",
  hooks: revalidateCollection(() => ["/", "/about"]),
  fields: [
    { name: "question", type: "text", required: true },
    { name: "answer", type: "textarea", required: true },
    {
      type: "row",
      fields: [
        {
          name: "category",
          type: "select",
          required: true,
          defaultValue: "general",
          options: [
            { label: "General", value: "general" },
            { label: "Safety", value: "safety" },
            { label: "Booking", value: "booking" },
            { label: "Olympiad", value: "olympiad" },
          ],
        },
        { name: "order", type: "number", defaultValue: 0 },
        { name: "showOnHome", type: "checkbox", defaultValue: false },
      ],
    },
  ],
};
