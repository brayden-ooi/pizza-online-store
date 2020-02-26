import React, { useState, useContext } from 'react';

import { CartContext } from "../../providers/cart/cart.provider";
import { MenuContext } from "../../providers/menu/menu.provider";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, 
  FormGroup, Label, CustomInput, Form, Col } from 'reactstrap';



const SettingsHandler = ({ menu, settings }) => {
  const [typeState, setTypeState] = useState(false);

  const handleChange = e => {
    if (e.target.name == "type") {
      setTypeState(false);
      if (e.target.value != "toppings") {
        setTypeState(true);
      }
    }
  };

  if (settings) {
    const { size, type, addOns } = settings.triggerModal;
    return (
      <Form>
        {
          type ? (
            <FormGroup row>
              <Label sm={3}>Types</Label>
              <Col sm={9}>
                {
                  type.map(attr => (
                    <CustomInput 
                      type="radio" value={attr} id={attr} name="type" key={attr} label={attr} onChange={handleChange} />                  
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
                <CustomInput type="radio" value="small" name="size" id="small" label="Small" onChange={handleChange} />
                <CustomInput type="radio" value="large" name="size" id="large" label="Large" onChange={handleChange} />
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
                  menu[addOns][0].map(({ food_name }) => (
                    <CustomInput 
                      type="checkbox" value={food_name} id={food_name} key={food_name} label={food_name} disabled={typeState} />                  
                  ))
                }
              </Col>
            </FormGroup>
          ) : null
        }
      </Form>
    );
  } else return;
};

const MenuModal = () => {
  const { addItem } = useContext(CartContext);
  const { menuState, menuDispatch } = useContext(MenuContext);
  const { menu, modal, modalBody: { item, settings } } = menuState;
  const toggleModal = () => menuDispatch({ type: "TOGGLE_MODAL" });

  const handleClick = () => {
    addItem({
      id: item.id,
      name: item.food_name,
      price: item.price,
      size: "regular"
    });
    toggleModal();
  };


  return (
    <Modal isOpen={modal} toggle={ toggleModal }>
      <ModalHeader toggle={ toggleModal }>{ item ? item.food_name : "" }</ModalHeader>
      <ModalBody>
        <SettingsHandler menu={menu} settings={settings} />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={ handleClick }>Yes I want this!</Button>
      </ModalFooter>
    </Modal>
  );
};

export default MenuModal;