import React, { useState, useEffect, useReducer, useContext } from 'react';

import { CartContext } from "../../providers/cart/cart.provider";
import { MenuContext } from "../../providers/menu/menu.provider";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, 
  FormGroup, Label, CustomInput, Form, Col } from 'reactstrap';
import { correctedPayload, stateUpdate } from '../../reducers/form/form.utils';


const pizzaReducer = (state, action) => {
  switch (action.type) {
    case "PIZZA_SET_SIZE":
      return {
        ...state,
        size: action.payload
      };
    case "PIZZA_SET_STYLE":
      return {
        ...state,
        pizza: action.payload.pizza,
        style: action.payload.style,
        addOnsDisabled: action.payload.addOnsDisabled,
        addOns: action.payload.addOns
      };
    case "PIZZA_SET_TOPPINGS":
      return {
        ...state,
        pizza: action.payload.pizza,
        style: action.payload.style,
        addOns: action.payload.addOns
      };
    default:
      return state;
  }
}

const PizzaSettingsHandler = ({ settings, item }) => {
  const { menuState: { menu }, orderState, orderDispatch } = useContext(MenuContext);
  
  const { addOns, pizza_styles } = settings.triggerModal;
  const addOnList = addOns && menu[addOns][0];

  const INITIAL_PIZZA_STATE = {
    pizza: null,
    type: false,
    size: {
      small: false,
      large: false
    },
    style: pizza_styles.reduce((styles, style) => ({
        ...styles,
        [style]: false
      }), {}),
    addOns: addOnList.reduce((addOns, { food_name }) => ({
        ...addOns,
        [food_name]: false
      }), {}),
    addOnsDisabled: false
  };

  const [pizzaState, pizzaDispatch] = useReducer(pizzaReducer, INITIAL_PIZZA_STATE);

  const PIZZA_STYLES = {
    cheese: "CZ",
    special: "SP",
    1: "1T",
    2: "2T",
    3: "3T" 
  };

  useEffect(() => {
    let [ pizzaSize ] = Object.keys(pizzaState.size).filter(size => pizzaState.size[size]);

    if (pizzaSize && pizzaState.pizza) {
      orderDispatch({
        type: "PIZZA_SET_PRICE",
        payload: parseFloat(pizzaSize === "small" ? pizzaState.pizza.small_price : pizzaState.pizza.large_price)
      })
    }
  }, [pizzaState.size, pizzaState.pizza]);

  useEffect(() => {
    console.log("pizzaState", pizzaState);
  }, [pizzaState]);

  const handleChangeSize = e => pizzaDispatch({
    type: "PIZZA_SET_SIZE",
    payload: stateUpdate(INITIAL_PIZZA_STATE.size, e.target.id, true)
  });

  const handleChangeStyle = e => pizzaDispatch({
    type: "PIZZA_SET_STYLE",
    payload: {
      pizza: menu[settings.type][0]
        .filter(pizza => pizza.pizza_type === item.pizza_type && pizza.pizza_styles === PIZZA_STYLES[e.target.id])[0],
      style: stateUpdate(INITIAL_PIZZA_STATE.style, e.target.id, true),
      addOnsDisabled: e.target.id !== "toppings",
      addOns: e.target.id !== "toppings" ? INITIAL_PIZZA_STATE.addOns : pizzaState.addOns
    }
  });

  const handleChangeAddOns = e => {
    let addOnsQuantity = Object.values(pizzaState.addOns).reduce((accum, currentValue) => currentValue ? accum + 1 : accum, 1);
    if (e.target.checked && addOnsQuantity > 3) {
      e.preventDefault();
      e.target.checked = false;
    } else {
      let pizza = menu[settings.type][0]
      .filter(pizza => pizza.pizza_type === item.pizza_type && pizza.pizza_styles === PIZZA_STYLES[addOnsQuantity])[0];

      pizzaDispatch({
        type: "PIZZA_SET_TOPPINGS",
        payload: {
          pizza: pizza,
          style: stateUpdate(INITIAL_PIZZA_STATE.style, e.target.name, true),
          addOns: stateUpdate(pizzaState.addOns, e.target.id, e.target.checked),
        }
      });
    }
  };

  //     orderDispatch({
  //       type: "PIZZA_SET_STYLE",
  //       payload: {
  //         item: selectedPizza,
  //         id: selectedPizza.id,
  //         name: selectedPizza.food_name,
  //         addOns: []


  return (
    <Form>
      <FormGroup row>
        <Label sm={3}>Types</Label>
        <Col sm={9}>
            {
              pizza_styles.map(attr => (
                <CustomInput 
                  type="radio" id={attr} name="style" key={attr} label={attr} onChange={handleChangeStyle} checked={pizzaState["style"][attr]} />                  
              ))
            }
          </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={3}>Size</Label>
        <Col sm={9}>
          <CustomInput type="radio" data-price="small_price" name="size" id="small" label="Small" selected={pizzaState.size["small"]} onChange={handleChangeSize} />
          <CustomInput type="radio" data-price="large_price" name="size" id="large" label="Large" selected={pizzaState.size["large"]} onChange={handleChangeSize} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={3}>Add-ons</Label>
        <Col sm={9}>
          {
            addOnList.map(({ food_name }) => <CustomInput 
              type="checkbox" 
              id={food_name} 
              key={food_name} 
              label={food_name} 
              name="toppings"
              disabled={pizzaState.addOnsDisabled}
              checked={pizzaState.addOns[food_name]} 
              onChange={handleChangeAddOns}                 
            />)
          }
        </Col>
      </FormGroup>
    </Form>
  );
};

