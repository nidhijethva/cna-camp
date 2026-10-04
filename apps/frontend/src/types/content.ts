export type RegionSlug = "gujarat" | "across-india" | "north-east" | "outside-india";

export type TripType = "Trek" | "Camp" | "Nature Trail";

export type Difficulty = "Easy" | "Moderate" | "Challenging";

export interface ImageRef {
  src: string;
  alt: string;
}

export interface TripIndexEntry {
  slug: string;
  name: string;
  region: RegionSlug;
}

export interface Trip extends TripIndexEntry {
  type: TripType;
  location: string;
  summary: string;
  duration: string;
  altitudeM?: number;
  difficulty?: Difficulty;
  /** Starting price in INR. `null` means "On request". */
  priceFrom: number | null;
  image: ImageRef;
}

export interface Batch {
  id: string;
  tripSlug: string;
  /** ISO date (YYYY-MM-DD). */
  startDate: string;
  durationLabel?: string;
  note?: string;
  seatsLeft: number;
  /** Overrides the trip price; `null` = on request. */
  price?: number | null;
}

export interface HolidayGroup {
  key: string;
  months: string;
  title: string;
  highlights: string[];
  tripCount: number;
  href: string;
  image: ImageRef;
}

export interface Audience {
  title: string;
  description: string;
  href: string;
  image: ImageRef;
}

export interface Review {
  name: string;
  role: string;
  quote: string;
  rating: number;
  tripName: string;
  isSample?: boolean;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface GalleryPhoto {
  src: string;
  caption: string;
}
