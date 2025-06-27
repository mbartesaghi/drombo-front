import React from "react";
import { Transfer } from "../../utils/common.types";
import moment from "moment";
import { formatDate, getTransferStatusText } from "../../utils/helpers";

interface FlightInfo {
  date: string;
  origin: string;
  destination: string;
  supplyType: string;
  quantity: string;
  state: "pendiente" | "completado" | "cancelado";
}

const flightsInfo: FlightInfo[] = Array.from({ length: 30 }, (_, i) => ({
  date: `11/07/2024`,
  origin: "Curtinas",
  destination: "H. Tacuarembó",
  supplyType: "Sangre",
  quantity: `${i + 1}`,
  state: i % 3 === 0 ? "completado" : i % 2 === 0 ? "pendiente" : "cancelado",
}));

const getStatusStyle = (state: string | undefined) => {
  switch (state) {
    case "pendiente":
      return "bg-yellow-100 text-yellow-800 ring-yellow-400/30";
    case "confirmado":
      return "bg-blue-100 text-blue-800 ring-blue-400/30";
    case "entregado":
      return "bg-green-100 text-green-800 ring-green-400/30";
    case "rechazado":
      return "bg-red-100 text-red-800 ring-red-400/30";
    default:
      return "";
  }
};

const CustomTable: React.FC<{ transfers: Transfer[] }> = ({ transfers }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Solicitudes de translados</h2>
      <div className="overflow-x-auto max-h-[50vh] overflow-y-auto rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="sticky top-0 z-10 bg-white shadow-sm">
            <tr>
              {["Fecha de Solicitud", "Rango de dias ", "Origen", "Destino", "Estado"].map((heading) => (
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(row.request_date)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(row.start_date)} - {formatDate(row.end_date)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.type === "pedido" ? 'Hospital Central' : row.clinic?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.type === "pedido" ? row.clinic?.name : 'Hospital Central'} </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${getStatusStyle(
                      row.status
                    )}`}
                  >
                    {row.status && getTransferStatusText(row.status)}
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
