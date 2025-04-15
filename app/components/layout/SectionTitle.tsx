import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
    as?: 'h2' | 'h3';
}

export default function SectionTitle({
    children,
    as: Component = 'h2',
    className,
    id,
    ...props
}: SectionTitleProps) {
    return (
        <Component
            id={id}
            className={cn(
                `font-semibold mb-4 border-b border-[var(--border-secondary)] pb-2 text-[var(--text-primary)]`,
                 className
            )}
            {...props}
        >
            {children}
        </Component>
    );
}
