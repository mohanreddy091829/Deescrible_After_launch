import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Caveat, Noto_Serif_Display } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
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

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
  weight: ["400", "700"],
});

const TITLE = "Dedeepya Abbagani | Branding Expert & Strategy Consultant";
const DESCRIPTION =
  "Strategy and brand storytelling for FMCG, technology and founder brands — and the creator behind Deescribble, a 300K+ community. Based in Hyderabad.";

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
  keywords: ["Dedeepya Abbagani", "Branding Expert", "Strategy Consultant", "Brand Strategy", "Content Strategy", "Deescribble", "FMCG Marketing", "Founder Branding", "Hyderabad"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Dedeepya Abbagani",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Dedeepya Abbagani — Branding Expert & Strategy Consultant" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og-image.jpg"] },
  icons: { icon: "/favicon.ico" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dedeepya Abbagani",
  url: SITE_URL,
  jobTitle: "Branding Expert & Strategy Consultant",
  description: DESCRIPTION,
  image: `${SITE_URL}/og-image.jpg`,
  address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressCountry: "IN" },
  sameAs: [
    "https://www.instagram.com/deescribble_/",
    "https://www.linkedin.com/in/dedeepya-abbagani/",
    "https://www.youtube.com/@deescribble",
  ],
  knowsAbout: ["Brand strategy", "FMCG marketing", "Content strategy", "Founder branding", "Community building"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${plusJakarta.variable} ${caveat.variable} ${display.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#F8ECE2] text-[#141211] font-sans antialiased selection:bg-[#C78B87]/25 selection:text-[#141211]">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
