
import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface MapProps {
  devices: {
    id: string;
    name: string;
    location?: {
      latitude: number;
      longitude: number;
    }
  }[];
  isTracking: boolean;
}

const Map: React.FC<MapProps> = ({ devices, isTracking }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [locations, setLocations] = useState<Record<string, { lat: number; lng: number }>>({});

  // Generate random initial locations for devices
  useEffect(() => {
    const initialLocations: Record<string, { lat: number; lng: number }> = {};
    
    devices.forEach(device => {
      // Generate random coordinates centered roughly around world center
      initialLocations[device.id] = {
        lat: 20 + (Math.random() * 30 - 15),
        lng: 10 + (Math.random() * 60 - 30),
      };
    });
    
    setLocations(initialLocations);
  }, [devices]);

  // Simulate device movement when tracking is active
  useEffect(() => {
    if (!isTracking) return;
    
    const interval = setInterval(() => {
      setLocations(prev => {
        const newLocations = { ...prev };
        Object.keys(newLocations).forEach(deviceId => {
          // Small random movement
          newLocations[deviceId] = {
            lat: newLocations[deviceId].lat + (Math.random() * 0.02 - 0.01),
            lng: newLocations[deviceId].lng + (Math.random() * 0.02 - 0.01),
          };
        });
        return newLocations;
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isTracking]);

  return (
    <div className="relative w-full h-[60vh] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Fake map background */}
      <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/0,30,2/800x600?access_token=pk.placeholder')] bg-cover opacity-70 dark:opacity-40" />
      
      {/* Grid lines to simulate map */}
      <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-700 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.8),rgba(255,255,255,0.8))]" />

      {/* Devices on the map */}
      {devices.map(device => {
        const location = locations[device.id];
        if (!location) return null;
        
        // Convert lat/lng to percentages for positioning
        const x = ((location.lng + 180) / 360) * 100;
        const y = ((90 - location.lat) / 180) * 100;
        
        return (
          <div 
            key={device.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${isTracking ? 'animate-pulse' : ''}`}
            style={{ 
              left: `${x}%`, 
              top: `${y}%` 
            }}
          >
            <div className="flex flex-col items-center">
              <Navigation className="h-8 w-8 text-blue-600 dark:text-blue-400 fill-blue-100 dark:fill-blue-900" />
              <div className="px-2 py-1 bg-white dark:bg-gray-900 rounded-md shadow-md text-xs mt-1">
                {device.name}
              </div>
            </div>
          </div>
        );
      })}

      {/* Info overlay */}
      <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-900 p-3 rounded-md shadow-lg bg-opacity-80 dark:bg-opacity-80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="font-medium">Status:</span> {isTracking ? 
              <span className="text-green-600 dark:text-green-400">Tracking active</span> : 
              <span className="text-gray-600 dark:text-gray-400">Tracking paused</span>
            }
          </div>
          <div className="text-sm">
            <span className="font-medium">Devices:</span> {devices.length} {devices.length === 1 ? 'device' : 'devices'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
