'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Locale = 'es' | 'en';
export type { Locale };

interface LocaleContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextProps | undefined>(undefined);

const getInitialLocale = (): Locale => {
    if (typeof window !== 'undefined') {
    }
    return 'es';
};

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
      document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
      setLocaleState(newLocale);
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
