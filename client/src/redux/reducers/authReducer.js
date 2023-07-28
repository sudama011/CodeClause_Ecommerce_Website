const initialState = {
  isLoggedIn: false,
  user: null,
};

// Define action types
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
const UPDATE_CART = "UPDATE_CART";

// Define the authReducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case UPDATE_CART:
      return {
        ...state,
        user: {
          ...state.user,
          cart: action.payload,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
