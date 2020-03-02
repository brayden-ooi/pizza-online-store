import React, { useContext } from "react";

import { CartContext } from "../../providers/cart/cart.provider";

import { UncontrolledTooltip } from "reactstrap";

import './checkout-item.styles.scss';


const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, itemPrice, quantity, size, addOns } = cartItem;
  const { addItem, removeItem, clearItemFromCart } = useContext(CartContext);

  return (
    <>
      <tr className="checkout-item">
        <td>
          <div className="image-container">
            <img src={ imageUrl } alt="item" />
          </div>
        </td>
        <td>{ name }</td>
        <td>{ size || "-" }</td>
        <td>
          <span className="quantity">
            <div className="arrow" onClick={() => removeItem(cartItem)}>
              &#10094;
            </div>
            <span className="value">{ quantity }</span>
            <div className="arrow" onClick={() => addItem(cartItem)}>
              &#10095;
            </div>
          </span>
        </td>
        <td className="price">
          <span id="itemPrice">{ price }</span>
          {
            itemPrice ? <UncontrolledTooltip placement="top" target="itemPrice">
              { itemPrice }
            </UncontrolledTooltip> 
            : null
          }
        </td>
        <td>
          <div
            className="remove-button"
            onClick={() => clearItemFromCart(cartItem)}
          >
            &#10005;
          </div>
        </td>
      </tr>
      {
        addOns ? addOns.map(item => 
        <tr className="checkout-item addOns">
          <td></td>
          <td>{ item.food_name }</td>
          <td>-</td>
          <td>-</td>
          <td>{ item.small_price || null }</td>
          <td></td>
        </tr>) : null
      }
    </>
  );
};

export default CheckoutItem;