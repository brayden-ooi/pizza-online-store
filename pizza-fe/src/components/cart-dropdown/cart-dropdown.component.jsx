import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";

import CartItem from "../cart-item/cart-item.component";

import { CartContext } from "../../providers/cart/cart.provider";

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import "./cart-dropdown.styles.scss";


const CartDropdown = () => {
  const history = useHistory();
  const { cartItems } = useContext(CartContext);
  const [ dropdownOpen, setDropdownOpen ] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} className="cart-dropdown">
      <DropdownToggle 
        tag="div"
        data-toggle="dropdown"
        aria-expanded={dropdownOpen}
      >
        <img src="cart-icon.png" className="cart-icon" />
      </DropdownToggle>
      <DropdownMenu right>
        <div className="checkout-item">
          {
            cartItems.length ? cartItems.map(({ id, groupId, size, ...otherProps }) => (
              <CartItem 
                key={size ? size + groupId + id : groupId.toString() + id} 
                {...otherProps} 
              />
            )) : (
            <DropdownItem tag="div">
              <div className="checkout-no-item">
                <div className="image-container">
                  <img src="https://image.flaticon.com/icons/png/512/16/16541.png" alt="empty-cart" />
                </div>
                <span className="text-muted text-center">
                  You don't seem to have any cart items.<wbr/> Go to <Link to="/menu">our menu</Link> to begin ordering.
                </span>
              </div>
            </DropdownItem>
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