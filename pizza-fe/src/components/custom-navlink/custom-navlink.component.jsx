import React from "react";
import { NavLink } from "react-router-dom";

import "./custom-navlink.styles.scss";


const CustomNavLink = ({ children, ...otherProps }) => (
  <NavLink
    className="nav-link" 
    activeClassName="nav-link-active"
    {...otherProps}
    >
    { children }
  </NavLink>
);

export default CustomNavLink;