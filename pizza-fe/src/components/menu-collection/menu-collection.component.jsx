import React from "react";

import MenuItem from "../menu-item/menu-item.component";

import { CardDeck } from "reactstrap";


const MenuCollection = ({ menuCollection }) => {
  const displayedMenu = menuCollection[1]["replaceWith"] || menuCollection[0];

  return (
    <CardDeck>
      {
        displayedMenu.map(menuItem => <MenuItem menuItem={menuItem} key={menuItem.id} settings={menuCollection[1]} />)
      }
    </CardDeck>
  );
};

export default MenuCollection;