import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SITE_URL, ALLOW_INDEXING } from "@/lib/site";
import "./globals.css";

// One family for the whole site (the clean, neutral grotesque used by product and SaaS sites).
// The optical-size axis switches to the display cut automatically at large sizes.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  axes: ["opsz"],
});

const TITLE = "Dedeepya Abbagani | Brand storyteller & community builder";
const DESCRIPTION =
  "Brand voice, storytelling and community for consumer brands, B2B companies and founders. From political campaigns to HUL brands to 300K+ followers on Deescribble.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#5A0B12",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | Dedeepya Abbagani" },
  description: DESCRIPTION,
  applicationName: "Dedeepya Abbagani",
  authors: [{ name: "Dedeepya Abbagani", url: SITE_URL }],
  creator: "Dedeepya Abbagani",
  keywords: ["Dedeepya Abbagani", "Brand Storyteller", "Community Builder", "Brand Strategy", "Content Strategy", "Deescribble", "FMCG Marketing", "Founder Branding", "Hyderabad"],
  alternates: { canonical: "/" },
  robots: ALLOW_INDEXING
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
    : { index: false, follow: false },
  category: "Marketing & Branding",
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Dedeepya Abbagani",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Dedeepya Abbagani — Brand storyteller & community builder" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og-image.jpg"] },
  icons: { icon: "/favicon.ico" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Dedeepya Abbagani",
      url: SITE_URL,
      jobTitle: "Brand storyteller & community builder",
      description: DESCRIPTION,
      image: `${SITE_URL}/og-image.jpg`,
      address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressCountry: "IN" },
      sameAs: [
        "https://www.instagram.com/deescribble_/",
        "https://www.linkedin.com/in/dedeepya-abbagani/",
        "https://www.youtube.com/@deescribble",
      ],
      knowsAbout: ["Brand strategy", "FMCG marketing", "Content strategy", "Founder branding", "Community building", "Storytelling"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Dedeepya Abbagani",
      description: DESCRIPTION,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#F8ECE2] text-[#141211] font-sans antialiased selection:bg-[#C78B87]/25 selection:text-[#141211]">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
