
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
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

interface DeviceRegistrationFormProps {
  device: {
    name: string;
    type: string;
    serialNumber: string;
    batteryLevel?: number;
    isCharging?: boolean;
  };
  setDevice: React.Dispatch<React.SetStateAction<{
    name: string;
    type: string;
    serialNumber: string;
    batteryLevel?: number;
    isCharging?: boolean;
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
            <SelectItem value="phone">Phone Tracker</SelectItem>
            <SelectItem value="vehicle">Vehicle Tracker</SelectItem>
            <SelectItem value="personal">Personal Tracker</SelectItem>
            <SelectItem value="asset">Asset Tracker</SelectItem>
            <SelectItem value="pet">Pet Tracker</SelectItem>
            <SelectItem value="laptop">Laptop Tracker</SelectItem>
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

      {(device.type === 'phone' || device.type === 'personal' || device.type === 'laptop') && (
        <>
          <div className="space-y-1">
            <Label htmlFor="battery-level">Battery Level (%)</Label>
            <div className="pt-2 px-2">
              <Slider 
                id="battery-level"
                defaultValue={[device.batteryLevel || 100]}
                max={100}
                step={1}
                onValueChange={(value) => setDevice({ ...device, batteryLevel: value[0] })}
              />
            </div>
            <div className="text-right text-sm text-gray-500">
              {device.batteryLevel || 100}%
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="is-charging">Device Charging</Label>
            <Switch
              id="is-charging"
              checked={device.isCharging || false}
              onCheckedChange={(checked) => setDevice({ ...device, isCharging: checked })}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DeviceRegistrationForm;
