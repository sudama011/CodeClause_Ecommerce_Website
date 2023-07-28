import React from "react";
import { Box, Text } from "@chakra-ui/react";

const ProductCard = ({ product }) => {
  return (
    <Box borderWidth="1px" p={4} mb={4} borderRadius="md">
      <Text fontWeight="bold">{product.name}</Text>
      {product.images.length > 0 && (
        <img width={200} src={`${product.images[0]}`} alt={product.name} />
      )}
      <Text>${product.price.toFixed(2)}</Text>
    </Box>
  );
};

export default ProductCard;
