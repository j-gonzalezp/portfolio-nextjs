import type { Translations } from '@/lib/translations';

interface ProjectHeaderProps {
    title: string;
    summary: string;
    isAcademic?: boolean;
    dict: Translations;
}

export default function ProjectHeader({ title, summary, isAcademic, dict }: ProjectHeaderProps) {
    return (
        <header className="mb-8 md:mb-10">
            <h1 className="font-bold mb-4 leading-tight text-[var(--text-primary)]">{title}</h1>
            {isAcademic && (
                <p className="text-sm font-medium text-[var(--color-academic-badge-text)] bg-[var(--color-academic-badge-bg)] px-2.5 py-0.5 rounded-full self-start inline-block border border-[var(--color-academic-border)] mb-4">
                    {dict.projectAcademicTag}
                </p>
            )}
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] leading-relaxed">{summary}</p>
        </header>
    );
}
