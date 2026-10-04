import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { PageLoader } from "@/components/PageLoader";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteConfig } from "@/data/portfolio";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.metaTitle,
  description: siteConfig.metaDescription,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  alternates: { canonical: "/" },
  verification: { google: "9nOCuWaU-LANvdMJJP1IJkLCEO1OxId1ky4B8mkWtec" },
  openGraph: {
    title: siteConfig.metaTitle,
    description: siteConfig.metaDescription,
    url: "/",
    siteName: siteConfig.name,
    type: "profile",
    firstName: "Ravi",
    lastName: "Yadav",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.metaTitle,
    description: siteConfig.metaDescription,
  },
};

/** Structured data so Google can show a profile card (name, photo, links) for searches of your name. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.siteUrl,
  image: `${siteConfig.siteUrl}${siteConfig.profileImage}`,
  email: `mailto:${siteConfig.email}`,
  jobTitle: "AI/ML Researcher",
  description: siteConfig.metaDescription,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Newton School of Technology, Rishihood University",
  },
  address: { "@type": "PostalAddress", addressLocality: "Jaipur", addressRegion: "Rajasthan", addressCountry: "IN" },
  knowsAbout: [
    "Machine Learning",
    "Deep Learning",
    "Time Series Forecasting",
    "Physics-Informed Machine Learning",
    "Power Systems",
    "Computer Vision",
    "Full-Stack Development",
  ],
  sameAs: Object.values(siteConfig.social),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} ${jetbrains.variable} min-h-[100dvh] overflow-x-hidden font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          <PageLoader>{children}</PageLoader>
        </ThemeProvider>
      </body>
    </html>
  );
}
