import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import { CartContext } from '../../providers/cart/cart.provider';

import { getCSRFToken } from "../../reducers/root.utils";

import { Table } from 'reactstrap';
import './checkout.styles.scss';


const CheckoutPage = () => {
  const history = useHistory();
  const { clearCart, cartItems, cartTotal } = useContext(CartContext);

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
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        history.push("/order");
        clearCart();
      } else {
        alert("Something has gone wrong. Please try again later.");
        history.push("/");
      }})
    .catch(error => alert("There is a problem with the page. Please try again later."));
  };

  if (cartItems.length) {
    return (
      <main className="checkout-page">
        <div className="checkout-table">
          <Table hover>
            <thead>
              <tr>
                <th className="image">Item</th>
                <th>Name</th>
                <th className="size">Size</th>
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
                <td className="image" />
                <td />
                <td className="size" />
                <td className="text-right">TOTAL:</td>
                <td className="text-center">{cartTotal.toFixed(2)}</td>
                <td>
                  <div className="checkout-payments">
                    <StripeCheckoutButton price={cartTotal.toFixed(2)} cartItems={cartItems} />
                    <div className="text-muted text-center checkout-pay-later" onClick={handleOrder}>or pay later</div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </Table>
        </div>
      </main>
    );
  } else {
    return (
      <main className="checkout-page">
        <div className="checkout-no-item">
          <div className="image-container">
            <img src="https://image.flaticon.com/icons/png/512/16/16541.png" alt="empty-cart" />
          </div>
          <span className="text-muted text-center">
            You don't seem to have any cart items. Go to <Link to="/menu">our menu</Link> to begin ordering.
          </span>
        </div>
      </main>
    );
  }
};

export default CheckoutPage;