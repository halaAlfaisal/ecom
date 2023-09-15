import { json, type V2_MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Items from "~/components/Items";
import { useOptionalUser } from "~/utils";
import { getItems } from "~/models/item.server";
import { CartProvider } from "~/contexts/CartContext";

export const meta: V2_MetaFunction = () => [{ title: "StellarStuff" }];

export const loader = async () => {
  return json({ items: await getItems() });
};

export default function Index() {
  const user = useOptionalUser();
  const { items } = useLoaderData<typeof loader>();
  return (
    <CartProvider>
      <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
        <div className="relative sm:pb-16 sm:pt-8">
          <div className="mx-auto mt-16 flex items-center border-b-2 pb-8 mb-8 min-w-800">
            <img
              className="h-24 w-24 object-cover rounded-full"
              src="https://c02.purpledshub.com/uploads/sites/48/2020/08/GettyImages-500184907-0439932.jpg?w=1880&webp=1"
              alt="stellar stars"
            />
            <div>
              <h1 className="ml-4 text-2xl font-bold leading-tight">
                Stellar Stuff
              </h1>
              <p className="ml-4">
                Your portal to buying premium stars and star dust
              </p>
            </div>
          </div>
          <Items items={items} />
          <div className="mx-auto mt-10 sm:justify-center">
            <Link
              to="/cart"
              className="flex items-center justify-center rounded-md bg-lime-500 px-4 py-2 font-medium text-white hover:bg-lime-600"
            >
              Go to Cart
            </Link>
          </div>
          <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
            {user ? (
              <Link
                to="/notes"
                className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
              >
                View Notes for {user.email}
              </Link>
            ) : (
              <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                <Link
                  to="/join"
                  className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium text-lime-700 shadow-sm hover:bg-lime-50 sm:px-8"
                >
                  Sign up
                </Link>
                <Link
                  to="/login"
                  className="flex items-center justify-center rounded-md bg-lime-500 px-4 py-2 font-medium text-white hover:bg-lime-600"
                >
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </CartProvider>
  );
}
