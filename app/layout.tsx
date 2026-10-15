import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Noto_Serif_Display, Bricolage_Grotesque, Montserrat } from "next/font/google";
import { SITE_URL, ALLOW_INDEXING } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

// Bold grotesque reserved for the hero role line, deliberately unlike every other face on the page.
const role = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-role",
  display: "swap",
  weight: "variable",
  axes: ["opsz", "wdth"],
});

// Clean geometric sans for her name plate on the portrait.
const nameFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-name",
  display: "swap",
  weight: ["300", "800"],
});

// Condensed high-contrast Didone used for the hero name (width axis keeps it tight like the design).
const display = Noto_Serif_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["wdth"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
      className={`${playfair.variable} ${plusJakarta.variable} ${display.variable} ${role.variable} ${nameFont.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#F8ECE2] text-[#141211] font-sans antialiased selection:bg-[#C78B87]/25 selection:text-[#141211]">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
