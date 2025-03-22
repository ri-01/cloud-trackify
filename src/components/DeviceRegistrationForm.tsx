
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DeviceRegistrationFormProps {
  device: {
    name: string;
    type: string;
    serialNumber: string;
  };
  setDevice: React.Dispatch<React.SetStateAction<{
    name: string;
    type: string;
    serialNumber: string;
  }>>;
}

const DeviceRegistrationForm: React.FC<DeviceRegistrationFormProps> = ({ device, setDevice }) => {
  return (
    <div className="space-y-4 p-6 bg-white/60 dark:bg-gray-950/30 backdrop-blur-md rounded-xl border border-gray-100 dark:border-gray-800 shadow-soft">
      <div className="space-y-1">
        <Label htmlFor="device-name">Device Name</Label>
        <Input
          id="device-name"
          placeholder="e.g. My Car Tracker"
          value={device.name}
          onChange={(e) => setDevice({ ...device, name: e.target.value })}
          className="bg-white/80 dark:bg-gray-900/50"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="device-type">Device Type</Label>
        <Select
          value={device.type}
          onValueChange={(value) => setDevice({ ...device, type: value })}
        >
          <SelectTrigger id="device-type" className="bg-white/80 dark:bg-gray-900/50">
            <SelectValue placeholder="Select device type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vehicle">Vehicle Tracker</SelectItem>
            <SelectItem value="personal">Personal Tracker</SelectItem>
            <SelectItem value="asset">Asset Tracker</SelectItem>
            <SelectItem value="pet">Pet Tracker</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label htmlFor="serial-number">Serial Number</Label>
        <Input
          id="serial-number"
          placeholder="Enter device serial number"
          value={device.serialNumber}
          onChange={(e) => setDevice({ ...device, serialNumber: e.target.value })}
          className="bg-white/80 dark:bg-gray-900/50"
        />
      </div>
    </div>
  );
};

export default DeviceRegistrationForm;
