// productActions.js

// Define action type
export const ADD_PRODUCT = "ADD_PRODUCT";

// Action creator for adding a new product
export const addProduct = (productData) => {
  return {
    type: ADD_PRODUCT,
    payload: productData,
  };
};
