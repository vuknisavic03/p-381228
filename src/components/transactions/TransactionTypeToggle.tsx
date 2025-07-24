
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
      "inline-flex items-center rounded-lg bg-muted/50 p-1 border border-border/50",
      className
    )}>
      <button
        type="button"
        className={cn(
          "relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-2",
          "focus:outline-none focus:ring-2 focus:ring-blue-500/20",
          value === "revenue"
            ? "bg-background text-foreground shadow-sm border border-border"
            : "text-muted-foreground hover:text-foreground hover:bg-background/60"
        )}
        style={{ minWidth: 80 }}
        aria-pressed={value === "revenue"}
        onClick={() => onChange("revenue")}
      >
        <TrendingUp className="h-4 w-4" />
        Revenue
      </button>
      
      <button
        type="button"
        className={cn(
          "relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-2",
          "focus:outline-none focus:ring-2 focus:ring-blue-500/20",
          value === "expense"
            ? "bg-background text-foreground shadow-sm border border-border"
            : "text-muted-foreground hover:text-foreground hover:bg-background/60"
        )}
        style={{ minWidth: 80 }}
        aria-pressed={value === "expense"}
        onClick={() => onChange("expense")}
      >
        <TrendingDown className="h-4 w-4" />
        Expense
      </button>
    </div>
  );
};
