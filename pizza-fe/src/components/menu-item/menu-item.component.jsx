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

  const { img_url, id, food_name, price, small_price, large_price } = menuItem;
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
        img_url: img_url,
        id,
        name: food_name,
        price,
        groupId: menuOrder[mapKey]
      });
    }
  }

  // need to account for price, small_price and items with no prices
  return (
    <Card className="menu-item mb-3">
      <CardImg top src={img_url || "300x200.svg"} alt="Card image cap" className="menu-item-image" />
      <CardBody>
        <CardTitle className="menu-item-text">
          <p style={ price || displayPrice ? null : { margin: "auto" } }>{ food_name }</p>
          {
            displayPrice && <p>{ price || displayPrice + "+" }</p>
          }
        </CardTitle>
        <CardText>
          {
            disabled || <Button className="menu-item-purchase" onClick={ handleClick }>Add to cart</Button>
          }
        </CardText>
      </CardBody>
    </Card>
  );
};

export default MenuItem;