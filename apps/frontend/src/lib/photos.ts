import type { PhotoSource } from "@/types/content";

/**
 * CMS images are used as-is (next/image resizes them). Design keys map to files in /public:
 * "cna/manali/01" → "/img/cna/manali/01.webp"; "valley" → "/img/valley.jpg"; `wide` picks the 1440px variant.
 */
export function photoSrc(img: PhotoSource, { wide = false } = {}) {
  if (typeof img !== "string") return img.src;
  const ext = /^(stock|cna)\//.test(img) ? "webp" : "jpg";
  return `/img/${img}${wide ? "-wide" : ""}.${ext}`;
}
