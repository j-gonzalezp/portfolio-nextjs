'use server';

import { getProjectData } from '@/lib/projects';
import { type Locale } from '@/app/contexts/LocaleContext';

export async function getProjectDataAction(slug: string, locale: Locale) {
  return getProjectData(slug, locale);
}