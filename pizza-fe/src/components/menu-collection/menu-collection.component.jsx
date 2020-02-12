import React from "react";

import MenuItem from "../menu-item/menu-item.component";

import { CardDeck } from "reactstrap";


const MenuCollection = ({menuCollection}) => {
  console.log(menuCollection)
  return (
    <CardDeck>
      {
        menuCollection.map(menuItem => <MenuItem menuItem={menuItem} id={menuItem.id} />)
      }
    </CardDeck>
)};

export default MenuCollection;