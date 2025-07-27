
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
      "inline-flex items-center rounded-md bg-muted/30 p-0.5 border border-border/40",
      className
    )}>
      <button
        type="button"
        className={cn(
          "px-2.5 py-1.5 text-xs font-medium rounded transition-all duration-200 flex items-center gap-1.5",
          "focus:outline-none focus:ring-1 focus:ring-blue-500/30",
          value === "revenue"
            ? "bg-background text-foreground shadow-sm border border-border/60"
            : "text-muted-foreground hover:text-foreground hover:bg-background/50"
        )}
        style={{ minWidth: 68 }}
        aria-pressed={value === "revenue"}
        onClick={() => onChange("revenue")}
      >
        <TrendingUp className="h-3 w-3" />
        Revenue
      </button>
      
      <button
        type="button"
        className={cn(
          "px-2.5 py-1.5 text-xs font-medium rounded transition-all duration-200 flex items-center gap-1.5",
          "focus:outline-none focus:ring-1 focus:ring-blue-500/30",
          value === "expense"
            ? "bg-background text-foreground shadow-sm border border-border/60"
            : "text-muted-foreground hover:text-foreground hover:bg-background/50"
        )}
        style={{ minWidth: 68 }}
        aria-pressed={value === "expense"}
        onClick={() => onChange("expense")}
      >
        <TrendingDown className="h-3 w-3" />
        Expense
      </button>
    </div>
  );
};
