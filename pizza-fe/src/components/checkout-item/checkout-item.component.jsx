import React, { useContext } from "react";

import { CartContext } from "../../providers/cart/cart.provider";

import './checkout-item.styles.scss';


const CheckoutItem = ({ cartItem }) => {
  const { name, img_url, price, quantity, size, addOns } = cartItem;
  const { addItem, removeItem, clearItemFromCart } = useContext(CartContext);

  return (
    <>
      <tr className="checkout-item">
        <td className="image">
          <div className="image-container">
            <img src={ img_url } alt="item" />
          </div>
        </td>
        <td className="checkout-item-detail">{ name }</td>
        <td className="checkout-item-detail size">{ size || "-" }</td>
        <td className="checkout-item-detail">
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
        <td className="price checkout-item-detail">
          <span id="itemPrice">{ (price * quantity).toFixed(2) }</span>
        </td>
        <td className="checkout-item-detail">
          <div
            className="remove-button"
            onClick={() => clearItemFromCart(cartItem)}
          >
            &#10005;
          </div>
        </td>
      </tr>
      {
        addOns?.map(item => 
        <tr className="checkout-item addOns">
          <td className="image"></td>
          <td>{ item.food_name }</td>
          <td className="size">-</td>
          <td>-</td>
          <td>{ (item.small_price * quantity).toFixed(2) || null }</td>
          <td></td>
        </tr>)
      }
    </>
  );
};

export default CheckoutItem;