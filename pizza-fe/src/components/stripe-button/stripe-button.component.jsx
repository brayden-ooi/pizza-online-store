import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout';

import { CartContext } from "../../providers/cart/cart.provider";


const StripeCheckoutButton = ({ price, cartItems }) => {
  const history = useHistory();
  const { clearCart } = useContext(CartContext);
  const priceForStripe = Math.round(price * 100);
  const publishableKey = 'pk_test_5rN11GjkSP6ayB3NaS4l9EUu00vPNVmQXr';

  const onToken = token => {
    fetch("/api/payment", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token,
        userToken: window.localStorage.getItem("token"),
        amount: priceForStripe,
        order: cartItems
      })
    }).then(response => response.json())
    .then(response => {
      if (response) {
        history.push("/order");
        clearCart();
      } else {
        alert("Something has gone wrong. Please try again later.");
        history.push("/");
      }})
    .catch(error => alert("Something has gone wrong. Please try again later."));
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name="Pinocchio's Pizza & Subs"
      billingAddress={false}
      shippingAddress={false}
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;