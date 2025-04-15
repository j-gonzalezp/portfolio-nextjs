import Link from 'next/link';
import type { Translations } from '@/lib/translations';
import Button from '@/app/components/ui/Button';
import { ExternalLink, Code } from 'lucide-react';

interface ProjectActionsProps {
    liveUrl?: string;
    repoUrl?: string;
    dict: Translations;
}

export default function ProjectActions({ liveUrl, repoUrl, dict }: ProjectActionsProps) {
    if (!liveUrl && !repoUrl) return null;

    return (
        <div className="flex flex-wrap gap-4 mb-10 md:mb-12">
            {liveUrl && (
                <Link href={liveUrl} target="_blank" rel="noopener noreferrer" className="unstyled">
                    <Button variant="primary" size="lg" aria-label={`${dict.projectViewDemo} (opens in new tab)`}>
                         <ExternalLink size={18} className="mr-2"/> {dict.projectViewDemo}
                    </Button>
                </Link>
            )}
            {repoUrl && (
                 <Link href={repoUrl} target="_blank" rel="noopener noreferrer" className="unstyled">
                    <Button variant="secondary" size="lg" aria-label={`${dict.projectViewCode} (opens in new tab)`}>
                        <Code size={18} className="mr-2"/> {dict.projectViewCode}
                    </Button>
                </Link>
            )}
        </div>
    );
}
