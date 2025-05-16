
import React from "react";
import { cn } from "@/lib/utils";

interface TransactionTypeToggleProps {
  value: "revenue" | "expense";
  onChange: (value: "revenue" | "expense") => void;
  className?: string; // Added optional className prop
}

export const TransactionTypeToggle: React.FC<TransactionTypeToggleProps> = ({
  value,
  onChange,
  className,
}) => {
  return (
    <div className={cn(
      "flex rounded-full border border-gray-200 bg-white p-0.5 shadow-xs w-fit",
      className
    )}>
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
