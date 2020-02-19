import React, { useContext } from 'react';

import { CartContext } from '../../providers/cart/cart.provider';


const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity, size } = cartItem;
  const { addItem, removeItem, clearItemFromCart } = useContext(CartContext);

  return (
    <tr>
      <td>
        <img src={imageUrl} alt='item' />
      </td>
      <td>{name}</td>
      <td>{size}</td>
      <td>
        <span className='quantity'>
          <div className='arrow' onClick={() => removeItem(cartItem)}>
            &#10094;
          </div>
          <span className='value'>{quantity}</span>
          <div className='arrow' onClick={() => addItem(cartItem)}>
            &#10095;
          </div>
        </span>
      </td>
      <td className='price'>{price}</td>
      <td>
        <div
          className='remove-button'
          onClick={() => clearItemFromCart(cartItem)}
        >
          &#10005;
        </div>
      </td>
    </tr>
  );
};

export default CheckoutItem;