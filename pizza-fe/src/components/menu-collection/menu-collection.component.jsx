import React from "react";

import MenuItem from "../menu-item/menu-item.component";

import { CardDeck } from "reactstrap";


const MenuCollection = ({menu}) => {
  return (
    <CardDeck>
      {
        menu.map(menuItem => <MenuItem />)
      }
    </CardDeck>
)};

export default MenuCollection;