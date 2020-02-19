import React, { useState, useEffect } from "react";

import MenuCollection from "../../components/menu-collection/menu-collection.component";

import { getCSRFToken } from "../../providers/user/user.utils";


const MenuPage = () => {
  const [menuData, setMenuData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      let fetchMenu = await fetch("http://localhost:8000/api/menu/", {
        headers: {'X-CSRFToken': await getCSRFToken()},
        credentials: 'include',

      });
      let response = await fetchMenu.json();
      await setMenuData(response);
    };

    fetchData()}, []);

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