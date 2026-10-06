import path from "node:path";
import { fileURLToPath } from "node:url";
import type { CollectionConfig } from "payload";
import { anyone, signedIn } from "../access";
import { revalidateSite } from "../hooks/revalidate";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Photo", plural: "Photos" },
  admin: { group: "Website", useAsTitle: "alt", defaultColumns: ["filename", "alt", "ownedByCna", "updatedAt"] },
  access: { read: anyone, create: signedIn, update: signedIn, delete: signedIn },
  hooks: revalidateSite,
  upload: {
    // Local disk (gitignored). Production needs a cloud storage adapter instead.
    staticDir: path.resolve(dirname, "../../../media"),
    // Raster formats only: SVG can carry scripts.
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    focalPoint: true,
    // The site resizes per screen with next/image; this only caps very large phone photos.
    resizeOptions: { width: 2400, height: 2400, fit: "inside", withoutEnlargement: true },
    formatOptions: { format: "webp", options: { quality: 90 } },
    imageSizes: [{ name: "thumbnail", width: 400, formatOptions: { format: "webp", options: { quality: 80 } } }],
    adminThumbnail: "thumbnail",
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
      label: "Owned by CNA",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Tick only for CNA's own photos. Unticked photos must be replaced or credited before launch." },
    },
  ],
};
