// productReducer.js

// Import the ADD_PRODUCT action type
import { ADD_PRODUCT } from "../actions/productActions";

// Define the initial state for products
const initialState = [];

// Define the productReducer
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default productReducer;
