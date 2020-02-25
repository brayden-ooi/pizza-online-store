import React, { useState, useEffect, useContext } from "react";

import MenuModal from "../../components/menu-modal/menu-modal.component";
import MenuCollection from "../../components/menu-collection/menu-collection.component";

import { MenuContext } from "../../providers/menu/menu.provider";

import { fetchMenu } from "../../providers/menu/menu.utils";


const MenuPage = () => {
  const { menuState, menuDispatch } = useContext(MenuContext);
  const { menu } = menuState; 
  
  useEffect(() => {
    Promise.resolve(fetchMenu())
    .then(menu => menuDispatch({ type: "SET_MENU", payload: menu }));
  }, []);
    
  return (
    <div>
      <MenuModal />
      {
        menu ? Object.keys(menu).map(menuCollection => 
          <section key={menuCollection} >
            <span>{ menuCollection }</span>
            <MenuCollection menuCollection={menu[menuCollection]} name={menuCollection} />
          </section>
        ) : null
      }
    </div>
  );
};

export default MenuPage;