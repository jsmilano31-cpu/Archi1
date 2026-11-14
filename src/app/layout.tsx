import type { Metadata, Viewport } from 'next';
import { Manrope, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const sans = Manrope({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-serif', display: 'swap' });
const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: 'The Courtyard House — Form & Field',
  description: 'An illustrative architectural study in light, stillness, and the spaces in between. Explore the concept, spaces, and materials of The Courtyard House.',
  robots: { index: allowIndexing, follow: allowIndexing },
  ...(siteUrl ? { alternates: { canonical: '/' } } : {}),
  openGraph: { title: 'The Courtyard House', description: 'A study in light, stillness, and the spaces in between. Illustrative architectural concept.', type: 'website', ...(siteUrl ? { images: [{ url: '/images/house.webp', width: 1536, height: 1024, alt: 'The Courtyard House — illustrative concept' }] } : {}) },
  twitter: { card: 'summary_large_image', title: 'The Courtyard House — Form & Field' },
};

export const viewport: Viewport = { themeColor: '#10110f', colorScheme: 'dark' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${sans.variable} ${serif.variable}`}><body><a href="#main" className="skip-link">Skip to content</a>{children}</body></html>;
}
