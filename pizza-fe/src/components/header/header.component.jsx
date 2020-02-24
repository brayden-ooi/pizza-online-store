import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { UserContext } from "../../providers/user/user.provider";

import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavbarToggler } from "reactstrap";

const NLink = ({ children, ...otherProps }) => (
  <NavLink
    className="nav-link" 
    activeStyle={{
      fontWeight: "bold",
      color: "red"
    }}
    {...otherProps}
    >
    { children }
  </NavLink>
);


const Header = () => {
  const { userState, userDispatch } = useContext(UserContext);

  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  
  return (
    <nav>
      <Navbar expand="md">
        <NavbarBrand href="/">
          Pizza
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NLink to="/menu">Menu</NLink>
            </NavItem>
            <NavItem>
              <NLink to="/about">About</NLink>
            </NavItem>
            <NavItem>
              <NLink to="/contact">Contact</NLink>
            </NavItem>
          </Nav>
          {
            userState ? (
              <div onClick={() => userDispatch({ type: "LOGOUT_USER" })}>
                Sign Out
              </div>
            ) : (
              <Link to='/signin'>
                Sign In
              </Link>
            )
          }
          <CartDropdown />
        </Collapse>
      </Navbar>
    </nav>
  );
};

export default Header;