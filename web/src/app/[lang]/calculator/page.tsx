import React from 'react';
import { i18n } from '../../../lib/i18n';
import CalculatorPageClient from './calculator-client';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function CalculatorPage() {
  return <CalculatorPageClient />;
}
