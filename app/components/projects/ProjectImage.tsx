import Image from 'next/image';
import type { Translations } from '@/lib/translations';
import { Image as ImageIcon } from 'lucide-react';

interface ProjectImageProps {
    imageUrl?: string;
    title: string;
    dict: Translations;
    objectPosition?: string;
}

export default function ProjectImage({ imageUrl, title, dict, objectPosition = 'object-top' }: ProjectImageProps) {
    return (
        <div className="mb-10 overflow-hidden rounded-lg shadow-[var(--shadow-xl)] aspect-video relative border border-[var(--border-primary)] bg-[var(--bg-skeleton)]">
            {imageUrl && typeof imageUrl === 'string' && imageUrl.trim() !== '' ? (
                <Image
                    src={imageUrl}
                    alt={`${dict.projectImageAltPrefix} ${title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
                    className={`object-cover ${objectPosition} transition-opacity duration-500 ease-in-out opacity-0`}
                    priority
                    onLoad={event => {
                        const target = event.target as HTMLImageElement;
                        target.classList.remove('opacity-0');
                    }}
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                     <ImageIcon size={64} strokeWidth={1} className="text-[var(--text-subtle)] opacity-60" />
                </div>
            )}
        </div>
    );
}
