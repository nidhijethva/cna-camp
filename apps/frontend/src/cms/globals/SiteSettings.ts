import type { GlobalConfig } from "payload";
import { anyone, signedIn } from "../access";
import { httpUrl } from "../fields";
import { revalidateSiteGlobal } from "../hooks/revalidate";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  admin: { group: "Settings", description: "Contact details and numbers used across the whole site." },
  access: { read: anyone, update: signedIn },
  hooks: revalidateSiteGlobal,
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
                { name: "phone", type: "text", required: true, admin: { description: "As shown, e.g. +91 70463 61009" } },
                {
                  name: "whatsappNumber",
                  type: "text",
                  required: true,
                  validate: (value: unknown) => /^\d{11,15}$/.test(String(value ?? "")) || "Digits only, with country code, e.g. 917046361009",
                  admin: { description: "Digits with country code, e.g. 917046361009" },
                },
              ],
            },
            { name: "whatsappMessage", type: "text", required: true, admin: { description: "Pre-filled message when someone taps WhatsApp." } },
            {
              type: "row",
              fields: [
                { name: "email", type: "email", required: true, admin: { description: "Main email for enquiries." } },
                { name: "trustEmail", type: "email", admin: { description: "Trust office email (Contact page)." } },
              ],
            },
            {
              name: "address",
              type: "group",
              fields: [
                { name: "street", type: "text", required: true },
                {
                  type: "row",
                  fields: [
                    { name: "city", type: "text", required: true },
                    { name: "state", type: "text", required: true },
                    { name: "postalCode", type: "text", required: true },
                  ],
                },
              ],
            },
            { name: "mapUrl", type: "text", validate: httpUrl, admin: { description: "Google Maps link to the office." } },
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
                  type: "row",
                  fields: [
                    {
                      name: "platform",
                      type: "select",
                      required: true,
                      options: ["Instagram", "Facebook", "YouTube", "X", "LinkedIn"].map((p) => ({ label: p, value: p })),
                    },
                    { name: "url", type: "text", validate: httpUrl, admin: { description: "Leave empty to show the name without a link." } },
                  ],
                },
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
                { name: "campersCount", type: "text", required: true, admin: { description: "e.g. 1,00,000+" } },
                { name: "campsCount", type: "text", required: true, admin: { description: "e.g. 1,000+" } },
              ],
            },
          ],
        },
      ],
    },
  ],
};
