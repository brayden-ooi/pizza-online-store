import React, { useContext } from 'react';

import { CartContext } from "../../providers/cart/cart.provider";
import { MenuContext } from "../../providers/menu/menu.provider";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const MenuModal = ({ item }) => {
  const { addItem } = useContext(CartContext);
  const { modal, toggleModal } = useContext(MenuContext);

  const handleClick = () => {
    addItem({
      id: item.id,
      name: item.food_name,
      price: item.price,
      quantity: 1,
      size: "regular"
    });
    toggleModal();
  };

  return (
    <Modal isOpen={modal} toggle={ toggleModal }>
      <ModalHeader toggle={ toggleModal }>Add to cart</ModalHeader>
      <ModalBody>
        { item ? Object.values(item).map(attr => <span key={attr}>{ attr }</span>) : "" }
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={ handleClick }>Yes I want this!</Button>
      </ModalFooter>
    </Modal>
  );
};

export default MenuModal;