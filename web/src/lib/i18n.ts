export type Locale = 'en' | 'sk';

export const i18n = {
  defaultLocale: 'en' as Locale,
  locales: ['en', 'sk'] as Locale[],
} as const;

export interface Dictionary {
  [key: string]: string;
}

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('../../public/locales/en.json').then((module) => module.default),
  sk: () => import('../../public/locales/sk.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  if (!i18n.locales.includes(locale)) {
    return dictionaries[i18n.defaultLocale]();
  }
  return dictionaries[locale]();
};

// Locale metadata for SEO
export const localeNames: Record<Locale, string> = {
  en: 'English',
  sk: 'Slovenčina',
};

export const localeConfig: Record<Locale, { hreflang: string; locale: string }> = {
  en: { hreflang: 'en', locale: 'en_US' },
  sk: { hreflang: 'sk', locale: 'sk_SK' },
};
