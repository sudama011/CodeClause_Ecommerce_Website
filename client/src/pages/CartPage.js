import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, Text, Center, Button, Image } from "@chakra-ui/react";

const CartPage = () => {
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get("/api/user/cart/", config);
    setCartItems(data);
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      fetchCart();
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <Center mt={8}>
        <Text fontSize="xl">Please login to view your cart</Text>
      </Center>
    );
  }

  const checkOutHandler = async () => {
    
  };

  // Calculate total price of the cart items
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <Box mt={8}>
      <Text fontSize="2xl" fontWeight="bold">
        Your Cart
      </Text>
      <Text fontSize="lg" mt={2}>
        Cart Items: {cartItems.length}
      </Text>
      {cartItems.length > 0 ? (
        <Box mt={4}>
          {cartItems.map((item) => (
            <Box
              key={item._id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              mb={4}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Link
                to={`/product/${item.product._id}`}
                style={{ textDecoration: "none" }}
              >
                <Box display="flex" alignItems="center">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    boxSize="100px"
                    objectFit="cover"
                    mr={4}
                  />
                  <Text fontSize="lg" fontWeight="bold">
                    {item.product.name}
                  </Text>
                </Box>
              </Link>
              <Text fontSize="lg">${item.product.price.toFixed(2)}</Text>
              <Text fontSize="lg">Quantity: {item.quantity}</Text>
            </Box>
          ))}
          <Box
            mt={4}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontSize="lg" fontWeight="bold">
              Total Price:
            </Text>
            <Text fontSize="lg">${totalPrice.toFixed(2)}</Text>
          </Box>
          <Button mt={4} colorScheme="blue" onClick={checkOutHandler}>
            Proceed to Checkout
          </Button>
        </Box>
      ) : (
        <Box mt={4}>
          <Text fontSize="lg" fontWeight="bold">
            Your cart is empty
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;