const SettingsHandler = ({ settings, item }) => {
  const { menuState: { menu }, orderDispatch } = useContext(MenuContext);

  const { size, addOns } = settings.triggerModal;
  const addOnList = addOns && menu[addOns][0];

  const handleChange = e => orderDispatch({
    type: "ORDER_SET_SIZE",
    payload: {
      itemPrice: parseFloat(item[e.target.getAttribute("data-price")]),
      size: e.target.id
    }
  });

  const handleChangeAddOns = e => {
    orderDispatch({
      type: e.target.checked ? "ORDER_SET_ADDONS" : "ORDER_REMOVE_ADDONS",
      payload: {
        addOnId: e.target.id, 
        addOnPrice: parseFloat(addOnList[e.target.id - 1].small_price)
      }
    });
  };
    
  return (
    <Form>
      {
        size ? (
          <FormGroup row>
            <Label sm={3}>Size</Label>
            <Col sm={9}>
              <CustomInput type="radio" data-price="small_price" name="size" id="small" label="Small" disabled={!item.small_price} onChange={handleChange} />
              <CustomInput type="radio" data-price="large_price" name="size" id="large" label="Large" onChange={handleChange} />
            </Col>
          </FormGroup>
        ) : null
      }
      {
        addOns ? (
          <FormGroup row>
            <Label sm={3}>Add-ons</Label>
            <Col sm={9}>
              {
                addOnList.map(({ id, food_name }) => <CustomInput 
                  type="checkbox" 
                  id={id} 
                  key={food_name} 
                  label={food_name} 
                  onChange={handleChangeAddOns}                 
                />)
              }
            </Col>
          </FormGroup>
        ) : null
      }
    </Form>
  );
};




const MenuModal = () => {
  const { addItem } = useContext(CartContext);
  const { menuState, menuDispatch, orderState, orderDispatch } = useContext(MenuContext);
  const { modal, modalBody: { item, settings } } = menuState;
  
  const toggleModal = () => menuDispatch({ type: "TOGGLE_MODAL" });

  const handleClick = () => {
    addItem(orderState);
    toggleModal();
  };

  return (
    <Modal isOpen={modal} toggle={ toggleModal }>
      <ModalHeader toggle={ toggleModal }>{ item && item.food_name }</ModalHeader>
      <ModalBody>
        {
          settings && settings.name === "Pizzas" ? 
              <PizzaSettingsHandler
                settings={settings}
                item={item}
              /> : 
              <SettingsHandler 
                settings={settings}
                item={item}
              />
        }
      </ModalBody>
      <ModalFooter>
        { orderState.totalPrice == 0 ? null : <span>{ "$ " + orderState.totalPrice }</span> }
        <Button color="primary" onClick={ handleClick }>Yes I want this!</Button>
      </ModalFooter>
    </Modal>
  );
};

export default MenuModal;