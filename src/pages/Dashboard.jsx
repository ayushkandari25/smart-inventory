import React from 'react';
import { Package, AlertTriangle, Clock, BarChart2 } from 'lucide-react';
import { useInventory } from '../contexts/InventoryContext';
import { formatCurrency } from '../utils/sampleData';

const Dashboard = () => {
  const { 
    products, 
    getLowStockProducts, 
    getExpiringProducts, 
    getExpiredProducts,
    getCategoryStats
  } = useInventory();
  
  const lowStockProducts = getLowStockProducts();
  const expiringProducts = getExpiringProducts();
  const expiredProducts = getExpiredProducts();
  const categoryStats = getCategoryStats();
  
  // Calculate total inventory value
  const totalValue = products.reduce((sum, product) => {
    return sum + (product.price * product.quantity);
  }, 0);
  
  // Get top 5 products by value
  const topProducts = [...products]
    .sort((a, b) => (b.price * b.quantity) - (a.price * a.quantity))
    .slice(0, 5);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-white dark:bg-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Products</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                {products.length}
              </h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Package size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="text-green-500">+{Math.floor(products.length * 0.1)}</span> from last month
          </div>
        </div>
        
        <div className="card bg-white dark:bg-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Low Stock Items</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                {lowStockProducts.length}
              </h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <AlertTriangle size={20} className="text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Need attention soon
          </div>
        </div>
        
        <div className="card bg-white dark:bg-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Expiring Soon</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                {expiringProducts.length}
              </h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <Clock size={20} className="text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Expiring within 7 days
          </div>
        </div>
        
        <div className="card bg-white dark:bg-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                {formatCurrency(totalValue)}
              </h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <BarChart2 size={20} className="text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Current inventory value
          </div>
        </div>
      </div>
      
      {/* Alerts Section */}
      {(lowStockProducts.length > 0 || expiringProducts.length > 0 || expiredProducts.length > 0) && (
        <div className="card bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Alerts & Notifications
          </h2>
          
          <div className="space-y-3">
            {lowStockProducts.length > 0 && (
              <div className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <AlertTriangle size={20} className="text-yellow-600 dark:text-yellow-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                    Low Stock Alert
                  </p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-400">
                    {lowStockProducts.length} products are running low on stock.
                  </p>
                </div>
              </div>
            )}
            
            {expiringProducts.length > 0 && (
              <div className="flex items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <Clock size={20} className="text-orange-600 dark:text-orange-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-orange-800 dark:text-orange-300">
                    Expiration Alert
                  </p>
                  <p className="text-xs text-orange-700 dark:text-orange-400">
                    {expiringProducts.length} products are expiring within 7 days.
                  </p>
                </div>
              </div>
            )}
            
            {expiredProducts.length > 0 && (
              <div className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <AlertTriangle size={20} className="text-red-600 dark:text-red-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-red-800 dark:text-red-300">
                    Expired Products
                  </p>
                  <p className="text-xs text-red-700 dark:text-red-400">
                    {expiredProducts.length} products have expired and should be removed.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products by Value */}
        <div className="card bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Top Products by Value
          </h2>
          
          <div className="space-y-3">
            {topProducts.map(product => (
              <div key={product.id} className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Package size={16} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {product.category} • Qty: {product.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-800 dark:text-white">
                  {formatCurrency(product.price * product.quantity)}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Categories */}
        <div className="card bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Category Overview
          </h2>
          
          <div className="space-y-3">
            {Object.entries(categoryStats).map(([category, stats]) => (
              <div key={category} className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    {category}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {stats.count} products • {stats.totalQuantity} items
                  </p>
                </div>
                <div className="relative h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-blue-500 dark:bg-blue-600"
                    style={{ width: `${Math.min(100, (stats.count / products.length) * 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;