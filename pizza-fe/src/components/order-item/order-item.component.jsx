import React from "react";

import "./order-item.styles.scss";


const OrderItem = ({ amount, size, itemPrice, ordered_item_details, pizza, subs }) => (
  <>
    <tr className="order-item">
      <td>{ (ordered_item_details?.type) || (pizza ? "Pizza" : "Subs") }</td>
      <td>{ ordered_item_details?.name || pizza?.name || subs?.name }</td>
      <td>{ size }</td>
      <td>{ amount }</td>
      <td>{ (parseFloat(itemPrice)).toFixed(2) }</td>
    </tr>
    {
      (pizza?.toppings || subs?.addOns)?.map(({ name, price }, index) => 
        <tr className="order-item addOns" key={index}>
          <td></td>
          <td>{ name }</td>
          <td>-</td>
          <td>-</td>
          <td>{ price || "-" }</td>
        </tr>)
    }
  </>
);

export default OrderItem;