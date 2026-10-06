import type { CollectionConfig } from "payload";
import { signedIn } from "../access";
import { monthOptions } from "../options";

/** Leads from the site forms. Created only by the server action (never via the public API). */
export const Enquiries: CollectionConfig = {
  slug: "enquiries",
  admin: {
    group: "Leads",
    useAsTitle: "name",
    defaultColumns: ["name", "phone", "email", "kind", "trip", "status", "createdAt"],
    listSearchableFields: ["name", "phone", "email"],
  },
  // Personal data (DPDP Act): the signed-in admin only, never the public API.
  access: { create: () => false, read: signedIn, update: signedIn, delete: signedIn },
  defaultSort: "-createdAt",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "kind",
          type: "select",
          required: true,
          options: [
            { label: "Quick", value: "quick" },
            { label: "Trip", value: "trip" },
            { label: "Group", value: "group" },
          ],
        },
        {
          name: "status",
          type: "select",
          required: true,
          defaultValue: "new",
          index: true,
          options: [
            { label: "New", value: "new" },
            { label: "Contacted", value: "contacted" },
            { label: "Booked", value: "booked" },
            { label: "Closed", value: "closed" },
          ],
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "phone", type: "text", required: true, index: true },
        { name: "email", type: "email" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "trip", type: "relationship", relationTo: "trips" },
        { name: "tripName", type: "text", admin: { readOnly: true, description: "Snapshot at the time of the enquiry." } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "travellerType", type: "text" },
        { name: "groupSize", type: "number", min: 1 },
        { name: "month", type: "select", options: monthOptions },
      ],
    },
    {
      name: "group",
      type: "group",
      admin: { condition: (data) => data.kind === "group" },
      fields: [
        {
          type: "row",
          fields: [
            { name: "organisation", type: "text" },
            { name: "region", type: "text", admin: { description: "Where to (empty = suggest for us)." } },
          ],
        },
        {
          type: "row",
          fields: [
            { name: "days", type: "text" },
            { name: "fromCity", type: "text" },
          ],
        },
        { name: "interests", type: "text", hasMany: true },
      ],
    },
    { name: "message", type: "textarea" },
    { name: "internalNotes", type: "textarea", admin: { description: "Visible to the CNA team only." } },
    {
      name: "meta",
      type: "group",
      admin: { readOnly: true },
      fields: [
        { name: "sourcePath", type: "text" },
        { name: "consentAt", type: "date" },
        // Keyed hash of the sender's IP, only for rate limiting; never the IP itself.
        { name: "ipHash", type: "text", index: true, admin: { hidden: true } },
      ],
    },
  ],
};
