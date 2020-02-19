import React from "react";

import MenuItem from "../menu-item/menu-item.component";

import { CardDeck } from "reactstrap";


const MenuCollection = ({menuCollection}) => {
  return (
    <CardDeck>
      {
        menuCollection.map(menuItem => <MenuItem menuItem={menuItem} key={menuItem.id} />)
      }
    </CardDeck>
)};

export default MenuCollection;