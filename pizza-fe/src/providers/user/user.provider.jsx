import React, { createContext, useReducer } from 'react';

import { userReducer, INITIAL_STATE } from "../../reducers/user/user.reducer";


export const UserContext = createContext({
  state: {},
  dispatch: () => {}
});

const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, INITIAL_STATE);

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