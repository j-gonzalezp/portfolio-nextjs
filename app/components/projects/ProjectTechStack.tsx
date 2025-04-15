import TechTag from './TechTag';
import type { Translations } from '@/lib/translations';
import SectionTitle from '../layout/SectionTitle';
import { Layers } from 'lucide-react';

interface ProjectTechStackProps {
    tags?: string[];
    dict: Translations;
}

export default function ProjectTechStack({ tags, dict }: ProjectTechStackProps) {
    if (!tags || tags.length === 0) {
        return null;
    }

    return (
        <section aria-labelledby="tech-stack-heading" className="mb-10 md:mb-12 bg-[var(--bg-subtle)] p-6 rounded-lg border border-[var(--border-primary)] shadow-[var(--shadow)]">
            <SectionTitle as="h3" id="tech-stack-heading" className="border-none mb-4 flex items-center gap-2 text-xl">
                <Layers size={20} strokeWidth={2.5} /> {dict.projectTechStack}
            </SectionTitle>
            <div className="flex flex-wrap gap-3">
                {tags.map((tag) => (
                    <TechTag key={tag} name={tag} />
                ))}
            </div>
        </section>
    );
}
