import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  BarChart, 
  Users, 
  Settings, 
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { currentUser } = useAuth();
  
  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: <LayoutDashboard size={20} /> 
    },
    { 
      name: 'Inventory', 
      path: '/inventory', 
      icon: <Package size={20} /> 
    },
    { 
      name: 'Reports', 
      path: '/reports', 
      icon: <BarChart size={20} /> 
    }
  ];
  
  // Additional menu items if admin
  if (currentUser?.role === 'admin') {
    navItems.push(
      { 
        name: 'Team', 
        path: '/team', 
        icon: <Users size={20} /> 
      },
      { 
        name: 'Settings', 
        path: '/settings', 
        icon: <Settings size={20} /> 
      }
    );
  }
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out shadow-lg md:shadow-none md:static md:z-0`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Package className="h-6 w-6 text-blue-500" />
              <h2 className="ml-2 text-lg font-bold text-gray-800 dark:text-white">
                SmartInventory
              </h2>
            </div>
            
            <button 
              onClick={toggleSidebar}
              className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="px-2 space-y-1">
              {navItems.map(item => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => 
                      `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                        isActive 
                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`
                    }
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Current role:
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 capitalize">
                {currentUser?.role || 'Viewer'}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;