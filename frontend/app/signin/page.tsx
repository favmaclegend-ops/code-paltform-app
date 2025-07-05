"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import FormWrapper from "../components/FormWrapper";
import Link from "next/link";
import { signin, handleApiError, type SigninData } from "../utils/api";

const EyeIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {isOpen ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
    )}
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

function SigninContent() {
  const params = useSearchParams();
  const router = useRouter();
  const role = params.get("role") || "student";
  const successMessage = params.get("message");
  
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Show success message if coming from signup
  useEffect(() => {
    if (successMessage) {
      // You could use a toast here instead
      const timer = setTimeout(() => {
        // Clear the message from URL without page reload
        const url = new URL(window.location.href);
        url.searchParams.delete('message');
        window.history.replaceState({}, '', url);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!form.password) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const signinData: SigninData = {
        email: form.email,
        password: form.password,
        role: role as 'student' | 'lecturer'
      };
      
      const response = await signin(signinData);
      
      // Redirect to dashboard with success message
      router.push(`/dashboard/${role}?welcome=${encodeURIComponent(response.message)}`);
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const getRoleDetails = () => {
    if (role === "student") {
      return {
        title: "Welcome Back, Student",
        subtitle: "Continue your learning journey with CodePlatform",
        icon: "🎓"
      };
    }
    return {
      title: "Welcome Back, Lecturer",
      subtitle: "Access your teaching dashboard and inspire learners",
      icon: "👨‍🏫"
    };
  };

  const roleDetails = getRoleDetails();

  return (
    <FormWrapper 
      title={roleDetails.title} 
      subtitle={roleDetails.subtitle}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Success Message */}
        {successMessage && (
          <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg p-4 animate-slide-up">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-success-600 dark:text-success-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-success-600 dark:text-success-400 text-sm">{successMessage}</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg p-4 animate-shake">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-error-600 dark:text-error-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-error-600 dark:text-error-400 text-sm">{error}</span>
            </div>
          </div>
        )}

        <Input
          label="Email Address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          leftIcon={<EmailIcon />}
          required
          placeholder="Enter your email"
          helperText="Use the email address associated with your account"
        />

        <Input
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={handleChange}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300 transition-colors"
            >
              <EyeIcon isOpen={showPassword} />
            </button>
          }
          required
          placeholder="Enter your password"
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-primary-600 bg-secondary-100 border-secondary-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-secondary-800 focus:ring-2 dark:bg-secondary-700 dark:border-secondary-600"
            />
            <span className="ml-2 text-sm text-secondary-600 dark:text-secondary-400">
              Remember me
            </span>
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
          >
            Forgot password?
          </Link>
        </div>

        <Button 
          type="submit" 
          loading={loading} 
          fullWidth
          size="lg"
          variant="gradient"
        >
          Sign In as {role === "student" ? "Student" : "Lecturer"}
        </Button>

        {/* Social Sign In Options */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-secondary-200 dark:border-secondary-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-secondary-900 text-secondary-500 dark:text-secondary-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-secondary-300 dark:border-secondary-600 rounded-lg shadow-sm bg-white dark:bg-secondary-800 text-sm font-medium text-secondary-500 dark:text-secondary-400 hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="ml-2">Google</span>
          </button>

          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-secondary-300 dark:border-secondary-600 rounded-lg shadow-sm bg-white dark:bg-secondary-800 text-sm font-medium text-secondary-500 dark:text-secondary-400 hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.083.343-.09.378-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-12C24.007 5.367 18.641.001 12.017.001z"/>
            </svg>
            <span className="ml-2">GitHub</span>
          </button>
        </div>

        <div className="text-center pt-4 border-t border-secondary-200 dark:border-secondary-700">
          <p className="text-secondary-600 dark:text-secondary-400 mb-2">
            Don't have an account?
          </p>
          <Link
            href={`/signup?role=${role}`}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-colors duration-200"
          >
            Create {role === "student" ? "student" : "lecturer"} account →
          </Link>
        </div>
      </form>
    </FormWrapper>
  );
}

export default function Signin() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    }>
      <SigninContent />
    </Suspense>
  );
}
