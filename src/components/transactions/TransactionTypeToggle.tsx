
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
      "flex items-center rounded-xl bg-muted/40 p-1.5 backdrop-blur-sm border border-border/50",
      className
    )}>
      <button
        type="button"
        className={cn(
          "relative px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-2.5 group",
          "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 focus:ring-offset-background",
          value === "revenue"
            ? "bg-background text-foreground shadow-sm border border-border/60 ring-1 ring-blue-500/20"
            : "text-muted-foreground hover:text-foreground hover:bg-background/60"
        )}
        style={{
          minWidth: 88,
        }}
        aria-pressed={value === "revenue"}
        onClick={() => onChange("revenue")}
      >
        <TrendingUp className={cn(
          "h-4 w-4 transition-all duration-300",
          value === "revenue" ? "text-green-600" : "group-hover:text-green-500"
        )} />
        <span className="font-medium">Revenue</span>
        {value === "revenue" && (
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-500/5 to-blue-500/5 pointer-events-none" />
        )}
      </button>
      
      <button
        type="button"
        className={cn(
          "relative px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-2.5 group",
          "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 focus:ring-offset-background",
          value === "expense"
            ? "bg-background text-foreground shadow-sm border border-border/60 ring-1 ring-blue-500/20"
            : "text-muted-foreground hover:text-foreground hover:bg-background/60"
        )}
        style={{
          minWidth: 88,
        }}
        aria-pressed={value === "expense"}
        onClick={() => onChange("expense")}
      >
        <TrendingDown className={cn(
          "h-4 w-4 transition-all duration-300",
          value === "expense" ? "text-red-600" : "group-hover:text-red-500"
        )} />
        <span className="font-medium">Expense</span>
        {value === "expense" && (
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500/5 to-orange-500/5 pointer-events-none" />
        )}
      </button>
    </div>
  );
};
