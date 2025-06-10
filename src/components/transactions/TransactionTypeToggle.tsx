
import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TransactionTypeToggleProps {
  value: "revenue" | "expense";
  onChange: (value: "revenue" | "expense") => void;
  className?: string;
  size?: "default" | "small";
}

export const TransactionTypeToggle: React.FC<TransactionTypeToggleProps> = ({
  value,
  onChange,
  className,
  size = "default",
}) => {
  const isSmall = size === "small";
  
  return (
    <div className={cn(
      "flex rounded-lg border border-gray-300 bg-gray-100 p-0.5",
      className
    )}>
      <button
        type="button"
        className={`${isSmall ? 'px-2 py-1' : 'px-3 py-2'} text-xs font-medium rounded-md transition-all duration-200 flex items-center gap-2
          ${value === "revenue"
            ? "bg-white text-gray-900 border border-gray-200"
            : "bg-transparent text-gray-500 hover:text-gray-700 hover:bg-white/70"
          }`}
        style={{
          minWidth: isSmall ? 70 : 85,
        }}
        aria-pressed={value === "revenue"}
        onClick={() => onChange("revenue")}
      >
        <TrendingUp className={`${isSmall ? 'h-3 w-3' : 'h-3.5 w-3.5'}`} />
        Revenue
      </button>
      <button
        type="button"
        className={`ml-0.5 ${isSmall ? 'px-2 py-1' : 'px-3 py-2'} text-xs font-medium rounded-md transition-all duration-200 flex items-center gap-2
          ${value === "expense"
            ? "bg-white text-gray-900 border border-gray-200"
            : "bg-transparent text-gray-500 hover:text-gray-700 hover:bg-white/70"
          }`}
        style={{
          minWidth: isSmall ? 70 : 85,
        }}
        aria-pressed={value === "expense"}
        onClick={() => onChange("expense")}
      >
        <TrendingDown className={`${isSmall ? 'h-3 w-3' : 'h-3.5 w-3.5'}`} />
        Expense
      </button>
    </div>
  );
};
