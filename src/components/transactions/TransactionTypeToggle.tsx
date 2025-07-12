
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
      "flex rounded-lg border border-border bg-background p-0.5",
      className
    )}>
      <button
        type="button"
        className={cn(
          "px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-1.5",
          value === "revenue"
            ? "border-[0.5px] border-filter-selected-border bg-filter-selected-bg text-filter-selected-text"
            : "border border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
        )}
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
        className={cn(
          "ml-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-1.5",
          value === "expense"
            ? "border-[0.5px] border-filter-selected-border bg-filter-selected-bg text-filter-selected-text"
            : "border border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
        )}
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
