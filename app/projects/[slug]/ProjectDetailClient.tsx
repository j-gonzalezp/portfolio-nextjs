// app/projects/[slug]/ProjectDetailClient.tsx
'use client';
import Link from 'next/link';
import { useState, useEffect, useTransition } from 'react';
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
import { getProjectDataAction } from './actions';

interface ProjectDetailClientProps {
  initialProjectData: ProjectData | undefined;
}

export default function ProjectDetailClient({ initialProjectData }: ProjectDetailClientProps) {
  const { locale } = useLocale();
  const [project, setProject] = useState<ProjectData | undefined>(initialProjectData);
  const [isPending, startTransition] = useTransition();
  const [errorLoadingLocale, setErrorLoadingLocale] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSetProjectData = async (slug: string, newLocale: Locale) => {
        setErrorLoadingLocale(null);
        startTransition(async () => {
            const result = await getProjectDataAction(slug, newLocale);
            if (result) {
                setProject(result);
            } else {
                console.error(`Error fetching project data for locale ${newLocale}:`);
                setErrorLoadingLocale(currentDict.projectDetailClient.errorLoadingData(newLocale === 'es' ? 'Español' : 'Inglés'));
            }
        });
    };

    if (project?.slug && project.locale !== locale && !isPending) {
        fetchAndSetProjectData(project.slug, locale);
    }
    
  }, [locale, project, isPending]);

  const currentDict = translations[locale];

  if (!project && !isPending) {
      return <div className="text-center py-20 text-[var(--text-error)] font-semibold flex flex-col items-center gap-3"><AlertTriangle size={32}/>{currentDict.projectDetailClient.errorProjectDataNotAvailable}</div>;
  }
    if (!project && isPending) {
     return <div className="flex flex-col items-center justify-center min-h-[400px] text-[var(--text-subtle)]"><LoadingSpinner /><p className="mt-4">{currentDict.projectDetailClient.loadingProject}</p></div>;
  }
  if (!project) return null;

  const { title, summary, tags, content, repoUrl, liveUrl, imageUrl, currentFocus, localizedChangelog, stories, isAcademic } = project;

  return (
    <article className="max-w-4xl mx-auto relative">
       {isPending && (
           <div className="absolute top-4 right-4 z-10 bg-[var(--bg-subtle)] text-[var(--text-subtle)] p-2 rounded-md shadow-md text-xs flex items-center gap-2 animate-pulse">
               <LoadingSpinner /> {currentDict.projectDetailClient.loadingLocale(locale === 'es' ? 'Español' : 'English')}
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
               {currentDict.projectDetailClient.developmentProgress}
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