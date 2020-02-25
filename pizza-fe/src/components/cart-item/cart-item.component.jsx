import React from "react";

import { DropdownItem } from "reactstrap";
import './cart-item.styles.scss';


const CartItem = ({ imageUrl, name, quantity, price }) => (
  <DropdownItem tag="div" className="cart-item">
    <img src={imageUrl} alt="item" />
    <div className="item-details">
      <span className="name">{name}</span>
      <span className="price">
        {quantity} x ${price}
      </span>
    </div>        
  </DropdownItem>
);

export default CartItem;