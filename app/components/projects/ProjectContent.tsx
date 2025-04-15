import React from 'react';

interface ProjectContentProps {
    content?: string;
}

export default function ProjectContent({ content }: ProjectContentProps) {
    return (
        <div className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none mb-12 md:mb-16">
            {content ? (
                <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
                <p className="italic text-[var(--text-subtle)]">Descripción detallada próximamente...</p>
            )}
        </div>
    );
}
