import { createContext } from 'react';


export const MenuContext = createContext({
  modal: {},
  toggleModal: () => {},
  item: {},
  getItem: () => {}
});