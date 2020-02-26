import React, { useReducer, createContext } from 'react';


const MENU_SETTINGS = {
  "DinnerPlatter": {
    name: "Dinner Platters",
    order: 6,
    display: true,
    triggerModal: {
      size: true
    }
  },
  "Pasta": {
    name: "Pastas",
    order: 4,
    display: true,
    triggerModal: false
  },
  "Pizza": {
    name: "Pizzas",
    order: 1,
    display: true,
    triggerModal: {
      size: true,
      type: ["cheese", "toppings", "special"],
      addOns: 1
    },
    replaceWith : [
      {
        id: 1, 
        food_name: "Regular Pizza",

      }, 
      {
        id: 2,
        food_name: "Sicilian Pizza"
      }
    ]
  },
  "Salad": {
    name: "Salads",
    order: 5,
    display: true,
    triggerModal: false
  },
  "Subs": {
    name: "Subs",
    order: 3, 
    display: true,
    triggerModal: {
      size: true,
      addOns: 6
    }
  },
  "SubsAddition": {
    name: "Add Ons",
    order: 7,
    display: false,
    triggerModal: false
  },
  "Topping": {
    name: "Toppings",
    order: 2,
    display: true,
    triggerModal: false,
    disabled: true
  },
}

const INITIAL_STATE = {
  menu: null,
  modal: false,
  modalBody: {
    item: null,
    settings: null
  },
  settings: MENU_SETTINGS
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