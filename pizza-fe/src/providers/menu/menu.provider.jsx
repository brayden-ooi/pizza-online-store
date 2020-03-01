import React, { useEffect, useReducer, createContext } from 'react';

import MENU_SETTINGS from "./menu.settings";


const INITIAL_STATE = {
  menu: null,
  modal: {
    isToggled: false,
    size: false,
    style: false,
    addOns: false,
    addOnsDisabled: false
  },
  order: {
    item: null,
    mapKey: null,
    totalPrice: 0,
    itemPrice: 0,
    addOnPrice: 0,
    addOns: null
  }
};

const menuReducer = (state, action) => {
  switch (action.type) {
    case "SET_MENU":
      return {
        ...state,
        menu: action.payload
      };
    case "TOGGLE_MODAL":
      return {
        ...state,
        modal: {
          ...state.modal,
          isToggled: !state.modal.isToggled
        }
      };
    case "ORDER_START":
      return {
        ...state,
        modal: {
          ...state.modal,
          isToggled: action.payload.modal.isToggled,
          ...action.payload.modal.orderDefaults,
          addOnsDisabled: false
        },
        order: {
          ...state.order,
          ...action.payload.order
        }
      };
    case "UPDATE_ORDER":
      return {
        ...state,
        modal: {
          ...state.modal,
          [action.payload.name]: action.payload.value
        }
      };
    case "ORDER_SET_SIZE":
      return {
        ...state,
        order: {
          ...state.order,
          size: action.payload.size,
          itemPrice: action.payload.itemPrice, 
          totalPrice: (action.payload.itemPrice + state.addOnPrice).toFixed(2)
        }
      };
    case "ORDER_SET_ADDONS":
      return {
        ...state,
        order: {
          ...state.order,
          addOnPrice: state.addOnPrice + action.payload.addOnPrice,
          totalPrice: (state.itemPrice + state.addOnPrice + action.payload.addOnPrice).toFixed(2),
          addOns: [...state.addOns, action.payload.addOnId]
        }
      };
    case "ORDER_REMOVE_ADDONS":
      return {
        ...state,
        order: {
          ...state.order,
          addOnPrice: state.addOnPrice - action.payload.addOnPrice,
          totalPrice: (state.itemPrice + state.addOnPrice - action.payload.addOnPrice).toFixed(2),
          addOns: state.addOns.filter(item => item !==action.payload.addOnId)
        }
      };
    // case "PIZZA_SET_PRICE":
    //   return {
    //     ...state,
    //     order: {
    //       ...state.order,
    //       itemPrice: action.payload,
    //       totalPrice: (action.payload + state.order.addOnPrice).toFixed(2)
    //     }
    //   };
    case "PIZZA_SET_STYLE":
      return {
        ...state,
        // order: {
        //   ...state.order,
        //   item: action.payload.item,
        // },
        modal: {
          ...state.modal,
          style: action.payload.style,
          addOnsDisabled: action.payload.addOnsDisabled,
          addOns: action.payload.addOns
        }
      };
    case "PIZZA_SET_TOPPINGS":
      return {
        ...state,
        order: {
          ...state.order,
          pizza: action.payload.pizza,
        },
        modal: {
          ...state.modal,
          style: action.payload.style,
          addOns: action.payload.addOns
        }
      };
    default:
      return state;
  }
};

export const MenuContext = createContext({
  menuState: {},
  menuDispatch: () => {},
  menuOrder: {},
  menuSettings: {}
});

const MenuProvider = ({ children }) => {
  const [menuState, menuDispatch] = useReducer(menuReducer, INITIAL_STATE);
  const menuOrder = ["Pizza", "Topping", "Subs", "Pasta", "Salad", "DinnerPlatter", "SubsAddition"];
  const menuSettings = MENU_SETTINGS;

  useEffect(() => {
    console.log(menuState);
  }, [menuState]);

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