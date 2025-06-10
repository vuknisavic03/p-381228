
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
      "inline-flex bg-gray-50 rounded-lg p-0.5 border border-gray-200",
      className
    )}>
      <button
        type="button"
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-150 flex items-center gap-2.5 min-w-[100px] justify-center
          ${value === "revenue"
            ? "bg-white text-gray-900 shadow-sm border border-gray-200/50"
            : "bg-transparent text-gray-500 hover:text-gray-700"
          }`}
        onClick={() => onChange("revenue")}
      >
        <TrendingUp className="h-4 w-4" />
        Revenue
      </button>
      <button
        type="button"
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-150 flex items-center gap-2.5 min-w-[100px] justify-center
          ${value === "expense"
            ? "bg-white text-gray-900 shadow-sm border border-gray-200/50"
            : "bg-transparent text-gray-500 hover:text-gray-700"
          }`}
        onClick={() => onChange("expense")}
      >
        <TrendingDown className="h-4 w-4" />
        Expense
      </button>
    </div>
  );
};
