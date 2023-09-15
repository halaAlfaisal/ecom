import { prisma } from "~/db.server";

export async function getItems() {
  return prisma.item.findMany();
}

export async function createOrder(cartItems: CartItem[]) {
  let total = cartItems
    .reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0)
    .toFixed(3);

  const createdOrder = await prisma.order.create({
    data: {
      total,
    },
  });

  for (const item of cartItems) {
    await prisma.orderItem.create({
      data: {
        itemId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        description: item.description,
        imgSrc: item.imgSrc,
        orderId: createdOrder.id,
      },
    });
  }

  return createdOrder;
}

export async function getOrders() {
  return prisma.order.findMany({
    include: {
      items: true,
    },
  });
}

export async function getOrderById(id: string) {
  return prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      items: true,
    },
  });
}

export async function updateOrderStatus(orderId: string, status: string) {
  return prisma.order.update({
    where: {
      id: orderId,
    },
    data: { status },
  });
}
