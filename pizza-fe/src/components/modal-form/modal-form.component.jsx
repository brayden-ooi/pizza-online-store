import React, { useEffect, useContext } from 'react';

import ModalInput from "../modal-input/modal-input.component";

import { MenuContext } from "../../providers/menu/menu.provider";

import { correctedPayload, stateUpdate } from '../../reducers/form/form.utils';
import { OrderInitializer } from "../../providers/menu/menu.utils";

import { ModalBody, CustomInput, Form } from 'reactstrap';


const ModalForm = ({ item, mapKey }) => {
  const { menuState, menuDispatch, menuOrder, menuSettings } = useContext(MenuContext);
  const { menu, modal, order } = menuState;

  const { size, addOns, styles } = menuSettings[menuOrder[mapKey]].triggerModal;

  const defaultOrder = OrderInitializer(size, menu[menuOrder.indexOf(addOns)], styles);

  useEffect(() => {
    let [ itemSize ] = Object.keys(modal.size).filter(size => modal.size[size]);

    if (itemSize && order.item) {
      menuDispatch({
        type: "ORDER_SET_ITEM_PRICE",
        payload: parseFloat(itemSize === "small" ? item.small_price : item.large_price)
      })
    }
  }, [modal.size, order.item]);

  useEffect(() => {
    menuDispatch({
      type: "ORDER_SET_ADDONS_PRICE",
      payload: order.addOns.reduce((addOnPrice, addOn) => addOnPrice + 
        parseFloat(menu[menuOrder.indexOf(addOns)][addOn]["small_price"] || 0)
      , 0)
    });
  }, [order.addOns]);

  useEffect(() => {
    const PIZZA_STYLES = {
      cheese: "CZ",
      special: "SP",
      1: "1T",
      2: "2T",
      3: "3T" 
    };

    const pizzaDeterminant = order.addOns.length || 
      Object.keys(modal.style).filter(style => modal.style[style])[0];
      
    const pizzaResult = menu[menuOrder.indexOf("Pizza")].filter(pizza => 
      pizza.pizza_type === item.pizza_type && 
      pizza.pizza_styles === PIZZA_STYLES[pizzaDeterminant])[0];

    menuDispatch({
      type: "ORDER_SET_PIZZA",
      payload: pizzaResult ? {
        ...pizzaResult,
        img_url: item.img_url
      } : order.item
    });
  }, [order.addOns, modal.style]);

  const handleChangeSize = e => menuDispatch({
    type: "UPDATE_ORDER",
    payload: correctedPayload(e.target.name)(stateUpdate(defaultOrder.size, e.target.id, true))
  });

  const handleChangeAddOns = e => {
    const addOnsTarget = e.target.getAttribute("data-addons");
    if (!e.target.checked || order.addOns.length < (addOnsTarget !== "SubsAddition" ? 3 : 4)) {
      menuDispatch({
        type: "UPDATE_ORDER",
        payload: correctedPayload(e.target.name)(stateUpdate(modal.addOns, e.target.id, e.target.checked))
      });

      menuDispatch({
        type: "ORDER_SET_ADDONS",
        payload: {
          modal: addOnsTarget === "Topping" ? stateUpdate(modal.style, "toppings", true) : modal.style,
          checked: e.target.checked,
          addOn: e.target.getAttribute("data-key")
        }
      });
    } else {
      e.preventDefault();
      e.target.checked = false;
      alert("Please only choose 1 to 3 items!");
    }
  };

  const handleChangeStyle = e => menuDispatch({
    type: "PIZZA_SET_STYLE",
    payload: {
      style: stateUpdate(defaultOrder.style, e.target.id, true),
      addOnsDisabled: e.target.id !== "toppings",
      addOns: e.target.id === "toppings" ? modal.addOns : defaultOrder.addOns, 
      order:  e.target.id === "toppings" ? order.addOns : []
    }
  });
    
  return (
    <ModalBody>
      <Form>
        {
          styles && <ModalInput listName="Types" >
            {
              styles.map(attr => (
                <CustomInput 
                  type="radio" 
                  id={attr} 
                  name="style" 
                  key={attr} 
                  label={attr} 
                  onChange={handleChangeStyle} 
                  checked={modal.style[attr]} />                  
              ))
            }
          </ModalInput>
        }{
          size && <ModalInput listName="Size">
            <CustomInput type="radio" selected={modal.size["small"]} name="size" id="small" label="Small" disabled={!item.small_price} onChange={handleChangeSize} />
            <CustomInput type="radio" selected={modal.size["large"]} name="size" id="large" label="Large" onChange={handleChangeSize} />
          </ModalInput>
        }{
          menu[menuOrder.indexOf(addOns)] && <ModalInput listName="Add ons">
            {
              menu[menuOrder.indexOf(addOns)].map(({ id, food_name }) => <CustomInput 
                type="checkbox" 
                id={food_name} 
                key={food_name} 
                label={food_name} 
                name="addOns"
                data-addons={addOns}
                data-key={id-1} // to correspond to addOns array index
                disabled={modal.addOnsDisabled}
                checked={modal.addOns[food_name]}
                onChange={handleChangeAddOns}                 
              />)
            }
          </ModalInput>
        }
      </Form>
    </ModalBody>
  );
};

export default ModalForm;