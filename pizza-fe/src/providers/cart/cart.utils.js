export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id && 
                cartItem.groupId === cartItemToAdd.groupId && 
                cartItem.size === cartItemToAdd.size
  );

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id && 
      cartItem.groupId === cartItemToAdd.groupId &&
      cartItem.size === cartItemToAdd.size
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToRemove.id && 
                cartItem.groupId === cartItemToRemove.groupId &&
                cartItem.size === cartItemToRemove.size
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id ||
      cartItem.groupId !== cartItemToRemove.groupId ||
      cartItem.size !== cartItemToRemove.size);
  }

  return cartItems.map(cartItem =>
    cartItem.id === cartItemToRemove.id && 
    cartItem.groupId === cartItemToRemove.groupId &&
    cartItem.size === cartItemToRemove.size
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const filterItemFromCart = (cartItems, item) =>
  cartItems.filter(cartItem => cartItem.id !== item.id || 
                    cartItem.groupId !== item.groupId ||
                    cartItem.size !== item.size);

export const getCartItemsCount = cartItems =>
  cartItems.reduce(
    (accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity,
    0
  );

export const getCartTotal = cartItems =>
  cartItems.reduce(
    (accumalatedQuantity, cartItem) =>
      accumalatedQuantity + cartItem.quantity * cartItem.price,
    0
  );