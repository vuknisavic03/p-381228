
import React from 'react';
import { Input } from "@/components/ui/input";

interface PaymentDetailsInputProps {
  revenue: string;
  expenses: string;
  onRevenueChange: (value: string) => void;
  onExpensesChange: (value: string) => void;
}

export function PaymentDetailsInput({
  revenue,
  expenses,
  onRevenueChange,
  onExpensesChange,
}: PaymentDetailsInputProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          className="h-10 w-full"
          type="text"
          placeholder="Revenue"
          value={revenue}
          onChange={(e) => onRevenueChange(e.target.value)}
        />
        <Input
          className="h-10 w-full"
          type="text"
          placeholder="Expenses"
          value={expenses}
          onChange={(e) => onExpensesChange(e.target.value)}
        />
      </div>
    </div>
  );
}
