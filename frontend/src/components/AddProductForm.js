import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  // State for adding new product
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newThreshold, setNewThreshold] = useState('');

  // State for updating quantity of existing product
  const [products, setProducts] = useState([]); // list of products for dropdown
  const [selectedProductId, setSelectedProductId] = useState('');
  const [updateQuantity, setUpdateQuantity] = useState('');

  // Fetch products when component mounts or after product add/update
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://project-5yfx.onrender.com/api/products/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Add new product handler
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://project-5yfx.onrender.com/api/products/', {
        name: newName,
        description: newDescription,
        quantity: parseInt(newQuantity),
        threshold: parseInt(newThreshold),
      });
      alert('New product added successfully!');
      setNewName('');
      setNewDescription('');
      setNewQuantity('');
      setNewThreshold('');
      // Refresh products list after adding new product
      const response = await axios.get('https://project-5yfx.onrender.com/api/products/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error adding new product:', error);
      alert('Failed to add new product');
    }
  };

  // Update product quantity handler
  const handleUpdateQuantity = async (e) => {
    e.preventDefault();
    try {
      if (!selectedProductId) {
        alert('Please select a product');
        return;
      }
      const product = products.find(p => p.id === parseInt(selectedProductId));
      if (!product) {
        alert('Selected product not found');
        return;
      }
      const newQty = product.quantity + parseInt(updateQuantity);
      if (newQty < 0) {
        alert('Quantity cannot be negative');
        return;
      }
      await axios.put(`https://project-5yfx.onrender.com/api/products/${product.id}/`, {
        ...product,
        quantity: newQty,
      });
      alert('Product quantity updated successfully!');
      setSelectedProductId('');
      setUpdateQuantity('');
      // Refresh products list after update
      const response = await axios.get('https://project-5yfx.onrender.com/api/products/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error updating product quantity:', error);
      alert('Failed to update product quantity');
    }
  };

  return (
    <div>
      {/* Add New Product Form */}
      <form
        onSubmit={handleAddProduct}
        style={{ marginBottom: '2rem', border: '1px solid #ccc', padding: '1rem' }}
      >
        <h3>Add New Product</h3>
        <input
          type="text"
          placeholder="Product Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Initial Quantity"
          value={newQuantity}
          onChange={(e) => setNewQuantity(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Threshold"
          value={newThreshold}
          onChange={(e) => setNewThreshold(e.target.value)}
          required
        />
        <button type="submit">Add Product</button>
      </form>

      {/* Update Product Quantity Form */}
      <form
        onSubmit={handleUpdateQuantity}
        style={{ border: '1px solid #ccc', padding: '1rem' }}
      >
        <h3>Update Product Quantity</h3>
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          required
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} (Current: {product.quantity})
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Quantity to Add (+) or Subtract (-)"
          value={updateQuantity}
          onChange={(e) => setUpdateQuantity(e.target.value)}
          required
        />
        <button type="submit">Update Quantity</button>
      </form>
    </div>
  );
};

export default AddProductForm;
