import React, { Suspense } from 'react';
import ProjectCard from '@/app/components/projects/ProjectCard';
import { getAllProjectMetadata } from '@/lib/projects';
import { translations } from '@/lib/translations';
import type { ProjectMetadata } from '@/lib/projects';
import { headers } from 'next/headers';

async function ProjectLists({ locale }: { locale: 'es' | 'en' }) {
    let allProjects: ProjectMetadata[] = [];
    let errorFetching = false;
    const dict = translations[locale];

    try {
        allProjects = await getAllProjectMetadata(locale);
    } catch (error) {
        console.error("Failed to fetch projects on server:", error);
        errorFetching = true;
    }

    if (errorFetching) {
        return <p className="text-[var(--color-danger-fixed)] italic text-center py-8">{dict.projectsErrorLoading}</p>;
    }

    return (
        <div>
            {allProjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allProjects.map((project) => (
                        <ProjectCard key={project.slug} {...project} />
                    ))}
                </div>
            ) : (
                <p className="text-[var(--text-subtle)] italic text-center py-8">{dict.projectsNoProjects}</p>
            )}
        </div>
    );
}

function PageLoadingSkeleton() {
     return (
        <div className="space-y-12 animate-pulse">
             <div className="h-10 bg-[var(--border-secondary)] rounded w-1/3 mx-auto"></div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                 {[1, 2, 3, 4, 5, 6].map((n) => (
                     <div key={n} className="border border-[var(--border-primary)] rounded-lg h-72 bg-[var(--bg-subtle)]"></div>
                 ))}
             </div>
        </div>
     );
}


export default async function ProjectsPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('Accept-Language') || 'es';
  const detectedLocale = acceptLanguage.includes('en') ? 'en' : 'es';

  const dict = translations[detectedLocale];

  return (
    <section className="space-y-16">
      <h1 className="font-bold text-center mb-12 text-[var(--text-primary)]">{dict.projectsTitle}</h1>

       <Suspense fallback={<PageLoadingSkeleton />}>
        
         <ProjectLists locale={detectedLocale} />
       </Suspense>

    </section>
  );
}
