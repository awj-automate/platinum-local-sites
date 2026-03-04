import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title:
    "Platinum Local Sites | Professional Websites for Local Businesses — $99/mo",
  description:
    "Get a custom-built, high-performance website designed to bring you new customers. Delivered in 2-3 days, unlimited revisions, fully managed. From $99/mo with no contracts.",
  keywords: [
    "local business website",
    "affordable web design",
    "small business website",
    "website for local business",
    "web design agency",
    "$99 website",
  ],
  openGraph: {
    title: "Platinum Local Sites | Websites That Get You Customers",
    description:
      "Custom-built websites for local businesses. Delivered in 2-3 days, fully managed, $99/mo. No contracts.",
    type: "website",
    locale: "en_US",
    url: "https://platinumlocalsites.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Platinum Local Sites | $99/mo Websites for Local Businesses",
    description:
      "Custom-built websites that actually get you customers. 2-3 day delivery, unlimited revisions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Platinum Local Sites",
              description:
                "Professional web design agency specializing in affordable websites for local businesses.",
              priceRange: "$99/mo",
              areaServed: "United States",
              serviceType: "Web Design",
            }),
          }}
        />
      </head>
      <body className="font-[family-name:var(--font-inter)] antialiased">
        {children}
      </body>
    </html>
  );
}
