import React from "react";

import NavList from "../nav-list/nav-list.component";

import "./footer.styles.scss";


const Footer = () => {
  // TODO
  const FooterDirectories = [1,2,3,4];

  return (
    <footer>
      {
        FooterDirectories.map(Directory => <NavList Directory />)
      }
    </footer>
  );
};

export default Footer;