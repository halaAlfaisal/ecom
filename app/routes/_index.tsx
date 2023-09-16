import { json, type V2_MetaFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import Items from "~/components/Items";
import { useOptionalUser } from "~/utils";
import { getItems } from "~/models/item.server";

export const meta: V2_MetaFunction = () => [{ title: "StellarStuff" }];

export const loader = async () => {
  const items = await getItems();
  if (!items) {
    return json({ items: [] });
  }
  return json({ items });
};

export default function Index() {
  const user = useOptionalUser();
  const { items } = useLoaderData<typeof loader>();
  return (
    <main className="relative min-h-screen bg-gray-100 sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8 bg-white px-4 sm:px-10">
        <div className="mx-auto mt-8 sm:mt-16 flex items-center border-b-2 pb-4 sm:pb-8 mb-4 sm:mb-8 min-w-800">
          <img
            className="h-24 w-24 object-cover rounded-full"
            src="https://c02.purpledshub.com/uploads/sites/48/2020/08/GettyImages-500184907-0439932.jpg?w=1880&webp=1"
            alt="stellar stars"
          />
          <div>
            <h1 className="ml-4 text-2xl font-bold leading-tight">
              Stellar Stuff
            </h1>
            <p className="ml-4">Your portal to premium stars and star dust</p>
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
          {user && (
            <div>
              <Link
                to="/admin/orders"
                className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium text-lime-700 shadow-sm hover:bg-lime-50 sm:px-8"
              >
                View orders for {user.email}
              </Link>
              <Form action="/logout" method="post">
                <button
                  type="submit"
                  className="flex items-center justify-center rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-lime-500 active:bg-lime-600 w-full mt-2 text-white"
                >
                  Logout
                </button>
              </Form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
