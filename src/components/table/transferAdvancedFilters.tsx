import React from "react";

interface TransferAdvancedFiltersProps {
  status: string;
  onStatusChange: (value: string) => void;
  requestDate: string;
  onRequestDateChange: (value: string) => void;
  rangeStart: string;
  rangeEnd: string;
  onRangeStartChange: (value: string) => void;
  onRangeEndChange: (value: string) => void;
}

const TransferAdvancedFilters: React.FC<TransferAdvancedFiltersProps> = ({
  status,
  onStatusChange,
  requestDate,
  onRequestDateChange,
  rangeStart,
  rangeEnd,
  onRangeStartChange,
  onRangeEndChange
}) => (
  <div className="flex flex-wrap gap-3 items-end">

    <div className="flex flex-col">
      <label className="text-xs text-gray-500 mb-1">Estado</label>
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full md:w-[160px]"
      >
        <option value="">Todos</option>
        <option value="pendiente">Pendiente</option>
        <option value="planificado">Planificado</option>
        <option value="confirmado">Confirmado</option>
        <option value="entregado">Entregado</option>
        <option value="rechazado">Rechazado</option>
      </select>
    </div>

    <div className="flex flex-col">
      <label className="text-xs text-gray-500 mb-1">Fecha de solicitud</label>
      <input
        type="date"
        value={requestDate}
        onChange={(e) => onRequestDateChange(e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full md:w-[160px]"
      />
    </div>

    {/* <div className="flex flex-col">
      <label className="text-xs text-gray-500 mb-1">Rango: Desde</label>
      <input
        type="date"
        value={rangeStart}
        onChange={(e) => onRangeStartChange(e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full md:w-[160px]"
      />
    </div>

    <div className="flex flex-col">
      <label className="text-xs text-gray-500 mb-1">Rango: Hasta</label>
      <input
        type="date"
        value={rangeEnd}
        onChange={(e) => onRangeEndChange(e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full md:w-[160px]"
      />
    </div> */}

  </div>
);

export default TransferAdvancedFilters;
