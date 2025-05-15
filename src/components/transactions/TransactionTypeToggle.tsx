
import React from "react";

interface TransactionTypeToggleProps {
  value: "revenue" | "expense";
  onChange: (value: "revenue" | "expense") => void;
}

export const TransactionTypeToggle: React.FC<TransactionTypeToggleProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="flex rounded-full border border-gray-200 bg-white p-0.5 shadow-xs w-fit">
      <button
        type="button"
        className={`px-3 py-1 text-xs font-medium rounded-full transition
          ${value === "revenue"
            ? "bg-gray-100 text-gray-800"
            : "bg-white text-gray-500 hover:bg-gray-50"
          }`}
        style={{
          minWidth: 68,
        }}
        aria-pressed={value === "revenue"}
        onClick={() => onChange("revenue")}
      >
        Revenue
      </button>
      <button
        type="button"
        className={`ml-1 px-3 py-1 text-xs font-medium rounded-full transition
          ${value === "expense"
            ? "bg-gray-100 text-gray-800"
            : "bg-white text-gray-500 hover:bg-gray-50"
          }`}
        style={{
          minWidth: 68,
        }}
        aria-pressed={value === "expense"}
        onClick={() => onChange("expense")}
      >
        Expense
      </button>
    </div>
  );
};
