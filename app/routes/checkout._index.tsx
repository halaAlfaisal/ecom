import { Link } from "@remix-run/react";
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
          <div>
            <h1 className="ml-4 text-2xl font-bold leading-tight">
              Your order has been captured!
            </h1>
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
    </main>
  );
}
