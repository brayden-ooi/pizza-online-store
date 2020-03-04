import React, { useContext } from 'react';
import StripeCheckout from 'react-stripe-checkout';

import { CartContext } from "../../providers/cart/cart.provider";


const StripeCheckoutButton = ({ price, cartItems }) => {
  const { clearCart } = useContext(CartContext);
  console.log(cartItems);
  const priceForStripe = Math.round(price * 100);
  const publishableKey = 'pk_test_5rN11GjkSP6ayB3NaS4l9EUu00vPNVmQXr';

  const onToken = token => {
    fetch("http://localhost:8000/api/payment", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token,
        amount: priceForStripe,
        order: cartItems
      })
    }).then(response => response.json())
    .then(response => alert("Payment successful" + response))
    .catch(error => console.log(error));
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