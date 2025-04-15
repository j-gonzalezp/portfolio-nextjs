'use client';
import Link from 'next/link';
import { useLocale } from '@/app/contexts/LocaleContext';
import { translations } from '@/lib/translations';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { useState } from 'react';
import React from 'react';

export default function Navbar() {
  const { locale } = useLocale();
  const dict = translations[locale];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[var(--bg-primary)]/80 dark:bg-[var(--bg-secondary)]/80 backdrop-blur-lg shadow-sm fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-primary)] transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex justify-between items-center h-16 md:h-20">

            <div className="flex-shrink-0">
                <Link href="/" className="text-xl font-serif font-bold text-[var(--text-primary)] hover:text-[var(--text-accent)] transition-colors duration-150 unstyled">
                  Joaquín González Parada
                </Link>
            </div>

            <div className="hidden md:flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                    <NavLink href="/" text={dict.navHome} />
                    <NavLink href="/projects" text={dict.navProjects} />
                    <NavLink href="/about" text={dict.navAbout} />
                    <NavLink href="/contact" text={dict.navContact} />
                </div>
                <div className="flex items-center gap-4">
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                </div>
            </div>

             <div className="md:hidden flex items-center gap-3">
                 <LanguageSwitcher />
                 <ThemeSwitcher />
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus:outline-none p-2 rounded-md focus-visible:ring-2 focus-visible:ring-[var(--ring-color)]"
                    aria-label="Toggle menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? (
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                    ) : (
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                    )}
                </button>
            </div>

         </div>
      </div>

       <div className={`md:hidden absolute top-full left-0 right-0 bg-[var(--bg-primary)] border-b border-[var(--border-primary)] shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible'}`}>
          <div className="px-4 pt-2 pb-4 space-y-1">
            <MobileNavLink href="/" text={dict.navHome} onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavLink href="/projects" text={dict.navProjects} onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavLink href="/about" text={dict.navAbout} onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavLink href="/contact" text={dict.navContact} onClick={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
    </nav>
  );
}

function NavLink({ href, text }: { href: string; text: string }) {
    return ( <Link href={href} className="text-[var(--text-secondary)] hover:text-[var(--text-accent)] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 unstyled">{text}</Link> );
}
function MobileNavLink({ href, text, onClick }: { href: string; text: string; onClick: () => void }) {
    return ( <Link href={href} onClick={onClick} className="block text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-accent)] px-3 py-3 rounded-md text-base font-medium transition-colors duration-150 unstyled">{text}</Link> );
}
