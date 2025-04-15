'use client';
import { useLocale } from '@/app/contexts/LocaleContext';
import { translations } from '@/lib/translations';

export default function Footer() {
  const { locale } = useLocale();
  const dict = translations[locale];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--bg-secondary)] mt-20 py-8 border-t border-[var(--border-primary)] transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-[var(--text-subtle)] text-sm">
         © {currentYear} Joaquín González Parada. {dict.footerRights}
      </div>
    </footer>
  );
}
