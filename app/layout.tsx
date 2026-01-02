import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

// Prevent Font Awesome from adding its CSS since we did it manually above
config.autoAddCss = false;

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'A&N Global Exchange - Currency Exchange in Nicosia, Cyprus',
    template: '%s | A&N Global Exchange',
  },
  description:
    "Get real-time exchange rates, send money worldwide, and enjoy zero-commission fees with Cyprus's trusted exchange partner on Ledra Street, Nicosia.",
  keywords: [
    'currency exchange',
    'money transfer',
    'Nicosia',
    'Cyprus',
    'Ledra Street',
    'forex',
    'EUR',
    'USD',
    'GBP',
    'TRY',
    'zero commission',
  ],
  authors: [{ name: 'A&N Global Exchange' }],
  openGraph: {
    title: 'A&N Global Exchange - Currency Exchange Made Simple',
    description:
      'Zero-commission currency exchange and international money transfers in Nicosia, Cyprus.',
    url: 'https://aandnglobal.com',
    siteName: 'A&N Global Exchange',
    locale: 'en_CY',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
