"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LecturerDashboard() {
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
          Lecturer <span className="gradient-text">Dashboard</span>
        </h1>
        <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
          Empower learners with your expertise. Create courses, track student progress, and share knowledge.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-secondary-900 rounded-2xl p-6 shadow-lg border border-secondary-200 dark:border-secondary-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">Total Students</p>
              <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">147</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-secondary-900 rounded-2xl p-6 shadow-lg border border-secondary-200 dark:border-secondary-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">Active Courses</p>
              <p className="text-3xl font-bold text-success-600 dark:text-success-400">5</p>
            </div>
            <div className="w-12 h-12 bg-success-100 dark:bg-success-900 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-success-600 dark:text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-secondary-900 rounded-2xl p-6 shadow-lg border border-secondary-200 dark:border-secondary-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">Completion Rate</p>
              <p className="text-3xl font-bold text-warning-600 dark:text-warning-400">87%</p>
            </div>
            <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-warning-600 dark:text-warning-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-secondary-900 rounded-2xl p-6 shadow-lg border border-secondary-200 dark:border-secondary-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">Total Revenue</p>
              <p className="text-3xl font-bold text-error-600 dark:text-error-400">$12.3k</p>
            </div>
            <div className="w-12 h-12 bg-error-100 dark:bg-error-900 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-error-600 dark:text-error-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* My Courses */}
      <div className="bg-white dark:bg-secondary-900 rounded-2xl p-8 shadow-lg border border-secondary-200 dark:border-secondary-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">My Courses</h2>
          <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200">
            Create New Course
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Course Cards */}
          <div className="border border-secondary-200 dark:border-secondary-700 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="w-full h-32 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-2">React Fundamentals</h3>
            <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-4">52 students enrolled</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-success-600 dark:text-success-400 bg-success-100 dark:bg-success-900 px-2 py-1 rounded">Active</span>
              <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">$2,340 earned</span>
            </div>
          </div>

          <div className="border border-secondary-200 dark:border-secondary-700 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="w-full h-32 bg-gradient-to-br from-success-500 to-success-600 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-2">TypeScript Mastery</h3>
            <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-4">38 students enrolled</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-success-600 dark:text-success-400 bg-success-100 dark:bg-success-900 px-2 py-1 rounded">Active</span>
              <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">$1,890 earned</span>
            </div>
          </div>

          <div className="border border-secondary-200 dark:border-secondary-700 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="w-full h-32 bg-gradient-to-br from-warning-500 to-warning-600 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-2">Backend Development</h3>
            <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-4">31 students enrolled</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-warning-600 dark:text-warning-400 bg-warning-100 dark:bg-warning-900 px-2 py-1 rounded">Draft</span>
              <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">$0 earned</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Student Activity */}
        <div className="bg-white dark:bg-secondary-900 rounded-2xl p-6 shadow-lg border border-secondary-200 dark:border-secondary-700">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">Recent Student Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm">J</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100">John completed React Fundamentals</p>
                <p className="text-xs text-secondary-500 dark:text-secondary-400">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-success-100 dark:bg-success-900 rounded-full flex items-center justify-center">
                <span className="text-success-600 dark:text-success-400 font-semibold text-sm">M</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100">Maria enrolled in TypeScript Mastery</p>
                <p className="text-xs text-secondary-500 dark:text-secondary-400">5 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-warning-100 dark:bg-warning-900 rounded-full flex items-center justify-center">
                <span className="text-warning-600 dark:text-warning-400 font-semibold text-sm">A</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100">Alex submitted assignment</p>
                <p className="text-xs text-secondary-500 dark:text-secondary-400">1 day ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-secondary-900 rounded-2xl p-6 shadow-lg border border-secondary-200 dark:border-secondary-700">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 hover:bg-secondary-50 dark:hover:bg-secondary-800 rounded-lg transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-secondary-900 dark:text-secondary-100">Create New Course</p>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400">Start building your next course</p>
                </div>
              </div>
            </button>
            
            <button className="w-full text-left p-3 hover:bg-secondary-50 dark:hover:bg-secondary-800 rounded-lg transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success-100 dark:bg-success-900 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-success-600 dark:text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-secondary-900 dark:text-secondary-100">View Analytics</p>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400">Check course performance metrics</p>
                </div>
              </div>
            </button>
            
            <button className="w-full text-left p-3 hover:bg-secondary-50 dark:hover:bg-secondary-800 rounded-lg transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-warning-100 dark:bg-warning-900 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-warning-600 dark:text-warning-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-secondary-900 dark:text-secondary-100">Message Students</p>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400">Send announcements or updates</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
