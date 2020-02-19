import React, { useContext } from "react";

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import { CartContext } from '../../providers/cart/cart.provider';

import { Table } from 'reactstrap';


const CheckoutPage = () => {
  const { cartItems, cartTotal } = useContext(CartContext);


  return (
    <main>
      <Table>
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
            cartItems.map(cartItem => 
              <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            )
          }
          <tr>
            <td>Regular Pizza</td>
            <td>Regular Pizza</td>
            <td>Small</td>
            <td>
              <div>&#10094;</div>
              1
              <div>&#10095;</div>
            </td>
            <td>12.95</td>
            <td>&#10005;</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>TOTAL: ${cartTotal}</td>
          </tr>
        </tfoot>
      </Table>
      <StripeCheckoutButton price={cartTotal} />
    </main>
  );
};

export default CheckoutPage;