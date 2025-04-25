import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    
    if (savedTheme !== null) {
      setDarkMode(JSON.parse(savedTheme));
    } else {
      // Check user system preference
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDarkMode);
    }
  }, []);
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);
  
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };
  
  const value = {
    darkMode,
    toggleDarkMode
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};