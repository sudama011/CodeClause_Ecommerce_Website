// Define action types
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const UPDATE_CART = "UPDATE_CART";

// Action creator for successful login
export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

// Action creator for successful logout
export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Action creator for updating cart
export const updateCart = (cart) => {
  return {
    type: UPDATE_CART,
    payload: cart,
  };
}
