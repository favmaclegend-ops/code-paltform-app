"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RoleCard from "../components/RoleCard";
import ThemeToggle from "../components/ThemeToggle";

export default function RoleSelection() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<"student" | "lecturer" | null>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useState(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  });

  const handleRoleSelection = (role: "student" | "lecturer") => {
    setSelectedRole(role);
    // Add a small delay for better UX
    setTimeout(() => {
      router.push(`/signup?role=${role}`);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary-200 rounded-full opacity-10 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-success-200 rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-warning-200 rounded-full opacity-5 blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-lg border-b border-secondary-200 dark:border-secondary-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <span className="text-xl font-bold gradient-text">CodePlatform</span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle variant="dropdown" size="md" />
              <button
                onClick={() => router.push('/')}
                className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className={`text-center mb-16 ${isAnimated ? 'animate-fade-in' : 'opacity-0'}`}>
          <h1 className="text-5xl sm:text-6xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">
            Choose Your <span className="gradient-text">Path</span>
          </h1>
          <p className="text-xl sm:text-2xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto leading-relaxed">
            Select your role to get started with your personalized learning or teaching experience on CodePlatform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          <div className={`transform transition-all duration-700 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
            <RoleCard
              role="student"
              onClick={() => handleRoleSelection("student")}
              selected={selectedRole === "student"}
            />
          </div>
          
          <div className={`transform transition-all duration-700 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            <RoleCard
              role="lecturer"
              onClick={() => handleRoleSelection("lecturer")}
              selected={selectedRole === "lecturer"}
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className={`mt-20 text-center ${isAnimated ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
          <p className="text-secondary-500 dark:text-secondary-500 mb-4">
            Already have an account?
          </p>
          <button
            onClick={() => router.push('/signin')}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-colors duration-200"
          >
            Sign in here →
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-secondary-900 text-secondary-300 py-8 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 CodePlatform. All rights reserved. Built with ❤️ for learners worldwide.</p>
        </div>
      </footer>
    </div>
  );
}
