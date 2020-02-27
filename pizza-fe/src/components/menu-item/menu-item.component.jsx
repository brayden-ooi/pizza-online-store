import React, { useContext } from "react";

import { CartContext } from "../../providers/cart/cart.provider";
import { MenuContext } from "../../providers/menu/menu.provider";

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from "reactstrap";
import "./menu-item.styles.scss";


const MenuItem = ({ menuItem, settings }) => {
  const { addItem } = useContext(CartContext);
  const { id, food_name, price, small_price, large_price } = menuItem;
  const { menuDispatch, orderDispatch } = useContext(MenuContext);

  const handleClick = () => {
    if (settings.triggerModal) {
      orderDispatch({
        type: "ORDER_START",
        payload: menuItem
      });
      menuDispatch({
        type: "SET_MODAL_BODY",
        payload: {
          item: menuItem,
          settings,
        }
      });
    } else {
      addItem({
        id,
        name: food_name,
        price,
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
            (price || small_price || large_price) && <span>$ {price || (small_price || large_price) + "+"}</span>
          }
          {
            settings.disabled ? null : <Button onClick={ handleClick }>Add to cart</Button>
          }
        </CardText>
      </CardBody>
    </Card>
  );
};

export default MenuItem;