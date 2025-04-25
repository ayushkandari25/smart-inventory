import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { InventoryProvider } from './contexts/InventoryContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Reports from './pages/Reports';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <InventoryProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Route>
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </InventoryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;