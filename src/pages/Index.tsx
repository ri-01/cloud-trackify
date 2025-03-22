
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  MapPin, 
  Clock, 
  Shield, 
  Battery, 
  Menu, 
  X, 
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Navigation */}
      <header className="border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md fixed w-full z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <MapPin className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-xl font-semibold">CloudTrack</span>
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <Link to="/#features" className="px-3 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Features
                </Link>
                <Link to="/#pricing" className="px-3 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Pricing
                </Link>
                <Link to="/#about" className="px-3 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  About
                </Link>
                <Link to="/contact" className="px-3 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Contact
                </Link>
                
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button>Dashboard</Button>
                  </Link>
                ) : (
                  <div className="flex space-x-2">
                    <Link to="/login">
                      <Button variant="outline">Log in</Button>
                    </Link>
                    <Link to="/signup">
                      <Button>Sign up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg animate-slideIn">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link 
                to="/#features" 
                className="block px-3 py-4 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white border-b border-gray-100 dark:border-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="/#pricing" 
                className="block px-3 py-4 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white border-b border-gray-100 dark:border-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                to="/#about" 
                className="block px-3 py-4 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white border-b border-gray-100 dark:border-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="block px-3 py-4 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white border-b border-gray-100 dark:border-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {isAuthenticated ? (
                <Link 
                  to="/dashboard" 
                  className="block px-3 py-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full">Dashboard</Button>
                </Link>
              ) : (
                <div className="space-y-2 px-3 py-4">
                  <Link 
                    to="/login" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full">Log in</Button>
                  </Link>
                  <Link 
                    to="/signup" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full">Sign up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Hero section */}
      <section className="pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className={`lg:col-span-6 flex flex-col justify-center transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
              <div className="px-6 py-1 mb-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full inline-flex items-center w-fit">
                <span className="text-xs font-medium">Cloud-based GPS Tracking</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                Real-time tracking with cloud precision
              </h1>
              <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-8 max-w-3xl">
                Monitor your assets, loved ones, and vehicles in real-time with our cloud-based GPS tracking system. Get accurate location data, history, and powerful analytics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto py-6 px-8">
                    Get started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/#features">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto py-6 px-8">
                    Learn more
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="inline-block h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900"></div>
                  ))}
                </div>
                <p className="ml-4 text-sm text-gray-500 dark:text-gray-400">
                  Trusted by <span className="font-semibold">2,000+</span> customers worldwide
                </p>
              </div>
            </div>
            <div className={`lg:col-span-6 mt-12 lg:mt-0 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
              <div className="relative mx-auto w-full max-w-lg">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-10 dark:opacity-20 animate-blob"></div>
                <div className="absolute bottom-0 -right-4 w-72 h-72 bg-blue-600 dark:bg-blue-400 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-10 dark:opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-10 dark:opacity-20 animate-blob animation-delay-4000"></div>
                <div className="m-8 relative space-y-4">
                  <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-soft">
                    <div className="h-64 w-full bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                      <MapPin className="h-16 w-16 text-gray-400 dark:text-gray-500" />
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Powerful Tracking Features</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
              Our cloud-based GPS tracking system provides comprehensive tools for monitoring and analyzing location data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <MapPin className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
                title: "Real-time Tracking",
                description: "Monitor location data in real-time with high accuracy and minimal latency."
              },
              {
                icon: <Clock className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
                title: "Historical Data",
                description: "Access and analyze historical location data with powerful filtering tools."
              },
              {
                icon: <Shield className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
                title: "Secure Cloud Storage",
                description: "Your data is encrypted and securely stored in our cloud infrastructure."
              },
              {
                icon: <Battery className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
                title: "Battery Optimization",
                description: "Advanced algorithms to minimize battery consumption on tracking devices."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-soft border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 dark:bg-blue-700 rounded-3xl shadow-lg overflow-hidden">
            <div className="px-6 py-12 sm:px-12 lg:px-16">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-7">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Ready to start tracking?
                  </h2>
                  <p className="text-xl text-blue-100 mb-6">
                    Sign up today and get access to our powerful GPS tracking platform.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/signup">
                      <Button size="lg" variant="secondary" className="w-full sm:w-auto py-6 px-8">
                        Get started
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button size="lg" variant="outline" className="w-full sm:w-auto py-6 px-8 bg-transparent border-white text-white hover:bg-white/10">
                        Contact sales
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="mt-8 lg:mt-0 lg:col-span-5">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 lg:p-8 shadow-lg">
                    <div className="space-y-4">
                      {[
                        "14-day free trial",
                        "No credit card required",
                        "Cancel anytime",
                        "24/7 customer support"
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-white text-sm sm:text-base">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-xl font-semibold">CloudTrack</span>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Real-time cloud-based GPS tracking system for all your tracking needs.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Product
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Company
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Resources
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} CloudTrack. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
