import React, { useEffect } from "react";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import AddProduct from "./pages/AddProduct";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./redux/actions/authActions";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  const validToken = async (token) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get("/api/user/", config);
      dispatch(loginSuccess(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      validToken(token);
    }
  }, []);

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
