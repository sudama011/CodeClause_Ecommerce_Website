import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product");
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box>
      <Text fontSize="2xl" mb={4}>
        Latest Products
      </Text>
      <Box display="flex" flexWrap="wrap">
        {products.map((product) => (
          <Link key={product._id} to={`/product/${product._id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
