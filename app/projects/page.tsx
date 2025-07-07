'use client';

import React, { useState, useEffect, Suspense } from 'react';
import ProjectCard from '@/app/components/projects/ProjectCard';
import { getAllProjectMetadata } from '@/lib/projects';
import { translations } from '@/lib/translations';
import type { ProjectMetadata } from '@/lib/projects';
import { useLocale } from '@/app/contexts/LocaleContext';

function ProjectLists() {
    const { locale } = useLocale();
    const [projects, setProjects] = useState<ProjectMetadata[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const dict = translations[locale];

    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const fetchedProjects = await getAllProjectMetadata(locale);
                setProjects(fetchedProjects);
            } catch (e) {
                console.error("Failed to fetch projects on client:", e);
                setError(dict.projectsErrorLoading);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, [locale, dict.projectsErrorLoading]);

    if (isLoading) {
        return <PageLoadingSkeleton />;
    }

    if (error) {
        return <p className="text-[var(--color-danger-fixed)] italic text-center py-8">{error}</p>;
    }

    return (
        <div>
            {projects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
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

export default function ProjectsPage() {
  const { locale } = useLocale();
  const dict = translations[locale];

  return (
    <section className="space-y-16">
      <h1 className="font-bold text-center mb-12 text-[var(--text-primary)]">{dict.projectsTitle}</h1>
      <Suspense fallback={<PageLoadingSkeleton />}>
        <ProjectLists />
      </Suspense>
    </section>
  );
}
