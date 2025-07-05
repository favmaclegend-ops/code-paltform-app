"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Get system preference
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  // Update resolved theme based on current theme setting
  const updateResolvedTheme = (currentTheme: Theme) => {
    const newResolvedTheme = currentTheme === 'system' ? getSystemTheme() : currentTheme;
    setResolvedTheme(newResolvedTheme);
    
    if (typeof window !== 'undefined') {
      // Update HTML class
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(newResolvedTheme);
      
      // Update meta theme-color
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', newResolvedTheme === 'dark' ? '#09090b' : '#ffffff');
      }
    }
  };

  // Initialize theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme || 'system';
    setTheme(storedTheme);
    updateResolvedTheme(storedTheme);
    setMounted(true);
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        updateResolvedTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Update theme
  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    updateResolvedTheme(newTheme);
  };

  // Toggle between light and dark (ignoring system)
  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    handleSetTheme(newTheme);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="animate-pulse bg-gray-100">
        {children}
      </div>
    );
  }

  const value: ThemeContextType = {
    theme,
    resolvedTheme,
    setTheme: handleSetTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
