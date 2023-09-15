import { prisma } from "~/db.server";

export async function getItems() {
  return prisma.item.findMany();
}
