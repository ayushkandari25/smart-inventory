import React, { useState } from 'react';
import { Package, AlertTriangle, Clock, BarChart2, FileText, Download } from 'lucide-react';
import { useInventory } from '../contexts/InventoryContext';
import { formatDate, formatCurrency } from '../utils/sampleData';

const Reports = () => {
  const { 
    products, 
    categories,
    getLowStockProducts, 
    getExpiringProducts, 
    getExpiredProducts,
    getCategoryStats
  } = useInventory();
  
  const [activeTab, setActiveTab] = useState('overview');
  
  const lowStockProducts = getLowStockProducts();
  const expiringProducts = getExpiringProducts();
  const expiredProducts = getExpiredProducts();
  const categoryStats = getCategoryStats();
  
  // Calculate totals
  const totalProducts = products.length;
  const totalItems = products.reduce((sum, product) => sum + product.quantity, 0);
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  
  // Generate fake report date
  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Mock export function
  const exportReport = () => {
    alert('Report export functionality would be implemented here');
  };
  
  const renderOverviewTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-white dark:bg-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Products</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                {totalProducts}
              </h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Package size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="card bg-white dark:bg-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Items</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                {totalItems}
              </h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Package size={20} className="text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        
        <div className="card bg-white dark:bg-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Inventory Value</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                {formatCurrency(totalValue)}
              </h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <BarChart2 size={20} className="text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
        
        <div className="card bg-white dark:bg-gray-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Categories</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                {categories.length}
              </h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <FileText size={20} className="text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-white dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Category Distribution
          </h3>
          
          <div className="space-y-4">
            {Object.entries(categoryStats).map(([category, stats]) => (
              <div key={category}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {stats.count} products
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 dark:bg-blue-600 h-2 rounded-full"
                    style={{ width: `${Math.min(100, (stats.count / totalProducts) * 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card bg-white dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Stock Status Summary
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <AlertTriangle size={20} className="text-red-600 dark:text-red-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-red-800 dark:text-red-300">
                  Out of Stock
                </p>
                <p className="text-xs text-red-700 dark:text-red-400">
                  {products.filter(p => p.quantity <= 0).length} products
                </p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <AlertTriangle size={20} className="text-yellow-600 dark:text-yellow-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                  Low Stock
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-400">
                  {lowStockProducts.length} products
                </p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <Clock size={20} className="text-orange-600 dark:text-orange-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-orange-800 dark:text-orange-300">
                  Expiring Soon
                </p>
                <p className="text-xs text-orange-700 dark:text-orange-400">
                  {expiringProducts.length} products
                </p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <Clock size={20} className="text-red-600 dark:text-red-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-red-800 dark:text-red-300">
                  Expired
                </p>
                <p className="text-xs text-red-700 dark:text-red-400">
                  {expiredProducts.length} products
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderLowStockTab = () => (
    <div className="space-y-6">
      <div className="card bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Low Stock Products (Quantity ≤ 5)
          </h3>
          <span className="badge badge-warning">
            {lowStockProducts.length} items
          </span>
        </div>
        
        {lowStockProducts.length > 0 ? (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="font-medium text-gray-800 dark:text-white">
                      {product.name}
                    </td>
                    <td>{product.category}</td>
                    <td className="text-yellow-600 dark:text-yellow-400 font-medium">
                      {product.quantity}
                    </td>
                    <td>{formatCurrency(product.price)}</td>
                    <td>{formatCurrency(product.price * product.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No low stock products found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
  
  const renderExpiryTab = () => (
    <div className="space-y-6">
      <div className="card bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Products Expiring Soon (Next 7 Days)
          </h3>
          <span className="badge badge-warning">
            {expiringProducts.length} items
          </span>
        </div>
        
        {expiringProducts.length > 0 ? (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Expiry Date</th>
                  <th>Days Left</th>
                </tr>
              </thead>
              <tbody>
                {expiringProducts.map(product => {
                  const today = new Date();
                  const expiryDate = new Date(product.expiryDate);
                  const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="font-medium text-gray-800 dark:text-white">
                        {product.name}
                      </td>
                      <td>{product.category}</td>
                      <td>{product.quantity}</td>
                      <td>{formatDate(product.expiryDate)}</td>
                      <td className="text-orange-600 dark:text-orange-400 font-medium">
                        {daysLeft} days
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No products expiring soon.
            </p>
          </div>
        )}
      </div>
      
      <div className="card bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Expired Products
          </h3>
          <span className="badge badge-error">
            {expiredProducts.length} items
          </span>
        </div>
        
        {expiredProducts.length > 0 ? (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Expiry Date</th>
                  <th>Days Expired</th>
                </tr>
              </thead>
              <tbody>
                {expiredProducts.map(product => {
                  const today = new Date();
                  const expiryDate = new Date(product.expiryDate);
                  const daysExpired = Math.ceil((today - expiryDate) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="font-medium text-gray-800 dark:text-white">
                        {product.name}
                      </td>
                      <td>{product.category}</td>
                      <td>{product.quantity}</td>
                      <td>{formatDate(product.expiryDate)}</td>
                      <td className="text-red-600 dark:text-red-400 font-medium">
                        {daysExpired} days
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No expired products.
            </p>
          </div>
        )}
      </div>
    </div>
  );
  
  const renderCategoryTab = () => (
    <div className="space-y-6">
      <div className="card bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Category Analysis
          </h3>
          <span className="badge">
            {categories.length} categories
          </span>
        </div>
        
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Products</th>
                <th>Total Quantity</th>
                <th>Avg. Price</th>
                <th>Total Value</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => {
                const categoryProducts = products.filter(p => p.category === category);
                const productCount = categoryProducts.length;
                const totalQuantity = categoryProducts.reduce((sum, p) => sum + p.quantity, 0);
                const totalValue = categoryProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0);
                const avgPrice = productCount > 0 
                  ? categoryProducts.reduce((sum, p) => sum + p.price, 0) / productCount 
                  : 0;
                
                return (
                  <tr key={category} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="font-medium text-gray-800 dark:text-white">
                      {category}
                    </td>
                    <td>{productCount}</td>
                    <td>{totalQuantity}</td>
                    <td>{formatCurrency(avgPrice)}</td>
                    <td>{formatCurrency(totalValue)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-white dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Products by Category
          </h3>
          
          <div className="space-y-4">
            {categories.map(category => {
              const count = products.filter(p => p.category === category).length;
              const percentage = (count / totalProducts) * 100;
              
              return (
                <div key={category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {count} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 dark:bg-blue-600 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="card bg-white dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Value by Category
          </h3>
          
          <div className="space-y-4">
            {categories.map(category => {
              const categoryProducts = products.filter(p => p.category === category);
              const categoryValue = categoryProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0);
              const percentage = (categoryValue / totalValue) * 100;
              
              return (
                <div key={category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatCurrency(categoryValue)} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 dark:bg-green-600 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'lowStock':
        return renderLowStockTab();
      case 'expiry':
        return renderExpiryTab();
      case 'category':
        return renderCategoryTab();
      default:
        return renderOverviewTab();
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Inventory Reports
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Generated on {reportDate}
          </p>
        </div>
        
        <button
          onClick={exportReport}
          className="btn btn-primary flex items-center"
        >
          <Download size={16} className="mr-2" />
          Export Report
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex flex-wrap -mb-px">
            <button
              className={`inline-flex items-center h-12 px-4 font-medium text-sm border-b-2 focus:outline-none ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              <BarChart2 size={16} className="mr-2" />
              Overview
            </button>
            
            <button
              className={`inline-flex items-center h-12 px-4 font-medium text-sm border-b-2 focus:outline-none ${
                activeTab === 'lowStock'
                  ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('lowStock')}
            >
              <AlertTriangle size={16} className="mr-2" />
              Low Stock
              {lowStockProducts.length > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                  {lowStockProducts.length}
                </span>
              )}
            </button>
            
            <button
              className={`inline-flex items-center h-12 px-4 font-medium text-sm border-b-2 focus:outline-none ${
                activeTab === 'expiry'
                  ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('expiry')}
            >
              <Clock size={16} className="mr-2" />
              Expiry
              {(expiringProducts.length > 0 || expiredProducts.length > 0) && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
                  {expiringProducts.length + expiredProducts.length}
                </span>
              )}
            </button>
            
            <button
              className={`inline-flex items-center h-12 px-4 font-medium text-sm border-b-2 focus:outline-none ${
                activeTab === 'category'
                  ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('category')}
            >
              <FileText size={16} className="mr-2" />
              Category
            </button>
          </nav>
        </div>
        
        <div className="p-4 md:p-6">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
};

export default Reports;