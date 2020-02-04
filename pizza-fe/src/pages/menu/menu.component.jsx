import React, { useState, useEffect, Suspense } from "react";

import MenuCollection from "../../components/menu-collection/menu-collection.component";

const MenuPage = () => {
  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    // TODO
    async function fetchData() {
      // let fetchMenu = await fetch("http://127.0.0.1:8000/api/menu/");
      // let response = await fetchMenu.json();
      await setMenuData([[1,2],[1,2],[1,2],[1,2],[1,2]]);
    }
    fetchData();
  }, []);

  return (
    <Suspense fallback={<span>I am loading the menu!</span>}>
      <main>
        {
          menuData ? menuData.map(menu => <MenuCollection menu={menu} />) : ""
        }
      </main>
    </Suspense>
  )
}

export default MenuPage;