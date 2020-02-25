import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import CartItem from "../cart-item/cart-item.component";

import { CartContext } from "../../providers/cart/cart.provider";

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";


const CartDropdown = () => {
  const history = useHistory();
  const { cartItems } = useContext(CartContext);
  const [ dropdownOpen, setDropdownOpen ] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle>
        Dropdown
      </DropdownToggle>
      <DropdownMenu right>
        <div>
          {cartItems.length ? (
            cartItems.map(({ id, ...otherProps }) => (
              <CartItem key={id} {...otherProps} />
            ))
          ) : (
            <DropdownItem>Your cart is empty</DropdownItem>
          )}
        </div>
      <DropdownItem divider />
      <DropdownItem className="text-center"
        onClick={() => {
          history.push("/checkout");
        }}>
          Go to Checkout
      </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default CartDropdown;