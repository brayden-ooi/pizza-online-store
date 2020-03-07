import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { default as NavLink } from "../custom-navlink/custom-navlink.component";

import { UserContext } from "../../providers/user/user.provider";

import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavbarToggler } from "reactstrap";
import "./header.styles.scss";


const Header = () => {
  const { userState, userDispatch } = useContext(UserContext);

  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  
  return (
    <nav className="header">
      <Navbar expand="md">
        <NavbarBrand href="/">
          <img src="logo_small.gif" alt="logo" />
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/menu">Menu</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/about">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/contact">Contact</NavLink>
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