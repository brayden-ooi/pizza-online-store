import { addToken, removeToken } from "./user.utils";


export const INITIAL_STATE =  {
  user: null,
  token: window.localStorage.getItem("token") || null
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_USER":
    case "LOGIN_USER":
      return {
        user: action.payload.user,
        token: addToken(action.payload.token)
      };
    case "LOGOUT_USER":
      return {
        user: null,
        token: removeToken()
      };
    default:
      return state;
  }
 };