import React, { useState } from "react";
import {
  Container,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [uploading, setUploading] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const toast = useToast();

  const submitHandler = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.post(
        "/api/product",
        {
          name,
          description,
          price,
          images,
          category,
          countInStock,
          user: user._id,
        },
        config
      );
      toast({
        title: "Product added.",
        description: "We've added your product for you.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      console.error(error);
    }
    setUploading(false);
  };

  const uploadFileHandler = (e) => {
    setUploading(true);
    const pic = e.target.files[0];

    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "HappyBuyers");
      data.append("cloud_name", "sudama");

      fetch("https://api.cloudinary.com/v1_1/sudama/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImages([...images, data.url.toString()]);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    setUploading(false);
  };

  return (
    <Container maxW="xl" centerContent my={3}>
      <VStack spacing={4} align="stretch">
        <form onSubmit={submitHandler}>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormControl>
          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </FormControl>
          <FormControl id="price">
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </FormControl>
          <FormControl id="image">
            <FormLabel>Image</FormLabel>
            <Input
              type="file"
              accept="image/*"
              p={0.5}
              id="image-file"
              label="Choose File"
              onChange={uploadFileHandler}
            />
            {uploading && <p>Uploading...</p>}
          </FormControl>
          <FormControl id="category">
            <FormLabel>Category</FormLabel>
            <Input
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </FormControl>
          <FormControl id="countInStock">
            <FormLabel>Count In Stock</FormLabel>
            <Input
              type="number"
              placeholder="Enter countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            mt={3}
            isLoading={uploading}
          >
            Add Product
          </Button>
        </form>
      </VStack>
    </Container>
  );
};

export default AddProduct;
