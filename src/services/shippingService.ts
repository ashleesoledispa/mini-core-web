import { getShippingData } from "../models/shippingModel";

export async function calculateReport(
  startDate: string,
  endDate: string
) {
  const envios: any[] = await getShippingData(
    startDate,
    endDate
  );

  const report: any = {};

  envios.forEach((envio) => {
    const id = envio.id_repartidor;

    if (!report[id]) {
      report[id] = {
        repartidor: envio.repartidor.nombre,
        envios: 0,
        totalKg: 0,
        costoTotal: 0,
        zonas: new Set<string>(),
        tarifas: new Set<number>(),
      };
    }

    report[id].envios += 1;

    report[id].totalKg += envio.peso_kg;

    report[id].costoTotal +=
      envio.peso_kg *
      envio.zona.tarifa_por_kg;

    report[id].zonas.add(
      envio.zona.nombre_zona
    );

    report[id].tarifas.add(
      envio.zona.tarifa_por_kg
    );
  });

  return Object.values(report).map(
    (item: any) => ({
      ...item,
      zonas: [...item.zonas].join(", "),
      tarifas: [...item.tarifas]
        .map((t) => `$${t.toFixed(2)}`)
        .join(", "),
    })
  );
}