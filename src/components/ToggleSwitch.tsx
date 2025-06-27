import { useState } from "react";

interface ToggleSwitchProps {
  optionA: string;
  optionB: string;
  value: string;
  onChange: (value: string) => void;
}

export default function ToggleSwitch({ optionA, optionB, value, onChange }: ToggleSwitchProps) {
  const isA = value === optionA;

  return (
    <div className="inline-flex w-fit border rounded-full p-1 bg-gray-100">
      <button
        onClick={() => onChange(optionA)}
        className={`px-8 py-1 rounded-full transition ${
          isA ? "bg-blue-500 text-white" : "text-gray-700"
        }`}
      >
        {optionA}
      </button>
      <button
        onClick={() => onChange(optionB)}
        className={`px-8 py-1 rounded-full transition ${
          !isA ? "bg-blue-500 text-white" : "text-gray-700"
        }`}
      >
        {optionB}
      </button>
    </div>
  );
}
