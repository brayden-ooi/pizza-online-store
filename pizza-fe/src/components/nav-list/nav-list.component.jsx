import React from "react";

import { Nav, NavItem, NavLink } from 'reactstrap';


const NavList = Directory => (
  <Nav vertical>
    <NavItem>
      <NavLink href="/menu">Menu</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="#">Link</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="#">Another Link</NavLink>
    </NavItem>
    <NavItem>
      <NavLink disabled href="#">Disabled Link</NavLink>
    </NavItem>
  </Nav>
);

export default NavList;