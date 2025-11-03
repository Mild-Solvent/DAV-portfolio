import React from 'react';
import { getDictionary, i18n, localeConfig, type Locale } from '../../lib/i18n';
import ClientLayout from '../../components/ClientLayout';
import '../../app/globals.css';
import type { Metadata } from 'next';

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
    <ClientLayout lang={lang}>
      {children}
    </ClientLayout>
  );
}
