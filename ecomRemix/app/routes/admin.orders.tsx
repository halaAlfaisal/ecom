import { DataGrid } from '@mui/x-data-grid';
import { ActionArgs, json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from 'tiny-invariant';
import { getOrders, updateOrderStatus } from "~/models/item.server";

export const loader = async () => {
  return json({ orders: await getOrders() });
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const {action, orderId} = Object.fromEntries(formData);

  invariant(typeof action === "string", "action must be a string");
  invariant(typeof orderId === "string", "action must be a string");

  try {
    if (action === "accept") {
      await updateOrderStatus(orderId, "accepted");
    }
    if (action === "decline") {
      await updateOrderStatus(orderId, "declined");
    }

    return json({ success: true });
  } catch (error) {
    console.error("Error updating status", error);
    return json({ success: false });
  }
}


export default function Orders() {
  const { orders } = useLoaderData<typeof loader>();

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'total', headerName: 'Total', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'createdAt', headerName: 'Created At', flex: 1 },
    { field: 'updatedAt', headerName: 'Updated At', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => {
        const order = orders.find((order) => order.id === params.id);
        return (
          <div>
            {order?.status === 'new' && (
              <Form method="post">
                <input type="hidden" name="orderId" value={order.id} />
                <button className="text-green-600 hover:text-green-800 mr-4" type="submit" value="accept" name="action">
                  Accept
                </button>
                <button className="text-red-600 hover:text-red-800" type="submit" value="decline" name="action">
                  Decline
                </button>
                </Form>
            )}
          </div>
        );
      }
    }
  ];

  return (
    <main>
      <p className="mb-8">Orders</p>
      <DataGrid 
        rows={orders} 
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </main>
  );
}
