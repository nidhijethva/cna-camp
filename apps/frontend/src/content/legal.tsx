import Link from "next/link";
import type { LegalSection } from "@/components/layout/LegalPage";
import { site } from "@/content/site";
import type { SiteSettings } from "@/lib/content";

const linkClass = "font-semibold text-dark underline";
const name = site.legalName;
const trust = `${site.trust.name} (Reg. ${site.trust.registration})`;

const PhoneLink = ({ contact }: { contact: SiteSettings }) => (
  <a className={linkClass} href={contact.phoneHref}>
    {contact.phone}
  </a>
);
const EmailLink = ({ contact }: { contact: SiteSettings }) => (
  <a className={linkClass} href={`mailto:${contact.email}`}>
    {contact.email}
  </a>
);

// Plain-words drafts from CNA's existing terms. To be reviewed by CNA and a legal adviser before launch.
export const termsSections = (contact: SiteSettings): LegalSection[] => [
  {
    id: "about",
    title: "About these terms",
    body: [
      <>
        These terms apply to every camp, trek and tour run by {name} (CNA), Rajkot, backed by {trust}. CNA runs its camps on a{" "}
        <strong>no-profit-no-loss</strong> basis: every camp is arranged only for the people who register for it.
      </>,
      "By registering, the participant (or the school, college or group leader on their behalf) accepts these terms.",
    ],
  },
  {
    id: "booking",
    title: "How booking works",
    list: [
      "Choose a camp and contact us by phone, WhatsApp or email. We share written details of the programme.",
      "Fix the dates and duration with us.",
      <>
        <strong>Group camps need at least 50 members.</strong> If a group has fewer than 50, the charges of 50 people apply. Very
        large groups (100 to 1,000) are split into batches.
      </>,
      "Send the group list, a registration form and a risk certificate for every member, your choice of travel (train, bus, car or air) and the 25% advance.",
      "We hold a group meeting before the camp to explain activities, travel, food and camp rules.",
      "Individuals can join open batches when we announce them.",
    ],
  },
  {
    id: "payments",
    title: "Payments",
    body: [
      "Our rates are based on hotel, transport and food prices at the time of booking. If fuel, food, hotel or airline rates rise, the prices at that time apply to travel, food and camp charges.",
    ],
    list: [
      <>
        <strong>25% advance</strong> at group registration, ideally 2 to 3 months before the camp.
      </>,
      "The full fee within one month of registration.",
      <>
        <strong>Everything paid at least 3 days before departure.</strong>
      </>,
      "Payment details are shared directly by our team. They are never shown on public pages.",
    ],
  },
  {
    id: "included",
    title: "What the fee covers",
    body: ["CNA provides stay, meals at camp, trekking, activities and sightseeing as listed for each camp."],
    list: [
      "Not included unless written in your programme: amusement park rides, entry fees, museums, and optional activities such as skiing, paragliding or rafting. These are paid by the participant or the institution.",
      "Journey food is not included. We can arrange it on request at extra cost.",
    ],
  },
  {
    id: "itinerary",
    title: "Itineraries can change",
    body: [
      "Every itinerary shows the likely plan. Weather, road conditions, strikes, natural events or the fitness of the group can change it before or during the trip. We may change any schedule in the interest of the group’s safety, comfort and well-being.",
    ],
  },
  {
    id: "safety",
    title: "Health, safety and insurance",
    list: [
      "A medical kit is kept at every camp and a doctor is available near the camp. Our volunteer staff and ambulance access are ready for emergencies.",
      "Trained volunteers are with every group: male volunteers with boys’ groups, female volunteers with girls’ groups and both with mixed groups.",
      "Safety equipment is ISI-marked. Bedding at hotels and tents is washed and clean.",
      "For camps longer than 5 days, CNA arranges mediclaim cover for the camp period at its own cost (members fill a form). For shorter trips we suggest personal travel insurance.",
      "Baggage and personal belongings stay at the owner’s risk.",
    ],
  },
  {
    id: "conduct",
    title: "Conduct and responsibility",
    body: [
      "The participant and the sending institution are responsible for the participant’s behaviour and valuables during the camp. Misconduct can lead to removal from the camp at the participant’s cost.",
    ],
  },
  {
    id: "liability",
    title: "Things outside our control",
    body: [
      "CNA is not responsible for delays, changes or extra costs caused by natural events, flight or train cancellations, breakdowns, weather, sickness, landslides, political closures, strikes or any other cause beyond our control, nor for loss, injury or damage arising from them.",
    ],
  },
  { id: "law", title: "Jurisdiction", body: ["These terms follow Indian law. Any dispute is subject to the courts of Rajkot, Gujarat."] },
  {
    id: "contact",
    title: "Questions",
    body: [
      <>
        Call or WhatsApp <PhoneLink contact={contact} />, or email <EmailLink contact={contact} />.
      </>,
    ],
  },
];

