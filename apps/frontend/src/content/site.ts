import type { Campus, RegionSlug } from "@/types/content";

export const FOUNDED_YEAR = 1997;

/** Fixed identity. Contact details and numbers are edited in the admin (Site settings). */
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

export const enquireHref = (tripSlug?: string) => (tripSlug ? `/trips/${tripSlug}#enquire` : "/contact#enquire");

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

export const campuses: Campus[] = [
  {
    slug: "manali",
    name: "Manali Campus",
    place: "Vashisht, Manali",
    state: "Himachal Pradesh",
    own: "Our own campus",
    img: "peaks",
    stay: "Swiss tents & hotel rooms",
    capacity: "200 people",
    facilities: ["Attached toilets", "Drinking water", "Meals", "First aid"],
    activities: ["Trekking", "Rock climbing", "River rafting", "High-altitude camping", "Star gazing"],
    months: "March to June · October to February (winter & snow)",
  },
  {
    slug: "dwarka",
    name: "Bet Dwarka Campus",
    place: "Bet Dwarka",
    state: "Gujarat",
    own: "Partner campus",
    img: "stock/campus-dwarka",
    stay: "Dorm, guest house & tents",
    capacity: "100 people",
    facilities: ["Toilets", "Drinking water", "Generator backup"],
    activities: ["Marine walk", "Bird watching", "Star gazing", "Hiking", "EVS introduction"],
    months: "October to March",
  },
  {
    slug: "hingolgadh",
    name: "Hingolgadh Camp",
    place: "Hingolgadh, Jasdan, Rajkot",
    state: "Gujarat",
    own: "Camp site we set up for each batch",
    img: "stock/campus-hingolgadh",
    stay: "Tents & dorm",
    capacity: null,
    facilities: ["Toilets", "Drinking water", "Generator backup"],
    activities: ["Bird watching", "Star gazing", "Hiking", "EVS introduction"],
    months: "All seasons",
  },
];

/** Top-level menu item for a path: its own page, sub-pages, or any of its dropdown links. */
export function isNavActive(item: NavItem, pathname: string) {
  const own = (href: string) => href.split(/[?#]/)[0];
  if (pathname === own(item.href) || pathname.startsWith(`${own(item.href)}/`)) return true;
  return Boolean(item.children?.some((c) => own(c.href) !== "/" && own(c.href) === pathname));
}
