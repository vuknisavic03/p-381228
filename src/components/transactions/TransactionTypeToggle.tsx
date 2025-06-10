
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
      "inline-flex items-center bg-gray-100 rounded-full p-1",
      className
    )}>
      <button
        type="button"
        className={cn(
          "relative flex items-center gap-2 font-medium transition-all duration-200 rounded-full",
          isSmall ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm",
          value === "revenue"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-600 hover:text-gray-800 hover:bg-white/60"
        )}
        onClick={() => onChange("revenue")}
        aria-pressed={value === "revenue"}
      >
        <TrendingUp className={cn(
          "transition-transform duration-200",
          isSmall ? "h-3.5 w-3.5" : "h-4 w-4"
        )} />
        Revenue
      </button>
      
      <button
        type="button"
        className={cn(
          "relative flex items-center gap-2 font-medium transition-all duration-200 rounded-full",
          isSmall ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm",
          value === "expense"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-600 hover:text-gray-800 hover:bg-white/60"
        )}
        onClick={() => onChange("expense")}
        aria-pressed={value === "expense"}
      >
        <TrendingDown className={cn(
          "transition-transform duration-200",
          isSmall ? "h-3.5 w-3.5" : "h-4 w-4"
        )} />
        Expense
      </button>
    </div>
  );
};
