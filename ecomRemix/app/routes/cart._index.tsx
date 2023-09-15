import { Link } from "@remix-run/react";
import Items from "~/components/Items";
import OrderSummary from "~/components/OrderSummart";
import { useCartActions } from "~/contexts/CartActions";

export const loader = async () => {
  return {};
};

export default function Cart() {
  const { getCart } = useCartActions();
  const cartItems = getCart();
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        {cartItems.length > 0 && (
          <h1 className="ml-4 text-2xl font-bold leading-tight">
            Your Galactic Cart
          </h1>
        )}
        <div className="mx-auto mt-16 flex items-center pb-8 mb-8 min-w-800">
          {cartItems.length > 0 ? (
            <div>
              <Items items={cartItems} />
              <OrderSummary />
              <div className="mx-auto mt-10 sm:justify-center">
                <Link
                  to="/checkout"
                  className="flex items-center justify-center rounded-md bg-lime-500 px-4 py-2 font-medium text-white hover:bg-lime-600"
                >
                  Checkout
                </Link>
              </div>
            </div>
          ) : (
            <div className="border-b-2 text-center">
              <p>Your galaxy is empty.</p>
              <div className="mx-auto mt-10 sm:justify-center">
              <Link
                to="/"
                className="flex items-center justify-center rounded-md bg-lime-500 px-4 py-2 font-medium text-white hover:bg-lime-600"
              >
                Back to stellar page
              </Link>
            </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
