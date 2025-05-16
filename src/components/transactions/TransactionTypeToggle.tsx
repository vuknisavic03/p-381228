
import React from "react";
import { cn } from "@/lib/utils";

interface TransactionTypeToggleProps {
  value: "revenue" | "expense";
  onChange: (value: "revenue" | "expense") => void;
  className?: string;
}

export const TransactionTypeToggle: React.FC<TransactionTypeToggleProps> = ({
  value,
  onChange,
  className,
}) => {
  return (
    <div className={cn(
      "flex rounded-full border border-gray-100 bg-[#F6F6F7] p-0.5 shadow-xs w-fit",
      className
    )}>
      <button
        type="button"
        className={`px-2.5 py-0.5 text-xs font-medium rounded-full transition-all duration-200
          ${value === "revenue"
            ? "bg-white text-gray-800 shadow-sm"
            : "bg-transparent text-gray-500 hover:text-gray-700"
          }`}
        style={{
          minWidth: 52,
        }}
        aria-pressed={value === "revenue"}
        onClick={() => onChange("revenue")}
      >
        Revenue
      </button>
      <button
        type="button"
        className={`ml-1 px-2.5 py-0.5 text-xs font-medium rounded-full transition-all duration-200
          ${value === "expense"
            ? "bg-white text-gray-800 shadow-sm"
            : "bg-transparent text-gray-500 hover:text-gray-700"
          }`}
        style={{
          minWidth: 52,
        }}
        aria-pressed={value === "expense"}
        onClick={() => onChange("expense")}
      >
        Expense
      </button>
    </div>
  );
};
