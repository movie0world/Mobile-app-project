import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  REMOVE_FULL_ITEM,
} from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import CartItem from "../../models/cart-item";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;

      addedProduct.fromcart && console.log("from store data", action);
      const prodPrice = addedProduct.price;
      const prodimage = addedProduct.imageUrl;
      const prodTitle = addedProduct.title;
      let testdata;
      if (addedProduct.fromcart) {
        testdata = state.items[addedProduct.id];
        // console.log(prodimage);
        // console.log("when not form home", testdata);
      } else {
        testdata = state.items[addedProduct.id];
        // console.log("when not home", testdata);
      }

      let updatedOrNewCartItem;

      if (testdata) {
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          testdata.quantity + 1,
          prodPrice,
          prodTitle,
          testdata.sum + prodPrice,
          prodimage
        );
      } else {
        updatedOrNewCartItem = new CartItem(
          1,
          prodPrice,
          prodTitle,
          prodPrice,
          prodimage
        );
      }
      return {
        ...state,
        items: {
          ...state.items,
          [addedProduct.id]: updatedOrNewCartItem,
        },
        totalAmount: state.totalAmount + prodPrice,
      };

    case REMOVE_FULL_ITEM:
      console.log("called");
      updatedCartItems = { ...state.items };
      const sum = updatedCartItems[action.pid].sum;
      delete updatedCartItems[action.pid];
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - sum,
      };

    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      const currentQty = selectedCartItem.quantity;
      console.log("remove", selectedCartItem);
      let updatedCartItems;
      if (currentQty == 1) {
        return { ...state };
      }
      if (currentQty > 1) {
        // need to reduce it, not erase it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice,
          selectedCartItem.productImage
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.pid].sum;
      delete updatedItems[action.pid];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
  }

  return state;
};
