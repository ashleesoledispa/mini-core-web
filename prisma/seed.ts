import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const norte = await prisma.zona.create({
    data: {
      nombre_zona: "Norte",
      tarifa_por_kg: 1.5
    }
  });

  const sur = await prisma.zona.create({
    data: {
      nombre_zona: "Sur",
      tarifa_por_kg: 2
    }
  });

  const centro = await prisma.zona.create({
    data: {
      nombre_zona: "Centro",
      tarifa_por_kg: 1.8
    }
  });

  const andres = await prisma.repartidor.create({
    data: {
      nombre: "Andrés Pérez",
      email: "andres@test.com"
    }
  });

  const camila = await prisma.repartidor.create({
    data: {
      nombre: "Camila Torres",
      email: "camila@test.com"
    }
  });

  const luis = await prisma.repartidor.create({
    data: {
      nombre: "Luis Mendoza",
      email: "luis@test.com"
    }
  });

  await prisma.envio.createMany({
    data: [
      {
        id_repartidor: andres.id_repartidor,
        id_zona: norte.id_zona,
        peso_kg: 10,
        fecha_envio: new Date("2025-05-10")
      },
      {
        id_repartidor: andres.id_repartidor,
        id_zona: centro.id_zona,
        peso_kg: 22,
        fecha_envio: new Date("2025-05-15")
      },
      {
        id_repartidor: camila.id_repartidor,
        id_zona: sur.id_zona,
        peso_kg: 18,
        fecha_envio: new Date("2025-05-20")
      }
    ]
  });

  console.log("Seed ejecutado correctamente");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });