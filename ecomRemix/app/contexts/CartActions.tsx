import { useCart, useDispatchCart } from "./CartContext";

export const useCartActions = () => {
  const dispatch = useDispatchCart();
  const cartItems = useCart();

  const addToCart = (item: CartItem) => {
    dispatch({ type: "ADD_QUANTITY", id: item.id, item });
  };

  const subtractFromCart = (id: string) => {
    dispatch({ type: "SUBTRACT_QUANTITY", id });
  };

  const getCart = () => {
    return cartItems;
  };

  return { addToCart, subtractFromCart, getCart };
};
