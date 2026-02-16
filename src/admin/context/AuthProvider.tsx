import { useState, type ReactNode } from 'react';
import { AuthContext, type User, type AuthLoginData } from './AuthContextVals';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData: AuthLoginData) => {
    const newUser: User = { 
      username: userData.name || userData.email || 'Admin', 
      name: userData.name,
      email: userData.email,
      role: 'admin' 
    };
    setUser(newUser);
    localStorage.setItem('admin_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('admin_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
