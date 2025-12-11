// app/components/projects/ProjectCard.tsx
'use client'; // <-- MOVIDO AL INICIO DEL ARCHIVO

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TechTag from './TechTag';
import { motion } from 'framer-motion';
// import { cn } from '@/lib/utils'; // <--- Eliminado porque no se usa
import type { ProjectMetadata } from '@/lib/projects';
import { ArrowUpRight, Image as ImageIcon, Star } from 'lucide-react'; // <-- Añadido Star
import { useLocale } from '@/app/contexts/LocaleContext';
import { translations } from '@/lib/translations';

// Usar directamente el tipo ProjectMetadata en lugar de la interfaz vacía
// interface ProjectCardProps extends ProjectMetadata {} <--- Eliminado

export default function ProjectCard({
    slug,
    title,
    summary,
    tags,
    imageUrl,
    isFeatured, // <-- Ahora se usará
    isAcademic,
}: ProjectMetadata) { // <-- Usar ProjectMetadata directamente aquí
    const linkHref = `/projects/${slug}`;
    const { locale } = useLocale();
    const dict = translations[locale];

    const MAX_TAGS_VISIBLE = 4;
    const tagsToShow = tags?.slice(0, MAX_TAGS_VISIBLE);
    const remainingTagsCount = tags ? tags.length - MAX_TAGS_VISIBLE : 0;

    // Moved console.log outside of JSX
    console.log('Image src:', imageUrl);

    return (
        // Añadido 'relative' para posicionar el badge de 'isFeatured'
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group relative flex flex-col overflow-hidden rounded-lg border border-[var(--border-primary)] bg-[var(--bg-subtle)] shadow-[var(--shadow)] hover:shadow-[var(--shadow-lg)] focus-within:shadow-[var(--shadow-lg)]"
        >
            {/* Añadir badge si es Featured */}
            {isFeatured && (
                <span
                    className="absolute top-2 right-2 z-10 flex items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 text-xs font-bold text-amber-900 shadow-sm"
                    title={locale === 'es' ? 'Proyecto Destacado' : 'Featured Project'} // Añadir title para accesibilidad
                >
                    <Star size={12} fill="currentColor" />
                    {locale === 'es' ? 'Destacado' : 'Featured'}
                </span>
            )}

            <div className="aspect-video overflow-hidden relative bg-[var(--bg-skeleton)]">
                {imageUrl ? (
                    <Image
                        src={imageUrl.startsWith('images/') ? '/' + imageUrl : imageUrl}
                        alt={`${dict.projectImageAltPrefix} ${title}`}
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
                        {dict.projectLearningBadge}
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
                    <div className="mt-auto flex flex-wrap gap-2 pt-3 border-t border-[var(--border-secondary)] items-center">
                        {tagsToShow?.map((tag) => (
                            <TechTag key={tag} name={tag} />
                        ))}
                        {remainingTagsCount > 0 && (
                            <span className='text-xs text-[var(--text-subtle)] pt-0.5'>
                                {dict.projectMoreTags.replace('{count}', remainingTagsCount.toString())}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </motion.article>
    );
}