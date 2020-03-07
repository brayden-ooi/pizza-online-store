import React, { useReducer, createContext } from 'react';

import { INITIAL_MENU_STATE, menuReducer } from "../../reducers/menu/menu.reducer";

import MENU_SETTINGS from "./menu.settings";


export const MenuContext = createContext({
  menuState: {},
  menuDispatch: () => {},
  menuOrder: {},
  menuSettings: {}
});

const MenuProvider = ({ children }) => {
  const [menuState, menuDispatch] = useReducer(menuReducer, INITIAL_MENU_STATE);
  const menuOrder = ["Pizza", "Topping", "Subs", "Pasta", "Salad", "DinnerPlatter", "SubsAddition"];
  const menuSettings = MENU_SETTINGS;

  return (
    <MenuContext.Provider value={{
      menuState,
      menuDispatch, 
      menuOrder, 
      menuSettings
    }}>
      { children }
    </MenuContext.Provider>
  );
};

export default MenuProvider;