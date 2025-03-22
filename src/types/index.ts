
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Device {
  id: string;
  name: string;
  type: string;
  serialNumber: string;
  userId: string;
}

export interface LocationData {
  id: string;
  deviceId: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  speed?: number;
  altitude?: number;
  batteryLevel?: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
