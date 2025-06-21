import React from "react";
import { Transfer } from "../../utils/common.types";
import moment from "moment";

interface FlightInfo {
  date: string;
  origin: string;
  destination: string;
  supplyType: string;
  quantity: string;
  state: "Pendiente" | "Completado" | "Cancelado";
}

const flightsInfo: FlightInfo[] = Array.from({ length: 30 }, (_, i) => ({
  date: `11/07/2024`,
  origin: "Curtinas",
  destination: "H. Tacuarembó",
  supplyType: "Sangre",
  quantity: `${i + 1}`,
  state: i % 3 === 0 ? "Completado" : i % 2 === 0 ? "Pendiente" : "Cancelado",
}));

const getStatusStyle = (state: FlightInfo["state"]) => {
  switch (state) {
    case "Pendiente":
      return "bg-yellow-100 text-yellow-800 ring-yellow-400/30";
    case "Completado":
      return "bg-green-100 text-green-800 ring-green-400/30";
    case "Cancelado":
      return "bg-red-100 text-red-800 ring-red-400/30";
    default:
      return "";
  }
};

const CustomTable: React.FC<{ transfers: Transfer[] }> = ({ transfers }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Próximos vuelos</h2>
      <div className="overflow-x-auto max-h-[50vh] overflow-y-auto rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="sticky top-0 z-10 bg-white shadow-sm">
            <tr>
              {["Fecha", "Origen", "Destino", "Tipo", "Cantidad", "Estado"].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {transfers.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{moment(row.start_date).format("DD/MM/yyyy")} - {moment(row.end_date).format("DD/MM/yyyy")}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.clinic_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Hospital Central</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">1</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${getStatusStyle(
                      'Pendiente'
                    )}`}
                  >
                    Pendiente
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomTable;
