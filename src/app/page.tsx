"use client";

import { useState } from "react";

interface ReportItem {
  repartidor: string;
  envios: number;
  totalKg: number;
  zonas: string;
  tarifas: string;
  costoTotal: number;
}

export default function Home() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    if (!startDate || !endDate) {
      alert("Seleccione ambas fechas");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate,
          endDate,
        }),
      });

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
      alert("Error al generar reporte");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800">
              Reporte de Costos de Envíos
            </h1>

            <p className="text-slate-500 mt-2">
              Consulta los costos generados por repartidor
              dentro de un rango de fechas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Fecha Inicio
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Fecha Fin
              </label>

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-3"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={generateReport}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
              >
                {loading
                  ? "Generando..."
                  : "Generar Reporte"}
              </button>
            </div>

          </div>

          {data.length > 0 ? (

            <div className="overflow-x-auto">

              <table className="w-full border-collapse">

                <thead>

                  <tr className="bg-slate-800 text-white">

                    <th className="p-4 text-left">
                      Repartidor
                    </th>

                    <th className="p-4">
                      Envíos
                    </th>

                    <th className="p-4">
                      Total Kg
                    </th>

                    <th className="p-4">
                      Zonas
                    </th>

                    <th className="p-4">
                      Tarifas Aplicadas
                    </th>

                    <th className="p-4">
                      Costo Total
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {data.map((item, index) => (

                    <tr
                      key={index}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="p-4 font-medium">
                        {item.repartidor}
                      </td>

                      <td className="p-4 text-center">
                        {item.envios}
                      </td>

                      <td className="p-4 text-center">
                        {item.totalKg}
                      </td>

                      <td className="p-4 text-center">
                        {item.zonas}
                      </td>

                      <td className="p-4 text-center">
                        {item.tarifas}
                      </td>

                      <td className="p-4 text-center font-bold text-green-600">
                        $
                        {item.costoTotal.toFixed(2)}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          ) : (

            <div className="text-center py-12 text-slate-500">
              No existen resultados para mostrar.
            </div>

          )}

        </div>
      </div>
    </main>
  );
}