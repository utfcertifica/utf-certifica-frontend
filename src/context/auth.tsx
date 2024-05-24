import React, { createContext, useContext, ReactNode } from 'react';
import useAuth from '@hooks/useAuth';

interface AuthContextProps {
  loading: boolean;
  user: User | null;
  isAuth: boolean;
  handleLogin: (userData: { email: string; password: string }) => void;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { loading, user, isAuth, handleLogin, handleLogout } = useAuth();
  return (
    <AuthContext.Provider value={{ loading, user, isAuth, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
