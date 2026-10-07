import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/components/layout/AppShell';

export const metadata: Metadata = {
  metadataBase: new URL('https://aarzeestore.com'),
  title: {
    default: 'AARZEE STORE | Premium Perfumes & Attars',
    template: '%s | AARZEE STORE',
  },
  description:
    'Discover premium perfumes and traditional attars from AARZEE STORE. Explore luxury fragrances crafted to leave a lasting impression.',
  keywords: [
    'Aarzee Store',
    'Luxury Perfumes',
    'Indian Attar',
    'Pure Oud Oil',
    'Extrait de Parfum',
    'Kannauj Perfume',
    'Royal Fragrance',
    'Traditional Non Alcoholic Attar',
  ],
  authors: [{ name: 'AARZEE STORE Haute Parfumerie' }],
  creator: 'AARZEE STORE',
  publisher: 'AARZEE STORE',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'AARZEE STORE | Premium Perfumes & Attars',
    description:
      'Discover premium perfumes and traditional attars from AARZEE STORE. Explore luxury fragrances crafted to leave a lasting impression.',
    url: 'https://aarzeestore.com',
    siteName: 'AARZEE STORE',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 800,
        alt: 'AARZEE STORE Luxury Identity',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AARZEE STORE | Premium Perfumes & Attars',
    description:
      'Discover premium perfumes and traditional attars from AARZEE STORE. Explore luxury fragrances crafted to leave a lasting impression.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AARZEE STORE',
    url: 'https://aarzeestore.com',
    logo: 'https://aarzeestore.com/logo.png',
    description: 'Haute Parfumerie & Traditional Indian Attar House',
    sameAs: [
      'https://instagram.com/aarzeestore',
      'https://facebook.com/aarzeestore',
      'https://youtube.com/@aarzeestore',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9876543210',
      contactType: 'Customer Concierge',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AARZEE STORE',
    url: 'https://aarzeestore.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://aarzeestore.com/shop?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="bg-[#050505] text-[#F5F2EE] antialiased selection:bg-brand-red selection:text-white">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
