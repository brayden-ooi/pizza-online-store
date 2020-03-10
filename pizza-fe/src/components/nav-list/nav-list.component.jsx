import React from "react";

import { Nav, NavItem, NavLink } from 'reactstrap';


const NavList = ({ directory }) => (
  <Nav vertical>
    {
      directory.map(([name, address], index) => (
        <NavItem key={index}>
          <NavLink href={ address }>{ name }</NavLink>
        </NavItem>
      ))
    }
  </Nav>
);

export default NavList;