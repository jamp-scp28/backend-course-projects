import './App.css';
import {useState, useEffect} from 'react'
import ProductsForm from '../components/ProductsForm';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import Home from './home';
import CartList from '../components/cartList';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addProduct" element={<ProductsForm />} />
          <Route path="/carts" element={<CartList />} />
        </Routes>
    </div>
  );
}

export default App;

