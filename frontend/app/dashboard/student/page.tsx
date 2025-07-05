"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const params = useSearchParams();
  const welcomeMessage = params.get("welcome");
  const [showWelcome, setShowWelcome] = useState(!!welcomeMessage);

  useEffect(() => {
    if (welcomeMessage) {
      const timer = setTimeout(() => setShowWelcome(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [welcomeMessage]);

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      {showWelcome && welcomeMessage && (
        <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg p-4 animate-slide-up">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-success-600 dark:text-success-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-success-600 dark:text-success-400 text-sm">{decodeURIComponent(welcomeMessage)}</span>
          </div>
        </div>
      )}

      {/* Dashboard Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
          Student <span className="gradient-text">Dashboard</span>
        </h1>
        <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
          Welcome to your learning journey! Explore courses, track your progress, and achieve your goals.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-secondary-900 rounded-2xl p-6 shadow-lg border border-secondary-200 dark:border-secondary-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">Courses Enrolled</p>
              <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">3</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-secondary-900 rounded-2xl p-6 shadow-lg border border-secondary-200 dark:border-secondary-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">Completed Courses</p>
              <p className="text-3xl font-bold text-success-600 dark:text-success-400">1</p>
            </div>
            <div className="w-12 h-12 bg-success-100 dark:bg-success-900 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-success-600 dark:text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-secondary-900 rounded-2xl p-6 shadow-lg border border-secondary-200 dark:border-secondary-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">Certificates Earned</p>
              <p className="text-3xl font-bold text-warning-600 dark:text-warning-400">2</p>
            </div>
            <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-warning-600 dark:text-warning-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Current Courses */}
      <div className="bg-white dark:bg-secondary-900 rounded-2xl p-8 shadow-lg border border-secondary-200 dark:border-secondary-700">
        <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-6">Current Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Course Cards */}
          <div className="border border-secondary-200 dark:border-secondary-700 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="w-full h-32 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-2">React Fundamentals</h3>
            <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-4">Learn the basics of React.js development</p>
            <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2 mb-2">
              <div className="bg-primary-600 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="text-xs text-secondary-500 dark:text-secondary-400">65% Complete</p>
          </div>

          <div className="border border-secondary-200 dark:border-secondary-700 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="w-full h-32 bg-gradient-to-br from-success-500 to-success-600 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-2">TypeScript Mastery</h3>
            <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-4">Advanced TypeScript concepts and patterns</p>
            <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2 mb-2">
              <div className="bg-success-600 h-2 rounded-full" style={{ width: '30%' }}></div>
            </div>
            <p className="text-xs text-secondary-500 dark:text-secondary-400">30% Complete</p>
          </div>

          <div className="border border-secondary-200 dark:border-secondary-700 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="w-full h-32 bg-gradient-to-br from-warning-500 to-warning-600 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-2">Backend Development</h3>
            <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-4">Build APIs with Node.js and Express</p>
            <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2 mb-2">
              <div className="bg-warning-600 h-2 rounded-full" style={{ width: '15%' }}></div>
            </div>
            <p className="text-xs text-secondary-500 dark:text-secondary-400">15% Complete</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-secondary-900 rounded-2xl p-6 shadow-lg border border-secondary-200 dark:border-secondary-700">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">Browse Courses</h3>
          <p className="text-secondary-600 dark:text-secondary-400 mb-4">Discover new courses to expand your skills</p>
          <button className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200">
            Explore Courses
          </button>
        </div>

        <div className="bg-white dark:bg-secondary-900 rounded-2xl p-6 shadow-lg border border-secondary-200 dark:border-secondary-700">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">View Certificates</h3>
          <p className="text-secondary-600 dark:text-secondary-400 mb-4">Check your earned certificates and achievements</p>
          <button className="w-full py-2 px-4 bg-success-600 hover:bg-success-700 text-white rounded-lg transition-colors duration-200">
            My Certificates
          </button>
        </div>
      </div>
    </div>
  );
}
