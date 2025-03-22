import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Activity, 
  BarChart3, 
  Battery, 
  Clock, 
  LogOut, 
  MapPin, 
  Menu, 
  PieChart, 
  Plus, 
  Settings, 
  User 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import { Link } from 'react-router-dom';
import Map from '@/components/Map';
import TrackerControls from '@/components/TrackerControls';
import { toast } from 'sonner';

const mockLocationData = [
  { time: '00:00', speed: 0, batteryLevel: 85 },
  { time: '02:00', speed: 0, batteryLevel: 84 },
  { time: '04:00', speed: 0, batteryLevel: 83 },
  { time: '06:00', speed: 15, batteryLevel: 82 },
  { time: '08:00', speed: 65, batteryLevel: 80 },
  { time: '10:00', speed: 25, batteryLevel: 79 },
  { time: '12:00', speed: 35, batteryLevel: 77 },
  { time: '14:00', speed: 0, batteryLevel: 75 },
  { time: '16:00', speed: 45, batteryLevel: 73 },
  { time: '18:00', speed: 30, batteryLevel: 70 },
  { time: '20:00', speed: 20, batteryLevel: 68 },
  { time: '22:00', speed: 0, batteryLevel: 65 },
];

const usageData = [
  { name: 'Moving', value: 48 },
  { name: 'Stationary', value: 52 },
];

const COLORS = ['#3b82f6', '#e2e8f0'];

const mockDevices = [
  { id: '1', name: 'Car Tracker', type: 'vehicle', serialNumber: 'VT-2023-001', status: 'online' },
  { id: '2', name: 'Bike Tracker', type: 'vehicle', serialNumber: 'VT-2023-002', status: 'online' },
  { id: '3', name: 'Laptop Tracker', type: 'asset', serialNumber: 'AT-2023-001', status: 'offline' },
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTracking = () => {
    if (!isTracking) {
      toast.success('Tracking started successfully');
    } else {
      toast.info('Tracking stopped');
    }
    setIsTracking(!isTracking);
  };

  const onlineDevices = mockDevices.filter(device => device.status === 'online');

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <div 
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 z-30 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ease-in-out`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-center p-6 border-b border-gray-200 dark:border-gray-800">
            <MapPin className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-xl font-semibold">CloudTrack</span>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
            <div className="space-y-1">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2 py-6 bg-blue-50 dark:bg-blue-900/30"
              >
                <Activity className="h-5 w-5" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 py-6">
                <MapPin className="h-5 w-5" />
                Map View
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 py-6">
                <Clock className="h-5 w-5" />
                History
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 py-6">
                <BarChart3 className="h-5 w-5" />
                Reports
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 py-6">
                <Settings className="h-5 w-5" />
                Settings
              </Button>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <Link to="/profile">
              <Button variant="ghost" className="w-full justify-start gap-2 py-6">
                <User className="h-5 w-5" />
                Profile
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2 py-6 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={logout}
            >
              <LogOut className="h-5 w-5" />
              Log out
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm z-20">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
                <h1 className="ml-2 text-xl font-semibold md:hidden">CloudTrack</h1>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium hidden md:block">
                  Welcome, {user?.name || 'User'}
                </span>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 animate-fadeIn">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Monitor and track your device in real-time
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-1">
                  <Plus className="h-4 w-4" />
                  Add Device
                </Button>
                <Button 
                  size="sm" 
                  className="gap-1"
                  onClick={() => setActiveTab('map')}
                >
                  <MapPin className="h-4 w-4" />
                  View Map
                </Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="map">Map View</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg dark:bg-gray-800/50 transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardDescription>Current Status</CardDescription>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        Online
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Last updated: 2 minutes ago
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg dark:bg-gray-800/50 transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardDescription>Battery</CardDescription>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Battery className="h-5 w-5 text-blue-500" />
                        65%
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Estimated 2 days remaining
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg dark:bg-gray-800/50 transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardDescription>Current Speed</CardDescription>
                      <CardTitle className="text-xl">0 mph</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Status: Stationary
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg dark:bg-gray-800/50 transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardDescription>Location</CardDescription>
                      <CardTitle className="text-xl">San Francisco, CA</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Last moving: 3 hours ago
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="col-span-1 lg:col-span-2 bg-white/80 backdrop-blur-sm dark:bg-gray-800/50">
                    <CardHeader>
                      <CardTitle>Speed Tracking</CardTitle>
                      <CardDescription>24-hour activity monitoring</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={mockLocationData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis 
                              dataKey="time" 
                              stroke="#94a3b8"
                              tick={{ fill: '#94a3b8', fontSize: 12 }}
                            />
                            <YAxis 
                              stroke="#94a3b8"
                              tick={{ fill: '#94a3b8', fontSize: 12 }}
                            />
                            <Tooltip />
                            <Area 
                              type="monotone" 
                              dataKey="speed" 
                              stroke="#3b82f6" 
                              fill="#3b82f6" 
                              fillOpacity={0.2}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/50">
                    <CardHeader>
                      <CardTitle>Usage Analysis</CardTitle>
                      <CardDescription>Moving vs stationary time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={usageData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {usageData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/50">
                  <CardHeader>
                    <CardTitle>Battery Level</CardTitle>
                    <CardDescription>24-hour battery consumption</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={mockLocationData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis 
                            dataKey="time" 
                            stroke="#94a3b8"
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                          />
                          <YAxis 
                            stroke="#94a3b8"
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            domain={[0, 100]}
                          />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="batteryLevel" 
                            stroke="#10b981" 
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="map" className="space-y-6">
                <TrackerControls 
                  isTracking={isTracking} 
                  onToggleTracking={toggleTracking} 
                  onlineDevicesCount={onlineDevices.length}
                />
                
                <Card className="overflow-hidden border-none shadow-xl bg-transparent">
                  <CardContent className="p-0">
                    <Map 
                      devices={onlineDevices} 
                      isTracking={isTracking} 
                    />
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Device Status</CardTitle>
                      <CardDescription>Current status of all your devices</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockDevices.map(device => (
                          <div key={device.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${device.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                              <span className="font-medium">{device.name}</span>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{device.serialNumber}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Tracking History</CardTitle>
                      <CardDescription>Recent tracking sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div>
                              <p className="font-medium">Morning Route</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Today, 8:30 AM - 9:15 AM</p>
                            </div>
                            <span className="text-sm">45 min</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div>
                              <p className="font-medium">Evening Drive</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Yesterday, 6:00 PM - 6:45 PM</p>
                            </div>
                            <span className="text-sm">45 min</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div>
                              <p className="font-medium">Weekend Trip</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Saturday, 10:00 AM - 2:30 PM</p>
                            </div>
                            <span className="text-sm">4.5 hrs</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="reports" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Activity Reports</CardTitle>
                    <CardDescription>View detailed reports of your device activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-12 text-gray-500">
                      Reports feature coming soon
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
