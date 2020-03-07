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
        <p className="mb-2 h4 text-muted">{ name }</p>
        <CardDeck className="mb-4">
          {
            displayMenu.map(menuItem => <MenuItem menuItem={menuItem} key={menuItem.id} mapKey={mapKey} />)
          }
        </CardDeck>
      </section>
    );
  } else return null; 
};

export default MenuCollection;