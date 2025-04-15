import React from 'react';
import type { UserStory, LocalizedChangelogEntry, StoryStatus } from '@/lib/projects';
import { translations } from '@/lib/translations';
import { useLocale } from '@/app/contexts/LocaleContext';
import SectionTitle from './layout/SectionTitle';
import { cn } from '@/lib/utils';
import { CheckCircle2, Zap, ListTodo, Ban, Hourglass, CalendarDays, Info, GitCommitHorizontal } from 'lucide-react';

interface AgileProgressDisplayProps {
  currentFocus?: string;
  stories?: UserStory[];
  changelog?: LocalizedChangelogEntry[];
}

const statusStyles: Record<StoryStatus, string> = {
    'Done': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
    'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-blue-300 dark:border-blue-700',
    'Planned': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 border-purple-300 dark:border-purple-700',
    'Backlog': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600',
    'Blocked': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-300 dark:border-red-700',
};

const statusIcons: Record<StoryStatus, React.ElementType> = {
    'Done': CheckCircle2,
    'In Progress': Zap,
    'Planned': ListTodo,
    'Backlog': Hourglass,
    'Blocked': Ban,
};

const AgileProgressDisplay: React.FC<AgileProgressDisplayProps> = ({
  currentFocus,
  stories,
  changelog,
}) => {
  const { locale } = useLocale();
  const dict = translations[locale];

  const renderStories = (status: StoryStatus, title: string) => {
      const filteredStories = stories?.filter(s => s.status === status);
      if (!filteredStories || filteredStories.length === 0) return null;
      const Icon = statusIcons[status];

      return (
         <div className="mb-6 last:mb-0">
             <h4 id={`${status}-stories-heading`} className="flex items-center gap-2 text-lg font-semibold mb-3 text-[var(--text-primary)]">
                 <Icon size={20} className={cn(statusStyles[status], 'p-0.5 rounded-full border')} />
                 {title} <span className="text-sm font-normal text-[var(--text-subtle)]">({filteredStories.length})</span>
             </h4>
             <ul className="list-none space-y-3 pl-8 text-[var(--text-secondary)]">
                 {filteredStories.map(story => (
                     <li key={story.id} className="text-sm border-l-2 border-[var(--border-secondary)] pl-4 py-1">
                         <strong className="font-medium text-[var(--text-primary)] block">{story.title}</strong>
                         <span className="text-xs italic block mb-1">{`Como ${story.asA}, quiero ${story.iWant}, para ${story.soThat}`}</span>
                         {story.tags && story.tags.length > 0 && (
                             <div className="mt-1.5 flex flex-wrap gap-1.5">
                                 {story.tags.map(tag => (
                                     <span key={tag} className="text-[11px] bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded border border-[var(--border-primary)]">{tag}</span>
                                 ))}
                             </div>
                         )}
                     </li>
                 ))}
             </ul>
         </div>
      );
  }

  const hasProgressInfo = currentFocus || (stories && stories.length > 0) || (changelog && changelog.length > 0);

  if (!hasProgressInfo) {
       return (
          <div className="flex flex-col items-center text-center py-8 px-4 text-[var(--text-subtle)] bg-[var(--bg-subtle)] rounded-lg border border-[var(--border-primary)]">
               <Info size={40} className="mb-3 opacity-70" />
               <p>{locale === 'es' ? 'No hay información de progreso disponible para este proyecto.' : 'No progress information available for this project.'}</p>
          </div>
       );
  }


  return (
    <div className="space-y-10">
      {currentFocus && (
        <section aria-labelledby="current-focus-heading">
          <SectionTitle as="h3" id="current-focus-heading" className="text-xl border-none flex items-center gap-2">
             <Zap size={20} className="text-[var(--text-accent)]"/> {dict.projectStatus}
          </SectionTitle>
          <p className="text-[var(--text-secondary)] bg-[var(--bg-subtle)] p-4 rounded-md border border-[var(--border-primary)] shadow-sm">{currentFocus}</p>
        </section>
      )}

      {stories && stories.length > 0 && (
        <section aria-labelledby="roadmap-heading">
          <SectionTitle as="h3" id="roadmap-heading" className="text-xl border-none flex items-center gap-2">
             <ListTodo size={20} className="text-[var(--text-accent)]"/> {dict.projectRoadmap}
          </SectionTitle>
          <div className="p-4 bg-[var(--bg-subtle)] rounded-md border border-[var(--border-primary)] shadow-sm">
              {renderStories('In Progress', locale === 'es' ? 'En Progreso' : 'In Progress')}
              {renderStories('Planned', locale === 'es' ? 'Planificado' : 'Planned')}
              {renderStories('Backlog', locale === 'es' ? 'Pendiente' : 'Backlog')}
              {renderStories('Blocked', locale === 'es' ? 'Bloqueado' : 'Blocked')}
              {renderStories('Done', locale === 'es' ? 'Completado' : 'Done')}
          </div>
        </section>
      )}

      {changelog && changelog.length > 0 && (
        <section aria-labelledby="changelog-heading">
           <SectionTitle as="h3" id="changelog-heading" className="text-xl border-none flex items-center gap-2">
             <CalendarDays size={20} className="text-[var(--text-accent)]"/> {dict.projectChangelog}
           </SectionTitle>
           <ul className="border-l-2 border-[var(--border-accent)] pl-6 space-y-6 relative ml-2">
             {changelog.map((entry, index) => (
               <li key={index} className="relative pl-4">
                   <div className="absolute w-4 h-4 bg-[var(--bg-accent)] rounded-full -left-[39px] top-1 border-4 border-[var(--bg-primary)] dark:border-[var(--bg-subtle)] shadow-sm flex items-center justify-center">
                      <GitCommitHorizontal size={10} className="text-[var(--text-on-accent)]"/>
                   </div>
                 <time className="text-xs font-semibold uppercase tracking-wider text-[var(--text-subtle)]">{new Date(entry.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })} {entry.version ? <span className="ml-1 normal-case font-mono text-[11px] bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded border border-[var(--border-primary)]">{entry.version}</span> : ''}</time>
                 <p className="text-base text-[var(--text-secondary)] mt-1 mb-0">{entry.description}</p>
               </li>
             ))}
           </ul>
        </section>
      )}
    </div>
  );
};

export default AgileProgressDisplay;
