import React, { useContext } from "react";

import { CartContext } from "../../providers/cart/cart.provider";
import { MenuContext } from "../../providers/menu/menu.provider";

import { OrderInitializer } from "../../providers/menu/menu.utils";

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button
} from "reactstrap";
import "./menu-item.styles.scss";


const MenuItem = ({ menuItem, mapKey }) => {
  const { addItem } = useContext(CartContext);
  const { menuState: { menu }, menuDispatch, menuOrder, menuSettings } = useContext(MenuContext);

  const { id, food_name, price, small_price, large_price } = menuItem;
  const { triggerModal, disabled } = menuSettings[menuOrder[mapKey]];
  const { size, styles, addOns } = triggerModal;
  const addOnsList = addOns && menu[menuOrder.indexOf(addOns)];

  const displayPrice = price || small_price || large_price;

  const handleClick = () => {
    menuDispatch({
      type: "ORDER_START",
      payload: {
        modal: {
          isToggled: !!triggerModal,
          orderDefaults: OrderInitializer(size, addOnsList, styles)
        },
        order: {
          item: menuItem,
          mapKey: mapKey
        }
      }
    });

    if (!triggerModal) {
      addItem({
        id,
        name: food_name,
        price,
        groupId: menuOrder[mapKey]
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
            displayPrice && <span>$ {price || displayPrice + "+"}</span>
          }{
            disabled || <Button onClick={ handleClick }>Add to cart</Button>
          }
        </CardText>
      </CardBody>
    </Card>
  );
};

export default MenuItem;