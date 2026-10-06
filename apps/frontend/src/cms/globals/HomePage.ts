import type { Field, GlobalConfig } from "payload";
import { publishedOrSignedIn, signedIn } from "../access";
import { seoField, siteLink } from "../fields";
import { revalidateSiteGlobal } from "../hooks/revalidate";
import { sitePreview } from "../preview";

const sectionHeading = (withIntro = true): Field[] => [
  {
    type: "row",
    fields: [
      { name: "eyebrow", type: "text", required: true },
      { name: "title", type: "text", required: true },
    ],
  },
  ...(withIntro ? [{ name: "intro", type: "textarea" } as Field] : []),
];

const points = (maxRows: number): Field => ({
  name: "points",
  type: "array",
  maxRows,
  fields: [
    { name: "title", type: "text", required: true },
    { name: "text", type: "textarea", required: true },
  ],
});

const photo = (name = "image", description?: string): Field => ({
  name,
  type: "upload",
  relationTo: "media",
  required: true,
  admin: description ? { description } : undefined,
});

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Home page",
  admin: { group: "Website", preview: sitePreview(() => "/") },
  access: { read: publishedOrSignedIn, update: signedIn },
  versions: { drafts: true, max: 20 },
  hooks: revalidateSiteGlobal,
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          name: "hero",
          fields: [
            {
              name: "headingLines",
              type: "text",
              hasMany: true,
              required: true,
              admin: { description: "Each entry is one line; the last line is highlighted in yellow." },
            },
            { name: "intro", type: "textarea", required: true },
            photo("image", "Wide landscape photo behind the heading."),
            { name: "highlights", type: "text", hasMany: true, admin: { description: "Small starred facts under the button." } },
          ],
        },
        {
          label: "Who we are",
          name: "story",
          fields: [...sectionHeading(false), { name: "body", type: "textarea", required: true }, photo(), points(6)],
        },
        {
          label: "Plan by holiday",
          name: "holidays",
          fields: [
            ...sectionHeading(),
            {
              name: "items",
              type: "array",
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "months", type: "text", required: true, admin: { description: "Label, e.g. Oct – Nov" } },
                    { name: "title", type: "text", required: true },
                  ],
                },
                { name: "highlights", type: "text", hasMany: true, admin: { description: "Trip names to mention." } },
                {
                  type: "row",
                  fields: [
                    { name: "tripCount", type: "number", required: true, min: 0 },
                    { name: "link", type: "text", required: true, validate: siteLink, admin: { description: "e.g. /trips?month=nov" } },
                  ],
                },
                photo(),
              ],
            },
          ],
        },
        {
          label: "Destinations",
          name: "destinations",
          fields: [
            ...sectionHeading(),
            {
              name: "regionImages",
              type: "group",
              admin: { description: "Also used on the Destinations page." },
              fields: [
                {
                  type: "row",
                  fields: [photo("gujarat"), photo("acrossIndia"), photo("northEast"), photo("outsideIndia")],
                },
              ],
            },
          ],
        },
        {
          label: "Audiences",
          name: "audiences",
          fields: [
            ...sectionHeading(false),
            {
              name: "items",
              type: "array",
              maxRows: 8,
              fields: [
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea", required: true },
                { name: "link", type: "text", required: true, validate: siteLink, admin: { description: "e.g. /group-trips#schools" } },
                photo(),
              ],
            },
            { name: "teacherNote", type: "text", admin: { description: "Shown after “Teachers:” below the cards." } },
          ],
        },
        {
          label: "Why CNA",
          name: "why",
          fields: [
            ...sectionHeading(false),
            photo(),
            { name: "imageLabel", type: "text", admin: { description: "Small label on the photo, e.g. Rock climbing" } },
            points(6),
          ],
        },
        {
          label: "Photo strip",
          name: "gallery",
          fields: [
            ...sectionHeading(),
            {
              name: "photos",
              type: "array",
              minRows: 4,
              admin: { description: "Scrolling strip on the home page; also “CNA moments” on the Gallery page." },
              fields: [photo(), { name: "caption", type: "text", required: true }],
            },
          ],
        },
        { label: "SEO", fields: [seoField] },
      ],
    },
  ],
};
