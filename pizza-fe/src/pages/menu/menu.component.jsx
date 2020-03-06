import React, { useEffect, useContext } from "react";

import MenuModal from "../../components/menu-modal/menu-modal.component";
import MenuCollection from "../../components/menu-collection/menu-collection.component";

import { MenuContext } from "../../providers/menu/menu.provider";

import { fetchMenu } from "../../providers/menu/menu.utils";


const MenuPage = () => {
  const { menuState, menuDispatch, menuOrder } = useContext(MenuContext);
  const { menu } = menuState;
  
  useEffect(() => {
    Promise.resolve(fetchMenu()).then(menu => menuDispatch({ 
      type: "SET_MENU", 
      payload: menuOrder.map(group => menu[group])
    })
  )}, []);

  return (
    <div>
      {
        menu?.map((menuCollection, index) => <MenuCollection menuCollection={menuCollection} key={index} mapKey={index} />)
      }
      <MenuModal />
    </div>
  );
};

export default MenuPage;