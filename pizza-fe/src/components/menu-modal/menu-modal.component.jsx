import React, { useEffect, useReducer, useContext } from 'react';

import { CartContext } from "../../providers/cart/cart.provider";
import { MenuContext } from "../../providers/menu/menu.provider";

import { correctedPayload, stateUpdate } from '../../reducers/form/form.utils';
import { OrderInitializer } from "../../providers/menu/menu.utils";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, 
  FormGroup, Label, CustomInput, Form, Col } from 'reactstrap';


const PizzaSettingsHandler = ({ item, mapKey }) => {
  const { menuState: { menu, order, modal }, menuDispatch, menuOrder, menuSettings } = useContext(MenuContext);
  
  const { size, addOns, styles } = menuSettings[menuOrder[mapKey]].triggerModal;

  const defaultOrder = OrderInitializer(size, menu[menuOrder.indexOf(addOns)], styles);

  const PIZZA_STYLES = {
    cheese: "CZ",
    special: "SP",
    1: "1T",
    2: "2T",
    3: "3T" 
  };

  // useEffect(() => {
  //   let [ pizzaSize ] = Object.keys(modal.size).filter(size => modal.size[size]);

  //   if (pizzaSize && order.item) {
  //     console.log(pizzaSize, order.item);
  //     menuDispatch({
  //       type: "PIZZA_SET_PRICE",
  //       payload: parseFloat(pizzaSize === "small" ? item.small_price : item.large_price)
  //     })
  //   }
  // }, [modal.size, order.item]);

  const handleChangeSize = e => menuDispatch({
    type: "UPDATE_ORDER",
    payload: {
      name: "size",
      value: {
        ...defaultOrder.size,
        [e.target.id]: true
      }
    }
  });

  const handleChangeStyle = e => {
    menuDispatch({
    type: "PIZZA_SET_STYLE",
    payload: {
      // item: menu[menuOrder.indexOf("Pizza")]
      //   .filter(pizza => pizza.pizza_type === item.pizza_type && pizza.pizza_styles === PIZZA_STYLES[e.target.id])[0],
      style: stateUpdate(defaultOrder.style, e.target.id, true),
      addOnsDisabled: e.target.id !== "toppings",
      addOns: e.target.id !== "toppings" ? defaultOrder.addOns : modal.addOns
    }
  });
}

  const handleChangeAddOns = e => {
    console.log(Object.values(modal.addOns).reduce((accum, currentValue) => currentValue ? accum + 1 : accum, 1));
    let addOnsQuantity = Object.values(modal.addOns).reduce((accum, currentValue) => currentValue ? accum + 1 : accum, 1);
    if (e.target.checked && addOnsQuantity > 3) {
      e.preventDefault();
      e.target.checked = false;
    } else {
      let pizza = menu[menuOrder.indexOf("Pizza")]
      .filter(pizza => pizza.pizza_type === item.pizza_type && pizza.pizza_styles === PIZZA_STYLES[addOnsQuantity])[0];

      menuDispatch({
        type: "PIZZA_SET_TOPPINGS",
        payload: {
          item: pizza,
          style: stateUpdate(defaultOrder.style, e.target.name, true),
          addOns: stateUpdate(modal.addOns, e.target.id, e.target.checked),
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
            styles.map(attr => (
              <CustomInput 
                type="radio" 
                id={attr} 
                name="style" 
                key={attr} 
                label={attr} 
                onChange={handleChangeStyle} 
                checked={modal.style[attr]} />                  
            ))
          }
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={3}>Size</Label>
        <Col sm={9}>
          <CustomInput type="radio" name="size" id="small" label="Small" selected={modal.size["small"]} onChange={handleChangeSize} />
          <CustomInput type="radio" name="size" id="large" label="Large" selected={modal.size["large"]} onChange={handleChangeSize} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={3}>Add-ons</Label>
        <Col sm={9}>
          {
            menu[menuOrder.indexOf(addOns)].map(({ food_name }) => <CustomInput 
              type="checkbox" 
              id={food_name} 
              key={food_name} 
              label={food_name} 
              name="toppings"
              disabled={modal.addOnsDisabled}
              checked={modal.addOns[food_name]} 
              onChange={handleChangeAddOns}                 
            />)
          }
        </Col>
      </FormGroup>
    </Form>
  );
};

const SettingsHandler = ({ item, mapKey }) => {
  const { menuState, menuDispatch, menuOrder, menuSettings } = useContext(MenuContext);
  const { menu, modal } = menuState;

  const { size, addOns, styles } = menuSettings[menuOrder[mapKey]].triggerModal;

  const defaultOrder = OrderInitializer(size, menu[menuOrder.indexOf(addOns)], styles);

  // const handleChange = e => orderDispatch({
  //   type: "ORDER_SET_SIZE",
  //   payload: {
  //     itemPrice: parseFloat(item[e.target.getAttribute("data-price")]),
  //     size: e.target.id
  //   }
  // });

  const PIZZA_STYLES = {
    cheese: "CZ",
    special: "SP",
    1: "1T",
    2: "2T",
    3: "3T" 
  };

  // useEffect(() => {
  //   let [ pizzaSize ] = Object.keys(modal.size).filter(size => modal.size[size]);

  //   if (pizzaSize && item) {
  //     menuDispatch({
  //       type: "PIZZA_SET_PRICE",
  //       payload: parseFloat(pizzaSize === "small" ? item.small_price : item.large_price)
  //     })
  //   }
  // }, [modal.size, item]);

  const handleChangeSize = e => menuDispatch({
    type: "UPDATE_ORDER",
    payload: {
      name: "size",
      value: {
        ...defaultOrder.size,
        [e.target.id]: true
      }
    }
  });

  const handleChangeAddOns = e => menuDispatch({
    type: "UPDATE_ORDER",
    payload: {
      name: "addOns",
      value: {
        ...modal.addOns,
        [e.target.id]: true
      }
    }
  });
  const handleChangeStyle = e => menuDispatch({
    type: "PIZZA_SET_STYLE",
    payload: {
      pizza: menu[menuOrder.indexOf("Pizza")]
        .filter(pizza => pizza.pizza_type === item.pizza_type && pizza.pizza_styles === PIZZA_STYLES[e.target.id])[0],
      style: stateUpdate(defaultOrder.style, e.target.id, true),
      addOnsDisabled: e.target.id !== "toppings",
      addOns: e.target.id !== "toppings" ? defaultOrder.addOns : modal.addOns
    }
  });
    
  return (
    <Form>
      {
        styles ? (
          <FormGroup row>
            <Label sm={3}>Types</Label>
            <Col sm={9}>
                {
                  styles.map(attr => (
                    <CustomInput 
                      type="radio" id={attr} name="style" key={attr} label={attr} onChange={handleChangeStyle} checked={modal["style"][attr]} />                  
                  ))
                }
              </Col>
          </FormGroup>
          ) : null
      }
      <FormGroup row>
        <Label sm={3}>Size</Label>
        <Col sm={9}>
          <CustomInput type="radio" selected={modal.size["small"]} name="size" id="small" label="Small" disabled={!item.small_price} onChange={handleChangeSize} />
          <CustomInput type="radio" selected={modal.size["large"]} name="size" id="large" label="Large" onChange={handleChangeSize} />
        </Col>
      </FormGroup>
      {
        menu[menuOrder.indexOf(addOns)] ? (
          <FormGroup row>
            <Label sm={3}>Add-ons</Label>
            <Col sm={9}>
              {
                menu[menuOrder.indexOf(addOns)].map(({ food_name }) => <CustomInput 
                  type="checkbox" 
                  id={food_name} 
                  key={food_name} 
                  label={food_name} 
                  name="addOns"
                  selected={modal.addOns[food_name]}
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
  const { menuState, menuDispatch } = useContext(MenuContext);
  const { modal: { isToggled }, order } = menuState;
  const { item, mapKey, totalPrice } = order;
  
  const toggleModal = () => menuDispatch({ type: "TOGGLE_MODAL" });

  const handleClick = () => {
    // addItem(menuState.order);
    toggleModal();
  };

  if (item) {
    const { food_name } = item;

    return (
      <Modal isOpen={isToggled} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{ food_name }</ModalHeader>
        <ModalBody>
          {
            mapKey === 0 ? <PizzaSettingsHandler item={item} mapKey={mapKey} /> : <SettingsHandler item={item} mapKey={mapKey} />
          }
        </ModalBody>
        <ModalFooter>
          { totalPrice == 0 ? null : <span>{ "$ " + totalPrice }</span> }
          <Button color="primary" onClick={ handleClick }>Yes I want this!</Button>
        </ModalFooter>
      </Modal>
    );
  } else return null;
};

export default MenuModal;