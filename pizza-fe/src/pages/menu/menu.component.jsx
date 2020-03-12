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
    
    Promise.resolve(fetchMenu()).then(menu => console.log(menu))}, []);

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