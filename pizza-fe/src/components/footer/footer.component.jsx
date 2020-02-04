import React from "react";

import NavList from "../nav-list/nav-list.component";


const Footer = () => {
  // TODO
  const FooterDirectories = [1,2,3,4];

  return (
    <footer style={{ display: "flex", justifyContent: "center" }}>
      {
        FooterDirectories.map(Directory => <NavList Directory />)
      }
    </footer>
  );
};

export default Footer;