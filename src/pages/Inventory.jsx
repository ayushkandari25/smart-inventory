import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, ChevronDown, ChevronUp, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useInventory } from '../contexts/InventoryContext';
import ProductForm from '../components/Inventory/ProductForm';
import { formatDate, formatCurrency, getStockStatus, getExpiryStatus } from '../utils/sampleData';

const Inventory = () => {
  const { hasPermission } = useAuth();
  const { products, categories, deleteProduct } = useInventory();
  
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Apply filters, search, and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply search
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply stock filter
    if (stockFilter !== 'all') {
      if (stockFilter === 'low') {
        result = result.filter(product => product.quantity <= 5);
      } else if (stockFilter === 'out') {
        result = result.filter(product => product.quantity <= 0);
      }
    }
    
    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, stockFilter, sortConfig]);
  
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };
  
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };
  
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ChevronDown size={16} />;
    }
    return sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Inventory Management
        </h1>
        
        {hasPermission('create') && (
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary flex items-center"
          >
            <Plus size={16} className="mr-2" />
            Add Product
          </button>
        )}
      </div>
      
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <ProductForm 
              existingProduct={editingProduct}
              onClose={handleCloseForm}
            />
          </div>
        </div>
      )}
      
      <div className="card bg-white dark:bg-gray-800">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <div className="relative">
              <select
                className="input pl-8 pr-10 appearance-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={16} className="text-gray-400" />
              </div>
            </div>
            
            <div className="relative">
              <select
                className="input appearance-none"
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
              >
                <option value="all">All Stock</option>
                <option value="low">Low Stock</option>
                <option value="out">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th 
                  className="cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Name {getSortIcon('name')}
                  </div>
                </th>
                <th 
                  className="cursor-pointer"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center">
                    Category {getSortIcon('category')}
                  </div>
                </th>
                <th 
                  className="cursor-pointer"
                  onClick={() => handleSort('quantity')}
                >
                  <div className="flex items-center">
                    Quantity {getSortIcon('quantity')}
                  </div>
                </th>
                <th 
                  className="cursor-pointer"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center">
                    Price {getSortIcon('price')}
                  </div>
                </th>
                <th 
                  className="cursor-pointer"
                  onClick={() => handleSort('expiryDate')}
                >
                  <div className="flex items-center">
                    Expiry Date {getSortIcon('expiryDate')}
                  </div>
                </th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => {
                  const stockStatus = getStockStatus(product.quantity);
                  const expiryStatus = getExpiryStatus(product.expiryDate);
                  
                  return (
                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="font-medium text-gray-800 dark:text-white">
                        {product.name}
                      </td>
                      <td>{product.category}</td>
                      <td>{product.quantity}</td>
                      <td>{formatCurrency(product.price)}</td>
                      <td>{formatDate(product.expiryDate)}</td>
                      <td>
                        <div className="flex flex-col space-y-1">
                          <span className={`badge ${stockStatus.className}`}>
                            {stockStatus.status}
                          </span>
                          
                          {product.expiryDate && (
                            <span className={`badge ${expiryStatus.className}`}>
                              {expiryStatus.status}
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="flex space-x-2">
                          {hasPermission('edit') && (
                            <button
                              onClick={() => handleEdit(product)}
                              className="p-1 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              <Edit size={16} />
                            </button>
                          )}
                          
                          {hasPermission('delete') && (
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No products found. Try a different search or filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
        </div>
      </div>
    </div>
  );
};

export default Inventory;