export const cancellationSections = (contact: SiteSettings): LegalSection[] => [
  {
    id: "charges",
    title: "Cancellation charges",
    body: ["If one person or several people from a group cancel for any reason, this part of the camp fee is kept:"],
    table: [
      ["When you cancel", "Charge"],
      ["2 months or more before the camp", "10%"],
      ["1 month before", "15%"],
      ["1 week before", "25%"],
      ["2 days before", "50%"],
      ["On the day of the camp", "100%"],
    ],
  },
  {
    id: "how",
    title: "How to cancel",
    body: [
      <>
        Tell us in writing on WhatsApp{" "}
        <a className={linkClass} href={contact.whatsappHref} target="_blank" rel="noopener">
          {contact.phone}
        </a>{" "}
        or by email to <EmailLink contact={contact} />. The date we receive your message is the cancellation date.
      </>,
    ],
  },
  {
    id: "refund",
    title: "Refunds",
    body: [
      "After the charge above, the rest of the amount paid is refunded to the person or institution that paid it. Refund timeline: to be confirmed by CNA.",
      "Train or air tickets already booked follow the railway or airline’s own cancellation rules.",
    ],
  },
  {
    id: "cna",
    title: "If CNA changes or cancels",
    body: [
      <>
        If we must cancel a camp, we offer another date or a refund. Changes caused by weather, roads, strikes or other events outside
        our control are explained in our{" "}
        <Link className={linkClass} href="/terms#liability">
          terms
        </Link>
        .
      </>,
    ],
  },
  { id: "olympiad", title: "Adventure Olympiad", body: ["Olympiad registration fees are non-refundable under any circumstances."] },
];

// Written for India's Digital Personal Data Protection Act, 2023. Needs legal review.
export const privacySections = (contact: SiteSettings): LegalSection[] => [
  {
    id: "who",
    title: "Who we are",
    body: [
      `${name} (CNA), ${contact.address.full}, backed by ${site.trust.name}. This policy explains what personal data we collect through this website and our camps, and how we use it.`,
    ],
  },
  {
    id: "what",
    title: "What we collect",
    list: [
      <>
        <strong>Enquiry forms:</strong> name, phone / WhatsApp number, email (optional), group type and size, trip interest and your
        message.
      </>,
      <>
        <strong>Camp registration:</strong> participant details, emergency contact, medical and fitness information, parent consent
        for under-18s, and the risk declaration.
      </>,
      <>
        <strong>Adventure Olympiad:</strong> student details, school or college, class and payment confirmation.
      </>,
      <>
        <strong>Photos:</strong> group photos taken at camps.
      </>,
    ],
  },
  {
    id: "why",
    title: "Why we use it",
    list: [
      "To reply to your enquiry and plan your trip.",
      "To book travel, stay and permits for your camp.",
      "To keep participants safe (medical and emergency information).",
      "To run the Olympiad and contact selected students.",
      "To share camp news, only if you agree.",
    ],
  },
  {
    id: "consent",
    title: "Your consent",
    body: [
      "We collect data only with your consent, given by ticking the box on our forms. For anyone under 18, a parent or guardian (or the school) gives consent. You can withdraw consent at any time by contacting us.",
    ],
  },
  {
    id: "share",
    title: "Who we share it with",
    body: [
      "Only with the people who help run your camp, such as transport, hotels, camp partners and insurers, and only what they need. We do not sell your data. We share data with authorities only when the law requires it.",
    ],
  },
  {
    id: "photos",
    title: "Photos on our website and social media",
    body: [
      "We publish camp photos only with consent. For under-18s, we ask a parent or the school first. Ask us any time to remove a photo of you or your child.",
    ],
  },
  {
    id: "keep",
    title: "How long we keep it",
    body: [
      "Enquiries: up to 2 years. Camp registration and safety records: as long as needed for the camp and legal requirements. After that we delete them. (Retention periods to be confirmed by CNA.)",
    ],
  },
  {
    id: "rights",
    title: "Your rights",
    list: [
      "See the data we hold about you.",
      "Correct or update it.",
      "Ask us to delete it.",
      "Withdraw consent.",
      "Raise a complaint with our grievance contact below, and then with the Data Protection Board of India.",
    ],
  },
  {
    id: "security",
    title: "Keeping it safe",
    body: [
      "Forms are sent over a secure connection and stored with access limited to the CNA team. Payment details are never collected through public pages.",
    ],
  },
  {
    id: "grievance",
    title: "Grievance contact",
    body: [
      <>
        Email <EmailLink contact={contact} /> or call <PhoneLink contact={contact} />. Grievance officer name: to be confirmed by CNA.
      </>,
    ],
  },
];
