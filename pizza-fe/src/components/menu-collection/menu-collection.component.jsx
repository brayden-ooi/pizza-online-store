import React from "react";

import MenuItem from "../menu-item/menu-item.component";

import { CardDeck } from "reactstrap";


const MenuCollection = ({ menuCollection, name }) => {
  return (
    <CardDeck>
      {
        menuCollection.map(menuItem => <MenuItem menuItem={menuItem} key={menuItem.id} group={name} />)
      }
    </CardDeck>
  );
};

export default MenuCollection;