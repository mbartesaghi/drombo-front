import React from "react";

interface TransferSearchFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const TransferSearchFilter: React.FC<TransferSearchFilterProps> = ({ value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-xs text-gray-500 mb-1">Buscar traslado</label>
    <input
      type="text"
      placeholder="Ej: Curtina, Ansina"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full md:w-[200px]"
    />
  </div>
);

export default TransferSearchFilter;
