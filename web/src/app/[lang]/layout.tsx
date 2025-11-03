import React from 'react';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { getDictionary, i18n, localeConfig, type Locale } from '../../lib/i18n';
import ClientLayout from '../../components/ClientLayout';
import '../../app/globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap'
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params as { lang: Locale };
  const dict = await getDictionary(lang);
  const config = localeConfig[lang];
  const baseUrl = 'https://davdev.eu';
  
  // Generate alternate language URLs for hreflang
  const alternates = {
    canonical: `${baseUrl}/${lang}`,
    languages: Object.fromEntries(
      i18n.locales.map(locale => [locale, `${baseUrl}/${locale}`])
    ),
  };

  return {
    title: dict['seo.title'],
    description: dict['seo.description'],
    keywords: dict['seo.keywords'],
    authors: [{ name: 'DAV Development Team' }],
    creator: 'DAV Development',
    publisher: 'DAV Development',
    robots: {
      index: true,
      follow: true,
    },
    alternates,
    openGraph: {
      title: dict['seo.ogTitle'],
      description: dict['seo.ogDescription'],
      url: `${baseUrl}/${lang}`,
      siteName: 'DAV Development',
      locale: config.locale,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: dict['seo.ogTitle'],
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict['seo.twitterTitle'],
      description: dict['seo.twitterDescription'],
      creator: '@dav_development',
      site: '@dav_development',
      images: [`${baseUrl}/twitter-image.jpg`],
    },
    other: {
      'theme-color': '#0d1117',
      'application-name': 'DAV Development',
      'msapplication-TileColor': '#0d1117',
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Locale };
  return (
    <html lang={lang}>
      <head>
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "DAV Development",
              "description": "Professional web development team specializing in modern web applications, mobile development, and digital solutions",
              "url": "https://davdev.eu",
              "knowsAbout": [
                "Web Development",
                "Mobile Applications",
                "React",
                "TypeScript",
                "Next.js",
                "Node.js",
                "UI/UX Design",
                "Performance Optimization",
                "Cloud DevOps",
                "AI Integration"
              ],
              "offers": {
                "@type": "Offer",
                "description": "Professional web development services including modern web applications, mobile apps, UI/UX design, performance audits, cloud solutions, and AI integration"
              },
              "founder": {
                "@type": "Person",
                "name": "David"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ClientLayout lang={lang}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
