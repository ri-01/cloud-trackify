
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthState, User } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, device: any) => Promise<void>;
  logout: () => void;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session on load
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          // In a real app, you would validate the session with Supabase here
          setState({
            user: JSON.parse(storedUser),
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setState({ ...initialState, isLoading: false });
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setState({ ...initialState, isLoading: false });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would make a request to Supabase
      console.log('Logging in with:', { email, password });
      
      // Mock successful login with dummy user
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        createdAt: new Date().toISOString(),
      };

      // Store in localStorage (temporary until Supabase is integrated)
      localStorage.setItem('user', JSON.stringify(mockUser));

      // Update state
      setState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      });

      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string, device: any) => {
    try {
      // In a real app, this would make a request to Supabase
      console.log('Signing up with:', { email, password, name, device });
      
      // Mock successful signup
      const mockUser: User = {
        id: '1',
        email,
        name,
        createdAt: new Date().toISOString(),
      };

      toast.success('Signup successful! Please log in.');
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Signup failed. Please try again.');
      throw error;
    }
  };

  const logout = () => {
    // In a real app, this would sign out from Supabase
    localStorage.removeItem('user');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
