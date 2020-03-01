import React, { useContext } from "react";

import MenuItem from "../menu-item/menu-item.component";
import { MenuContext } from "../../providers/menu/menu.provider";

import { CardDeck } from "reactstrap";


const MenuCollection = ({ menuCollection, mapKey }) => {
  const { menuOrder, menuSettings } = useContext(MenuContext);
  const { name, display, replaceWith } = menuSettings[menuOrder[mapKey]];
  const displayMenu = replaceWith || menuCollection;

  if (display) {
    return (
      <section>
        <span>{ name }</span>
        <CardDeck>
          {
            displayMenu.map(menuItem => <MenuItem menuItem={menuItem} key={menuItem.id} mapKey={mapKey} />)
          }
        </CardDeck>
      </section>
    );
  } else return null; 
};

export default MenuCollection;