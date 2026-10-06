import { campuses } from "@/content/site";
import { formatPrice } from "@/lib/format";
import type { Faq, Trip } from "@/types/content";

/** "3D/2N", or "Day trip". */
export const durationShort = (t: Trip) =>
  t.nights ? `${t.days}D/${t.nights}N` : t.days === 1 ? "Day trip" : `${t.days} days`;

/** "3 days / 2 nights", or "1 day (day trip)". */
export const durationLong = (t: Trip) =>
  t.nights
    ? `${t.days} days / ${t.nights} night${t.nights > 1 ? "s" : ""}`
    : t.days === 1
      ? "1 day (day trip)"
      : `${t.days} days`;

export const tripPrice = (t: Trip) => formatPrice(t.price);

export const tripCampus = (t: Trip) => campuses.find((c) => c.slug === t.campus) ?? null;

const isHard = (t: Trip) => t.difficulty === "Challenging";
const isCold = (t: Trip) => Boolean(t.altitude) || /snow|ladakh|everest|sikkim/i.test(t.slug);

/** Photos for the trip gallery: the hero is shown separately, so it's left out. */
export const tripGallery = (t: Trip) => t.gallery.filter((g) => g.src !== t.img?.src).slice(0, 9);

export const tripFacts = (t: Trip): [string, string][] => [
  ["Duration", durationLong(t)],
  ["Type", t.type],
  ["Level", t.difficulty],
  ["Best months", t.months.length === 12 ? "All year" : t.months.join(", ")],
  ["Starts from", t.start],
  t.altitude ? ["Max altitude", t.altitude] : ["State", t.state],
];

export const tripTypeLine: Record<Trip["type"], string> = {
  Trek: "This is a guided trek. You walk with trained leaders at a steady pace, camp in nature and learn the basics of mountain safety on the way.",
  Camp: "This is a nature camp. Adventure activities by day, nature learning (EVS) and campfire by night, with our leaders all the time.",
  "Nature Trail":
    "This is a nature trail. We travel together as a group, walk a lot and spend real time outdoors, not just at viewpoints.",
};

export const tripWhoCanJoin = (t: Trip): [string, string][] => [
  ["Solo travellers", "18 years and above"],
  ["School groups", isHard(t) ? "Senior students with good fitness" : "Std 9 and above"],
  ["College & friends", "Yes"],
  ["Families", isHard(t) ? "Fit teens and adults" : "All ages welcome"],
  ["Girls-only groups", "Yes, on request"],
];

export function tripIncluded(t: Trip) {
  if (t.included) return t.included;
  const campus = tripCampus(t);
  return [
    "Group travel from the start point and back",
    campus ? `Stay at ${campus.name} (${campus.stay.toLowerCase()})` : "Stay in tents, dorms or guest houses",
    "All meals during the trip",
    "Trained trip leaders + first aid",
    "Activity gear and permits",
    "Certificate of participation",
  ];
}

const defaultNotIncluded = [
  "Personal expenses and snacks",
  "Travel insurance",
  "Anything not listed in inclusions",
  "Extra cost from weather or road closures",
];

export const tripNotIncluded = (t: Trip) => t.notIncluded ?? defaultNotIncluded;

export function tripPackingList(t: Trip) {
  if (t.bring) return t.bring;
  const trek = t.type === "Trek";
  return [
    trek ? "Backpack 40-50 L" : "Backpack / day bag",
    trek ? "Trek shoes (broken in)" : "Sports shoes",
    ...(isCold(t) ? ["Thermals, fleece & down jacket", "Woollen cap & gloves"] : ["Light cotton clothes", "One warm layer for nights"]),
    "Rain jacket / poncho",
    "Water bottles (2)",
    "Torch / headlamp",
    "Personal medicines",
    "Sunscreen + cap",
    "ID card (original)",
  ];
}

/** CNA's plan when known, otherwise a generic sample sized to the trip length. */
export function tripItinerary(t: Trip): { title: string; text: string }[] {
  if (t.plan) return t.plan.map(([title, text]) => ({ title, text }));
  const days = [
    { title: `Meet at ${t.start}, travel to base`, text: "Group meets, safety briefing and travel to the base camp. Evening ice-breakers." },
    { title: "Acclimatise & first trail", text: "Short hike to get used to the terrain. Learn camp basics: tent, layers, water." },
  ];
  for (let i = 3; i < t.days; i++) {
    days.push({ title: `Trail day ${i - 1}`, text: "Main trail or activity day with our leaders. Packed lunch, evening campfire." });
  }
  days.push({ title: `Return to ${t.start}`, text: "Pack up, leave no trace, travel back with new friends." });
  return days.slice(0, Math.max(t.days, 1));
}

export const tripReach = (t: Trip) =>
  t.reach ?? `We travel together as a group from ${t.start}. Meeting point and time are shared after booking.`;

const defaultFaqs = (t: Trip): Faq[] => [
  {
    question: "Who can join this trip?",
    answer: `Solo travellers from 18 years, school groups (Std 9 and above), colleges, friends, girls-only groups and families. ${
      isHard(t) ? "This is a challenging trip, so good fitness is needed." : "It is a good trip for first-timers."
    }`,
  },
  {
    question: "How fit do I need to be?",
    answer: isHard(t)
      ? "Start training 6-8 weeks before: daily brisk walks or jogging, stairs and some strength work. We will share a fitness plan after booking."
      : "Normal fitness is enough. If you can walk 5-6 km at an easy pace, you are ready.",
  },
  {
    question: "Can I book just for myself?",
    answer: "Yes. Solo travellers aged 18 and above can join any open batch. You will be part of the group from day one.",
  },
  {
    question: "What happens if the weather turns bad?",
    answer:
      "Safety comes first. Our leaders can change the route or the day plan. Any extra cost from weather or road closures is shared as per our terms.",
  },
];

export const tripFaqs = (t: Trip): Faq[] => t.faqs ?? defaultFaqs(t);

export const tripDescription = (t: Trip) =>
  t.seo.description ??
  `${t.summary} ${durationShort(t)} ${t.type.toLowerCase()} in ${t.state} with CNA, Rajkot.`;
