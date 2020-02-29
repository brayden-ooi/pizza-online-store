import React, { useEffect, useContext } from "react";

import MenuModal from "../../components/menu-modal/menu-modal.component";
import MenuCollection from "../../components/menu-collection/menu-collection.component";

import { MenuContext } from "../../providers/menu/menu.provider";

import { fetchMenu } from "../../providers/menu/menu.utils";


const MenuPage = () => {
  const { menuState, menuDispatch } = useContext(MenuContext);
  const { menu, menuOrder } = menuState;
  
  useEffect(() => {
    Promise.resolve(fetchMenu()).then(menu => menuDispatch({ 
      type: "SET_MENU", 
      payload: menuOrder.map(group => menu[group])
    })
  )}, []);

  useEffect(() => {
    console.log(menuState);
  }, [menuState]);
    
  return (
    <div>
      {/* <MenuModal /> */}
      {
        menu ? menu.map((menuCollection, index) => <MenuCollection menuCollection={menuCollection} key={index} mapKey={index} />) : null
      }
    </div>
  );
};

export default MenuPage;