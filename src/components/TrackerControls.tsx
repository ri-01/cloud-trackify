
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Square, Smartphone } from 'lucide-react';

interface TrackerControlsProps {
  isTracking: boolean;
  onToggleTracking: () => void;
  onlineDevicesCount: number;
}

const TrackerControls: React.FC<TrackerControlsProps> = ({ 
  isTracking, 
  onToggleTracking,
  onlineDevicesCount 
}) => {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 items-start sm:items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900">
          <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="font-medium text-sm">Active Devices</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {onlineDevicesCount} {onlineDevicesCount === 1 ? 'device' : 'devices'} online
          </p>
        </div>
      </div>
      
      <Button
        onClick={onToggleTracking}
        className={isTracking ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
      >
        {isTracking ? (
          <>
            <Square className="w-4 h-4 mr-2" />
            Stop Tracking
          </>
        ) : (
          <>
            <Play className="w-4 h-4 mr-2" />
            Start Tracking
          </>
        )}
      </Button>
    </div>
  );
};

export default TrackerControls;
