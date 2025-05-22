import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import './App.css';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
              <div className="App">
                <h1>Inventory Management System</h1>
                <ProductList />
                <AddProductForm />
              </div>
          }/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
