import type { RegionSlug } from "@/types/content";

export const FOUNDED_YEAR = 1997;

export const site = {
  name: "CNA Camp",
  legalName: "Climber Nature Adventure Club",
  shortTagline: "Treks & camps since 1997, Rajkot",
  description:
    "Treks, camps and outdoor adventures across Gujarat, the Himalaya and North-East India since 1997. Backed by Saurashtra Education & Charitable Trust.",
  trust: {
    name: "Saurashtra Education & Charitable Trust",
    registration: "E-5718/2000",
  },
  coordinates: "N 22.30° · E 70.80°",
  phone: "+91 70463 61009",
  phoneHref: "tel:+917046361009",
  whatsappHref:
    "https://wa.me/917046361009?text=Hi%20CNA%2C%20I%20want%20to%20know%20about%20your%20trips",
  email: "nikunjvyash2411@gmail.com",
  address: {
    full: '"Maa" 4/7 Vaniyawadi Main Rd, opp. Bolbala Road, near 80 ft Road, Rajkot 360002, Gujarat',
    street: '"Maa" 4/7 Vaniyawadi Main Rd, opp. Bolbala Road, near 80 ft Road',
    locality: "Rajkot",
    region: "Gujarat",
    postalCode: "360002",
    country: "IN",
  },
  social: [
    { label: "Instagram", href: "https://www.instagram.com/cnacamp.india/" },
    { label: "Facebook", href: null },
    { label: "YouTube", href: null },
  ],
} as const;

/** First camp: December 1997, so a year is only completed each December. */
export const yearsActive = (now = new Date()) => now.getFullYear() - FOUNDED_YEAR - (now.getMonth() < 11 ? 1 : 0);

export const regions: Record<RegionSlug, { label: string; blurb: string }> = {
  gujarat: { label: "Gujarat", blurb: "Bet Dwarka coast, Gir forest, Kutch & Saputara hills" },
  "across-india": { label: "Across India", blurb: "Himalaya, Sahyadri, Satpura & the southern hills" },
  "north-east": { label: "North-East", blurb: "Sikkim and the eastern Himalaya" },
  "outside-india": { label: "Outside India", blurb: "Everest Base Camp, Nepal" },
};

export const regionOrder: RegionSlug[] = ["gujarat", "across-india", "north-east", "outside-india"];

export const tripsByRegionHref = (region: RegionSlug) => `/trips?region=${region}`;

export const enquireHref = (tripSlug?: string) =>
  tripSlug ? `/contact?trip=${encodeURIComponent(tripSlug)}#enquire` : "/contact#enquire";

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const mainNav: NavItem[] = [
  {
    label: "Treks & Camps",
    href: "/trips",
    children: [
      { label: "All trips", href: "/trips" },
      ...regionOrder.map((r) => ({ label: regions[r].label, href: tripsByRegionHref(r) })),
      { label: "Girls-only & solo", href: "/travellers" },
    ],
  },
  { label: "Upcoming Batches", href: "/batches" },
  {
    label: "Group Trips",
    href: "/group-trips",
    children: [
      { label: "All group trips", href: "/group-trips" },
      { label: "Schools & colleges", href: "/group-trips#schools" },
      { label: "Families & friends", href: "/group-trips#families" },
      { label: "Corporate teams", href: "/group-trips#corporate" },
      { label: "Teachers, NGOs & clubs", href: "/group-trips#ngo" },
      { label: "Plan a custom trip", href: "/group-trips#custom" },
    ],
  },
  { label: "Olympiad", href: "/olympiad" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our story & mission", href: "/about" },
      { label: "Our founder", href: "/about#founder" },
      { label: "Why CNA", href: "/about#different" },
      { label: "Life at camp", href: "/about#camp-life" },
      { label: "Destinations", href: "/destinations" },
      { label: "Gallery", href: "/gallery" },
      { label: "Safety", href: "/about#safety" },
      { label: "FAQs", href: "/about#faq" },
    ],
  },
];

export const footerNav = {
  regions: [
    ...regionOrder.map((r) => ({ label: regions[r].label, href: tripsByRegionHref(r) })),
    { label: "Upcoming batches", href: "/batches" },
  ],
  company: [
    { label: "About us", href: "/about" },
    { label: "Group trips", href: "/group-trips" },
    { label: "Adventure Olympiad", href: "/olympiad" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact & payments", href: "/contact" },
  ],
  legal: [
    { label: "Terms", href: "/terms" },
    { label: "Cancellation & refund", href: "/cancellation" },
    { label: "Privacy", href: "/privacy" },
    { label: "Photo credits", href: "/photo-credits" },
  ],
};

export const travellerTypes = [
  "Just me",
  "Friends / youth group",
  "Girls-only group",
  "Family",
  "School group",
  "College / university group",
  "Corporate team",
  "Teachers / NGO / club",
] as const;
