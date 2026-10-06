import { olympiad } from "@/content/olympiad";

export type RegistrationStatus = "soon" | "open" | "closed";

/** Registration window from the Olympiad dates; the page re-renders hourly so this stays current. */
export function registrationStatus(now: Date = new Date()): RegistrationStatus {
  const t = now.getTime();
  if (t < Date.parse(olympiad.opens)) return "soon";
  return t > Date.parse(olympiad.closes) ? "closed" : "open";
}
