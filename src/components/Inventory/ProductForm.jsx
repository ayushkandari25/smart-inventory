import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useInventory } from '../../contexts/InventoryContext';

const ProductForm = ({ existingProduct, onClose }) => {
  const isEditing = !!existingProduct;
  const { addProduct, updateProduct, categories, addCategory } = useInventory();
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: 0,
    price: 0,
    expiryDate: '',
    notes: ''
  });
  
  const [customCategory, setCustomCategory] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (existingProduct) {
      setFormData({
        name: existingProduct.name || '',
        category: existingProduct.category || '',
        quantity: existingProduct.quantity || 0,
        price: existingProduct.price || 0,
        expiryDate: existingProduct.expiryDate ? new Date(existingProduct.expiryDate).toISOString().split('T')[0] : '',
        notes: existingProduct.notes || ''
      });
    }
  }, [existingProduct]);
  
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    
    if (value === 'new') {
      // Keep the previous category selected, but show custom input
      setCustomCategory('');
    } else {
      setFormData(prev => ({
        ...prev,
        category: value
      }));
      
      setCustomCategory('');
    }
  };
  
  const handleCustomCategoryChange = (e) => {
    setCustomCategory(e.target.value);
    
    setFormData(prev => ({
      ...prev,
      category: e.target.value
    }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    
    if (formData.quantity < 0) {
      newErrors.quantity = 'Quantity cannot be negative';
    }
    
    if (formData.price < 0) {
      newErrors.price = 'Price cannot be negative';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Add new category if it doesn't exist
      if (formData.category && !categories.includes(formData.category)) {
        addCategory(formData.category);
      }
      
      // Simulate API delay
      setTimeout(() => {
        if (isEditing) {
          updateProduct(existingProduct.id, formData);
        } else {
          addProduct(formData);
        }
        
        setIsSubmitting(false);
        onClose();
      }, 500);
    }
  };
  
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
        >
          <X size={20} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="name">
              Product Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="input"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="category">
              Category*
            </label>
            {customCategory !== '' ? (
              <div className="space-y-2">
                <input
                  type="text"
                  className="input"
                  value={customCategory}
                  onChange={handleCustomCategoryChange}
                  placeholder="Enter new category name"
                />
                <button
                  type="button"
                  className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400"
                  onClick={() => setCustomCategory('')}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <select
                  id="category"
                  name="category"
                  className="input flex-1"
                  value={formData.category}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                  <option value="new">+ Add New Category</option>
                </select>
                
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setCustomCategory('')}
                >
                  New
                </button>
              </div>
            )}
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="quantity">
                Quantity*
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className="input"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                step="1"
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="price">
                Price*
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="input"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="expiryDate">
              Expiry Date
            </label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              className="input"
              value={formData.expiryDate}
              onChange={handleChange}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Leave empty if not applicable
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="notes">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              className="input"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          
          <button
            type="submit"
            className={`btn btn-primary ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              isEditing ? 'Update Product' : 'Add Product'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;