"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import type { Locale } from '../lib/i18n';

// Supported languages
export type Language = Locale;

export interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', flag: 'us' },
  { code: 'sk', name: 'Slovenčina', flag: 'sk' },
];

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isLoading: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
  initialLang?: Language;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children, initialLang = 'en' }) => {
  const [language, setLanguage] = useState<Language>(initialLang);
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load translations for the current language
  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/locales/${language}.json`);
        if (response.ok) {
          const data = await response.json();
          setTranslations(data);
        } else {
          console.warn(`Failed to load translations for ${language}, falling back to English`);
          if (language !== 'en') {
            const fallbackResponse = await fetch('/locales/en.json');
            if (fallbackResponse.ok) {
              const fallbackData = await fallbackResponse.json();
              setTranslations(fallbackData);
            }
          }
        }
      } catch (error) {
        console.error('Error loading translations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [language]);

  // Don't auto-detect language on mount - use initialLang from URL instead
  // This ensures static builds with URL-based routing work correctly

  // Save language preference
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[key] || key;
  };

  const value: TranslationContextType = {
    language,
    setLanguage: handleSetLanguage,
    t,
    isLoading,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};