import type { GlobalConfig } from "payload";
import { anyone, signedIn } from "../access";
import { revalidateGlobal } from "../hooks/revalidate";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  access: { read: anyone, update: signedIn },
  hooks: { afterChange: revalidateGlobal(["/"]) },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Contact",
          fields: [
            {
              type: "row",
              fields: [
                { name: "phone", type: "text", required: true, admin: { description: "Displayed, e.g. +91 70463 61009" } },
                { name: "whatsappNumber", type: "text", required: true, admin: { description: "Digits with country code, e.g. 917046361009" } },
              ],
            },
            { name: "whatsappMessage", type: "text", defaultValue: "Hi CNA, I want to know about your trips" },
            {
              name: "emails",
              type: "text",
              hasMany: true,
              required: true,
              validate: (value: string[] | null | undefined) =>
                (value ?? []).every((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) || "Enter valid email addresses.",
            },
            { name: "address", type: "textarea", required: true },
            { name: "officeHours", type: "text" },
            { name: "mapUrl", type: "text", admin: { description: "Google Maps link to the office." } },
          ],
        },
        {
          label: "Social",
          fields: [
            {
              name: "social",
              type: "array",
              fields: [
                {
                  name: "platform",
                  type: "select",
                  required: true,
                  options: ["Instagram", "Facebook", "YouTube", "X", "LinkedIn"].map((p) => ({ label: p, value: p.toLowerCase() })),
                },
                { name: "url", type: "text", admin: { description: "Leave empty to show the label without a link." } },
              ],
            },
          ],
        },
        {
          label: "Numbers",
          fields: [
            {
              type: "row",
              fields: [
                { name: "campersCount", type: "text", required: true, defaultValue: "1,00,000+" },
                { name: "campsCount", type: "text", required: true, defaultValue: "1,000+" },
                { name: "activitiesCount", type: "number", required: true, defaultValue: 10 },
              ],
            },
          ],
        },
        {
          label: "Announcement",
          fields: [
            { name: "announcement", type: "text", admin: { description: "Optional text for the top strip. Empty shows the default." } },
          ],
        },
      ],
    },
  ],
};
