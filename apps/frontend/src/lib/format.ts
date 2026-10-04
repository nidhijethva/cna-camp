const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
const isoDateInIndia = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" });

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export const formatNumber = (n: number) => inr.format(n);

export const formatPrice = (price: number | null | undefined) =>
  price == null ? "On request" : `₹${inr.format(price)}`;

/** Today's date as YYYY-MM-DD in IST, regardless of server timezone. */
export const todayInIndia = () => isoDateInIndia.format(new Date());

/** "2026-10-17" → { day: "17", month: "OCT" }, parsed as text to avoid timezone shifts. */
export function splitDate(iso: string) {
  const [, m, d] = iso.split("-");
  return { day: d, month: MONTHS[Number(m) - 1] };
}
