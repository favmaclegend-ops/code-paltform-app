// API Configuration and Utilities
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Types
export interface User {
  id: number;
  username: string;
  email: string;
  role: 'student' | 'lecturer';
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
  role: 'student' | 'lecturer';
}

export interface SigninData {
  email: string;
  password: string;
  role: 'student' | 'lecturer';
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
  message: string;
}

export interface SignupResponse {
  message: string;
  user_id: number;
  success: boolean;
}

export interface ApiError {
  detail: string;
  status_code: number;
}

// API Client Class
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const token = this.getToken();

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        let errorMessage = 'An error occurred';
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorMessage;
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return {} as T;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  // Token management
  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  }

  // User management
  setUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  getUser(): User | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Auth endpoints
  async signup(data: SignupData): Promise<SignupResponse> {
    return this.request<SignupResponse>('/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async signin(data: SigninData): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/signin', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    // Store token and user data
    this.setToken(response.access_token);
    this.setUser(response.user);
    
    return response;
  }

  async signout(): Promise<void> {
    this.removeToken();
  }

  // Health check
  async healthCheck(): Promise<{ message: string }> {
    return this.request<{ message: string }>('/');
  }
}

// Create singleton instance
export const apiClient = new ApiClient();

// Convenience functions
export const signup = (data: SignupData) => apiClient.signup(data);
export const signin = (data: SigninData) => apiClient.signin(data);
export const signout = () => apiClient.signout();
export const getUser = () => apiClient.getUser();
export const isAuthenticated = () => apiClient.isAuthenticated();

// Error handling utility
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

// Custom hook for API state management (you can use this with React Query or SWR)
export const useApi = () => {
  return {
    signup,
    signin,
    signout,
    getUser,
    isAuthenticated,
    healthCheck: () => apiClient.healthCheck(),
  };
};
