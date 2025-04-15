import React, { Suspense } from 'react';
import ProjectCard from '@/app/components/projects/ProjectCard';
import { getAllProjectMetadata } from '@/lib/projects';
import { translations } from '@/lib/translations';
import type { ProjectMetadata } from '@/lib/projects';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';

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
        return <p className="text-[var(--color-danger-fixed)] italic text-center py-8">Error al cargar los proyectos.</p>;
    }

    const personalProjects = allProjects.filter(p => !p.isAcademic);
    const academicProjects = allProjects.filter(p => p.isAcademic);

    return (
        <>
            <div>
                <h2 className="font-semibold mb-8 border-b border-[var(--border-secondary)] pb-3 text-[var(--text-primary)]">{dict.projectsPersonal}</h2>
                {personalProjects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {personalProjects.map((project) => (
                            <ProjectCard key={project.slug} {...project} />
                        ))}
                    </div>
                ) : (
                    <p className="text-[var(--text-subtle)] italic text-center py-8">Actualmente desarrollando proyectos personales.</p>
                )}
            </div>

            <div>
                <h2 className="font-semibold mb-8 border-b border-[var(--border-secondary)] pb-3 text-[var(--text-primary)]">{dict.projectsAcademic}</h2>
                {academicProjects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {academicProjects.map((project) => (
                            <ProjectCard key={project.slug} {...project} />
                        ))}
                    </div>
                ) : (
                    <p className="text-[var(--text-subtle)] italic text-center py-8">No hay proyectos académicos listados.</p>
                )}
            </div>
        </>
    );
}

function PageLoadingSkeleton() {
     return (
        <div className="space-y-16 animate-pulse">
             <div className="h-10 bg-[var(--border-secondary)] rounded w-1/3 mx-auto"></div>
             <div className="space-y-8">
                 <div className="h-8 bg-[var(--border-secondary)] rounded w-1/2"></div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                     {[1, 2, 3].map((n) => (
                         <div key={n} className="border border-[var(--border-primary)] rounded-lg h-72 bg-[var(--bg-subtle)]"></div>
                     ))}
                 </div>
             </div>
             <div className="space-y-8">
                 <div className="h-8 bg-[var(--border-secondary)] rounded w-1/2"></div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                     {[1].map((n) => (
                         <div key={n} className="border border-[var(--border-primary)] rounded-lg h-72 bg-[var(--bg-subtle)]"></div>
                     ))}
                 </div>
             </div>
        </div>
     );
}


export default async function ProjectsPage() {
  const serverLocale = 'es';
  const dict = translations[serverLocale];

  return (
    <section className="space-y-16">
      <h1 className="font-bold text-center mb-12 text-[var(--text-primary)]">{dict.projectsTitle}</h1>

       <Suspense fallback={<PageLoadingSkeleton />}>
        
         <ProjectLists locale={serverLocale} />
       </Suspense>

    </section>
  );
}
