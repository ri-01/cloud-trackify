
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthState, User, Device } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, device: any) => Promise<void>;
  logout: () => void;
  // New methods for device tracking
  getDevices: () => Device[];
  addDevice: (device: Omit<Device, 'id' | 'userId'>) => Promise<void>;
  startTracking: (deviceId: string) => Promise<void>;
  stopTracking: (deviceId: string) => Promise<void>;
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

  // Mock devices for demonstration
  const [devices, setDevices] = useState<Device[]>([
    { 
      id: '1', 
      name: 'Car Tracker', 
      type: 'vehicle', 
      serialNumber: 'VT-2023-001',
      userId: '1'
    },
    { 
      id: '2', 
      name: 'Bike Tracker', 
      type: 'vehicle', 
      serialNumber: 'VT-2023-002',
      userId: '1'
    },
    { 
      id: '3', 
      name: 'Laptop Tracker', 
      type: 'asset', 
      serialNumber: 'AT-2023-001',
      userId: '1'
    }
  ]);

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
      
      // With Supabase, we would:
      // 1. Create the user
      // 2. Store the device information
      
      // Mock successful signup
      const mockUser: User = {
        id: '1',
        email,
        name,
        createdAt: new Date().toISOString(),
      };

      // Add the device to our mock devices array
      if (device && device.name && device.type && device.serialNumber) {
        const newDevice: Device = {
          id: `${devices.length + 1}`,
          name: device.name,
          type: device.type,
          serialNumber: device.serialNumber,
          userId: mockUser.id,
        };
        
        setDevices([...devices, newDevice]);
      }

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

  // Device management functions (would connect to Supabase in a real app)
  const getDevices = () => {
    // In a real app, this would fetch devices from Supabase
    return devices;
  };

  const addDevice = async (device: Omit<Device, 'id' | 'userId'>) => {
    try {
      // In a real app, this would add the device to Supabase
      const newDevice: Device = {
        ...device,
        id: `${devices.length + 1}`,
        userId: state.user?.id || '1',
      };
      
      setDevices([...devices, newDevice]);
      toast.success(`Device "${device.name}" added successfully`);
    } catch (error) {
      console.error('Add device error:', error);
      toast.error('Failed to add device');
      throw error;
    }
  };

  const startTracking = async (deviceId: string) => {
    // In a real app, this would update the device's tracking status in Supabase
    toast.success('Tracking started');
  };

  const stopTracking = async (deviceId: string) => {
    // In a real app, this would update the device's tracking status in Supabase
    toast.info('Tracking stopped');
  };

  return (
    <AuthContext.Provider value={{ 
      ...state, 
      login, 
      signup, 
      logout,
      getDevices,
      addDevice,
      startTracking,
      stopTracking
    }}>
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
