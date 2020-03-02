export const INITIAL_MENU_STATE = {
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
    addOns: []
  }
};

export const menuReducer = (state, action) => {
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
          ...INITIAL_MENU_STATE.modal,
          isToggled: action.payload.modal.isToggled,
          ...action.payload.modal.orderDefaults,
        },
        order: {
          ...INITIAL_MENU_STATE.order,
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
    case "ORDER_SET_ITEM_PRICE":
      return {
        ...state,
        order: {
          ...state.order,
          itemPrice: action.payload,
          totalPrice: state.order.addOnPrice + action.payload
        }
      }
    case "ORDER_SET_ADDONS_PRICE":
      return {
        ...state,
        order: {
          ...state.order,
          addOnPrice: action.payload,
          totalPrice: state.order.itemPrice + action.payload
        }
      };
    case "ORDER_SET_ADDONS":
      return {
        ...state,
        modal: {
          ...state.modal,
          style: action.payload.modal
        },
        order: {
          ...state.order,
          addOns: action.payload.checked ? [...state.order.addOns, action.payload.addOn] : state.order.addOns.filter(item => item !== action.payload.addOn)
        }
      };
    case "ORDER_SET_PIZZA":
      return {
        ...state,
        order: {
          ...state.order,
          item: action.payload
        }
      }      
    case "PIZZA_SET_STYLE":
      return {
        ...state,
        modal: {
          ...state.modal,
          style: action.payload.style,
          addOnsDisabled: action.payload.addOnsDisabled,
          addOns: action.payload.addOns
        },
        order: {
          ...state.order,
          addOns: action.payload.order
        }
      };
    default:
      return state;
  }
};