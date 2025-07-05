"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser, signout, isAuthenticated } from "../utils/api";
import type { User } from "../utils/api";
import ThemeToggle from "../components/ThemeToggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push("/role");
      return;
    }

    // Get user data
    const userData = getUser();
    if (userData) {
      setUser(userData);
    } else {
      router.push("/role");
      return;
    }

    setIsLoading(false);
  }, [router]);

  const handleSignout = async () => {
    await signout();
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-secondary-600 dark:text-secondary-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Router will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-secondary-900/80 backdrop-blur-lg border-b border-secondary-200 dark:border-secondary-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <span className="text-xl font-bold gradient-text">CodePlatform</span>
              </div>
              <span className="text-sm text-secondary-500 dark:text-secondary-400">
                {user.role === "student" ? "Student" : "Lecturer"} Dashboard
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-secondary-900 dark:text-secondary-100">{user.username}</p>
                  <p className="text-secondary-500 dark:text-secondary-400">{user.email}</p>
                </div>
              </div>
              
              <ThemeToggle variant="button" size="sm" />
              
              <button
                onClick={handleSignout}
                className="px-4 py-2 text-sm text-secondary-600 dark:text-secondary-400 hover:text-error-600 dark:hover:text-error-400 transition-colors duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
