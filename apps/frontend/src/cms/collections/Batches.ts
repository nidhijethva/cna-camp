import type { CollectionConfig } from "payload";
import { ValidationError } from "payload";
import { anyone, signedIn } from "../access";
import { sampleField } from "../fields";
import { revalidateSite } from "../hooks/revalidate";

const dayOnly = { date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" } } as const;

export const Batches: CollectionConfig = {
  slug: "batches",
  labels: { singular: "Batch", plural: "Batches" },
  admin: {
    group: "Trips",
    useAsTitle: "label",
    defaultColumns: ["label", "startDate", "endDate", "seatsLeft", "note"],
    description: "Fixed departure dates. Past batches drop off the site automatically.",
  },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  defaultSort: "startDate",
  hooks: {
    ...revalidateSite,
    beforeValidate: [
      ({ data, collection }) => {
        if (data?.startDate && data.endDate && new Date(data.endDate) < new Date(data.startDate)) {
          throw new ValidationError({
            collection: collection.slug,
            errors: [{ path: "endDate", message: "End date must be on or after the start date." }],
          });
        }
        return data;
      },
    ],
  },
  fields: [
    { name: "trip", type: "relationship", relationTo: "trips", required: true, index: true },
    {
      type: "row",
      fields: [
        { name: "startDate", type: "date", required: true, index: true, admin: dayOnly },
        { name: "endDate", type: "date", required: true, admin: dayOnly },
        { name: "seatsLeft", type: "number", required: true, min: 0 },
      ],
    },
    { name: "note", type: "text", admin: { description: "Short tag, e.g. “Diwali break”, “Girls-only batch”." } },
    {
      name: "label",
      type: "text",
      admin: { hidden: true },
      hooks: {
        beforeChange: [
          async ({ data, req }) => {
            if (!data?.trip || !data.startDate) return data?.label;
            const id = typeof data.trip === "object" ? data.trip.id : data.trip;
            const trip = await req.payload.findByID({ collection: "trips", id, depth: 0, draft: true, req });
            return `${trip.name} · ${String(data.startDate).slice(0, 10)}`;
          },
        ],
      },
    },
    sampleField,
  ],
};
