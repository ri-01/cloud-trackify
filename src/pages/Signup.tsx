
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DeviceRegistrationForm from '@/components/DeviceRegistrationForm';
import { MapPin, UserPlus } from 'lucide-react';

const Signup = () => {
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [device, setDevice] = useState({
    name: '',
    type: 'vehicle',
    serialNumber: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!device.name.trim()) newErrors.deviceName = 'Device name is required';
    if (!device.serialNumber.trim()) newErrors.serialNumber = 'Serial number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 2 && validateStep2()) {
      try {
        setIsLoading(true);
        await signup(formData.email, formData.password, formData.name, device);
      } catch (error) {
        console.error('Signup error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="w-full max-w-md space-y-8 animate-fadeIn">
        <div className="text-center space-y-2">
          <div className="inline-block p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-2">
            <MapPin className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Track your devices with precision and security
          </p>
        </div>

        <div className="relative mt-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
              Step {currentStep} of 2
            </span>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-lg shadow-soft rounded-2xl p-8 border border-gray-100 dark:border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 ? (
              <div className="space-y-4 animate-slideUp">
                <div className="space-y-1">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/80 dark:bg-gray-900/50"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/80 dark:bg-gray-900/50"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="bg-white/80 dark:bg-gray-900/50"
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="bg-white/80 dark:bg-gray-900/50"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                  )}
                </div>

                <Button 
                  type="button" 
                  onClick={handleNextStep}
                  className="w-full py-6"
                >
                  Continue
                </Button>
              </div>
            ) : (
              <div className="space-y-6 animate-slideUp">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold">Register Your Device</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Add your GPS tracking device details</p>
                </div>

                <DeviceRegistrationForm device={device} setDevice={setDevice} />
                
                {errors.deviceName && <p className="text-red-500 text-sm">{errors.deviceName}</p>}
                {errors.serialNumber && <p className="text-red-500 text-sm">{errors.serialNumber}</p>}

                <div className="flex space-x-4">
                  <Button 
                    type="button" 
                    onClick={handlePrevStep}
                    variant="outline"
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating...' : 'Create Account'}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
