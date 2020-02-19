import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import { CartContext } from '../../providers/cart/cart.provider';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';


const CartDropdown = ({ history }) => {
  const { cartItems } = useContext(CartContext);
  const [ dropdownOpen, setDropdownOpen ] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle>
        Dropdown
      </DropdownToggle>
      <DropdownMenu right>
        <div>
          {cartItems.length ? (
            cartItems.map(cartItem => (
              <DropdownItem key={cartItem.id} item={cartItem} />
            ))
          ) : (
            <DropdownItem>Your cart is empty</DropdownItem>
          )}
        </div>
      <DropdownItem divider />
      <DropdownItem>
        <Button
          onClick={() => {
            history.push('/checkout');
            toggle();
          }}
        >
          GO TO CHECKOUT
        </Button>
      </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default withRouter(CartDropdown);