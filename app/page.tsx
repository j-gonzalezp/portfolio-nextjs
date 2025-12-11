// app/page.tsx
'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ProjectCard from './components/projects/ProjectCard';
import Button from './components/ui/Button';
import { getFeaturedProjects } from '@/lib/projects';
import { translations } from '@/lib/translations';
import type { ProjectMetadata } from '@/lib/projects';
import { AlertCircle, Info } from 'lucide-react';
import { useLocale } from './contexts/LocaleContext';
import MotionWrapper from './components/ui/MotionWrapper';

// --- Helper Component definido FUERA de Home ---
function ProjectsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full animate-pulse">
      {[1, 2].map((n) => (
        <div key={n} className="skeleton-card rounded-lg h-[360px]">
          <div className="skeleton-image aspect-video"></div>
          <div className="p-6 space-y-3">
            <div className="skeleton skeleton-text rounded w-3/4 h-5"></div>
            <div className="skeleton skeleton-text rounded w-full h-4"></div>
            <div className="skeleton skeleton-text rounded w-5/6 h-4"></div>
            <div className="flex flex-wrap gap-2 pt-4">
              <div className="skeleton skeleton-text rounded h-5 w-16"></div>
              <div className="skeleton skeleton-text rounded h-5 w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
// --- Fin Helper Component ---

export default function Home() {
  const { locale } = useLocale();
  const dict = translations[locale];

  const [featuredProjects, setFeaturedProjects] = useState<ProjectMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorFetching, setErrorFetching] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setErrorFetching(false);
      try {
        const projects = await getFeaturedProjects(locale);
        const normalizedProjects = projects.map(project => ({
          ...project,
          imageUrl: project.imageUrl && !project.imageUrl.startsWith('/') ? `/${project.imageUrl}` : project.imageUrl
        }));
        setFeaturedProjects(normalizedProjects);
      } catch (error) {
        console.error("Failed to fetch featured projects (client):", error);
        setErrorFetching(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, [locale]);

  console.log('Featured projects array:', featuredProjects);

  return (
    <section className="text-center flex flex-col items-center py-16 md:py-24">
      <MotionWrapper delay={0.1}>
        <h1 className="font-bold mb-6 leading-tight text-[var(--text-primary)] max-w-4xl">{dict.homeTitle}</h1>
      </MotionWrapper>

      <MotionWrapper delay={0.2}>
        <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-12 max-w-3xl mx-auto">
          {dict.homeSubtitle}
        </p>
      </MotionWrapper>

      <MotionWrapper delay={0.3}>
        <div className="mb-16 flex flex-wrap justify-center gap-4">
          <Link href="/projects" className="unstyled">
            <Button size="lg" variant='primary'>{dict.homeViewProjects}</Button>
          </Link>
          <Link href="/about" className="unstyled">
            <Button variant="secondary" size="lg">{dict.homeAboutMe}</Button>
          </Link>
        </div>
      </MotionWrapper>

      <MotionWrapper delay={0.4}>
        <h2 className="font-semibold mb-10 text-[var(--text-primary)]">{dict.homeFeaturedProjects}</h2>
      </MotionWrapper>

      {isLoading ? (
        <ProjectsLoadingSkeleton /> // Ahora usa el componente definido fuera
      ) : errorFetching ? (
        <div className="flex flex-col items-center text-center py-8 px-4 text-[var(--text-error)]">
          <AlertCircle size={40} className="mb-3 opacity-80" />
          <p className="font-semibold">Error al cargar los proyectos destacados.</p>
        </div>
      ) : featuredProjects.length === 0 ? (
        <div className="flex flex-col items-center text-center py-8 px-4 text-[var(--text-subtle)]">
          <Info size={40} className="mb-3 opacity-70" />
          <p>Pronto mostraré mis proyectos destacados aquí.</p>
        </div>
      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
          {featuredProjects.map((project, index) => (
            <MotionWrapper key={project.slug} delay={0.1 * index} className="h-full">
              <ProjectCard {...project} />
            </MotionWrapper>
          ))}
        </div>
      )}
    </section>
  );
}