import { createContext, useContext } from 'react';

export interface AuthContextType {
  user: any;
  isLoading: boolean;
  isLoggedIn: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth は AuthLayout の中でしか使えません！');
  }
  return context;
};
