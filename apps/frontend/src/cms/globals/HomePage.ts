import type { Field, GlobalConfig } from "payload";
import { signedIn, anyone } from "../access";
import { seoField } from "../fields";
import { revalidateGlobal } from "../hooks/revalidate";

const sectionHeading = (defaults: { eyebrow: string; title: string; intro?: string }): Field[] => [
  { name: "eyebrow", type: "text", required: true, defaultValue: defaults.eyebrow },
  { name: "title", type: "text", required: true, defaultValue: defaults.title },
  { name: "intro", type: "textarea", defaultValue: defaults.intro },
];

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Home page",
  access: { read: anyone, update: signedIn },
  versions: { drafts: true, max: 20 },
  hooks: { afterChange: revalidateGlobal(["/"]) },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          name: "hero",
          fields: [
            { name: "headingLines", type: "text", hasMany: true, required: true, admin: { description: "Each entry is one line; the last line is highlighted." } },
            { name: "intro", type: "textarea", required: true },
            { name: "image", type: "upload", relationTo: "media", required: true },
            { name: "highlights", type: "text", hasMany: true, admin: { description: "Small starred facts under the buttons." } },
          ],
        },
        {
          label: "Who we are",
          name: "story",
          fields: [
            ...sectionHeading({ eyebrow: "Who we are", title: "A nature club, not a tour company" }),
            { name: "body", type: "textarea", required: true },
            { name: "image", type: "upload", relationTo: "media", required: true },
            { name: "videoUrl", type: "text", admin: { description: "YouTube link. Empty shows “Video coming soon”." } },
            {
              name: "points",
              type: "array",
              maxRows: 6,
              fields: [
                { name: "title", type: "text", required: true },
                { name: "text", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "Plan by holiday",
          name: "holidays",
          fields: [
            ...sectionHeading({
              eyebrow: "Plan by holiday",
              title: "A trip for every school break",
              intro: "Diwali, Christmas, summer vacation or just a weekend: here is what runs when.",
            }),
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
                { name: "highlights", type: "text", hasMany: true },
                {
                  type: "row",
                  fields: [
                    { name: "tripCount", type: "number", min: 0 },
                    { name: "link", type: "text", required: true, admin: { description: "e.g. /trips?month=nov" } },
                  ],
                },
                { name: "image", type: "upload", relationTo: "media", required: true },
              ],
            },
          ],
        },
        {
          label: "Audiences",
          name: "audiences",
          fields: [
            ...sectionHeading({ eyebrow: "Who travels with us", title: "Your group. Your kind of trip." }),
            {
              name: "items",
              type: "array",
              maxRows: 8,
              fields: [
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea", required: true },
                { name: "link", type: "text", required: true },
                { name: "image", type: "upload", relationTo: "media", required: true },
              ],
            },
            { name: "teacherNote", type: "text" },
          ],
        },
        {
          label: "Why CNA",
          name: "why",
          fields: [
            ...sectionHeading({ eyebrow: "Why CNA", title: "Nearly 30 years of getting people home happy" }),
            { name: "image", type: "upload", relationTo: "media", required: true },
            {
              name: "points",
              type: "array",
              maxRows: 6,
              fields: [
                { name: "title", type: "text", required: true },
                { name: "text", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "Photo strip",
          name: "gallery",
          fields: [
            ...sectionHeading({
              eyebrow: "From the trail",
              title: "Moments from our trips",
              intro: "Real moments from CNA camps: campfires, rafting, climbing and the friends you make. Hover to pause.",
            }),
            {
              name: "photos",
              type: "array",
              minRows: 4,
              fields: [
                { name: "image", type: "upload", relationTo: "media", required: true },
                { name: "caption", type: "text", required: true },
              ],
            },
          ],
        },
        { label: "SEO", fields: [seoField] },
      ],
    },
  ],
};
