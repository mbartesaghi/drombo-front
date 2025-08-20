import React from "react";
import { Transfer } from "../../utils/common.types";
import { formatDate, getTransferStatusText, getStatusTagStyle } from "../../utils/helpers";

interface CustomTableProps {
  transfers: Transfer[];
}

function formatTime(time: string | undefined) {
  return time && time.length >= 8 ? 
    time.slice(0, 5) : '';
}

const CustomTable: React.FC<CustomTableProps> = ({ transfers }) => {
  console.log(transfers)
  return (
    <div className="overflow-x-auto h-full overflow-y-auto rounded-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="sticky top-0 z-10 bg-white shadow-sm">
          <tr>
            {["Fecha de Solicitud", "Solicitante", "Rango de días", "Origen", "Destino", "Fecha de Entrega", "Estado",].map((heading) => (
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {formatDate(row.request_date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {row.requester}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {formatDate(row.start_date)} - {formatDate(row.end_date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {row.type === "Pedido" ? "Hospital Central" : row.clinic?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {row.type === "Pedido" ? row.clinic?.name : "Hospital Central"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {formatDate(row.estimated_arrival_date)} - {formatTime(row.estimated_arrival_time)} 
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${getStatusTagStyle(
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
  );
};

export default CustomTable;
