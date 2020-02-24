import React, { useState, useEffect } from "react";

import MenuModal from "../../components/modal/modal.component";
import MenuCollection from "../../components/menu-collection/menu-collection.component";

import { MenuContext } from "../../providers/menu/menu.provider";

import { fetchMenu } from "./menu.utils";


const MenuPage = () => {
  const [ menuData, setMenuData ] = useState(null);

  const [ modal, setModal ] = useState(false);
  const [ item, setItem ] = useState(null);
  const toggleModal = () => setModal(!modal);
  const getItem = item => setItem(item);
  
  useEffect(() => {
    Promise.resolve(fetchMenu()).then(menu => setMenuData(menu));
  }, []);
    
  return (
    <MenuContext.Provider value={{
      modal,
      toggleModal, 
      item,
      getItem
    }}>
      <MenuModal item={item} />
      {
        menuData ? Object.keys(menuData).map(menuCollection => 
          <section key={menuCollection} >
            <span>{ menuCollection }</span>
            <MenuCollection menuCollection={menuData[menuCollection]} />
          </section>
        ) : null
      }
    </MenuContext.Provider>
  );
};

export default MenuPage;