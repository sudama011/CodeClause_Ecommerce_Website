import React from "react";
import { Box, Text,Image } from "@chakra-ui/react";

const ProductCard = ({ product }) => {
  return (
    <Box display="flex" flexDir="column" justifyContent="space-between" alignItems="center" boxSize="300px" borderWidth="1px" p={4} borderRadius="md">
      <Text fontWeight="bold">{product.name}</Text>
      {product.images.length > 0 && (
        <Image boxSize="100px" src={`${product.images[0]}`} alt={product.name} />
      )}
      <Text>₹ {product.price.toFixed(2)}</Text>
    </Box>
  );
};

export default ProductCard;
