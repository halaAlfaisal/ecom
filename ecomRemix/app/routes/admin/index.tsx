import { redirect, LoaderArgs } from "@remix-run/node";
import { Outlet, Form } from "@remix-run/react";
import { Link } from "react-router-dom";
import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      role: true,
    },
  });

  if (user?.role !== "admin") {
    return redirect("/");
  }

  return {};
};
export default function Admin() {
  const user = useUser();
  return (
    <main className="bg-white flex flex-col items-center justify-center min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center my-8">
          <p>Logged in as: {user.email}</p>
          <div className="flex items-center">
            <Link to="/admin/orders" className="mr-8">
              View Orders
            </Link>
            <Form action="/logout" method="post">
              <button
                type="submit"
                className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
              >
                Logout
              </button>
            </Form>
          </div>
        </div>

        <div className="relative pb-16 pt-8">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
