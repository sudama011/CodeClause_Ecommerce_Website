// Define action types
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

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
