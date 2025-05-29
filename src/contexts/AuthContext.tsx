import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Admin, AuthContextType, Student, User } from '../types';
import { authService } from '../services/api';

const AuthContext = createContext<AuthContextType>({
  user: null,
  userType: null,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<'student' | 'admin' | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check local storage for stored user data
    const storedUser = localStorage.getItem('user');
    const storedUserType = localStorage.getItem('userType');
    
    if (storedUser && storedUserType) {
      try {
        setUser(JSON.parse(storedUser));
        setUserType(storedUserType as 'student' | 'admin');
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('userType');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = async (email: string, password: string, type: 'student' | 'admin'): Promise<boolean> => {
    try {
      let response;
      
      if (type === 'student') {
        response = await authService.loginStudent(email, password);
        if (response && response.token) {
          const userData: Student = response.user;
          setUser(userData);
          setUserType('student');
          localStorage.setItem('user', JSON.stringify(userData));
          localStorage.setItem('userType', 'student');
          localStorage.setItem('token', response.token);
          setIsAuthenticated(true);
          return true;
        }
      } else {
        response = await authService.loginAdmin(email, password);
        if (response && response.token) {
          const userData: Admin = response.user;
          setUser(userData);
          setUserType('admin');
          localStorage.setItem('user', JSON.stringify(userData));
          localStorage.setItem('userType', 'admin');
          localStorage.setItem('token', response.token);
          setIsAuthenticated(true);
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, userType, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};