export type EnquiryVariant = "quick" | "trip" | "group";

export const enquiryMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const as readonly string[];

export const enquiryDays = ["1-2 days", "3-4 days", "5-7 days", "8+ days"] as readonly string[];

export const enquiryInterests = [
  "Trekking",
  "Camping",
  "Rock climbing",
  "River rafting",
  "Wildlife",
  "Marine life",
  "Bird watching",
  "Star gazing",
  "Snow",
  "Nature learning (EVS)",
] as readonly string[];
