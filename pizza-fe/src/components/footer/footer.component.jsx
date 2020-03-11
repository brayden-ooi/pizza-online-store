import React from "react";

import NavList from "../nav-list/nav-list.component";

import FOOTER_DATA from "./footer.data";

import "./footer.styles.scss";


const Footer = () => (
  <footer>
    {
      FOOTER_DATA.map((directory , index) => <NavList directory={directory} key={index} />)
    }
  </footer>
);

export default Footer;