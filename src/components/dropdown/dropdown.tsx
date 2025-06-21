import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface DropdownProps {
  labelText: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  value?: string;
  placeholder?: string;
  width?: string;
}


const Dropdown: React.FC<DropdownProps> = ({ labelText, options, onChange, value, placeholder, width = "100%" }) => {
  return (
    <div className="flex flex-col gap-1 relative" style={{ width }}>
      <label className="text-sm text-gray-600 font-medium">{labelText}</label>
      <div className="relative">
        <select
          className="appearance-none w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={(e) => onChange(e.target.value)}
          value={value}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ExpandMoreIcon className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
};

export default Dropdown;
