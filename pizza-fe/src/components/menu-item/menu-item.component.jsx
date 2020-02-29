import React, { useContext } from "react";

import { CartContext } from "../../providers/cart/cart.provider";
import { MenuContext } from "../../providers/menu/menu.provider";

import { correctedPayload, stateUpdate } from '../../reducers/form/form.utils';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from "reactstrap";
import "./menu-item.styles.scss";


const MenuItem = ({ menuItem, mapKey }) => {
  const { addItem } = useContext(CartContext);
  const { menuState: { menu, menuOrder, modal, order, settings, initialOrderState }, menuDispatch } = useContext(MenuContext);

  const { id, food_name, price, small_price, large_price } = menuItem;
  const { triggerModal, disabled } = settings[menuOrder[mapKey]];
  const { size, style, addOns } = triggerModal;

  const displayPrice = price || small_price || large_price;

  const handleClick = () => {
    menuDispatch({
      type: "ORDER_START",
      payload: {
        modal: {
          ...modal,
          isToggled: !!triggerModal,
          ...initialOrderState(size, addOns, menu[menuOrder.indexOf(addOns)])
        },
        order: {
          ...order,
          item: menuItem
        }
      }
    });
    if (triggerModal) {
      addItem({
        id,
        name: food_name,
        price
      });
    }
  }

  // need to account for price, small_price and items with no prices
  return (
    <Card className="menu-item">
      <CardImg top width="100%" src="300x200.svg" alt="Card image cap" />
      <CardBody className="text-center">
        <CardTitle>{ food_name }</CardTitle>
        <CardText>
          {
            displayPrice && 
              <span>$ {price || displayPrice + "+"}</span>
          }
          {
            disabled && <Button onClick={ handleClick }>Add to cart</Button>
          }
        </CardText>
      </CardBody>
    </Card>
  );
};

export default MenuItem;