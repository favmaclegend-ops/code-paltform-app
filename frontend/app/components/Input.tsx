import React, { useState, forwardRef } from "react";

type InputVariant = "default" | "filled" | "bordered";
type InputSize = "sm" | "md" | "lg";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: InputVariant;
  size?: InputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
};

const getInputClasses = (
  variant: InputVariant = "default",
  size: InputSize = "md",
  fullWidth: boolean = true,
  error?: string,
  className?: string
) => {
  const baseClasses = "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    default: `border-2 rounded-lg bg-white dark:bg-secondary-900 ${
      error
        ? "border-error-300 focus:border-error-500 focus:ring-error-200 dark:border-error-600 dark:focus:border-error-400"
        : "border-secondary-200 focus:border-primary-500 focus:ring-primary-200 dark:border-secondary-700 dark:focus:border-primary-400 dark:focus:ring-primary-800"
    }`,
    filled: `border-0 rounded-lg ${
      error
        ? "bg-error-50 focus:bg-error-100 focus:ring-error-200 dark:bg-error-900/20 dark:focus:bg-error-800/30"
        : "bg-secondary-100 focus:bg-primary-50 focus:ring-primary-200 dark:bg-secondary-800 dark:focus:bg-secondary-700 dark:focus:ring-primary-800"
    }`,
    bordered: `border-b-2 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent ${
      error
        ? "border-error-300 focus:border-error-500 focus:ring-0"
        : "border-secondary-300 focus:border-primary-500 focus:ring-0 dark:border-secondary-600"
    }`,
  };
  
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-5 py-4 text-lg",
  };
  
  const widthClass = fullWidth ? "w-full" : "w-auto";
  
  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className || ''}`;
};

const Input = forwardRef<HTMLInputElement, InputProps>((
  {
    label,
    error,
    helperText,
    variant = "default",
    size = "md",
    leftIcon,
    rightIcon,
    fullWidth = true,
    className,
    id,
    ...props
  },
  ref
) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const hasIcons = leftIcon || rightIcon;
  const inputClasses = getInputClasses(variant, size, fullWidth, error, className);
  
  return (
    <div className={`relative ${fullWidth ? 'w-full' : 'w-auto'} mb-6`}>
      {label && (
        <label
          htmlFor={inputId}
          className={`block text-sm font-medium mb-2 transition-colors duration-200 ${
            error
              ? "text-error-600 dark:text-error-400"
              : isFocused
              ? "text-primary-600 dark:text-primary-400"
              : "text-secondary-700 dark:text-secondary-300"
          }`}
        >
          {label}
          {props.required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={`${
            inputClasses
          } ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''}`}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500">
            {rightIcon}
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <div className="mt-2">
          {error && (
            <p className="text-sm text-error-600 dark:text-error-400 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </p>
          )}
          {!error && helperText && (
            <p className="text-sm text-secondary-500 dark:text-secondary-400">{helperText}</p>
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
