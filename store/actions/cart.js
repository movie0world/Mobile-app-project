export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const REMOVE_FULL_ITEM = "REMOVE_FULL_ITEM";

export const addToCart = (product) => {
  return { type: ADD_TO_CART, product: product };
};

export const removeFromCart = (productId) => {
  return { type: REMOVE_FROM_CART, pid: productId };
};
export const removefullitem = (productId) => {
  return { type: REMOVE_FULL_ITEM, pid: productId };
};
