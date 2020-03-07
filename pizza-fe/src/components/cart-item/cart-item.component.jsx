import React from "react";

import { DropdownItem } from "reactstrap";
import './cart-item.styles.scss';


const CartItem = ({ img_url, name, quantity, price }) => (
  <DropdownItem tag="div" className="cart-item">
    <img src={img_url} alt="item" />
    <div className="item-details">
      <span className="name">{name}</span>
      <span className="price">
        {quantity} x $ { parseFloat(price).toFixed(2) }
      </span>
    </div>        
  </DropdownItem>
);

export default CartItem;