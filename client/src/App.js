import React from "react";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}

export default App;
