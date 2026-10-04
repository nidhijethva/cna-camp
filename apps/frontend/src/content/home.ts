import type { Audience, Faq, GalleryPhoto, HolidayGroup, Review } from "@/types/content";

export const heroImage = {
  src: "/img/valley-wide.jpg",
  alt: "Trekkers walking up a rocky Himalayan valley below snow peaks",
};

export const storyPoints = [
  {
    title: "Eco-tourism first",
    text: "Every camp has a nature goal: reefs, forests, birds, stars. Leave-no-trace on every trip.",
  },
  {
    title: "10 adventure activities",
    text: "Trekking, mountaineering, rock climbing, rappelling, rafting, river crossing, paragliding, bird watching, star gazing and marine life.",
  },
  {
    title: "Our own Manali campus",
    text: "Swiss tents and rooms for 200 in Vashisht, plus a partner campus at Bet Dwarka.",
  },
  {
    title: "Backed by a trust",
    text: "Supported by Saurashtra Education & Charitable Trust (Reg. E-5718/2000). No-profit-no-loss.",
  },
];

export const holidayGroups: HolidayGroup[] = [
  {
    key: "diwali",
    months: "Oct – Nov",
    title: "Diwali break",
    highlights: ["Astro Adventure Trekking Camp", "Sikkim Trek", "Everest Base Camp Trek"],
    tripCount: 22,
    href: "/trips?month=nov",
    image: { src: "/img/cna/manali/11.webp", alt: "" },
  },
  {
    key: "christmas",
    months: "Dec – Jan",
    title: "Christmas & New Year",
    highlights: ["Marine Camp, Bet Dwarka", "Sasan Gir Wildlife Camp", "Kullu, Shimla & Manali"],
    tripCount: 16,
    href: "/trips?month=dec",
    image: { src: "/img/cna/marinecamp/02.webp", alt: "" },
  },
  {
    key: "snow",
    months: "Dec – Mar",
    title: "Snow season",
    highlights: ["Manali Snow Camp", "Kullu, Shimla & Manali"],
    tripCount: 2,
    href: "/trips?month=jan",
    image: { src: "/img/cna/manali/01.webp", alt: "" },
  },
  {
    key: "summer",
    months: "May – Jun",
    title: "Summer vacation",
    highlights: ["Astro Adventure Trekking Camp", "Sikkim Trek", "Ladakh Trek"],
    tripCount: 11,
    href: "/trips?month=may",
    image: { src: "/img/cna/manali/11.webp", alt: "" },
  },
  {
    key: "monsoon",
    months: "Jul – Sep",
    title: "Monsoon treks",
    highlights: ["Sikkim Trek", "Ladakh Trek", "Grand Uttaranchal Trek"],
    tripCount: 12,
    href: "/trips?month=aug",
    image: { src: "/img/cna/sikkim/03.webp", alt: "" },
  },
  {
    key: "weekend",
    months: "1 – 3 days",
    title: "Weekend & day trips",
    highlights: ["Sasan Gir Wildlife Camp", "Mount Abu", "Narara Island Coral Walk"],
    tripCount: 9,
    href: "/trips?short=1",
    image: { src: "/img/cna/sasangir/02.webp", alt: "" },
  },
];

export const regionImages = {
  gujarat: "/img/cna/marinecamp/02.webp",
  "across-india": "/img/peaks.jpg",
  "north-east": "/img/cna/sikkim/03.webp",
  "outside-india": "/img/cna/everest_base_camp/05.webp",
} as const;

export const audiences: Audience[] = [
  {
    title: "School groups",
    description: "Safe, well-planned camps that teach outside the classroom.",
    href: "/group-trips#schools",
    image: { src: "/img/stock/aud-school.webp", alt: "Students learning about birds in a nature session" },
  },
  {
    title: "College & friends",
    description: "Treks and camps for your gang, with every detail handled.",
    href: "/group-trips#families",
    image: { src: "/img/meadow.jpg", alt: "Tents pitched in a green Himalayan meadow" },
  },
  {
    title: "Girls-only",
    description: "Batches just for girls and women, with a safe, easy vibe.",
    href: "/travellers#girls",
    image: { src: "/img/river.jpg", alt: "A group of girls crossing a river together" },
  },
  {
    title: "Solo travellers",
    description: "Come alone (18+), leave with a group of new trail friends.",
    href: "/travellers#solo",
    image: { src: "/img/stock/aud-solo.webp", alt: "A lone hiker walking across a snowfield" },
  },
];

