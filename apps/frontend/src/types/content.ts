export type RegionSlug = "gujarat" | "across-india" | "north-east" | "outside-india";

export type TripType = "Trek" | "Camp" | "Nature Trail";

export type Difficulty = "Easy" | "Moderate" | "Challenging";

export type Month = "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun" | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec";

export type CampusSlug = "manali" | "dwarka" | "hingolgadh";

/**
 * Photo key as used by the design: "cna/manali/01" → /img/cna/manali/01.webp, "valley" → /img/valley.jpg.
 * A `-wide` variant (1440px) exists for heroes and the lightbox.
 */
export type PhotoKey = string;

/** An uploaded CMS image (or any image with a known URL). */
export interface ImageRef {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** Focal point (percent) set in the admin; crops keep this spot in view. */
  focalX?: number;
  focalY?: number;
}

/** Either a design photo key (pages kept in code) or a CMS image. */
export type PhotoSource = PhotoKey | ImageRef;

export interface Trip {
  slug: string;
  name: string;
  region: RegionSlug;
  /** State or district shown on cards, e.g. "Himachal Pradesh". */
  state: string;
  type: TripType;
  days: number;
  /** 0 = day trip. */
  nights: number;
  altitude: string | null;
  difficulty: Difficulty;
  /** Starting price in INR; `null` = on request. */
  price: number | null;
  img: ImageRef | null;
  gallery: ImageRef[];
  months: Month[];
  start: string;
  activities: string[];
  campus: CampusSlug | null;
  featured: boolean;
  summary: string;
  overview: string | null;
  /** Packing list; `null` falls back to a list based on trip type and altitude. */
  bring: string[] | null;
  /** Day-by-day [title, text]; `null` falls back to a generated sample. */
  plan: [string, string][] | null;
  /** True when the plan is CNA's own schedule rather than a sample. */
  planIsReal: boolean;
  reach: string | null;
  /** Editor overrides; `null` falls back to the generated defaults. */
  included: string[] | null;
  notIncluded: string[] | null;
  faqs: Faq[] | null;
  isSample: boolean;
  seo: Seo;
}

export interface Seo {
  title: string | null;
  description: string | null;
  image: ImageRef | null;
}

export interface Batch {
  tripSlug: string;
  /** ISO dates (YYYY-MM-DD). */
  startDate: string;
  endDate: string;
  seatsLeft: number;
  note?: string;
}

export interface Campus {
  slug: CampusSlug;
  name: string;
  place: string;
  state: string;
  own: string;
  img: PhotoKey;
  stay: string;
  capacity: string | null;
  facilities: string[];
  activities: string[];
  months: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Review {
  name: string;
  role: string;
  quote: string;
  rating: number;
  tripName: string;
  isSample?: boolean;
}

export interface HolidayGroup {
  key: string;
  months: string;
  title: string;
  highlights: string[];
  tripCount: number;
  href: string;
  image: ImageRef | null;
}

export interface Audience {
  title: string;
  description: string;
  href: string;
  image: ImageRef | null;
}

export interface GalleryPhoto {
  image: ImageRef;
  caption: string;
}
