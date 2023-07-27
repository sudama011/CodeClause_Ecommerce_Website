import React from "react";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import AddProduct from "./pages/AddProduct";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/cart" element={<CartPage />} />
        <Route exact path="/addproduct" element={<AddProduct />} />
      </Routes>
    </>
  );
}

export default App;
