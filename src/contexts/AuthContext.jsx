import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    
    setIsLoading(false);
  }, []);
  
  const login = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };
  
  const hasPermission = (action) => {
    if (!currentUser) return false;
    
    const { role } = currentUser;
    
    switch (action) {
      case 'create':
        return role === 'admin';
      case 'edit':
        return role === 'admin' || role === 'manager';
      case 'delete':
        return role === 'admin';
      case 'view':
        return true; // All roles can view
      default:
        return false;
    }
  };
  
  const value = {
    currentUser,
    isAuthenticated,
    isLoading,
    login,
    logout,
    hasPermission
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};