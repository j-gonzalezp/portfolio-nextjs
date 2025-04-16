// app/projects/[slug]/ProjectDetailClient.tsx
'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLocale } from '@/app/contexts/LocaleContext';
import { translations } from '@/lib/translations';
import type { ProjectData } from '@/lib/projects';
import type { Locale } from '@/app/contexts/LocaleContext';
import React from 'react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

import ProjectImage from '@/app/components/projects/ProjectImage';
import ProjectHeader from '@/app/components/projects/ProjectHeader';
import ProjectActions from '@/app/components/projects/ProjectActions';
import ProjectTechStack from '@/app/components/projects/ProjectTechStack';
import ProjectContent from '@/app/components/projects/ProjectContent';
import AgileProgressDisplay from '@/app/components/AgileProgressDisplay';
import SectionTitle from '@/app/components/layout/SectionTitle';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';

interface ProjectDetailClientProps {
  initialProjectData: ProjectData | undefined;
}

export default function ProjectDetailClient({ initialProjectData }: ProjectDetailClientProps) {
  const { locale } = useLocale();
  const [project, setProject] = useState<ProjectData | undefined>(initialProjectData);
  const [isLoadingLocale, setIsLoadingLocale] = useState<boolean>(false);
  const [errorLoadingLocale, setErrorLoadingLocale] = useState<string | null>(null);

  useEffect(() => {
    const detectLocaleFromData = (data: ProjectData): Locale | null => {
      if (!data?.title) return null;
      return data.title.includes('Aplicación') || data.summary.includes('Aplicación') ? 'es' : 'en';
    }

    const fetchAndSetProjectData = async (slug: string, newLocale: Locale) => {
        setIsLoadingLocale(true);
        setErrorLoadingLocale(null);
        console.log(`Attempting to fetch data for slug: ${slug}, locale: ${newLocale}`);
        try {
            await new Promise(resolve => setTimeout(resolve, 750));
            throw new Error("Client-side locale fetching not implemented");

        } catch (error) {
            console.error(`Error fetching project data for locale ${newLocale}:`, error);
            setErrorLoadingLocale(`No se pudieron cargar los datos para ${newLocale === 'es' ? 'Español' : 'Inglés'}. Mostrando versión anterior.`);
        } finally {
            setIsLoadingLocale(false);
        }
    };

    const currentLocaleDetected = project ? detectLocaleFromData(project) : null;

    if(locale === currentLocaleDetected) {
        // If locale matches current data, clear any previous loading error
        if (errorLoadingLocale) setErrorLoadingLocale(null);
        return; // No need to do anything else
    }

    // Locale has changed AND is different from current data's locale
    if (project?.slug && !isLoadingLocale) {
        // Attempt to fetch data for the new locale
        fetchAndSetProjectData(project.slug, locale);
    }

    // This part handles setting initial state correctly on first render or if initialData changes
    // But only if it's different from the current project slug to avoid unnecessary updates
    if (initialProjectData && project?.slug !== initialProjectData.slug) {
       setProject(initialProjectData);
       // Reset error when receiving completely new initial data for a different project
       setErrorLoadingLocale(null);
    }

  // Add 'errorLoadingLocale' to the dependency array
  }, [locale, initialProjectData, project, isLoadingLocale, errorLoadingLocale]); // <--- AÑADIDO AQUÍ

  const currentDict = translations[locale];

  if (!project && !isLoadingLocale) {
      return <div className="text-center py-20 text-[var(--text-error)] font-semibold flex flex-col items-center gap-3"><AlertTriangle size={32}/>Error: Datos del proyecto no disponibles.</div>;
  }
    if (!project && isLoadingLocale) {
     return <div className="flex flex-col items-center justify-center min-h-[400px] text-[var(--text-subtle)]"><LoadingSpinner /><p className="mt-4">Cargando proyecto...</p></div>;
  }
  if (!project) return null;

  const { title, summary, tags, content, repoUrl, liveUrl, imageUrl, currentFocus, localizedChangelog, stories, isAcademic } = project;

  return (
    <article className="max-w-4xl mx-auto relative">
       {isLoadingLocale && (
           <div className="absolute top-4 right-4 z-10 bg-[var(--bg-subtle)] text-[var(--text-subtle)] p-2 rounded-md shadow-md text-xs flex items-center gap-2 animate-pulse">
               <LoadingSpinner /> Cargando {locale === 'es' ? 'Español' : 'English'}...
           </div>
       )}
       {errorLoadingLocale && (
          <div role="alert" className="mb-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md flex items-start gap-3">
             <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
             <p className="text-sm">{errorLoadingLocale}</p>
          </div>
        )}

       <ProjectImage imageUrl={imageUrl} title={title} dict={currentDict} />
       <ProjectHeader title={title} summary={summary} isAcademic={isAcademic} dict={currentDict} />
       <ProjectActions liveUrl={liveUrl} repoUrl={repoUrl} dict={currentDict} />
       <ProjectTechStack tags={tags} dict={currentDict} />
       <ProjectContent content={content} />

       {!isAcademic && (stories || localizedChangelog || currentFocus) && (
         <section aria-labelledby="dev-progress-heading" className="my-12 md:my-16">
           <SectionTitle id="dev-progress-heading" className="text-3xl">
               {locale === 'es' ? 'Progreso del Desarrollo' : 'Development Progress'}
           </SectionTitle>
           <AgileProgressDisplay
               currentFocus={currentFocus}
               stories={stories}
               changelog={localizedChangelog}
           />
         </section>
       )}

      <div className="mt-16 text-center">
        <Link href="/projects" className="text-[var(--text-accent)] hover:brightness-115 inline-flex items-center gap-2 group unstyled font-medium text-base transition-all hover:gap-3">
           <ArrowLeft className="w-5 h-5 transition-transform duration-200 ease-in-out group-hover:-translate-x-1" />
          {currentDict.projectBack}
        </Link>
      </div>
    </article>
  );
}