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

export default MENU_SETTINGS;