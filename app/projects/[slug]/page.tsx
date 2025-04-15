import Link from 'next/link';
import { getProjectData } from '@/lib/projects';
import { notFound } from 'next/navigation';
import ProjectDetailClient from './ProjectDetailClient';
import type { ProjectData } from '@/lib/projects';
import type { Locale } from '@/app/contexts/LocaleContext';
import { translations } from '@/lib/translations';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string; locale?: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale || 'es';
  const projectData = await getProjectData(params.slug, locale);

  if (!projectData) {
    return {
      title: 'Proyecto no encontrado',
    };
  }

  return {
    title: projectData.title,
    description: projectData.summary,
    openGraph: projectData.imageUrl ? {
        images: [{ url: new URL(projectData.imageUrl, process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000').toString() }],
    } : undefined,
     alternates: {
         languages: {
           'es': `${process.env.NEXT_PUBLIC_BASE_URL}/es/projects/${params.slug}`,
           'en': `${process.env.NEXT_PUBLIC_BASE_URL}/en/projects/${params.slug}`,
         },
     },
  };
}


export default async function ProjectDetailPage({ params }: Props) {
  const initialLocale: Locale = params.locale || 'es';
  const dict = translations[initialLocale];

  const projectData = await getProjectData(params.slug, initialLocale);

  if (!projectData) {
     notFound();
  }

  return <ProjectDetailClient initialProjectData={projectData} />;
}
