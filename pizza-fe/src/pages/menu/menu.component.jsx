import React, { useState, useEffect } from "react";

import MenuCollection from "../../components/menu-collection/menu-collection.component";

import { fetchMenu } from "./menu.utils";


const MenuPage = () => {
  const [menuData, setMenuData] = useState(null);
  
  useEffect(() => {
    Promise.resolve(fetchMenu()).then(menu => setMenuData(menu));
  }, []);
    
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