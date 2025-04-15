'use client';
import { useLocale } from '@/app/contexts/LocaleContext';

export default function LanguageSwitcher() {
    const { locale, setLocale } = useLocale();

    const switchLocale = (newLocale: 'es' | 'en') => {
         console.log(`[LangSwitcher] Button clicked for: ${newLocale}`);
         if (newLocale !== locale) {
            setLocale(newLocale);
        }
    };

    const buttonBase = "px-2.5 py-1 rounded-md text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring-color)]";
    const activeStyle = "text-[var(--text-accent)] font-semibold";
    const inactiveStyle = "text-[var(--text-secondary)] hover:text-[var(--text-primary)]";

    return (
        <div className="flex items-center text-sm bg-[var(--bg-secondary)] p-1 rounded-full border border-[var(--border-primary)]">
             <button
                 onClick={() => switchLocale('es')}
                 className={`${buttonBase} ${locale === 'es' ? activeStyle : inactiveStyle}`}
                 aria-pressed={locale === 'es'}
             >
                 ES
             </button>
             <span className="mx-0.5 text-[var(--border-secondary)]">|</span>
             <button
                 onClick={() => switchLocale('en')}
                 className={`${buttonBase} ${locale === 'en' ? activeStyle : inactiveStyle}`}
                 aria-pressed={locale === 'en'}
             >
                 EN
             </button>
         </div>
    );
}
