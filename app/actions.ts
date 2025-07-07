'use server';

import { cookies } from 'next/headers';
import { type Locale } from './contexts/LocaleContext';

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  return (cookieStore.get('locale')?.value as Locale) || 'es';
}

export async function setLocale(locale: Locale) {
  const cookieStore = await cookies();
  cookieStore.set('locale', locale);
}