export const whyCna = [
  { title: "Instructors with 20+ years", text: "Qualified, experienced instructors and first aid on every batch." },
  {
    title: "Nature learning built in",
    text: "Sea awareness, EVS sessions, bird watching and star gazing are part of the plan.",
  },
  { title: "Your travel, your menu", text: "Choose train, bus, car or air. Meals at camp follow your group’s menu." },
  { title: "No profit, no loss", text: "Fees cover the camp. That is how a trust-backed club works." },
];

export const reviews: Review[] = [
  {
    name: "Parent name",
    role: "Parent · Rajkot",
    quote: "Sample review. A parent shares how their child came back more confident and caring for nature.",
    rating: 5,
    tripName: "Manali Snow Camp",
    isSample: true,
  },
  {
    name: "Student name",
    role: "College student",
    quote: "Sample review. A student talks about the trek, the night sky and the friends they made.",
    rating: 5,
    tripName: "Astro Adventure Trekking Camp",
    isSample: true,
  },
  {
    name: "Teacher name",
    role: "School teacher",
    quote: "Sample review. A teacher explains how the marine walk turned into a real science lesson.",
    rating: 5,
    tripName: "Marine Camp, Bet Dwarka",
    isSample: true,
  },
];

export const galleryStrip: GalleryPhoto[] = [
  { src: "/img/river.jpg", caption: "River crossing" },
  { src: "/img/cna/manali/05.webp", caption: "Campfire night" },
  { src: "/img/cna/manali/08.webp", caption: "Forest trek, Manali" },
  { src: "/img/cna/manali/09.webp", caption: "Rafting on the Beas" },
  { src: "/img/meadow.jpg", caption: "Camp in the meadow" },
  { src: "/img/cna/manali/10.webp", caption: "Climbing wall" },
  { src: "/img/cna/theme-beach-treks/01.webp", caption: "Beach camp group" },
  { src: "/img/cna/manali/03.webp", caption: "Hillside campfire" },
  { src: "/img/climb.jpg", caption: "Rock climbing" },
  { src: "/img/cna/theme-desert-treks/01.webp", caption: "Desert trek" },
  { src: "/img/cna/index/13.webp", caption: "Camp group photo" },
  { src: "/img/cna/manali/11.webp", caption: "Group on the trail" },
  { src: "/img/cna/index/11.webp", caption: "Bouldering session" },
  { src: "/img/forest.jpg", caption: "Deodar forest walk" },
];

export const homeFaqs: Faq[] = [
  {
    question: "Who can join a CNA trip?",
    answer:
      "Schools (Std 9 and above), colleges, families, friends, girls-only groups, corporate teams, teachers, NGOs and clubs. Solo travellers can join from 18 years. Each trip page says who it suits.",
  },
  {
    question: "Can I join alone?",
    answer:
      "Yes. Solo travellers aged 18 and above can join any open batch. You will be part of a group with our trip leaders.",
  },
  {
    question: "Can families join?",
    answer:
      "Yes. Families of all ages are welcome on most camps and nature trails. Ask us which trip suits your family best.",
  },
  {
    question: "Is it safe for first-timers?",
    answer:
      "Yes. Many of our trips are made for beginners. Trained leaders, first aid and a planned route are part of every trip.",
  },
  {
    question: "Is CNA a tour company?",
    answer:
      "No. CNA is an eco-tourism and adventure club, backed by Saurashtra Education & Charitable Trust. Our trips are about nature, learning and adventure, run on a no-profit-no-loss model.",
  },
  {
    question: "Do you have your own campsites?",
    answer:
      "Yes. We have our own campus in Manali (Vashisht), a partner campus at Bet Dwarka, and a camp at Hingolgadh near Jasdan. For other trips we choose the best stays for each place.",
  },
];
