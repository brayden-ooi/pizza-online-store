import { API_HOST, getCSRFToken } from "../../providers/user/user.utils";


// TODO remove token
export const fetchMenu = () => {
  return JSON.parse(window.localStorage.getItem("menu")) || fetch(`${API_HOST + "menu"}`, {
    credentials: 'include',
    headers: {
      'Authorization': 'Token 0fb57f50eff6113288937be4a8d15fbadaf62b70',
      'Content-Type': 'application/json',
      'X-CSRFToken': getCSRFToken()
    }})
    .then(response => [response, response.clone()])
    .then(responses => Promise.all([responses[0].json(), responses[1].text()]))
    .then(responses => {
      window.localStorage.setItem("menu", responses[1]);
      return responses[0];
    });
};