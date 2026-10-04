import type { CollectionConfig } from "payload";
import { publishedOrSignedIn, signedIn } from "../access";
import { sampleField, seoField, slugField, textList } from "../fields";
import { revalidateCollection } from "../hooks/revalidate";
import { audienceOptions, difficultyOptions, monthOptions, regionOptions, tripTypeOptions } from "../options";

export const Trips: CollectionConfig = {
  slug: "trips",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "region", "type", "featured", "_status", "updatedAt"],
    listSearchableFields: ["name", "slug", "location"],
  },
  access: { read: publishedOrSignedIn, create: signedIn, update: signedIn, delete: signedIn },
  versions: { drafts: true, maxPerDoc: 20 },
  defaultSort: "name",
  hooks: revalidateCollection<{ slug?: string }>((doc) => ["/", "/trips", "/batches", `/trips/${doc.slug}`]),
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Basics",
          fields: [
            { name: "name", type: "text", required: true },
            { name: "summary", type: "textarea", required: true, maxLength: 220, admin: { description: "One or two lines for cards." } },
            {
              type: "row",
              fields: [
                { name: "region", type: "select", required: true, options: regionOptions, index: true },
                { name: "location", type: "text", required: true, admin: { description: "State or district, e.g. Himachal Pradesh" } },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "type", type: "select", required: true, options: tripTypeOptions, index: true },
                { name: "difficulty", type: "select", options: difficultyOptions },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "days", type: "number", required: true, min: 1 },
                { name: "nights", type: "number", required: true, min: 0, admin: { description: "0 shows as “Day trip”." } },
                { name: "altitudeM", label: "Max altitude (m)", type: "number", min: 0 },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "priceFrom", label: "Price from (₹)", type: "number", min: 0, admin: { description: "Empty shows “On request”." } },
                { name: "startsFrom", type: "text", admin: { description: "Departure city, e.g. Ahmedabad" } },
              ],
            },
            { name: "months", type: "select", hasMany: true, options: monthOptions, admin: { description: "Months this trip runs." } },
            { name: "suitableFor", type: "select", hasMany: true, options: audienceOptions },
            textList("activities"),
          ],
        },
        {
          label: "Content",
          fields: [
            { name: "overview", type: "richText" },
            textList("highlights"),
            {
              name: "itinerary",
              label: "Day by day",
              type: "array",
              fields: [
                { name: "title", type: "text", required: true },
                { name: "body", type: "textarea" },
              ],
            },
            textList("included", "What's included"),
            textList("notIncluded", "Not included"),
            textList("packingList", "What to carry"),
            { name: "howToReach", type: "richText" },
            {
              name: "faqs",
              label: "Trip FAQs",
              type: "array",
              fields: [
                { name: "question", type: "text", required: true },
                { name: "answer", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "Photos",
          fields: [
            { name: "heroImage", type: "upload", relationTo: "media", required: true },
            { name: "gallery", type: "upload", relationTo: "media", hasMany: true },
          ],
        },
        { label: "SEO", fields: [seoField] },
      ],
    },
    slugField("name"),
    { name: "featured", type: "checkbox", defaultValue: false, admin: { position: "sidebar", description: "Show in “Popular trips”." } },
    sampleField,
  ],
};
