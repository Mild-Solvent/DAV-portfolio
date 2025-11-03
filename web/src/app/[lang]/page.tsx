import React from 'react';
import { i18n } from '../../lib/i18n';
import LangHomeClient from './page-wrapper';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function LangHome() {
  return <LangHomeClient />;
}
