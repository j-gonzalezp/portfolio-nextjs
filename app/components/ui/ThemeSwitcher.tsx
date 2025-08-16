'use client';
import { useTheme } from '@/app/contexts/ThemeContext';
import { translations } from '@/lib/translations';
import { useLocale } from '@/app/contexts/LocaleContext';
import type { Theme } from '@/app/contexts/ThemeContext';
import React from 'react';

export default function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { locale } = useLocale();
  const dict = translations[locale];

  const options: { value: Theme, label: string, icon: React.ReactNode }[] = [
    { value: 'light', label: dict.themeSwitchLight, icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.95-4.227-1.591 1.591M5.25 12H3m4.227-4.95-1.591-1.591M12 12a2.25 2.25 0 0 0-2.25 2.25 2.25 2.25 0 0 0 2.25 2.25 2.25 2.25 0 0 0 2.25-2.25A2.25 2.25 0 0 0 12 12Z" /></svg> },
    { value: 'dark', label: dict.themeSwitchDark, icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg> },
  ];

  const handleThemeChange = (newTheme: Theme) => {
      setTheme(newTheme);
  }

  return (
    <div className="flex items-center space-x-1 rounded-full bg-[var(--bg-secondary)] p-1 border border-[var(--border-primary)]">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleThemeChange(option.value)}
          className={`flex items-center justify-center h-7 w-7 sm:w-auto sm:px-3 sm:gap-1.5 rounded-full text-xs font-medium transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--bg-secondary)] ${
            resolvedTheme === option.value
              ? 'bg-[var(--bg-primary)] text-[var(--text-accent)] shadow-sm'
              : 'text-[var(--text-subtle)] hover:text-[var(--text-primary)]'
          }`}
          aria-pressed={theme === option.value}
          title={`Establecer tema a ${option.label}`}
        >
          {option.icon}
          <span className="hidden sm:inline">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
