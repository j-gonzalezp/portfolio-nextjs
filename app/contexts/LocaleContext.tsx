'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { setLocale as setLocaleAction } from '@/app/actions';

type Locale = 'es' | 'en';
export type { Locale };

interface LocaleContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextProps | undefined>(undefined);

export const LocaleProvider = ({ 
  children,
  initialLocale
}: { 
  children: ReactNode,
  initialLocale: Locale
}) => {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
      document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
      setLocaleState(newLocale);
      setLocaleAction(newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleContextProps => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
