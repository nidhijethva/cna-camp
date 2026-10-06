import type { CollectionConfig } from "payload";
import { publishedOrSignedIn, signedIn } from "../access";
import { sampleField, seoField, slugField, textList } from "../fields";
import { revalidateSite } from "../hooks/revalidate";
import { campusOptions, difficultyOptions, monthOptions, regionOptions, tripTypeOptions } from "../options";
import { sitePreview } from "../preview";

export const Trips: CollectionConfig = {
  slug: "trips",
  admin: {
    group: "Trips",
    useAsTitle: "name",
    defaultColumns: ["name", "region", "type", "featured", "_status", "updatedAt"],
    listSearchableFields: ["name", "slug", "location"],
    preview: sitePreview((doc) => `/trips/${doc.slug}`),
  },
  access: { read: publishedOrSignedIn, create: signedIn, update: signedIn, delete: signedIn },
  versions: { drafts: true, maxPerDoc: 20 },
  defaultSort: "order",
  hooks: revalidateSite,
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Basics",
          fields: [
            { name: "name", type: "text", required: true },
            { name: "summary", type: "textarea", required: true, maxLength: 220, admin: { description: "One or two lines for trip cards." } },
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
                { name: "difficulty", type: "select", required: true, defaultValue: "easy", options: difficultyOptions },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "days", type: "number", required: true, min: 1 },
                { name: "nights", type: "number", required: true, min: 0, admin: { description: "0 shows as “Day trip”." } },
                { name: "altitudeM", label: "Max altitude (m)", type: "number", min: 0, admin: { description: "Leave empty for low-altitude trips." } },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "priceFrom", label: "Price from (₹)", type: "number", min: 0, admin: { description: "Empty shows “On request”." } },
                { name: "startsFrom", type: "text", required: true, admin: { description: "Departure city, e.g. Ahmedabad" } },
              ],
            },
            { name: "months", type: "select", hasMany: true, required: true, options: monthOptions, admin: { description: "Months this trip runs." } },
            textList("activities"),
            {
              name: "campus",
              type: "select",
              options: campusOptions,
              admin: { description: "Shows “Where you stay” with the campus details." },
            },
          ],
        },
        {
          label: "Content",
          fields: [
            { name: "overview", type: "textarea", admin: { description: "A short paragraph about the place. Empty uses the summary." } },
            {
              name: "itinerary",
              label: "Day by day",
              type: "array",
              admin: { description: "Empty shows a sample plan sized to the trip length." },
              fields: [
                { name: "title", type: "text", required: true },
                { name: "body", type: "textarea" },
              ],
            },
            {
              name: "itineraryConfirmed",
              type: "checkbox",
              defaultValue: false,
              admin: { description: "Tick when the day-by-day plan is CNA's real schedule (otherwise it is labelled as a sample)." },
            },
            { name: "howToReach", type: "textarea", admin: { description: "Empty says the group travels together from the start city." } },
            {
              type: "collapsible",
              label: "Lists (optional, empty uses the standard text)",
              admin: { initCollapsed: true },
              fields: [
                textList("included", "What's included"),
                textList("notIncluded", "Not included"),
                textList("packingList", "What to carry"),
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
          ],
        },
        {
          label: "Photos",
          fields: [
            { name: "heroImage", type: "upload", relationTo: "media", admin: { description: "Main photo. Empty shows “Photo coming soon”." } },
            {
              name: "gallery",
              type: "upload",
              relationTo: "media",
              hasMany: true,
              admin: { description: "3 or more photos show a gallery on the trip page and an album on the Gallery page." },
            },
          ],
        },
        { label: "SEO", fields: [seoField] },
      ],
    },
    slugField("name"),
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 100,
      admin: { position: "sidebar", description: "Lower numbers show first in trip lists." },
    },
    { name: "featured", type: "checkbox", defaultValue: false, admin: { position: "sidebar", description: "Show in “Popular trips” on the home page." } },
    sampleField,
  ],
};
