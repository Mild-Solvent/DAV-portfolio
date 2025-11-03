'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { i18n } from '../lib/i18n';

export default function RootPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Detect user's preferred language from browser
    const browserLang = navigator.language.split('-')[0];
    const targetLang = i18n.locales.includes(browserLang as 'en' | 'sk') 
      ? browserLang 
      : i18n.defaultLocale;
    
    // Redirect to detected or default language
    router.replace(`/${targetLang}`);
  }, [router]);
  
  return null;
}
