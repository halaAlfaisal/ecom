import React, { createContext, useContext, useReducer, ReactNode } from "react";

type CartState = CartItem[];

type Action =
  | { type: "ADD_QUANTITY"; id: string; item?: CartItem }
  | { type: "SUBTRACT_QUANTITY"; id: string };

const CartStateContext = createContext<CartState | undefined>(undefined);
const CartDispatchContext = createContext<React.Dispatch<Action> | undefined>(
  undefined,
);

const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case "ADD_QUANTITY":
      const existingItemIndex = state.findIndex(
        (item) => item.id === action.id,
      );
      if (existingItemIndex !== -1) {
        return state.map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...state, { ...action.item, quantity: 1 }];
      }
    case "SUBTRACT_QUANTITY":
      return state.map((item) =>
        item.id === action.id
          ? { ...item, quantity: Math.abs(item.quantity - 1) }
          : item,
      );
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

type CartProviderProps = { children: ReactNode };

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartStateContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const useDispatchCart = () => {
  const context = useContext(CartDispatchContext);
  if (!context) {
    throw new Error("useDispatchCart must be used within a CartProvider");
  }
  return context;
};
