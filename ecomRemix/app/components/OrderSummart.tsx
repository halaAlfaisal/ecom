import React from "react";
import { useCartActions } from "~/contexts/CartActions";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const OrderSummary: React.FC = () => {
  const { getCart } = useCartActions();
  const cartItems = getCart();

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="order-summary mt-10">
      <strong className="font-bold">Order Summary</strong>
      <ul>
        {cartItems.map((item: CartItem) => (
          <li key={item.id}>
            {item.name} - {item.price} KD x {item.quantity} = {item.price * item.quantity} KD
          </li>
        ))}
      </ul>
      <hr className="my-2" />
      <div>
        <strong>Total: {calculateTotal()} KD</strong>
      </div>
    </div>
  );
};

export default OrderSummary;
