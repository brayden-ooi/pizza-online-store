import React, { useEffect, useContext } from "react";

import MenuModal from "../../components/menu-modal/menu-modal.component";
import MenuCollection from "../../components/menu-collection/menu-collection.component";
import Loader from "../../components/loader/loader.component";

import { MenuContext } from "../../providers/menu/menu.provider";

import { fetchMenu } from "../../providers/menu/menu.utils";

import "./menu.styles.scss";


const MenuPage = () => {
  const { menuState, menuDispatch, menuOrder } = useContext(MenuContext);
  const { menu } = menuState;
  
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        await fetchMenu();
      } catch (error) {
        console.log(error);
      }
    };

    fetchMenuData();
    // Promise.resolve(fetchMenu()).then(menu => menuDispatch({ 
    //   type: "SET_MENU", 
    //   payload: menuOrder.map(group => menu[group])
    // })
}, []);

  return (
    <main className="menu-page">
      {
        menu?.map((menuCollection, index) => 
          <MenuCollection menuCollection={menuCollection} key={index} mapKey={index} />) ||
        <Loader />
      }
      <MenuModal />
    </main>
  );
};

export default MenuPage;