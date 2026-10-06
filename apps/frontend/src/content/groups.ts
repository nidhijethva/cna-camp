import type { PhotoKey } from "@/types/content";

export interface GroupKind {
  id: string;
  title: string;
  who: string;
  text: string;
  img: PhotoKey;
  popular: string;
}

export const groupKinds: GroupKind[] = [
  {
    id: "schools",
    title: "School groups",
    who: "Std 9 and above",
    text: "Outdoor learning camps planned with teachers: nature sessions (EVS), adventure activities and a clear daily plan. Minimum 50 students; 1 teacher travels free with every 25 students.",
    img: "stock/aud-school",
    popular: "Marine Camp · Hingolgadh · Sasan Gir",
  },
  {
    id: "colleges",
    title: "College & university",
    who: "All years",
    text: "Treks and adventure camps for clubs, NSS/NCC units and class trips. Fun first, fully organised.",
    img: "meadow",
    popular: "Manali · Grand Uttaranchal · Sikkim",
  },
  {
    id: "families",
    title: "Families",
    who: "All ages welcome",
    text: "Easy camps and nature trails where kids and grandparents both have a good time.",
    img: "stock/nainital-mussoorie-corbett",
    popular: "Kerala · Nainital · Gir & Diu",
  },
  {
    id: "friends",
    title: "Friends & youth groups",
    who: "Join as a group",
    text: "Pick your dates and your kind of adventure. We handle travel, stay, food, leaders and activities.",
    img: "river",
    popular: "Ladakh · Manali Snow Camp · Goa",
  },
  {
    id: "corporate",
    title: "Corporate teams",
    who: "Custom dates",
    text: "Team outings with real challenge: treks, rock climbing, rafting and camp nights away from screens.",
    img: "stock/grand-uttaranchal-trek",
    popular: "Osam Hill · Mount Abu · Manali",
  },
  {
    id: "ngo",
    title: "Teachers, NGOs & clubs",
    who: "Custom dates",
    text: "Nature education and adventure camps for teacher groups, NGOs, scouts and clubs.",
    img: "stock/campus-hingolgadh",
    popular: "Hingolgadh · Bet Dwarka · Saputara",
  },
];

export const groupInclusions = [
  "Travel from your city and back",
  "Stay: hotel rooms or 2-10 person tents",
  "All meals at camp",
  "Trained trip leaders & instructors",
  "Activity gear",
  "Nature sessions (EVS)",
  "Medical kit, doctor nearby, ambulance access",
  "Mediclaim cover on camps over 5 days",
];

/** CNA's booking process from the old cnacamp.com booking page. */
export const groupBookingSteps = [
  "Choose a camp and contact us. We send the written programme.",
  "Fix the dates and number of days with us.",
  "Form your group: 50 members or more (smaller groups pay for 50). Big groups of 100 to 1,000 go in batches.",
  "Register: group list, a form and risk certificate per member, travel choice and 25% advance, ideally 2-3 months ahead.",
  "Group meeting: we explain activities, travel, food and camp rules and answer every question.",
  "Pay the balance within a month, everything 3 days before departure. Then pack your bag!",
];

export const groupFavourites = ["bet-dwarka-marine-camp", "hingolgadh-nature-camp", "astro-adventure-manali"];

export const travellerKinds = [
  {
    id: "girls",
    title: "Girls-only batches",
    tag: "For girls & women",
    img: "river",
    points: ["Batches only for girls and women", "Separate stay at every camp", "Female volunteers with every girls’ group", "Regular updates to family"],
  },
  {
    id: "solo",
    title: "Solo travellers",
    tag: "18 years and above",
    img: "stock/aud-solo",
    points: ["Join any open batch alone", "We pair you with tent-mates", "Group activities from day one", "Leave with new trail friends"],
  },
  {
    id: "first",
    title: "First-timers",
    tag: "Never trekked before?",
    img: "meadow",
    points: ["Pick an Easy trip", "We teach camp basics on day one", "Trained leaders set the pace", "Gear list shared before you go"],
  },
];
