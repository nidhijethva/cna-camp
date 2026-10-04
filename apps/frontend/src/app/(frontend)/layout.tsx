import type { Metadata, Viewport } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import { ContactShortcuts } from "@/components/layout/ContactShortcuts";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { FOUNDED_YEAR, site } from "@/content/site";
import { absoluteUrl, isIndexable, siteUrl } from "@/lib/seo";
import { themeColors } from "@/lib/theme";
import "./globals.css";

const heading = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-heading", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | ${site.shortTagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    url: "/",
    images: [{ url: "/img/valley-wide.jpg", width: 1440, height: 810, alt: "Trekkers in a Himalayan valley with CNA Camp" }],
  },
  twitter: { card: "summary_large_image" },
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: themeColors.dark,
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": absoluteUrl("/#organization"),
  name: site.legalName,
  alternateName: site.name,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/img/logo.png"),
  image: absoluteUrl("/img/valley-wide.jpg"),
  description: site.description,
  foundingDate: String(FOUNDED_YEAR),
  telephone: site.phoneHref.replace("tel:", ""),
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  areaServed: "IN",
  sameAs: site.social.flatMap((s) => (s.href ? [s.href] : [])),
  parentOrganization: { "@type": "NGO", name: site.trust.name },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${heading.variable} ${body.variable}`}>
      <body className="min-h-screen pb-16 lg:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-light focus:p-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ContactShortcuts />
        <JsonLd data={organizationLd} />
      </body>
    </html>
  );
}
