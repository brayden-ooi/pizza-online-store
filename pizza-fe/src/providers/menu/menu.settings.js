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
        small_price: "12.70",
        img_url: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_760,h_950/k%2Farchive%2Fbd84ba2c08f32a70c1c3638c511dd271d365c611"
      }, 
      {
        id: 2,
        food_name: "Sicilian Pizza",
        pizza_type: "SC",
        small_price: "24.45",
        img_url: "https://i1.wp.com/www.lewdfoods.com/wp-content/uploads/2017/07/20160503-spicy-spring-pizza-recipe-39.jpg?resize=768%2C576&ssl=1"
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