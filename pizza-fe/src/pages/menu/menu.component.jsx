import React, { useState, useEffect, useContext } from "react";

import MenuCollection from "../../components/menu-collection/menu-collection.component";

import MenuContext, { fetchMenu } from "../../context/menu/menu.context";


const MenuPage = () => {
  const menu = useContext(MenuContext);
  const [menuData, setMenuData] = useState(null);
  
  useEffect(() => (() => {
    // fetchMenu.then(response => setMenuData(response))
    new Promise(resolve => resolve(menu)).then(menu => setMenuData(menu))
  })(), []);
    
    

  return (
    <main>
      {
        menuData ? Object.keys(menuData).map(menuCollection => 
          <section key={menuCollection} >
            <span>{ menuCollection }</span>
            <MenuCollection menuCollection={menuData[menuCollection]} />
          </section>
        ) : null
      }
    </main>
  );
};

export default MenuPage;