// app/contexts/ThemeContext.tsx
'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const getInitialTheme = (): Theme => {
    if (typeof window !== 'undefined') {
        return (localStorage.getItem('theme') as Theme | null) || 'system';
    }
    return 'system';
};

const getInitialResolvedTheme = (initialPreference: Theme): 'light' | 'dark' => {
     if (typeof window !== 'undefined') {
         if (initialPreference === 'system') {
             return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
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
        let currentTheme: 'light' | 'dark';
        if (theme === 'system') {
            if (typeof window !== 'undefined') {
                 currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            } else {
                 currentTheme = 'light';
            }
        } else {
            currentTheme = theme;
        }
        applyThemeClass(currentTheme);
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', theme);
        }
    }, [theme, applyThemeClass]);

    useEffect(() => {
        if (theme !== 'system' || typeof window === 'undefined') {
            return;
        }
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (localStorage.getItem('theme') === 'system') {
                applyThemeClass(mediaQuery.matches ? 'dark' : 'light');
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
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