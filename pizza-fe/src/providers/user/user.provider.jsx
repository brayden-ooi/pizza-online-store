import React, { createContext, useReducer } from 'react';

import { addToken, removeToken } from "./user.utils";


const INITIAL_STATE = window.localStorage.getItem("token") ? {
  user: null,
  token: window.localStorage.getItem("token")
} : null;

const reducer = (state, action) => {
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

export const UserContext = createContext({
  state: {},
  dispatch: () => {}
});

const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <UserContext.Provider value={{
      userState,
      userDispatch
    }}>
      { children }
    </UserContext.Provider>
  );
};

export default UserProvider;