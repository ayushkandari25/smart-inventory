import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateSampleProducts } from '../utils/sampleData';

const InventoryContext = createContext();

export const useInventory = () => {
  return useContext(InventoryContext);
};

export const InventoryProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load initial data
  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    const storedCategories = localStorage.getItem('categories');
    
    if (storedProducts && storedCategories) {
      setProducts(JSON.parse(storedProducts));
      setCategories(JSON.parse(storedCategories));
    } else {
      // Initialize with sample data
      const sampleData = generateSampleProducts();
      setProducts(sampleData.products);
      setCategories(sampleData.categories);
      
      // Save to localStorage
      localStorage.setItem('products', JSON.stringify(sampleData.products));
      localStorage.setItem('categories', JSON.stringify(sampleData.categories));
    }
    
    setIsLoading(false);
  }, []);
  
  // Save to localStorage whenever products or categories change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('products', JSON.stringify(products));
      localStorage.setItem('categories', JSON.stringify(categories));
    }
  }, [products, categories, isLoading]);
  
  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    setProducts(prevProducts => [...prevProducts, newProduct]);
    
    // Add category if it doesn't exist
    if (!categories.includes(product.category)) {
      setCategories(prevCategories => [...prevCategories, product.category]);
    }
    
    return newProduct;
  };
  
  const updateProduct = (id, updatedProduct) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
    
    // Add category if it doesn't exist
    if (!categories.includes(updatedProduct.category)) {
      setCategories(prevCategories => [...prevCategories, updatedProduct.category]);
    }
  };
  
  const deleteProduct = (id) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
  };
  
  const getProduct = (id) => {
    return products.find(product => product.id === id);
  };
  
  const addCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories(prevCategories => [...prevCategories, category]);
      return true;
    }
    return false;
  };
  
  const getLowStockProducts = (threshold = 5) => {
    return products.filter(product => product.quantity <= threshold);
  };
  
  const getExpiringProducts = (days = 7) => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + days);
    
    return products.filter(product => {
      if (!product.expiryDate) return false;
      
      const expiryDate = new Date(product.expiryDate);
      return expiryDate <= futureDate && expiryDate >= today;
    });
  };
  
  const getExpiredProducts = () => {
    const today = new Date();
    
    return products.filter(product => {
      if (!product.expiryDate) return false;
      
      const expiryDate = new Date(product.expiryDate);
      return expiryDate < today;
    });
  };
  
  const getCategoryStats = () => {
    const stats = {};
    
    categories.forEach(category => {
      const categoryProducts = products.filter(product => product.category === category);
      const totalQuantity = categoryProducts.reduce((sum, product) => sum + product.quantity, 0);
      
      stats[category] = {
        count: categoryProducts.length,
        totalQuantity
      };
    });
    
    return stats;
  };
  
  const value = {
    products,
    categories,
    isLoading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    addCategory,
    getLowStockProducts,
    getExpiringProducts,
    getExpiredProducts,
    getCategoryStats
  };
  
  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};