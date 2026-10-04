import path from "node:path";
import { fileURLToPath } from "node:url";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Batches } from "./cms/collections/Batches";
import { Enquiries } from "./cms/collections/Enquiries";
import { Faqs } from "./cms/collections/Faqs";
import { Media } from "./cms/collections/Media";
import { Posts } from "./cms/collections/Posts";
import { Reviews } from "./cms/collections/Reviews";
import { Trips } from "./cms/collections/Trips";
import { Users } from "./cms/collections/Users";
import { HomePage } from "./cms/globals/HomePage";
import { SiteSettings } from "./cms/globals/SiteSettings";

const dirname = path.dirname(fileURLToPath(import.meta.url));

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var ${name} (see .env.example)`);
  return value;
}

/**
 * Full DATABASE_URL wins. Otherwise built from parts so the password is URL-encoded safely:
 * MONGODB_HOSTS (+ MONGODB_REPLICA_SET) uses the standard format, which avoids the DNS SRV
 * lookup that fails on some Windows networks; MONGODB_HOST uses the Atlas SRV format.
 */
function databaseUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  const auth = `${encodeURIComponent(requireEnv("MONGODB_USER"))}:${encodeURIComponent(requireEnv("MONGODB_PASSWORD"))}`;
  const options = "retryWrites=true&w=majority&appName=Cluster0";
  if (process.env.MONGODB_HOSTS) {
    const replicaSet = requireEnv("MONGODB_REPLICA_SET");
    return `mongodb://${auth}@${process.env.MONGODB_HOSTS}/?tls=true&authSource=admin&replicaSet=${replicaSet}&${options}`;
  }
  return `mongodb+srv://${auth}@${requireEnv("MONGODB_HOST")}/?${options}`;
}

const siteUrl = requireEnv("NEXT_PUBLIC_SITE_URL").replace(/\/$/, "");

export default buildConfig({
  serverURL: siteUrl,
  secret: requireEnv("PAYLOAD_SECRET"),
  // Only our own origin may make authenticated (cookie) requests to the CMS API.
  csrf: [siteUrl],
  cors: [siteUrl],
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: " · CNA Camp admin", icons: [{ rel: "icon", type: "image/png", url: "/icon.png" }] },
  },
  collections: [Trips, Batches, Posts, Reviews, Faqs, Media, Enquiries, Users],
  globals: [HomePage, SiteSettings],
  editor: lexicalEditor(),
  db: mongooseAdapter({
    url: databaseUrl(),
    connectOptions: { dbName: process.env.MONGODB_DB ?? "cnacamp" },
  }),
  graphQL: { disable: true },
  upload: { limits: { fileSize: 10 * 1024 * 1024 } },
  sharp,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
