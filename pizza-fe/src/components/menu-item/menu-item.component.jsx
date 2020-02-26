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
  const { menuDispatch } = useContext(MenuContext);

  const handleClick = () => {
    if (settings.triggerModal) {
      menuDispatch({
        type: "SET_MODAL_BODY",
        payload: {
          item: menuItem,
          settings
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

  return (
    <Card className="menu-item">
      <CardImg top width="100%" src="300x200.svg" alt="Card image cap" />
      <CardBody className="text-center">
        <CardTitle>{ food_name }</CardTitle>
        <CardText>
          {/* { price && <div>Price: { price }</div> }
          { 
            small_price && 
              <div>Small: { small_price } Large: { large_price }</div>
          } */}
          {
            settings.disabled ? null : <Button onClick={ handleClick }>Yes I want it!</Button>
          }
        </CardText>
      </CardBody>
    </Card>
  );
};

export default MenuItem;