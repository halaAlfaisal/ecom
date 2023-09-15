import React from "react";
import { useCartActions } from "~/contexts/CartActions";

interface AddToCartProps {
  item: CartItem;
}

export const AddToCart: React.FC<AddToCartProps> = ({ item }) => {
  const { addToCart, subtractFromCart, getCart } = useCartActions();
  const cartItems = getCart();

  const cartItem = cartItems.length > 0 ? cartItems.find((cartItem) => cartItem?.id === item.id) : undefined;
  const isInCart = Boolean(cartItem) && !!cartItem?.quantity;
  const quantity = cartItem ? cartItem.quantity : 0;

  const increment = () => {
    addToCart(item)
};

  const decrement = () => {
    subtractFromCart(item.id);
  };

  return (
    <div className="flex-1 text-right px-4 py-6">
      {isInCart ? (
        <div className="items-center">
          <button
            onClick={decrement}
            className="bg-lime-500 text-white px-4 py-2 rounded md:w-auto"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            readOnly
            className="mx-2 text-center w-[30px] inline-block"
          />
          <button
            onClick={increment}
            className="bg-lime-500 text-white px-4 py-2 rounded md:w-auto"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() => addToCart(item)}
          className="bg-lime-500 text-white px-4 py-2 rounded md:w-auto"
        >
          Add to cart
        </button>
      )}
    </div>
  );
};
