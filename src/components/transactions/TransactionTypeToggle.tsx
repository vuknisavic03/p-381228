
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
      "flex rounded-lg border border-gray-200 bg-gray-50 p-1",
      className
    )}>
      <button
        type="button"
        className={`px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 flex items-center gap-2
          ${value === "revenue"
            ? "bg-white text-gray-800"
            : "bg-transparent text-gray-600 hover:text-gray-800 hover:bg-white/70"
          }`}
        style={{
          minWidth: 85,
        }}
        aria-pressed={value === "revenue"}
        onClick={() => onChange("revenue")}
      >
        <TrendingUp className="h-3.5 w-3.5" />
        Revenue
      </button>
      <button
        type="button"
        className={`ml-1 px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 flex items-center gap-2
          ${value === "expense"
            ? "bg-white text-gray-800"
            : "bg-transparent text-gray-600 hover:text-gray-800 hover:bg-white/70"
          }`}
        style={{
          minWidth: 85,
        }}
        aria-pressed={value === "expense"}
        onClick={() => onChange("expense")}
      >
        <TrendingDown className="h-3.5 w-3.5" />
        Expense
      </button>
    </div>
  );
};
