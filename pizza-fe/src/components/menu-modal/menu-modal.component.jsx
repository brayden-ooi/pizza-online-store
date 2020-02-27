import React, { useState, useEffect, useReducer, useContext } from 'react';

import { CartContext } from "../../providers/cart/cart.provider";
import { MenuContext } from "../../providers/menu/menu.provider";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, 
  FormGroup, Label, CustomInput, Form, Col } from 'reactstrap';


const SettingsHandler = ({ settings, item }) => {
  const [typeState, setTypeState] = useState(false);
  const { menuState: { menu }, orderDispatch } = useContext(MenuContext);

  const { size, addOns, pizza_styles } = settings.triggerModal;
  const addOnList = addOns && menu[addOns][0];

  const handleChange = e => orderDispatch({
    type: "ORDER_SET_SIZE",
    payload: {
      itemPrice: e.target.getAttribute("data-price"),
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
  }

  const PIZZA_STYLES = {
    cheese: "CZ",
    special: "SP"
  }

  const handleChangePizza = e => {
    setTypeState(false);
    console.log(menu[settings.type][0].filter(pizza => pizza.pizza_type === item.pizza_type && pizza.pizza_styles === PIZZA_STYLES[e.target.value]));
    if (e.target.value != "toppings") {
      const selectedPizza = menu[settings.type][0]
        .filter(pizza => pizza.pizza_type === item.pizza_type && pizza.pizza_styles === PIZZA_STYLES[e.target.value])[0];

      setTypeState(true);
      orderDispatch({
        type: "PIZZA_SET_TYPE_STYLE",
        payload: {
          item: selectedPizza,
          id: selectedPizza.id,
          name: selectedPizza.food_name,
          type: selectedPizza.pizza_type,
          style: selectedPizza.pizza_styles
        }
      })
    }
  };
    
  return (
    <Form>
      {
        pizza_styles ? (
          <FormGroup row>
            <Label sm={3}>Types</Label>
            <Col sm={9}>
                {
                  pizza_styles.map(attr => (
                    <CustomInput 
                      type="radio" value={attr} id={attr} name="pizza_styles" key={attr} label={attr} onChange={handleChangePizza} />                  
                  ))
                }
              </Col>
          </FormGroup>
          ) : null
      }
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
                  disabled={typeState} 
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
        <SettingsHandler 
          settings={settings}
          item={item}
        />
      </ModalBody>
      <ModalFooter>
        { orderState.totalPrice == 0 ? null : <span>{ "$ " + orderState.totalPrice }</span> }
        <Button color="primary" onClick={ handleClick }>Yes I want this!</Button>
      </ModalFooter>
    </Modal>
  );
};

export default MenuModal;