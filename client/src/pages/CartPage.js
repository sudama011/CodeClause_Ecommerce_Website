import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  Text,
  Center,
  Button,
  Image,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { updateCart } from "../redux/actions/authActions";

const CartPage = () => {
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.token}`,
    },
  };

  const fetchCart = async () => {
    setLoading(true);
    const { data } = await axios.get("/api/user/cart/", config);
    setCartItems(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      fetchCart();
    }
  }, [user]);

  const updateQuantity = async (product, quantity) => {
    setLoading(true);
    const { data } = await axios.put(
      "/api/user/cart/add",
      { product, quantity },
      config
    );
    dispatch(updateCart(data));
    setCartItems(data);
    setLoading(false);
  };

  const removeFromCart = async (product) => {
    setLoading(true);
    const { data } = await axios.put(
      "/api/user/cart/remove",
      { product },
      config
    );
    dispatch(updateCart(data));
    setCartItems(data);
    setLoading(false);
  };

  if (!isLoggedIn) {
    return (
      <Center mt={8}>
        <Text fontSize="xl">Please login to view your cart</Text>
      </Center>
    );
  }

  const checkOutHandler = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Please add some items to your cart",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  };

  // Calculate total price of the cart items
  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  // Render the cart items
  const renderCartItems = () => {
    return cartItems.map((item) => {
      return (
        <Box key={item.product._id} display="flex" mb={4}>
          <Box>
            <Image
              src={item.product.images[0]}
              alt={item.product.name}
              boxSize="100px"
              objectFit="cover"
            />
          </Box>
          <Box ml={4}>
            <Link to={`/product/${item.product._id}`}>
              <Text fontSize="xl">{item.product.name}</Text>
            </Link>
            <Text fontSize="lg" color="gray.500">
              ₹{item.product.price}
            </Text>
            <Text fontSize="lg" color="gray.500">
              Quantity: {item.quantity}
            </Text>

            {item.quantity > 1 && (
              <Button
                mx={1}
                size="sm"
                onClick={() => {
                  updateQuantity(item.product._id, item.quantity - 1);
                }}
              >
                -
              </Button>
            )}

            <Button
              mx={1}
              size="sm"
              onClick={() => {
                updateQuantity(item.product._id, item.quantity + 1);
              }}
            >
              +
            </Button>

            <Button
              mx={1}
              size="sm"
              onClick={() => {
                removeFromCart(item.product._id);
              }}
            >
              Remove
            </Button>
          </Box>
        </Box>
      );
    });
  };
  // If loading is true, show spinner
  return loading ? (
    <Center mt={8}>
      <Spinner size="xl" />
    </Center>
  ) : (
    <Box ml={3}>
      <Text fontSize="2xl" mb={4}>
        Your Cart
      </Text>
      <Box>{renderCartItems()}</Box>
      <Box>
        <Text fontSize="2xl" mb={4}>
          Total Price: ₹{totalPrice}
        </Text>
        <Button onClick={checkOutHandler}>Checkout</Button>
      </Box>
    </Box>
  );
};

export default CartPage;
