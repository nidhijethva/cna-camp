import type { Field } from "payload";

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** URL slug, auto-filled from `from` when left empty. */
export const slugField = (from = "title"): Field => ({
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: { position: "sidebar", description: `Used in the URL. Leave empty to generate from ${from}.` },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        const source = typeof value === "string" && value.trim() ? value : (data?.[from] as string | undefined);
        return source ? toSlug(source) : value;
      },
    ],
  },
});

export const seoField: Field = {
  name: "seo",
  type: "group",
  admin: { description: "Search engine and social sharing. Empty fields fall back to the page content." },
  fields: [
    { name: "title", type: "text", maxLength: 70 },
    { name: "description", type: "textarea", maxLength: 160 },
    { name: "image", type: "upload", relationTo: "media" },
  ],
};

/** Marks placeholder content so the site can label it and editors can find it. */
export const sampleField: Field = {
  name: "isSample",
  type: "checkbox",
  defaultValue: false,
  admin: { position: "sidebar", description: "Sample/placeholder content, labelled on the site until replaced." },
};

export const textList = (name: string, label?: string): Field => ({
  name,
  label,
  type: "array",
  fields: [{ name: "text", type: "text", required: true }],
});
