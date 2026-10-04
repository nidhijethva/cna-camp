import type { CollectionConfig } from "payload";
import { anyone, signedIn } from "../access";

export const Media: CollectionConfig = {
  slug: "media",
  admin: { useAsTitle: "alt", defaultColumns: ["filename", "alt", "credit", "updatedAt"] },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  upload: {
    // Raster formats only: SVG can carry scripts.
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    focalPoint: true,
    formatOptions: { format: "webp", options: { quality: 90 } },
    imageSizes: [
      { name: "card", width: 800, formatOptions: { format: "webp", options: { quality: 90 } } },
      { name: "hero", width: 1600, formatOptions: { format: "webp", options: { quality: 90 } } },
    ],
    adminThumbnail: "card",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: { description: "Describe the photo for screen readers and Google, e.g. “Campers crossing a river near Manali”." },
    },
    {
      name: "credit",
      type: "text",
      admin: { description: "Photographer/licence for photos CNA doesn't own (shown on Photo credits)." },
    },
    {
      name: "ownedByCna",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Tick only for CNA's own photos. Unticked photos must be replaced or credited before launch." },
    },
  ],
};
