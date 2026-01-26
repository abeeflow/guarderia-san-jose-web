import { createContext } from 'react';

export interface User {
  username: string;
  role: 'admin';
}

export interface AuthLoginData {
  name?: string;
  email?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (userData: AuthLoginData) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
