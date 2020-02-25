import React, { useReducer, createContext } from 'react';


const INITIAL_STATE = {
  menu: window.localStorage.getItem("menu"),
  modal: false,
  modalBody: null
}

const menuReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_MODAL":
      return {
        ...state,
        modal: !state.modal
      };
    case "SET_MENU":
      return {
        ...state,
        menu: action.payload
      };
    case "SET_MODAL_BODY":
      return {
        ...state,
        modalBody: action.payload,
        modal: !state.modal
      };
    default:
      return state;
  }
}

export const MenuContext = createContext({
  menuState: {},
  menuDispatch: () => {}
});

const MenuProvider = ({ children }) => {
  const [menuState, menuDispatch] = useReducer(menuReducer, INITIAL_STATE);

  return (
    <MenuContext.Provider value={{
      menuState,
      menuDispatch
    }}>
      { children }
    </MenuContext.Provider>
  );
};

export default MenuProvider;