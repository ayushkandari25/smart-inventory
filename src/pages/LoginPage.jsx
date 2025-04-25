import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Package } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'viewer'
  });
  const [formType, setFormType] = useState('login');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        login({
          username: formData.username,
          role: formData.role
        });
        setIsLoading(false);
        navigate('/dashboard');
      }, 1000);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center">
              <Package className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
            SmartInventory<span className="text-blue-500">_App</span>
          </h1>
          
          <div className="flex mb-6">
            <button
              className={`flex-1 py-2 text-center ${formType === 'login' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
              onClick={() => setFormType('login')}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 text-center ${formType === 'signup' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
              onClick={() => setFormType('signup')}
            >
              Sign Up
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="input"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="input"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="role">
                Role
              </label>
              <select
                id="role"
                name="role"
                className="input"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
            
            <button
              type="submit"
              className={`btn btn-primary w-full ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                formType === 'login' ? 'Login' : 'Sign Up'
              )}
            </button>
          </form>
          
          <div className="mt-4 text-center text-gray-500 text-sm dark:text-gray-400">
            <p>Demo App - No actual authentication</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;