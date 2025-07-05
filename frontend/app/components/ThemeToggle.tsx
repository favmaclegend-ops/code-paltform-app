"use client";

import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const SunIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

const SystemIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function ThemeToggle({ 
  variant = 'button', 
  size = 'md', 
  showLabel = false 
}: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  if (variant === 'button') {
    return (
      <button
        onClick={toggleTheme}
        className={`
          ${sizeClasses[size]}
          relative inline-flex items-center justify-center
          bg-secondary-100 hover:bg-secondary-200 dark:bg-secondary-800 dark:hover:bg-secondary-700
          text-secondary-700 dark:text-secondary-300
          rounded-lg transition-all duration-300 ease-in-out
          hover:scale-105 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          shadow-sm hover:shadow-md
        `}
        aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
      >
        <div className="relative">
          {/* Sun Icon */}
          <SunIcon 
            className={`
              ${iconSizeClasses[size]}
              absolute inset-0 transition-all duration-300 ease-in-out
              ${resolvedTheme === 'dark' 
                ? 'opacity-0 rotate-90 scale-0' 
                : 'opacity-100 rotate-0 scale-100'
              }
            `}
          />
          
          {/* Moon Icon */}
          <MoonIcon 
            className={`
              ${iconSizeClasses[size]}
              absolute inset-0 transition-all duration-300 ease-in-out
              ${resolvedTheme === 'light' 
                ? 'opacity-0 -rotate-90 scale-0' 
                : 'opacity-100 rotate-0 scale-100'
              }
            `}
          />
        </div>
        
        {showLabel && (
          <span className="ml-2 text-sm font-medium">
            {resolvedTheme === 'light' ? 'Light' : 'Dark'}
          </span>
        )}
      </button>
    );
  }

  // Dropdown variant
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          ${sizeClasses[size]}
          relative inline-flex items-center justify-center
          bg-secondary-100 hover:bg-secondary-200 dark:bg-secondary-800 dark:hover:bg-secondary-700
          text-secondary-700 dark:text-secondary-300
          rounded-lg transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          shadow-sm hover:shadow-md
        `}
        aria-label="Select theme"
      >
        {theme === 'system' ? (
          <SystemIcon className={iconSizeClasses[size]} />
        ) : resolvedTheme === 'light' ? (
          <SunIcon className={iconSizeClasses[size]} />
        ) : (
          <MoonIcon className={iconSizeClasses[size]} />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-secondary-900 rounded-lg shadow-lg border border-secondary-200 dark:border-secondary-700 py-1 z-50 animate-scale-in">
          <button
            onClick={() => {
              setTheme('light');
              setIsOpen(false);
            }}
            className={`
              w-full px-3 py-2 text-left text-sm flex items-center space-x-2
              hover:bg-secondary-100 dark:hover:bg-secondary-800
              transition-colors duration-200
              ${theme === 'light' ? 'text-primary-600 dark:text-primary-400' : 'text-secondary-700 dark:text-secondary-300'}
            `}
          >
            <SunIcon className="w-4 h-4" />
            <span>Light</span>
            {theme === 'light' && (
              <svg className="w-3 h-3 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          
          <button
            onClick={() => {
              setTheme('dark');
              setIsOpen(false);
            }}
            className={`
              w-full px-3 py-2 text-left text-sm flex items-center space-x-2
              hover:bg-secondary-100 dark:hover:bg-secondary-800
              transition-colors duration-200
              ${theme === 'dark' ? 'text-primary-600 dark:text-primary-400' : 'text-secondary-700 dark:text-secondary-300'}
            `}
          >
            <MoonIcon className="w-4 h-4" />
            <span>Dark</span>
            {theme === 'dark' && (
              <svg className="w-3 h-3 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          
          <button
            onClick={() => {
              setTheme('system');
              setIsOpen(false);
            }}
            className={`
              w-full px-3 py-2 text-left text-sm flex items-center space-x-2
              hover:bg-secondary-100 dark:hover:bg-secondary-800
              transition-colors duration-200
              ${theme === 'system' ? 'text-primary-600 dark:text-primary-400' : 'text-secondary-700 dark:text-secondary-300'}
            `}
          >
            <SystemIcon className="w-4 h-4" />
            <span>System</span>
            {theme === 'system' && (
              <svg className="w-3 h-3 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      )}

      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default ThemeToggle;
