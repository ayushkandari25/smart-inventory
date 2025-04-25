export const generateSampleProducts = () => {
  const categories = ['Electronics', 'Clothing', 'Food', 'Office Supplies', 'Furniture'];
  
  const products = [
    {
      id: '1',
      name: 'Laptop',
      category: 'Electronics',
      quantity: 15,
      price: 999.99,
      expiryDate: null,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      notes: 'High-end models'
    },
    {
      id: '2',
      name: 'Smartphone',
      category: 'Electronics',
      quantity: 25,
      price: 699.99,
      expiryDate: null,
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      notes: 'Latest models'
    },
    {
      id: '3',
      name: 'T-shirt',
      category: 'Clothing',
      quantity: 50,
      price: 19.99,
      expiryDate: null,
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      notes: 'Various sizes and colors'
    },
    {
      id: '4',
      name: 'Jeans',
      category: 'Clothing',
      quantity: 30,
      price: 49.99,
      expiryDate: null,
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      notes: 'All sizes'
    },
    {
      id: '5',
      name: 'Milk',
      category: 'Food',
      quantity: 4,
      price: 2.99,
      expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      notes: 'Refrigerated'
    },
    {
      id: '6',
      name: 'Bread',
      category: 'Food',
      quantity: 8,
      price: 3.49,
      expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      notes: 'Fresh baked'
    },
    {
      id: '7',
      name: 'Notebook',
      category: 'Office Supplies',
      quantity: 100,
      price: 4.99,
      expiryDate: null,
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      notes: 'Various colors'
    },
    {
      id: '8',
      name: 'Pen',
      category: 'Office Supplies',
      quantity: 200,
      price: 1.99,
      expiryDate: null,
      createdAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(),
      notes: 'Blue ink'
    },
    {
      id: '9',
      name: 'Office Chair',
      category: 'Furniture',
      quantity: 5,
      price: 149.99,
      expiryDate: null,
      createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
      notes: 'Ergonomic design'
    },
    {
      id: '10',
      name: 'Desk',
      category: 'Furniture',
      quantity: 3,
      price: 249.99,
      expiryDate: null,
      createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
      notes: 'Wood finish'
    }
  ];
  
  return { products, categories };
};

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
};

export const getStockStatus = (quantity) => {
  if (quantity <= 0) return { status: 'Out of Stock', className: 'badge-error' };
  if (quantity <= 5) return { status: 'Low Stock', className: 'badge-warning' };
  return { status: 'In Stock', className: 'badge-success' };
};

export const getExpiryStatus = (expiryDate) => {
  if (!expiryDate) return { status: 'No Expiry', className: '' };
  
  const today = new Date();
  const expiry = new Date(expiryDate);
  
  if (expiry < today) {
    return { status: 'Expired', className: 'badge-error' };
  }
  
  const daysToExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  
  if (daysToExpiry <= 7) {
    return { status: `Expires in ${daysToExpiry} days`, className: 'badge-warning' };
  }
  
  return { status: `Expires in ${daysToExpiry} days`, className: '' };
};