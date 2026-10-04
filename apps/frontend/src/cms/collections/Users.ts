import type { Access, CollectionBeforeValidateHook, CollectionConfig } from "payload";
import { ValidationError } from "payload";

const isProduction = process.env.NODE_ENV === "production";

const self: Access = ({ req: { user } }) => (user ? { id: { equals: user.id } } : false);

const MIN_PASSWORD_LENGTH = 12;

/** Runs before Payload hashes the password, so the raw value can be checked. */
const enforcePasswordPolicy: CollectionBeforeValidateHook = ({ data, collection }) => {
  const password = data?.password;
  if (typeof password !== "string" || !password) return data;

  const email = String(data?.email ?? "").toLowerCase();
  const problems: string[] = [];
  if (password.length < MIN_PASSWORD_LENGTH) problems.push(`be at least ${MIN_PASSWORD_LENGTH} characters`);
  if (!/[a-z]/i.test(password) || !/\d/.test(password)) problems.push("include letters and numbers");
  if (email && password.toLowerCase().includes(email.split("@")[0])) problems.push("not contain your email name");
  if (/^(.)\1+$/.test(password) || /password|cnacamp|123456|qwerty/i.test(password)) problems.push("not be a common password");

  if (problems.length) {
    throw new ValidationError({
      collection: collection.slug,
      errors: [{ path: "password", message: `Password must ${problems.join("; ")}.` }],
    });
  }
  return data;
};

/**
 * Single admin account with full access. It is created once through /admin's first-user
 * screen (which Payload allows only while no user exists); no further accounts can be
 * added, and it can't be deleted, so the admin can never be locked out.
 */
export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Admin account", plural: "Admin account" },
  admin: { useAsTitle: "email", defaultColumns: ["name", "email"] },
  auth: {
    useSessions: true,
    tokenExpiration: 2 * 60 * 60,
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    removeTokenFromResponses: true,
    cookies: { secure: isProduction, sameSite: "Strict" },
    forgotPassword: { expiration: 30 * 60 * 1000 },
  },
  hooks: { beforeValidate: [enforcePasswordPolicy] },
  access: {
    create: () => false,
    delete: () => false,
    read: self,
    update: self,
  },
  fields: [{ name: "name", type: "text", required: true }],
};
