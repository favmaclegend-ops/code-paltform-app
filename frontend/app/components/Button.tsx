import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive" | "success" | "gradient";
type ButtonSize = "sm" | "md" | "lg" | "xl" | "icon";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const getButtonClasses = (variant: ButtonVariant = "primary", size: ButtonSize = "md", fullWidth: boolean = false, className?: string) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none";
  
  const variantClasses = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-lg hover:shadow-xl transform hover:scale-105",
    secondary: "bg-white border-2 border-secondary-200 text-secondary-700 hover:bg-secondary-50 hover:border-primary-300 focus:ring-primary-500 dark:bg-secondary-800 dark:border-secondary-700 dark:text-secondary-300 dark:hover:bg-secondary-700 dark:hover:border-primary-600",
    ghost: "text-secondary-600 hover:text-primary-600 hover:bg-primary-50 focus:ring-primary-500 dark:text-secondary-400 dark:hover:text-primary-400 dark:hover:bg-primary-900/20",
    destructive: "bg-error-600 text-white hover:bg-error-700 focus:ring-error-500 shadow-lg hover:shadow-xl",
    success: "bg-success-600 text-white hover:bg-success-700 focus:ring-success-500 shadow-lg hover:shadow-xl",
    gradient: "bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 focus:ring-primary-500 shadow-lg hover:shadow-xl transform hover:scale-105",
  };
  
  const sizeClasses = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 py-2",
    lg: "h-11 px-6 text-lg",
    xl: "h-12 px-8 text-xl",
    icon: "h-10 w-10",
  };
  
  const widthClass = fullWidth ? "w-full" : "w-auto";
  
  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className || ''}`;
};

const LoadingSpinner = ({ size = "sm" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };
  
  return (
    <svg
      className={`animate-spin ${sizeClasses[size]}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  className,
  ...props
}: ButtonProps) {
  const spinnerSize = size === "sm" ? "sm" : size === "lg" || size === "xl" ? "lg" : "md";
  
  return (
    <button
      className={getButtonClasses(variant, size, fullWidth, className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <LoadingSpinner size={spinnerSize} />}
      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      <span className={loading ? "ml-2" : ""}>
        {loading ? "Loading..." : children}
      </span>
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}
