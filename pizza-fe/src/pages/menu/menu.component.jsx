import React, { useState, useEffect } from "react";

import MenuCollection from "../../components/menu-collection/menu-collection.component";

import { getCSRFToken } from "../../providers/user/user.utils";


const MenuPage = () => {
  const [menuData, setMenuData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const fetchMenu = await fetch("http://localhost:8000/api/menu/", {
        credentials: 'include',
        headers: {
          'Authorization': 'Token 0fb57f50eff6113288937be4a8d15fbadaf62b70',
          'Content-Type': 'application/json',
          'X-CSRFToken': await getCSRFToken()
        },
      });
      const response = await fetchMenu.json();
      await setMenuData(response);
    };

    fetchData();
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