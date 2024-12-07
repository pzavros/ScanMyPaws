// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Header from './Components/StaticComponents/Header';
import ProductsPage from './Pages/ProductsPage';
import CheckoutPage from './Pages/CheckoutPage';
import SingleProduct from './Components/ProductsPage/SingleProduct';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Products" element={<ProductsPage />} />
        <Route path="/Checkout" element={<CheckoutPage />} />
        <Route path="/product/:hashedId" element={<SingleProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
