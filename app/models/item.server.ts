import { prisma } from "~/db.server";

export async function getItems() {
  try {
    return await prisma.item.findMany();
  } catch (error) {
    console.error("Error in getItems:", error);
    return [];
  }
}

export async function createOrder(cartItems: CartItem[]) {
  try {
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

  } catch (error) {
    console.error("Error in createOrder:", error);
    return null;
  }
}

export async function getOrders() {
  try {
    return await prisma.order.findMany({
      include: {
        items: true,
      },
    });
  } catch (error) {
    console.error("Error in getOrders:", error);
    return null;
  }
}

export async function getOrderById(id: string) {
  try {
    return await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        items: true,
      },
    });
  } catch (error) {
    console.error("Error in getOrderById:", error);
    return null;
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    return await prisma.order.update({
      where: {
        id: orderId,
      },
      data: { status },
    });
  } catch (error) {
    console.error("Error in updateOrderStatus:", error);
    return null;
  }
}
