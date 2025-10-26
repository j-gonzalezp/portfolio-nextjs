// app/contexts/ThemeContext.tsx
'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const getInitialTheme = (): Theme => {
    return 'light';
};

const getInitialResolvedTheme = (initialPreference: Theme): 'light' | 'dark' => {
     if (typeof window !== 'undefined') {
         if (initialPreference === 'system') {
             return 'light';
         }
         return initialPreference;
     }
     return 'light';
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setThemeState] = useState<Theme>(getInitialTheme);
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => getInitialResolvedTheme(theme));

    const applyThemeClass = useCallback((themeToApply: 'light' | 'dark') => {
        if (typeof window !== 'undefined') {
            const root = document.documentElement;
            root.classList.remove('light', 'dark');
            root.classList.add(themeToApply);
            setResolvedTheme(themeToApply);
        }
    }, []);

    useEffect(() => {
        const currentTheme = theme;
        applyThemeClass(currentTheme);
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', theme);
        }
    }, [theme, applyThemeClass]);



    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};