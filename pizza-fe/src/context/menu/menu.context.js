import { createContext } from "react";

import { getCSRFToken } from "../../providers/user/user.utils";


// TODO remove token
export const fetchMenu =  fetch("http://localhost:8000/api/menu/", {
  credentials: 'include',
  headers: {
    'Authorization': 'Token 0fb57f50eff6113288937be4a8d15fbadaf62b70',
    'Content-Type': 'application/json',
    'X-CSRFToken': getCSRFToken()
  },
}).then(response => response.json());

const MENU_DATA = window.localStorage.getItem("menu") || fetchMenu;
const MenuContext = createContext(MENU_DATA);

export default MenuContext;