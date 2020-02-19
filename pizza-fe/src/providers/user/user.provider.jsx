import React, { createContext, useState } from 'react';

export const UserContext = createContext({
  currentUser: null,
  getCurrentUser: () => {}
});

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const getCurrentUser = user => setCurrentUser(user);

  return (
    <UserContext.Provider value={{
      currentUser,
      getCurrentUser
    }}>
      { children }
    </UserContext.Provider>
  )
};

export default UserProvider;