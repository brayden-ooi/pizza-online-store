import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { UserContext } from "../../providers/user/user.provider";

import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarToggler } from "reactstrap";


const Header = () => {
  const { currentUser } = useContext(UserContext);

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
              <NavLink href="/menu">Menu</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/about">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contact">Contact</NavLink>
            </NavItem>
          </Nav>
          {
            currentUser ? (
              <div onClick={() => {}}>
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