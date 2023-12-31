import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Box, Text, Image, Button,useToast } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {updateCart} from "../redux/actions/authActions";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const toast = useToast();

  const fetchProductById = async () => {
    try {
      const { data } = await axios.get(`/api/product/${id}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProductById();
  }, []);

  const addToCartHandler = async () => {
    if (!user) {
      toast({
        title: "You must be logged in to add to cart",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const {data} = await axios.put(
        `/api/user/cart/add`,
        {
          product: product._id,
          quantity: 1,
        },
        config
      );
      dispatch(updateCart(data));
      toast({
        title: "Added to cart",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box mt={8} p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
      <Text fontSize="2xl" mb={4} fontWeight="bold">
        Product Details
      </Text>
      {product && (
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            Product name: {product.name}
          </Text>
          <Text fontSize="md" mt={2}>
            Description: {product.description}
          </Text>
          <Text fontSize="lg" mt={4}>
            Price: ₹{product.price.toFixed(2)}
          </Text>
          {product.images.length > 0 && (
            <Carousel showStatus={false} showThumbs={false} mt={4}>
              {product.images.map((image, index) => (
                <div key={index}>
                  <Image
                    boxSize="sm"
                    fit={"contain"}
                    src={image}
                    alt={`Product ${index + 1}`}
                  />
                </div>
              ))}
            </Carousel>
          )}
          <Button mt={4} onClick={addToCartHandler} colorScheme="blue">
            Add to Cart
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProductDetails;
