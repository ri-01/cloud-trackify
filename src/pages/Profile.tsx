
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Bell, Edit, Plus, Shield, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    deviceOffline: true,
    batteryLow: true,
    speedAlerts: false,
    weeklyReports: true,
  });

  const handleSaveProfile = () => {
    // In a real app, save to Supabase here
    setIsEditing(false);
  };

  const handleToggleNotification = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Profile</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/50 shadow-soft">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="" alt={user?.name} />
                    <AvatarFallback className="text-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200">
                      {getInitials(user?.name || 'User')}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">{user?.name}</h2>
                  <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Member since {new Date().toLocaleDateString()}
                  </p>

                  <Separator className="my-6" />

                  <div className="w-full space-y-2">
                    <Button variant="outline" className="w-full justify-start gap-2 py-6">
                      <User className="h-4 w-4" />
                      Account
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2 py-6">
                      <Bell className="h-4 w-4" />
                      Notifications
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2 py-6">
                      <Shield className="h-4 w-4" />
                      Security
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-2 py-6 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="w-full mb-6 bg-white/80 backdrop-blur-sm dark:bg-gray-800/50 shadow-soft">
                <TabsTrigger value="account" className="flex-1">Account</TabsTrigger>
                <TabsTrigger value="notifications" className="flex-1">Notifications</TabsTrigger>
                <TabsTrigger value="devices" className="flex-1">Devices</TabsTrigger>
              </TabsList>

              <TabsContent value="account" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/50 shadow-soft">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Update your personal details</CardDescription>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={userData.name}
                          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                          disabled={!isEditing}
                          className="bg-white/80 dark:bg-gray-900/50"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                          disabled={!isEditing}
                          className="bg-white/80 dark:bg-gray-900/50"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={userData.phone}
                          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                          disabled={!isEditing}
                          className="bg-white/80 dark:bg-gray-900/50"
                        />
                      </div>

                      {isEditing && (
                        <div className="pt-4">
                          <Button onClick={handleSaveProfile}>
                            Save Changes
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/50 shadow-soft">
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Change your password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        placeholder="••••••••"
                        className="bg-white/80 dark:bg-gray-900/50"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="••••••••"
                        className="bg-white/80 dark:bg-gray-900/50"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        className="bg-white/80 dark:bg-gray-900/50"
                      />
                    </div>

                    <div className="pt-2">
                      <Button>Update Password</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/50 shadow-soft">
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Manage how you receive alerts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="text-sm font-medium">Email Notifications</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications via email
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.emailAlerts}
                          onCheckedChange={() => handleToggleNotification('emailAlerts')}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="text-sm font-medium">Device Offline Alerts</h4>
                          <p className="text-sm text-muted-foreground">
                            Get notified when your device goes offline
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.deviceOffline}
                          onCheckedChange={() => handleToggleNotification('deviceOffline')}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="text-sm font-medium">Low Battery Alerts</h4>
                          <p className="text-sm text-muted-foreground">
                            Get notified when battery level is below 20%
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.batteryLow}
                          onCheckedChange={() => handleToggleNotification('batteryLow')}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="text-sm font-medium">Speed Threshold Alerts</h4>
                          <p className="text-sm text-muted-foreground">
                            Get notified when speed exceeds threshold
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.speedAlerts}
                          onCheckedChange={() => handleToggleNotification('speedAlerts')}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h4 className="text-sm font-medium">Weekly Reports</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive weekly summary reports
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.weeklyReports}
                          onCheckedChange={() => handleToggleNotification('weeklyReports')}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="devices" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/50 shadow-soft">
                  <CardHeader>
                    <CardTitle>Your Devices</CardTitle>
                    <CardDescription>Manage your tracking devices</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Vehicle Tracker</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              SN: 123456789 • Active
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Device
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
