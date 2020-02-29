import React, { useEffect, useReducer, createContext } from 'react';


const MENU_SETTINGS = {
  "DinnerPlatter": {
    name: "Dinner Platters",
    display: true,
    triggerModal: {
      size: true
    }
  },
  "Pasta": {
    name: "Pastas",
    display: true,
    triggerModal: false
  },
  "Pizza": {
    name: "Pizzas",
    display: true,
    triggerModal: {
      size: true,
      styles: ["cheese", "toppings", "special"],
      addOns: "Topping"
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
    display: true,
    triggerModal: false
  },
  "Subs": {
    name: "Subs",
    display: true,
    triggerModal: {
      size: true,
      addOns: "SubsAddition"
    }
  },
  "SubsAddition": {
    name: "Add Ons",
    display: false,
    triggerModal: false
  },
  "Topping": {
    name: "Toppings",
    display: true,
    triggerModal: false,
    disabled: true
  },
}

const INITIAL_STATE = {
  menuOrder: ["Pizza", "Topping", "Subs", "Pasta", "Salad", "DinnerPlatter", "SubsAddition"],
  initialOrderState: (size, addOns, addOnsList) => ({
    size: size ? {
      small: false,
      large: false
    }: false,
    addOns: addOns ? addOnsList.reduce((addOns, { food_name }) => ({
      ...addOns,
      [food_name]: false
    }), {}) : false
  }),
  menu: null,
  modal: {
    isToggled: false,
    size: false,
    style: false,
    addOns: false
  },
  settings: MENU_SETTINGS,
  order: {
    item: null,
    totalPrice: 0,
    itemPrice: 0,
    addOnPrice: 0,
    addOns: null
  }
};

const menuReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_MODAL":
      return {
        ...state,
        modal: {
          ...state.modal,
          isToggled: !state.modal.isToggled
        }
      };
    case "SET_MENU":
      return {
        ...state,
        menu: action.payload
      };
    case "ORDER_START":
      return {
        ...state,
        modal: action.payload.modal,
        order: action.payload.order
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
    case "PIZZA_SET_SIZE":
      return {
        ...state,
        order: {
          ...state.order,
          size: action.payload
        }
      };
    case "PIZZA_SET_PRICE":
      return {
        ...state,
        order: {
          ...state.order,
          itemPrice: action.payload,
          totalPrice: (action.payload + state.addOnPrice).toFixed(2)
        }
      };
    case "UPDATE_ORDER":
      return {
        ...state,
        order: {
          ...state.order,
          [action.payload.name]: action.payload.value
        }
      }
    default:
      return state;
  }
};

export const MenuContext = createContext({
  menuState: {},
  menuDispatch: () => {}
});

const MenuProvider = ({ children }) => {
  const [menuState, menuDispatch] = useReducer(menuReducer, INITIAL_STATE);

  useEffect(() => {
    console.log(menuState);
  }, [menuState]);

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