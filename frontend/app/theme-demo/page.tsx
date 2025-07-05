"use client";

import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeDemo() {
  const { theme, resolvedTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-8">
          Theme Toggle Demo
        </h1>
        
        <div className="bg-white dark:bg-secondary-900 rounded-2xl p-8 shadow-lg border border-secondary-200 dark:border-secondary-700 mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 dark:text-secondary-100 mb-6">
            Current Theme Settings
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-4">
              <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100 mb-2">
                Selected Theme
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400 capitalize">
                {theme}
              </p>
            </div>
            
            <div className="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-4">
              <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100 mb-2">
                Resolved Theme
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400 capitalize">
                {resolvedTheme}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-secondary-900 rounded-2xl p-8 shadow-lg border border-secondary-200 dark:border-secondary-700 mb-8">
          <h2 className="text-2xl font-semibold text-secondary-900 dark:text-secondary-100 mb-6">
            Theme Toggle Variants
          </h2>
          
          <div className="space-y-8">
            {/* Button Variants */}
            <div>
              <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100 mb-4">
                Button Variants
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex flex-col items-center space-y-2">
                  <ThemeToggle variant="button" size="sm" />
                  <span className="text-sm text-secondary-600 dark:text-secondary-400">Small</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <ThemeToggle variant="button" size="md" />
                  <span className="text-sm text-secondary-600 dark:text-secondary-400">Medium</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <ThemeToggle variant="button" size="lg" />
                  <span className="text-sm text-secondary-600 dark:text-secondary-400">Large</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <ThemeToggle variant="button" size="md" showLabel />
                  <span className="text-sm text-secondary-600 dark:text-secondary-400">With Label</span>
                </div>
              </div>
            </div>

            {/* Dropdown Variants */}
            <div>
              <h3 className="text-lg font-medium text-secondary-900 dark:text-secondary-100 mb-4">
                Dropdown Variants
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex flex-col items-center space-y-2">
                  <ThemeToggle variant="dropdown" size="sm" />
                  <span className="text-sm text-secondary-600 dark:text-secondary-400">Small</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <ThemeToggle variant="dropdown" size="md" />
                  <span className="text-sm text-secondary-600 dark:text-secondary-400">Medium</span>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                  <ThemeToggle variant="dropdown" size="lg" />
                  <span className="text-sm text-secondary-600 dark:text-secondary-400">Large</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-secondary-900 rounded-2xl p-8 shadow-lg border border-secondary-200 dark:border-secondary-700">
          <h2 className="text-2xl font-semibold text-secondary-900 dark:text-secondary-100 mb-6">
            Color Palette Preview
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-secondary-900 dark:text-secondary-100">Primary</h4>
              <div className="flex space-x-1">
                <div className="w-8 h-8 bg-primary-300 rounded"></div>
                <div className="w-8 h-8 bg-primary-500 rounded"></div>
                <div className="w-8 h-8 bg-primary-700 rounded"></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-secondary-900 dark:text-secondary-100">Secondary</h4>
              <div className="flex space-x-1">
                <div className="w-8 h-8 bg-secondary-300 rounded"></div>
                <div className="w-8 h-8 bg-secondary-500 rounded"></div>
                <div className="w-8 h-8 bg-secondary-700 rounded"></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-secondary-900 dark:text-secondary-100">Success</h4>
              <div className="flex space-x-1">
                <div className="w-8 h-8 bg-success-300 rounded"></div>
                <div className="w-8 h-8 bg-success-500 rounded"></div>
                <div className="w-8 h-8 bg-success-700 rounded"></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-secondary-900 dark:text-secondary-100">Error</h4>
              <div className="flex space-x-1">
                <div className="w-8 h-8 bg-error-300 rounded"></div>
                <div className="w-8 h-8 bg-error-500 rounded"></div>
                <div className="w-8 h-8 bg-error-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
