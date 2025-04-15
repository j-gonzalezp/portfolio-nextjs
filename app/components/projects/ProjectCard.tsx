import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TechTag from './TechTag';
import { cn } from '@/lib/utils';
import type { ProjectMetadata } from '@/lib/projects';
import { ArrowUpRight, Image as ImageIcon } from 'lucide-react';

interface ProjectCardProps extends ProjectMetadata {}

export default function ProjectCard({
    slug,
    title,
    summary,
    tags,
    imageUrl,
    isFeatured,
    isAcademic,
}: ProjectCardProps) {
    const linkHref = `/projects/${slug}`;

    return (
        <article className="group relative flex flex-col overflow-hidden rounded-lg border border-[var(--border-primary)] bg-[var(--bg-subtle)] shadow-[var(--shadow)] transition-all duration-300 ease-in-out hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 focus-within:shadow-[var(--shadow-lg)] focus-within:-translate-y-1">
             <div className="aspect-video overflow-hidden relative bg-[var(--bg-skeleton)]">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={`Vista previa de ${title}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon size={48} strokeWidth={1.5} className="text-[var(--text-subtle)] opacity-50" />
                    </div>
                 )}
             </div>

            <div className="flex flex-col flex-grow p-5 md:p-6">
                 {isAcademic && (
                    <p className="mb-2 text-xs font-medium text-[var(--color-academic-badge-text)] bg-[var(--color-academic-badge-bg)] px-2 py-0.5 rounded-full self-start border border-[var(--color-academic-border)]">
                        Aprendizaje
                    </p>
                 )}
                <h3 className="mb-2 font-semibold text-lg md:text-xl leading-snug text-[var(--text-primary)]">
                    <Link href={linkHref} className="unstyled stretched-link focus:outline-none group/link">
                        <span className="absolute inset-0" aria-hidden="true"></span>
                        <span className="relative">{title}</span>
                        <ArrowUpRight className="inline-block w-4 h-4 ml-1 opacity-0 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 motion-reduce:transform-none" />
                    </Link>
                </h3>
                <p className="mb-4 text-sm md:text-base text-[var(--text-secondary)] flex-grow line-clamp-3">
                    {summary}
                </p>
                {tags && tags.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-2 pt-3 border-t border-[var(--border-secondary)]">
                        {tags.slice(0, 4).map((tag) => (
                            <TechTag key={tag} name={tag} />
                        ))}
                        {tags.length > 4 && <span className='text-xs text-[var(--text-subtle)] pt-1'>+ {tags.length - 4}</span>}
                    </div>
                )}
            </div>
        </article>
    );
}
