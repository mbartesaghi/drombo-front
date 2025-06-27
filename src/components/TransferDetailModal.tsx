import React from "react";
import { Supply, Transfer } from "../utils/common.types";
import { formatDate, getCompartmentSize, getCompartmentText, getTransferStatusText, getTransferUrgencyText, toUpperCase } from "../utils/helpers";

interface TransferDetailsModalProps {
  transfer: Transfer | null;
  onClose: () => void;
}

export default function TransferDetailsModal({ transfer, onClose }: TransferDetailsModalProps) {
  if (!transfer) return null;

  const getWeight = () => {
    return transfer.supplies?.reduce((acc: number, supply: Supply) => {
        return acc + supply.weight;
    }, 0).toString() ?? "0";
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 overflow-y-auto max-h-[90vh] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Detalles del traslado</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <Field label="Tipo" value={toUpperCase(transfer.type)} />
          <Field label="Clínica" value={transfer.clinic?.name ?? "N/A"} />
          <Field label="Estado" value={getTransferStatusText(transfer.status)} />
          <Field label="Solicitado por" value={transfer.requester} />
          <Field label="Fecha de solicitud" value={formatDate(transfer.request_date)} />
          <Field label="Rango de días" value={`${formatDate(transfer.start_date)} → ${formatDate(transfer.end_date)}`} />
          <Field label="Franja horaria" value={`${transfer.start_time} - ${transfer.end_time}`} />
          <Field label="Urgencia" value={getTransferUrgencyText(transfer.urgency)} />
          <Field label="Compartimiento" value={`${getCompartmentText(transfer.compartment)} (${getCompartmentSize(transfer.compartment)})`} />
          <Field label="Peso Total" value={`${getWeight()} Kg`} />
          <Field label="Fecha estimada de llegada" value={`${transfer.estimated_arrival_date ? formatDate(transfer.estimated_arrival_date) : ""} ${transfer.estimated_arrival_time ?? "N/A"}`} />
        </div>

        {transfer.supplies && transfer.supplies.length > 0 && (
          <>
            <h3 className="mt-8 mb-3 text-lg font-semibold text-gray-800 border-b pb-1">Suministros</h3>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-2">Nombre</th>
                    <th className="px-4 py-2">Cantidad</th>
                    <th className="px-4 py-2">Peso (g)</th>
                    <th className="px-4 py-2">Notas</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {transfer.supplies.map((supply: Supply) => (
                    <tr key={supply.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{supply.name}</td>
                      <td className="px-4 py-2">{supply.quantity}</td>
                      <td className="px-4 py-2">{supply.weight}</td>
                      <td className="px-4 py-2">{supply.notes || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
