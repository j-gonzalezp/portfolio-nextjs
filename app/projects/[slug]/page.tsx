// app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Locale } from '@/app/contexts/LocaleContext';
import { getProjectData, getAllProjectSlugs } from '@/lib/projects';
import type { ProjectData } from '@/lib/projects';
import ProjectDetailClient from './ProjectDetailClient';
import { BASE_URL } from '@/lib/constants';
import { translations } from '@/lib/translations';

// --- TIPADO ACTUALIZADO PARA PARAMS Y SEARCHPARAMS ---
interface PageParams {
  slug: string;
}

// Tipado para el objeto que resuelve searchParams
type SearchParams = { [key: string]: string | string[] | undefined };

interface PageProps {
  params: Promise<PageParams>; // params es una Promesa
  searchParams?: Promise<SearchParams>; // searchParams TAMBIÉN es una Promesa (opcional)
}
// --- FIN TIPADO ACTUALIZADO ---

export async function generateStaticParams(): Promise<PageParams[]> {
  const slugs = await getAllProjectSlugs();
  return slugs;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  // --- AWAIT PARAMS Y SEARCHPARAMS ---
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {}; // Esperar y manejar undefined
  // --- FIN AWAIT ---

  // Usar resolvedSearchParams para obtener locale
  const locale: Locale =
    resolvedSearchParams?.locale === 'en' || resolvedSearchParams?.locale === 'es'
      ? resolvedSearchParams.locale as Locale // Asegurar tipo Locale
      : 'es';

  // Usar resolvedParams.slug
  const projectData: ProjectData | null = await getProjectData(resolvedParams.slug, locale);

  if (!projectData) {
    return { title: 'Proyecto no encontrado' };
  }

  const imageUrlAbsolute = projectData.imageUrl
    ? new URL(projectData.imageUrl, BASE_URL).toString()
    : undefined;
  // Usar resolvedParams.slug
  const projectPath = `/projects/${resolvedParams.slug}`;

  const alternates: Record<string, string> = {};
  const availableLocales: Locale[] = Object.keys(translations) as Locale[];
  availableLocales.forEach(loc => {
    const langCodeForAlternate = loc === 'es' ? 'es-CL' : 'en-US';
    alternates[langCodeForAlternate] = `${BASE_URL}${projectPath}`;
  });

  return {
    title: projectData.title,
    description: projectData.summary,
    openGraph: {
        title: projectData.title,
        description: projectData.summary,
        url: `${BASE_URL}${projectPath}`,
        images: imageUrlAbsolute ? [{ url: imageUrlAbsolute }] : undefined,
        type: 'article',
     },
    twitter: {
        card: 'summary_large_image',
        title: projectData.title,
        description: projectData.summary,
        images: imageUrlAbsolute ? [imageUrlAbsolute] : undefined,
    },
    alternates: {
         canonical: `${BASE_URL}${projectPath}`,
         languages: alternates,
     },
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  // --- AWAIT PARAMS Y SEARCHPARAMS ---
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {}; // Esperar y manejar undefined
  // --- FIN AWAIT ---

  // Usar resolvedSearchParams para obtener locale
  const initialLocale: Locale =
     resolvedSearchParams?.locale === 'en' || resolvedSearchParams?.locale === 'es'
       ? resolvedSearchParams.locale as Locale // Asegurar tipo Locale
       : 'es';

  // Usar resolvedParams.slug
  const projectData: ProjectData | null = await getProjectData(resolvedParams.slug, initialLocale);

  if (!projectData) {
    notFound();
  }

  return <ProjectDetailClient initialProjectData={projectData ?? undefined} />;
}