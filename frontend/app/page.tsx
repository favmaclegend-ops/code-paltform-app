"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "./components/ThemeToggle";

// Icons (using simple SVG for better performance)
const Icons = {
  Code: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  Users: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
  BookOpen: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  Star: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  ChevronRight: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  ),
};

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div className={`group relative bg-white dark:bg-secondary-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-secondary-200 dark:border-secondary-700 hover:border-primary-300 dark:hover:border-primary-600 transform hover:-translate-y-1 ${
      isVisible ? 'animate-fade-in' : 'opacity-0'
    }`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent dark:from-primary-900/20 dark:to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
        <h3 className="text-xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">{title}</h3>
        <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const StatCard = ({ number, label, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  useEffect(() => {
    if (isVisible) {
      const target = parseInt(number.replace(/[^0-9]/g, ''));
      const increment = target / 20;
      const timer = setInterval(() => {
        setCount(prev => {
          if (prev >= target) {
            clearInterval(timer);
            return target;
          }
          return Math.min(prev + increment, target);
        });
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isVisible, number]);
  
  return (
    <div className={`text-center ${
      isVisible ? 'animate-slide-up' : 'opacity-0'
    }`}>
      <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
        {Math.floor(count).toLocaleString()}{number.includes('+') ? '+' : ''}
      </div>
      <div className="text-secondary-600 dark:text-secondary-400 font-medium">{label}</div>
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const features = [
    {
      icon: Icons.Code,
      title: "Interactive Learning",
      description: "Engage with hands-on coding exercises, real-time feedback, and collaborative projects designed to accelerate your learning journey.",
      delay: 200
    },
    {
      icon: Icons.Users,
      title: "Expert Mentorship",
      description: "Connect with industry professionals and experienced lecturers who provide personalized guidance and career insights.",
      delay: 400
    },
    {
      icon: Icons.BookOpen,
      title: "Comprehensive Resources",
      description: "Access a vast library of courses, tutorials, and documentation covering the latest technologies and best practices.",
      delay: 600
    },
    {
      icon: Icons.Star,
      title: "Achievement System",
      description: "Track your progress, earn certificates, and showcase your skills with our gamified learning achievement system.",
      delay: 800
    }
  ];
  
  const stats = [
    { number: "10000+", label: "Students", delay: 1000 },
    { number: "500+", label: "Courses", delay: 1200 },
    { number: "100+", label: "Expert Instructors", delay: 1400 },
    { number: "95%", label: "Success Rate", delay: 1600 }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-lg border-b border-secondary-200 dark:border-secondary-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Icons.Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">CodePlatform</span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle variant="dropdown" size="md" />
              <Link
                href="/role"
                className="px-4 py-2 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              >
                Sign In
              </Link>
              <button
                onClick={() => router.push('/role')}
                className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className={`max-w-4xl mx-auto ${
            isLoaded ? 'animate-fade-in' : 'opacity-0'
          }`}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-secondary-900 dark:text-secondary-100 mb-6 leading-tight">
              Transform Your
              <span className="gradient-text block mt-2">Learning Journey</span>
            </h1>
            <p className="text-xl sm:text-2xl text-secondary-600 dark:text-secondary-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of students and educators on our cutting-edge platform designed to revolutionize how you learn, teach, and grow in the digital age.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => router.push('/role')}
                className="w-full sm:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Start Learning Today</span>
                <Icons.ChevronRight />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-secondary-800 border-2 border-secondary-200 dark:border-secondary-700 text-secondary-700 dark:text-secondary-300 rounded-xl font-semibold hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 transform hover:scale-105">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-secondary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
              Why Choose <span className="gradient-text">CodePlatform</span>
            </h2>
            <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
              Discover the features that make our platform the preferred choice for modern learners and educators worldwide.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Ready to Begin?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join our community of learners and educators today. Choose your path and start your journey to success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/role')}
              className="px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-secondary-50 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started Now
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-all duration-200 transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-secondary-900 text-secondary-300 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Icons.Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CodePlatform</span>
            </div>
            <div className="flex space-x-6">
              <Link href="/about" className="hover:text-primary-400 transition-colors duration-200">About</Link>
              <Link href="/contact" className="hover:text-primary-400 transition-colors duration-200">Contact</Link>
              <Link href="/privacy" className="hover:text-primary-400 transition-colors duration-200">Privacy</Link>
              <Link href="/terms" className="hover:text-primary-400 transition-colors duration-200">Terms</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-secondary-700 text-center">
            <p>&copy; 2024 CodePlatform. All rights reserved. Built with ❤️ for learners worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
