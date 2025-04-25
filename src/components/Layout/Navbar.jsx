import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, User, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Navbar = ({ toggleSidebar }) => {
  const { currentUser, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none md:hidden"
          >
            <Menu size={24} />
          </button>
          
          <h1 className="text-xl font-bold text-gray-800 dark:text-white ml-4 md:ml-0">
            Smart<span className="text-blue-500">Inventory</span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          
          <div className="relative">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <User size={18} className="text-gray-600 dark:text-gray-300" />
              </div>
              
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {currentUser?.username || 'User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {currentUser?.role || 'Viewer'}
                </p>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;