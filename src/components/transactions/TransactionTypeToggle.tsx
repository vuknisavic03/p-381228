
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
      "inline-flex items-center bg-slate-100 rounded-full p-1",
      className
    )}>
      <button
        type="button"
        className={cn(
          "relative flex items-center gap-2 font-medium transition-all duration-300 rounded-full",
          isSmall ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm",
          value === "revenue"
            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
            : "text-slate-600 hover:text-slate-800 hover:bg-white/60"
        )}
        onClick={() => onChange("revenue")}
        aria-pressed={value === "revenue"}
      >
        <TrendingUp className={cn(
          "transition-transform duration-300",
          isSmall ? "h-3.5 w-3.5" : "h-4 w-4",
          value === "revenue" && "scale-110"
        )} />
        Revenue
      </button>
      
      <button
        type="button"
        className={cn(
          "relative flex items-center gap-2 font-medium transition-all duration-300 rounded-full",
          isSmall ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm",
          value === "expense"
            ? "bg-rose-500 text-white shadow-lg shadow-rose-500/25"
            : "text-slate-600 hover:text-slate-800 hover:bg-white/60"
        )}
        onClick={() => onChange("expense")}
        aria-pressed={value === "expense"}
      >
        <TrendingDown className={cn(
          "transition-transform duration-300",
          isSmall ? "h-3.5 w-3.5" : "h-4 w-4",
          value === "expense" && "scale-110"
        )} />
        Expense
      </button>
    </div>
  );
};
