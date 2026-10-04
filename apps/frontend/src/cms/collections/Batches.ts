import type { CollectionConfig } from "payload";
import { anyone, signedIn } from "../access";
import { sampleField } from "../fields";
import { revalidateCollection } from "../hooks/revalidate";

export const Batches: CollectionConfig = {
  slug: "batches",
  labels: { singular: "Batch", plural: "Batches" },
  admin: { useAsTitle: "label", defaultColumns: ["label", "startDate", "seatsLeft", "price"] },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  defaultSort: "startDate",
  hooks: revalidateCollection(() => ["/", "/batches"]),
  fields: [
    { name: "trip", type: "relationship", relationTo: "trips", required: true, index: true },
    {
      type: "row",
      fields: [
        { name: "startDate", type: "date", required: true, index: true, admin: { date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" } } },
        { name: "seatsLeft", type: "number", required: true, min: 0 },
        { name: "price", label: "Price (₹)", type: "number", min: 0, admin: { description: "Empty uses the trip's price." } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "durationLabel", type: "text", admin: { description: "Overrides the trip duration, e.g. “Day trip”." } },
        { name: "note", type: "text", admin: { description: "e.g. “Diwali break”, “Girls-only batch”." } },
      ],
    },
    {
      name: "label",
      type: "text",
      admin: { hidden: true },
      hooks: {
        beforeChange: [
          async ({ data, req }) => {
            if (!data?.trip || !data.startDate) return data?.label;
            const trip = await req.payload.findByID({ collection: "trips", id: data.trip, depth: 0, draft: true, req });
            return `${trip.name} · ${String(data.startDate).slice(0, 10)}`;
          },
        ],
      },
    },
    sampleField,
  ],
};
