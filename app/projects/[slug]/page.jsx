// app/projects/[slug]/page.js
import { getProjectData } from '@/lib/projects';
import { notFound } from 'next/navigation';
import ProjectDetailClient from './ProjectDetailClient';
import { BASE_URL } from '@/lib/constants';

export async function generateMetadata({ params, searchParams }) {
  const locale = (searchParams?.locale === 'en' || searchParams?.locale === 'es' ? searchParams.locale : null) || 'es';
  const projectData = await getProjectData(params.slug, locale);
  
  if (!projectData) {
    return { title: 'Proyecto no encontrado' };
  }
  
  const imageUrlAbsolute = projectData.imageUrl
    ? new URL(projectData.imageUrl, BASE_URL).toString()
    : undefined;
  const projectPath = `/projects/${params.slug}`;
  const alternates = {};
  const availableLocales = ['es', 'en'];
  
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

export default async function Page({ params, searchParams }) {
  const initialLocale = (searchParams?.locale === 'en' || searchParams?.locale === 'es' ? searchParams.locale : null) || 'es';
  const projectData = await getProjectData(params.slug, initialLocale);
  
  if (!projectData) {
    notFound();
  }
  
  return <ProjectDetailClient initialProjectData={projectData} />;
}