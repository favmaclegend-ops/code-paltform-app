import React from "react";

type FormWrapperProps = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl";
  showLogo?: boolean;
};

const Logo = () => (
  <div className="flex items-center justify-center space-x-2 mb-8">
    <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    </div>
    <span className="text-2xl font-bold gradient-text">CodePlatform</span>
  </div>
);

const getMaxWidthClass = (maxWidth: string) => {
  const widthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };
  return widthClasses[maxWidth as keyof typeof widthClasses] || "max-w-md";
};

export default function FormWrapper({ 
  children, 
  title, 
  subtitle, 
  maxWidth = "md", 
  showLogo = true 
}: FormWrapperProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full opacity-20 blur-3xl" />
      </div>
      
      <div className={`relative w-full ${getMaxWidthClass(maxWidth)} animate-fade-in`}>
        <div className="bg-white/80 dark:bg-secondary-900/80 backdrop-blur-lg border border-secondary-200 dark:border-secondary-700 rounded-3xl shadow-2xl p-8 sm:p-10">
          {showLogo && <Logo />}
          
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-secondary-600 dark:text-secondary-400">
                {subtitle}
              </p>
            )}
          </div>
          
          <div className="space-y-6">
            {children}
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-success-500 rounded-t-3xl" />
        </div>
        
        {/* Floating elements for visual appeal */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary-400 rounded-full opacity-60 animate-pulse" />
        <div className="absolute -top-1 -right-4 w-3 h-3 bg-success-400 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-warning-400 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-1 -left-4 w-3 h-3 bg-error-400 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '3s' }} />
      </div>
    </div>
  );
}
