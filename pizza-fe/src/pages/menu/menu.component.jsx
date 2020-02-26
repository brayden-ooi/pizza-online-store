import React, { useEffect, useContext } from "react";

import MenuModal from "../../components/menu-modal/menu-modal.component";
import MenuCollection from "../../components/menu-collection/menu-collection.component";

import { MenuContext } from "../../providers/menu/menu.provider";

import { fetchMenu } from "../../providers/menu/menu.utils";


const MenuPage = () => {
  const { menuState, menuDispatch } = useContext(MenuContext);
  const { menu, settings } = menuState; 
  
  useEffect(() => {
    Promise.resolve(fetchMenu())
    .then(menu => {
      console.log( Object.keys(menu).reduce((MenuArray, currentItem) => ([
        ...MenuArray,
        [menu[currentItem], settings[currentItem]]
      ]), []).sort((a, b) => a[1]["order"] - b[1]["order"]));

      menuDispatch({ 
        type: "SET_MENU", 
        payload: Object.keys(menu).reduce((MenuArray, currentItem) => ([
          ...MenuArray,
          [menu[currentItem], settings[currentItem]]
        ]), []).sort((a, b) => a[1]["order"] - b[1]["order"])
      })
    }
  )}, []);
    
  return (
    <div>
      <MenuModal />
      {
        menu ? menu.map((menuCollection, index) => {
          if (menuCollection[1]["display"]) {
            return (
              <section key={index}>
                <span>{ menuCollection[1]["name"] }</span>
                <MenuCollection menuCollection={menuCollection} />
              </section>
            );
          }
        }) : null
      }
    </div>
  );
};

export default MenuPage;