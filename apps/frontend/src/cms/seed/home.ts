import type { Review } from "../../types/content";

/** A file under /public plus its alt text; the seed uploads it to Photos. */
export interface SeedPhoto {
  src: string;
  alt: string;
}

const photo = (src: string, alt: string): SeedPhoto => ({ src, alt });

export const home = {
  hero: {
    headingLines: ["Real trails.", "Real people.", "Since 1997."],
    intro:
      "Eco-tourism treks, camps and nature trails from Gujarat to the Himalaya. For schools, colleges, families, friends, girls-only groups and solo travellers.",
    image: photo("/img/valley-wide.jpg", "Trekkers walking up a rocky Himalayan valley below snow peaks"),
    highlights: ["1,00,000+ campers", "1,000+ camps", "Backed by a registered trust"],
  },
  story: {
    eyebrow: "Who we are",
    title: "A nature club, not a tour company",
    body: "Climber Nature Adventure Club (CNA) is an eco-tourism and adventure club from Rajkot. Since our first Marine Camp at Bet Dwarka in 1997, we have taken 1,00,000+ people into forests, mountains and the sea. Adventure is the way in. Coming closer to nature is the goal.",
    image: photo("/img/cna/manali/03.webp", "A CNA group around a campfire on a Himalayan hillside"),
    points: [
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
    ],
  },
  holidays: {
    eyebrow: "Plan by holiday",
    title: "A trip for every school break",
    intro: "Diwali, Christmas, summer vacation or just a weekend: here is what runs when.",
    items: [
      {
        months: "Oct – Nov",
        title: "Diwali break",
        highlights: ["Astro Adventure Trekking Camp", "Sikkim Trek", "Everest Base Camp Trek"],
        tripCount: 22,
        link: "/trips?month=nov",
        image: photo("/img/cna/manali/11.webp", "A CNA group on a Himalayan trail"),
      },
      {
        months: "Dec – Jan",
        title: "Christmas & New Year",
        highlights: ["Marine Camp, Bet Dwarka", "Sasan Gir Wildlife Camp", "Kullu, Shimla & Manali"],
        tripCount: 16,
        link: "/trips?month=dec",
        image: photo("/img/cna/marinecamp/02.webp", "Marine camp at Bet Dwarka"),
      },
      {
        months: "Dec – Mar",
        title: "Snow season",
        highlights: ["Manali Snow Camp", "Kullu, Shimla & Manali"],
        tripCount: 2,
        link: "/trips?month=jan",
        image: photo("/img/cna/manali/01.webp", "Snow camp in Manali"),
      },
      {
        months: "May – Jun",
        title: "Summer vacation",
        highlights: ["Astro Adventure Trekking Camp", "Sikkim Trek", "Ladakh Trek"],
        tripCount: 11,
        link: "/trips?month=may",
        image: photo("/img/cna/manali/11.webp", "A CNA group on a Himalayan trail"),
      },
      {
        months: "Jul – Sep",
        title: "Monsoon treks",
        highlights: ["Sikkim Trek", "Ladakh Trek", "Grand Uttaranchal Trek"],
        tripCount: 12,
        link: "/trips?month=aug",
        image: photo("/img/cna/sikkim/03.webp", "Mountain views in Sikkim"),
      },
      {
        months: "1 – 3 days",
        title: "Weekend & day trips",
        highlights: ["Sasan Gir Wildlife Camp", "Mount Abu", "Narara Island Coral Walk"],
        tripCount: 9,
        link: "/trips?short=1",
        image: photo("/img/cna/sasangir/02.webp", "Sasan Gir forest"),
      },
    ],
  },
  destinations: {
    eyebrow: "Where we go",
    title: "From Gujarat's coast to the Himalaya",
    intro: "Coast, forest, desert and high mountains. We pick the right place for each season.",
    regionImages: {
      gujarat: photo("/img/cna/marinecamp/02.webp", "Marine camp at Bet Dwarka"),
      acrossIndia: photo("/img/peaks-wide.jpg", "Snow peaks above a Himalayan valley"),
      northEast: photo("/img/cna/sikkim/03.webp", "Mountain views in Sikkim"),
      outsideIndia: photo("/img/cna/everest_base_camp/05.webp", "On the trail to Everest Base Camp"),
    },
  },
  audiences: {
    eyebrow: "Who travels with us",
    title: "Your group. Your kind of trip.",
    items: [
      {
        title: "School groups",
        description: "Safe, well-planned camps that teach outside the classroom.",
        link: "/group-trips#schools",
        image: photo("/img/stock/aud-school.webp", "Students learning about birds in a nature session"),
      },
      {
        title: "College & friends",
        description: "Treks and camps for your gang, with every detail handled.",
        link: "/group-trips#families",
        image: photo("/img/meadow.jpg", "Tents pitched in a green Himalayan meadow"),
      },
      {
        title: "Girls-only",
        description: "Batches just for girls and women, with a safe, easy vibe.",
        link: "/travellers#girls",
        image: photo("/img/river.jpg", "A group of girls crossing a river together"),
      },
      {
        title: "Solo travellers",
        description: "Come alone (18+), leave with a group of new trail friends.",
        link: "/travellers#solo",
        image: photo("/img/stock/aud-solo.webp", "A lone hiker walking across a snowfield"),
      },
    ],
    teacherNote: "school trips start at 50 students, and 1 teacher travels free with every 25 students.",
  },
  why: {
    eyebrow: "Why CNA",
    title: "Nearly 30 years of getting people home happy",
    image: photo("/img/climb.jpg", "A camper rock climbing on a boulder in a pine forest"),
    imageLabel: "Rock climbing",
    points: [
      { title: "Instructors with 20+ years", text: "Qualified, experienced instructors and first aid on every batch." },
      {
        title: "Nature learning built in",
        text: "Sea awareness, EVS sessions, bird watching and star gazing are part of the plan.",
      },
      { title: "Your travel, your menu", text: "Choose train, bus, car or air. Meals at camp follow your group’s menu." },
      { title: "No profit, no loss", text: "Fees cover the camp. That is how a trust-backed club works." },
    ],
  },
  gallery: {
    eyebrow: "From the trail",
    title: "Moments from our trips",
    intro: "Real moments from CNA camps: campfires, rafting, climbing and the friends you make. Hover to pause.",
    photos: [
      ["/img/river.jpg", "River crossing"],
      ["/img/cna/manali/05.webp", "Campfire night"],
      ["/img/cna/manali/08.webp", "Forest trek, Manali"],
      ["/img/cna/manali/09.webp", "Rafting on the Beas"],
      ["/img/meadow.jpg", "Camp in the meadow"],
      ["/img/cna/manali/10.webp", "Climbing wall"],
      ["/img/cna/theme-beach-treks/01.webp", "Beach camp group"],
      ["/img/cna/manali/03.webp", "Hillside campfire"],
      ["/img/climb.jpg", "Rock climbing"],
      ["/img/cna/theme-desert-treks/01.webp", "Desert trek"],
      ["/img/cna/index/13.webp", "Camp group photo"],
      ["/img/cna/manali/11.webp", "Group on the trail"],
      ["/img/cna/index/11.webp", "Bouldering session"],
      ["/img/forest.jpg", "Deodar forest walk"],
    ].map(([src, caption]) => ({ image: photo(src, caption), caption })),
  },
};

