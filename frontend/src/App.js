import React from 'react';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';

function App() {
  return (
    <div className="App">
      <h1>Inventory Management System</h1>
      <ProductList />
      <AddProductForm />
    </div>
  );
}

export default App;
