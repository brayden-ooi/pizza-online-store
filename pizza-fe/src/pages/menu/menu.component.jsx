import React, { useState, useEffect, Suspense } from "react";

import MenuCollection from "../../components/menu-collection/menu-collection.component";

const MenuPage = () => {
  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    // TODO
    async function fetchData() {
      let fetchMenu = await fetch("http://localhost:8000/api/menu/");
      let response = await fetchMenu.json();
      await console.log(response);
      await setMenuData(response);
    }
    fetchData();
  }, []);

  return (
    <Suspense fallback={<span>I am loading the menu!</span>}>
      <main>
        {
          menuData ? Object.keys(menuData).map(menuCollection => 
            <section>
              <span>{ menuCollection }</span>
              <MenuCollection menuCollection={menuData[menuCollection]} id={menuCollection} />
            </section>
          ) : ""
        }
      </main>
    </Suspense>
  )
}

export default MenuPage;