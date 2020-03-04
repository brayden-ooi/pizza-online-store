import React, { useContext } from "react";

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import { CartContext } from '../../providers/cart/cart.provider';

import { getCSRFToken } from "../../reducers/root.utils";

import { Table } from 'reactstrap';
import './checkout.styles.scss';


const CheckoutPage = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

  const handleOrder = async e => {
    e.preventDefault();

    fetch("http://localhost:8000/api/order", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userToken: window.localStorage.getItem("token"),
        amount: cartTotal.toFixed(2),
        order: cartItems
      })
    }).then(response => response.json())
    .then(response => alert("Order successful" + response))
    .catch(error => console.log(error));
  };

  return (
    <main>
      <Table hover className="checkout-page">
        <thead>
          <tr>
            <th>Item</th>
            <th>Name</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {
            cartItems.map(cartItem => <CheckoutItem 
              key={cartItem.size ? cartItem.size + cartItem.groupId + cartItem.id : cartItem.groupId.toString() + cartItem.id} 
              cartItem={cartItem} 
            />)
          }
        </tbody>
        <tfoot>
          <tr>
            <td>TOTAL: ${cartTotal.toFixed(2)}</td>
          </tr>
        </tfoot>
      </Table>
      <StripeCheckoutButton price={cartTotal.toFixed(2)} cartItems={cartItems} />
      <a onClick={handleOrder}>or pay later</a>
    </main>
  );
};

export default CheckoutPage;