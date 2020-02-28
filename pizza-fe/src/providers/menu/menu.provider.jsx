import React, { useEffect, useReducer, createContext } from 'react';


const MENU_MAP = {
  "Pizza": 0,
  "Topping": 1,
  "Subs": 2,
  "Pasta": 3,
  "Salad": 4, 
  "DinnerPlatter": 5,
  "SubsAddition": 6
}
const MENU_SETTINGS = {
  "DinnerPlatter": {
    name: "Dinner Platters",
    type: MENU_MAP["DinnerPlatter"],
    display: true,
    triggerModal: {
      size: true
    }
  },
  "Pasta": {
    name: "Pastas",
    type: MENU_MAP["Pasta"],
    display: true,
    triggerModal: false
  },
  "Pizza": {
    name: "Pizzas",
    type: MENU_MAP["Pizza"],
    display: true,
    triggerModal: {
      size: true,
      pizza_styles: ["cheese", "toppings", "special"],
      addOns: MENU_MAP["Topping"]
    },
    replaceWith : [
      {
        id: 1, 
        food_name: "Regular Pizza",
        pizza_type: "RG",
        small_price: "12.70"
      }, 
      {
        id: 2,
        food_name: "Sicilian Pizza",
        pizza_type: "SC",
        small_price: "24.45"
      }
    ]
  },
  "Salad": {
    name: "Salads",
    type: MENU_MAP["Salad"],
    display: true,
    triggerModal: false
  },
  "Subs": {
    name: "Subs",
    type: MENU_MAP["Subs"],
    display: true,
    triggerModal: {
      size: true,
      addOns: MENU_MAP["SubsAddition"]
    }
  },
  "SubsAddition": {
    name: "Add Ons",
    type: MENU_MAP["SubsAddition"],
    display: false,
    triggerModal: false
  },
  "Topping": {
    name: "Toppings",
    type: MENU_MAP["Topping"],
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
};

const orderReducer = (state, action) => {
  switch (action.type) {
    case "ORDER_START":
      return {
        ...INITIAL_ORDER_STATE,
        item: action.payload,
        id: action.payload.id,
        name: action.payload.food_name
      };
    case "ORDER_SET_SIZE":
      return {
        ...state,
        size: action.payload.size,
        itemPrice: action.payload.itemPrice, 
        totalPrice: (action.payload.itemPrice + state.addOnPrice).toFixed(2)
      };

    case "ORDER_SET_ADDONS":
      return {
        ...state,
        addOnPrice: state.addOnPrice + action.payload.addOnPrice,
        totalPrice: (state.itemPrice + state.addOnPrice + action.payload.addOnPrice).toFixed(2),
        addOns: [...state.addOns, action.payload.addOnId]
      };
    case "ORDER_REMOVE_ADDONS":
      return {
        ...state,
        addOnPrice: state.addOnPrice - action.payload.addOnPrice,
        totalPrice: (state.itemPrice + state.addOnPrice - action.payload.addOnPrice).toFixed(2),
        addOns: state.addOns.filter(item => item !==action.payload.addOnId)
      };
    case "PIZZA_SET_SIZE":
      return {
        ...state,
        size: action.payload
      };
    case "PIZZA_SET_PRICE":
      return {
        ...state,
        itemPrice: action.payload,
        totalPrice: (action.payload + state.addOnPrice).toFixed(2),
      };
    default:
      return state;
  }
}

export const MenuContext = createContext({
  menuState: {},
  menuDispatch: () => {}
});

const INITIAL_ORDER_STATE = {
  item: null,
  id: null,
  name: null,
  type: null,
  style: null, 
  size: null,
  totalPrice: 0,
  itemPrice: 0,
  addOnPrice: 0,
  addOns: []
}

const MenuProvider = ({ children }) => {
  const [menuState, menuDispatch] = useReducer(menuReducer, INITIAL_STATE);
  const [orderState, orderDispatch] = useReducer(orderReducer, INITIAL_ORDER_STATE); 

  useEffect(() => {
    console.log(orderState);
  }, [orderState]);

  return (
    <MenuContext.Provider value={{
      menuState,
      menuDispatch,
      orderState,
      orderDispatch
    }}>
      { children }
    </MenuContext.Provider>
  );
};

export default MenuProvider;