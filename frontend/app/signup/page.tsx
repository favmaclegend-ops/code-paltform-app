"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import FormWrapper from "../components/FormWrapper";
import Link from "next/link";
import { signup, handleApiError, type SignupData } from "../utils/api";

const EyeIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {isOpen ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
    )}
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

function SignupContent() {
  const params = useSearchParams();
  const router = useRouter();
  const role = params.get("role") || "student";
  
  const [form, setForm] = useState({ 
    username: "", 
    email: "", 
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Check password strength
    if (name === "password") {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const checkPasswordStrength = (password: string) => {
    let score = 0;
    const feedback = [];

    if (password.length >= 8) score++;
    else feedback.push("At least 8 characters");
    
    if (/[A-Z]/.test(password)) score++;
    else feedback.push("One uppercase letter");
    
    if (/[a-z]/.test(password)) score++;
    else feedback.push("One lowercase letter");
    
    if (/[0-9]/.test(password)) score++;
    else feedback.push("One number");
    
    if (/[^A-Za-z0-9]/.test(password)) score++;
    else feedback.push("One special character");

    return { score, feedback };
  };

  const getPasswordStrengthColor = (score: number) => {
    if (score <= 2) return "bg-error-500";
    if (score <= 3) return "bg-warning-500";
    if (score <= 4) return "bg-primary-500";
    return "bg-success-500";
  };

  const getPasswordStrengthText = (score: number) => {
    if (score <= 2) return "Weak";
    if (score <= 3) return "Fair";
    if (score <= 4) return "Good";
    return "Strong";
  };

  const validateForm = () => {
    if (!form.username.trim()) {
      setError("Username is required");
      return false;
    }
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
    if (passwordStrength.score < 3) {
      setError("Please choose a stronger password");
      return false;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
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
      const signupData: SignupData = {
        username: form.username,
        email: form.email,
        password: form.password,
        role: role as 'student' | 'lecturer'
      };
      
      const response = await signup(signupData);
      
      // Success - redirect to signin
      router.push(`/signin?role=${role}&message=${encodeURIComponent(response.message)}`);
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const getRoleDetails = () => {
    if (role === "student") {
      return {
        title: "Create Student Account",
        subtitle: "Join thousands of learners on their coding journey",
        icon: "🎓"
      };
    }
    return {
      title: "Create Lecturer Account",
      subtitle: "Share your expertise and inspire the next generation",
      icon: "👨‍🏫"
    };
  };

  const roleDetails = getRoleDetails();

  return (
    <FormWrapper 
      title={roleDetails.title} 
      subtitle={roleDetails.subtitle}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            leftIcon={<UserIcon />}
            required
            placeholder="Enter your username"
            helperText="Choose a unique username for your profile"
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            leftIcon={<EmailIcon />}
            required
            placeholder="Enter your email"
            helperText="We'll use this for account verification"
          />
        </div>

        <div className="space-y-4">
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
            placeholder="Create a strong password"
          />

          {form.password && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary-600 dark:text-secondary-400">Password strength:</span>
                <span className={`font-medium ${
                  passwordStrength.score <= 2 ? 'text-error-600' :
                  passwordStrength.score <= 3 ? 'text-warning-600' :
                  passwordStrength.score <= 4 ? 'text-primary-600' :
                  'text-success-600'
                }`}>
                  {getPasswordStrengthText(passwordStrength.score)}
                </span>
              </div>
              <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength.score)}`}
                  style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                />
              </div>
              {passwordStrength.feedback.length > 0 && (
                <div className="text-xs text-secondary-500 dark:text-secondary-400">
                  Missing: {passwordStrength.feedback.join(", ")}
                </div>
              )}
            </div>
          )}

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={form.confirmPassword}
            onChange={handleChange}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300 transition-colors"
              >
                <EyeIcon isOpen={showConfirmPassword} />
              </button>
            }
            required
            placeholder="Confirm your password"
            error={form.confirmPassword && form.password !== form.confirmPassword ? "Passwords do not match" : undefined}
          />
        </div>

        <Button 
          type="submit" 
          loading={loading} 
          fullWidth
          size="lg"
          variant="gradient"
        >
          Create {role === "student" ? "Student" : "Lecturer"} Account
        </Button>

        <div className="text-center pt-4 border-t border-secondary-200 dark:border-secondary-700">
          <p className="text-secondary-600 dark:text-secondary-400 mb-2">
            Already have an account?
          </p>
          <Link
            href={`/signin?role=${role}`}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-colors duration-200"
          >
            Sign in here →
          </Link>
        </div>
      </form>
    </FormWrapper>
  );
}

export default function Signup() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    }>
      <SignupContent />
    </Suspense>
  );
}