export const siteSettings = {
  phone: "+91 70463 61009",
  whatsappNumber: "917046361009",
  whatsappMessage: "Hi CNA, I want to know about your trips",
  email: "nikunjvyash2411@gmail.com",
  trustEmail: "seact.raj.edu.trust@gmail.com",
  address: {
    street: '"Maa" 4/7 Vaniyawadi Main Rd, opp. Bolbala Road, near 80 ft Road',
    city: "Rajkot",
    state: "Gujarat",
    postalCode: "360002",
  },
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Vaniyawadi%20Main%20Road%2C%20Bolbala%20Road%2C%20Rajkot%20360002",
  social: [
    { platform: "Instagram", url: "https://www.instagram.com/cnacamp.india/" },
    { platform: "Facebook", url: null },
    { platform: "YouTube", url: null },
  ] as const,
  campersCount: "1,00,000+",
  campsCount: "1,000+",
};

export const reviews: (Omit<Review, "tripName"> & { tripSlug: string })[] = [
  {
    name: "Parent name",
    role: "Parent · Rajkot",
    quote: "Sample review. A parent shares how their child came back more confident and caring for nature.",
    rating: 5,
    tripSlug: "manali-snow-camp",
    isSample: true,
  },
  {
    name: "Student name",
    role: "College student",
    quote: "Sample review. A student talks about the trek, the night sky and the friends they made.",
    rating: 5,
    tripSlug: "astro-adventure-manali",
    isSample: true,
  },
  {
    name: "Teacher name",
    role: "School teacher",
    quote: "Sample review. A teacher explains how the marine walk turned into a real science lesson.",
    rating: 5,
    tripSlug: "bet-dwarka-marine-camp",
    isSample: true,
  },
];
