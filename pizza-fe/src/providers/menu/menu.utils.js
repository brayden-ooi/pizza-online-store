import { API_HOST, getCSRFToken } from "../../reducers/root.utils";


export const fetchMenu = () => {
  return JSON.parse(window.localStorage.getItem("menu")) || fetch(`${API_HOST + "menu/"}`, 
  // {
    // mode: 'cors',
    // credentials: 'include',
    // headers: {
      // 'Content-Type': 'application/json',
      // 'Accept': 'application/json',
      // 'Origin': 'http://192.168.43.6:3000'
      // 'X-CSRFToken': getCSRFToken()
    // }}
    )
    .then(response => [response, response.clone()])
    .then(responses => Promise.all([responses[0].json(), responses[1].text()]))
    .then(responses => {
      window.localStorage.setItem("menu", responses[1]);
      return responses[0];
    });
};