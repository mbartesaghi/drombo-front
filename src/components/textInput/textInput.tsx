import React from 'react';
import TextInputProps from './textInput.types';
import { twMerge } from 'tailwind-merge';

const TextInput: React.FC<TextInputProps> = ({ labelText, width = "100%", value, onChange, type = "text", error = false, className }) => {
  return (
    <div className={twMerge("flex flex-col gap-1", className)} style={{ width }}>
      <label className="text-sm text-gray-600 font-medium">{labelText}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`border rounded-md px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 focus:ring-indigo-400"
        }`}      />
    </div>
  );
};

export default TextInput;
