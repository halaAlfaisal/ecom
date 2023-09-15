import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { useEffect } from "react";
import Items from "~/components/Items";
import OrderSummary from "~/components/OrderSummart";
import { useCartActions } from "~/contexts/CartActions";
import { createOrder } from "~/models/item.server";
import invariant from "tiny-invariant";

export const loader = async () => {
  return {};
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const cart = formData.get('cart');
  console.log(cart, "CART");
  invariant(typeof cart === "string", "cart must be a string");
  try {
    await createOrder(JSON.parse(cart));
    redirect(`/checkout`);
    return json({ success: true });
  } catch (error) {
    console.error("Error during checkout:", error);
    return json({ success: false });
  }
}

export default function Cart() {
  const { getCart, clearCart } = useCartActions();
  const cartItems = getCart();
  const actionData = useActionData();
  
  useEffect(() => {
    if (actionData?.success) {
      clearCart();
    }
  }, [actionData?.success]);
  

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
              <Form className="mx-auto mt-10 sm:justify-center" method="post">
                <input
                  type="hidden"
                  name="cart"
                  value={JSON.stringify(cartItems)}
                />
                <button
                  type="submit"
                  className="flex items-center justify-center rounded-md bg-lime-500 px-4 py-2 font-medium text-white hover:bg-lime-600"
                >
                  Checkout
                </button>
              </Form>
            </div>
          ) : (
            <div className="text-center">
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
