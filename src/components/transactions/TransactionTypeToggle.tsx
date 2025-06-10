
import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

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
      "flex rounded-lg border border-gray-200 bg-white p-0.5 shadow-sm",
      className
    )}>
      <button
        type="button"
        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 flex items-center gap-1.5
          ${value === "revenue"
            ? "bg-gray-100 text-gray-800 shadow-sm border border-gray-300"
            : "bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        style={{
          minWidth: 80,
        }}
        aria-pressed={value === "revenue"}
        onClick={() => onChange("revenue")}
      >
        <TrendingUp className="h-3 w-3" />
        Revenue
      </button>
      <button
        type="button"
        className={`ml-0.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 flex items-center gap-1.5
          ${value === "expense"
            ? "bg-gray-100 text-gray-800 shadow-sm border border-gray-300"
            : "bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        style={{
          minWidth: 80,
        }}
        aria-pressed={value === "expense"}
        onClick={() => onChange("expense")}
      >
        <TrendingDown className="h-3 w-3" />
        Expense
      </button>
    </div>
  );
};
