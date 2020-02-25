import { userHandle } from "../root.utils";


export const userSignIn = userHandle("login");

export const addToken = token => {
  window.localStorage.setItem("token", token);
  return token;
};

export const removeToken = () => {
  window.localStorage.removeItem("token");
  return null;
};