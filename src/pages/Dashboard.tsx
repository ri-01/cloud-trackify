import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Activity, 
  BarChart3, 
  Battery, 
  BatteryCharging,
  Clock, 
  LogOut, 
  MapPin, 
  Menu, 
  PieChart, 
  Plus, 
  Settings, 
  User,
  Smartphone,
  Navigation,
  Briefcase,
  Dog,
  Laptop,
  Search
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
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { Link } from 'react-router-dom';
import Map from '@/components/Map';
import TrackerControls from '@/components/TrackerControls';
import { toast } from 'sonner';
import { Device } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import DeviceRegistrationForm from '@/components/DeviceRegistrationForm';
import { Input } from '@/components/ui/input';

const initialMockDevices: Device[] = [
  { 
    id: '1', 
    name: 'Car Tracker', 
    type: 'vehicle', 
    serialNumber: 'VT-2023-001', 
    status: 'online',
    userId: 'user1',
    batteryLevel: 85
  },
  { 
    id: '2', 
    name: 'Bike Tracker', 
    type: 'vehicle', 
    serialNumber: 'VT-2023-002', 
    status: 'online',
    userId: 'user1',
    batteryLevel: 75
  },
  { 
    id: '3', 
    name: 'Laptop Tracker', 
    type: 'laptop', 
    serialNumber: 'AT-2023-001', 
    status: 'offline',
    userId: 'user1',
    batteryLevel: 45,
    isCharging: true
  },
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [mockDevices, setMockDevices] = useState<Device[]>(initialMockDevices);
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  const [newDevice, setNewDevice] = useState({
    name: '',
    type: 'vehicle',
    serialNumber: '',
    batteryLevel: 100,
    isCharging: false
  });
  
  const [usageData, setUsageData] = useState([
    { name: 'Moving', value: 48 },
    { name: 'Stationary', value: 52 },
  ]);
  
  const [locationData, setLocationData] = useState([
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
  ]);

  const [deviceStats, setDeviceStats] = useState([
    { name: 'Car Tracker', distance: 12.5, avgSpeed: 25, maxSpeed: 65, movingTime: 4.2 },
    { name: 'Bike Tracker', distance: 5.8, avgSpeed: 12, maxSpeed: 22, movingTime: 1.8 },
    { name: 'Phone', distance: 3.2, avgSpeed: 5, maxSpeed: 12, movingTime: 1.2 },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredDevices = mockDevices.filter(device => 
    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.serialNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const COLORS = ['#3b82f6', '#e2e8f0'];

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
  
  useEffect(() => {
    if (!isTracking) return;
    
    const interval = setInterval(() => {
      setLocationData(prev => {
        const newData = [...prev];
        const lastEntry = newData[newData.length - 1];
        const currentTime = new Date();
        
        const timeStr = `${currentTime.getHours()}:${String(currentTime.getMinutes()).padStart(2, '0')}`;
        
        const newSpeed = Math.random() > 0.3 ? Math.floor(Math.random() * 60) + 5 : 0;
        
        const newBatteryLevel = Math.max(lastEntry.batteryLevel - Math.random() * 2, 0);
        
        newData.shift();
        newData.push({
          time: timeStr,
          speed: newSpeed,
          batteryLevel: newBatteryLevel
        });
        
        return newData;
      });
      
      setUsageData(prev => {
        const movingValue = Math.min(prev[0].value + Math.random() * 5, 90);
        const stationaryValue = 100 - movingValue;
        
        return [
          { name: 'Moving', value: movingValue },
          { name: 'Stationary', value: stationaryValue },
        ];
      });
      
      setMockDevices(prev => {
        return prev.map(device => {
          if (!device.isCharging && device.batteryLevel) {
            return {
              ...device,
              batteryLevel: Math.max((device.batteryLevel - Math.random() * 1), 0)
            };
          }
          else if (device.isCharging && device.batteryLevel && device.batteryLevel < 100) {
            return {
              ...device, 
              batteryLevel: Math.min((device.batteryLevel + Math.random() * 1), 100)
            };
          }
          return device;
        });
      });

      setDeviceStats(prev => {
        return prev.map(stat => {
          const speedIncrease = Math.random() * 2;
          const distanceIncrease = speedIncrease * (Math.random() * 0.05);
          const timeIncrease = Math.random() * 0.05;
          
          return {
            ...stat,
            distance: +(stat.distance + distanceIncrease).toFixed(1),
            avgSpeed: Math.min(+(stat.avgSpeed + (Math.random() - 0.3)).toFixed(1), stat.maxSpeed),
            maxSpeed: Math.max(stat.maxSpeed, +(stat.maxSpeed + (Math.random() > 0.8 ? Math.random() * 3 : 0)).toFixed(1)),
            movingTime: +(stat.movingTime + timeIncrease).toFixed(1)
          };
        });
      });
      
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isTracking]);

  const handleAddDevice = () => {
    if (!newDevice.name || !newDevice.serialNumber) {
      toast.error('Please provide device name and serial number');
      return;
    }
    
    const id = `device-${Date.now()}`;
    
    const device: Device = {
      id,
      name: newDevice.name,
      type: newDevice.type,
      serialNumber: newDevice.serialNumber,
      status: 'online',
      userId: user?.id || 'user1',
      batteryLevel: newDevice.batteryLevel,
      isCharging: newDevice.isCharging
    };
    
    setMockDevices(prev => [...prev, device]);
    
    setDeviceStats(prev => [
      ...prev, 
      { 
        name: newDevice.name, 
        distance: 0, 
        avgSpeed: 0, 
        maxSpeed: 0, 
        movingTime: 0 
      }
    ]);
    
    setIsAddDeviceOpen(false);
    setNewDevice({
      name: '',
      type: 'vehicle',
      serialNumber: '',
      batteryLevel: 100,
      isCharging: false
    });
    
    toast.success(`Device "${newDevice.name}" added successfully`);
  };

  const onlineDevices = mockDevices.filter(device => device.status === 'online');
  
  const currentDevice = mockDevices.find(d => d.status === 'online');
  const batteryLevel = currentDevice?.batteryLevel || 0;
  const isCharging = currentDevice?.isCharging || false;

  const getDeviceIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'phone':
      case 'personal':
        return <Smartphone className="h-5 w-5" />;
      case 'laptop':
        return <Laptop className="h-5 w-5" />;
      case 'asset':
        return <Briefcase className="h-5 w-5" />;
      case 'pet':
        return <Dog className="h-5 w-5" />;
      case 'vehicle':
      default:
        return <Navigation className="h-5 w-5" />;
    }
  };

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
                  Monitor and track your devices in real-time
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="gap-1"
                  onClick={() => setIsAddDeviceOpen(true)}
                >
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

            <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/50">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">My Devices</CardTitle>
                    <CardDescription>
                      {mockDevices.length} devices registered
                    </CardDescription>
                  </div>
                  <div className="w-72">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input 
                        placeholder="Search devices..." 
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} 
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredDevices.map(device => (
                    <div 
                      key={device.id}
                      className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          {getDeviceIcon(device.type)}
                          <span className={`ml-2 w-2 h-2 rounded-full ${device.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        </div>
                        {(device.type === 'phone' || device.type === 'personal' || device.type === 'laptop') && (
                          <div className="text-sm">
                            {device.isCharging ? (
                              <BatteryCharging className="h-4 w-4 text-green-500" />
                            ) : (
                              <Battery className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                        )}
                      </div>
                      <h3 className="font-medium text-sm mb-1">{device.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{device.serialNumber}</p>
                      {device.batteryLevel !== undefined && (
                        <div className="mt-2 text-xs flex items-center">
                          <div className="bg-gray-200 dark:bg-gray-600 h-1.5 w-full rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${device.isCharging ? 'bg-green-500' : 'bg-blue-500'}`}
                              style={{ width: `${device.batteryLevel}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-xs">{Math.round(device.batteryLevel)}%</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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
                        {isTracking ? 'Tracking' : 'Online'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Last updated: {isTracking ? 'Live updating' : '2 minutes ago'}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg dark:bg-gray-800/50 transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardDescription>Battery</CardDescription>
                      <CardTitle className="text-xl flex items-center gap-2">
                        {isCharging ? (
                          <BatteryCharging className="h-5 w-5 text-green-500" />
                        ) : (
                          <Battery className="h-5 w-5 text-blue-500" />
                        )}
                        {batteryLevel.toFixed(0)}%
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {isCharging ? 'Currently charging' : `Estimated ${Math.round(batteryLevel / 5)} hours remaining`}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg dark:bg-gray-800/50 transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardDescription>Current Speed</CardDescription>
                      <CardTitle className="text-xl">
                        {isTracking && locationData[locationData.length - 1].speed > 0 
                          ? `${locationData[locationData.length - 1].speed} mph` 
                          : '0 mph'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Status: {isTracking && locationData[locationData.length - 1].speed > 0 ? 'Moving' : 'Stationary'}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg dark:bg-gray-800/50 transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardDescription>Devices</CardDescription>
                      <CardTitle className="text-xl">{onlineDevices.length} Online</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {mockDevices.length - onlineDevices.length} devices offline
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="col-span-1 lg:col-span-2 bg-white/80 backdrop-blur-sm dark:bg-gray-800/50">
                    <CardHeader>
                      <CardTitle>Speed Tracking</CardTitle>
                      <CardDescription>
                        {isTracking ? 'Real-time activity monitoring' : '24-hour activity monitoring'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={locationData}
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
                    <CardDescription>
                      {isTracking ? 'Real-time battery consumption' : '24-hour battery consumption'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={locationData}
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
                              <div className="flex items-center">
                                {getDeviceIcon(device.type)}
                                <span className="font-medium ml-2">{device.name}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {(device.type === 'phone' || device.type === 'personal' || device.type === 'laptop') && (
                                <div className="flex items-center text-sm text-gray-500">
                                  {device.isCharging ? (
                                    <BatteryCharging className="h-4 w-4 text-green-500 mr-1" />
                                  ) : (
                                    <Battery className="h-4 w-4 mr-1" />
                                  )}
                                  {device.batteryLevel?.toFixed(0)}%
                                </div>
                              )}
                              <span className="text-sm text-gray-500 dark:text-gray-400">{device.serialNumber}</span>
                            </div>
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
                    <CardTitle>Device Movement Statistics</CardTitle>
                    <CardDescription>
                      {isTracking ? 'Real-time movement statistics' : 'Current movement statistics for all devices'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4">Device</th>
                              <th className="text-left py-3 px-4">Distance (miles)</th>
                              <th className="text-left py-3 px-4">Avg. Speed (mph)</th>
                              <th className="text-left py-3 px-4">Max Speed (mph)</th>
                              <th className="text-left py-3 px-4">Moving Time (hrs)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {deviceStats.map((stat, index) => (
                              <tr key={index} className="border-b">
                                <td className="py-3 px-4">{stat.name}</td>
                                <td className="py-3 px-4">{stat.distance}</td>
                                <td className="py-3 px-4">{stat.avgSpeed}</td>
                                <td className="py-3 px-4">{stat.maxSpeed}</td>
                                <td className="py-3 px-4">{stat.movingTime}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-md font-medium mb-3">Distance Comparison</h3>
                          <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={deviceStats}
                                margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis label={{ value: 'Miles', angle: -90, position: 'insideLeft' }} />
                                <Tooltip />
                                <Bar dataKey="distance" fill="#3b82f6" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-md font-medium mb-3">Speed Comparison</h3>
                          <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={deviceStats}
                                margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis label={{ value: 'MPH', angle: -90, position: 'insideLeft' }} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="avgSpeed" fill="#22c55e" name="Avg Speed" />
                                <Bar dataKey="maxSpeed" fill="#f97316" name="Max Speed" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      <Dialog open={isAddDeviceOpen} onOpenChange={setIsAddDeviceOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Device</DialogTitle>
            <DialogDescription>
              Enter the details of your tracking device
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <DeviceRegistrationForm device={newDevice} setDevice={setNewDevice} />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDeviceOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddDevice}>
              Add Device
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
