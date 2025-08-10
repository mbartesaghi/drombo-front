import React from "react";
import { Supply, Transfer } from "../utils/common.types";
import { formatDate, getCompartmentSize, getCompartmentText, getTransferStatusText, getTransferUrgencyText, toUpperCase } from "../utils/helpers";
import { twMerge } from "tailwind-merge";

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

  const getClinicFrom = () => {
    if(transfer.type === "envio") {
      return transfer.clinic?.name
    } else {
      return "Hospital de Tacuarembo"
    }
  }
  
  const getClinicTo = () => {
    if(transfer.type === "envio") {
      return "Hospital de Tacuarembo"
    } else {
      return transfer.clinic?.name
    }
  }

  const getStatusStyle = (state: string | undefined) => {
    switch (state) {
      case "pendiente":
        return "bg-yellow-100 text-yellow-800 ring-yellow-400/30";
      case "planificado":
        return "bg-blue-100 text-blue-800 ring-blue-400/30";
      case "confirmado":
        return "bg-purple-100 text-purple-800 ring-purple-400/30";
      case "entregado":
        return "bg-green-100 text-green-800 ring-green-400/30";
      case "rechazado":
        return "bg-red-100 text-red-800 ring-red-400/30";
      default:
        return "";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 overflow-y-auto max-h-[90vh] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-gray-800">{getClinicFrom()} → {getClinicTo()}</h2>
        <div className="flex gap-4">
          <Field label="" value={getTransferStatusText(transfer.status)} className={`inline-flex items-center gap-2 w-fit rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${getStatusStyle(transfer.status)}`} />
          <label>{transfer.requester} · {formatDate(transfer.request_date)}</label>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 mt-6">
          <Field label="Rango de días" value={`${formatDate(transfer.start_date)} → ${formatDate(transfer.end_date)}`} />
          <Field label="Franja horaria" value={`${transfer.start_time} - ${transfer.end_time}`} />
          <Field label="Urgencia" value={getTransferUrgencyText(transfer.urgency)} />
          <Field label="Compartimiento" value={`${getCompartmentText(transfer.compartment)} (${getCompartmentSize(transfer.compartment)})`} />
          <Field label="Peso Total" value={`${getWeight()}g`} />
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

function Field({ label, value, className }: { label: string; value: string, className?: string }) {
  
  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-500">{label}</span>
      <span className={twMerge("font-medium", className)}>{value}</span>
    </div>
  );
}
