import type { Metadata, Viewport } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const indexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: "The Residence — A home, considered",
  description:
    "Explore the proposed residence through 48 architectural perspectives: the arrival, shared living spaces, private rooms and covered balcony.",
  robots: { index: indexing, follow: indexing },
  ...(siteUrl ? { alternates: { canonical: "/" } } : {}),
  openGraph: {
    title: "The Residence",
    description:
      "A closer look at life ahead. Architectural design presentation.",
    type: "website",
    ...(siteUrl
      ? {
          images: [
            {
              url: "/residence/exterior-perspective-2-1920.webp",
              width: 1920,
              height: 1641,
              alt: "The complete exterior of the proposed residence",
            },
          ],
        }
      : {}),
  },
  twitter: { card: "summary_large_image", title: "The Residence" },
};
export const viewport: Viewport = {
  themeColor: "#171c17",
  colorScheme: "dark light",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={sans.variable + " " + serif.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
