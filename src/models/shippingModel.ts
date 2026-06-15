import { prisma } from "../lib/prisma";

export async function getShippingData(
  startDate: string,
  endDate: string
) {
  return prisma.envio.findMany({
    where: {
      fecha_envio: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    },
    include: {
      repartidor: true,
      zona: true,
    },
  });
}