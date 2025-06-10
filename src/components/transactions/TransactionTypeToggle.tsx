
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
      "flex bg-gray-100 rounded-md p-1",
      className
    )}>
      <button
        type="button"
        className={`px-3 py-1.5 text-sm font-medium rounded transition-all duration-200 flex items-center gap-2
          ${value === "revenue"
            ? "bg-white text-gray-900 shadow-sm"
            : "bg-transparent text-gray-600 hover:text-gray-900"
          }`}
        onClick={() => onChange("revenue")}
      >
        <TrendingUp className="h-4 w-4" />
        Revenue
      </button>
      <button
        type="button"
        className={`px-3 py-1.5 text-sm font-medium rounded transition-all duration-200 flex items-center gap-2
          ${value === "expense"
            ? "bg-white text-gray-900 shadow-sm"
            : "bg-transparent text-gray-600 hover:text-gray-900"
          }`}
        onClick={() => onChange("expense")}
      >
        <TrendingDown className="h-4 w-4" />
        Expense
      </button>
    </div>
  );
};
