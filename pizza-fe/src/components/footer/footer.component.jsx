import React from "react";

import NavList from "../nav-list/nav-list.component";

import "./footer.styles.scss";


const Footer = () => {
  const FooterDirectories = [
    [
      ["Menu", "/menu"],
      ["Promotions", "/promo"],
      ["Orders", "/order"],
      ["Coupons", "/promo"]
    ],
    [
      ["About Us", "/about"],
      ["Our history", "/about"],
      ["News", "/about"],
      ["Delivery", "/delivery"],
    ],
    [
      ["Contact Us", "/contact"],
      ["Find Us", "https://www.pinocchiospizza.net/directions.html"],
      ["Privacy Policy", "/about"],
      ["Terms of Use", "/about"]
    ],
    [
      ["Twitter", "https://twitter.com/PinocchiosPizz"],
      ["Instagram", "https://www.instagram.com/pinocchiospizza1"],
      ["Real Homepage", "https://www.pinocchiospizza.net/index.html"]
    ]
  ];

  return (
    <footer>
      {
        FooterDirectories.map(directory => <NavList directory={directory} />)
      }
    </footer>
  );
};

export default Footer;