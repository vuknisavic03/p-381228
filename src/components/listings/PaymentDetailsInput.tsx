
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PaymentDetailsInputProps {
  revenueCategories: string[];
  expensesCategories: string[];
  onToggleRevenueCategory: (value: string) => void;
  onToggleExpenseCategory: (value: string) => void;
}

export const revenueCategoriesList = [
  { value: "rent", label: "Rent" },
  { value: "facility", label: "Facility Fees" },
  { value: "lease", label: "Lease-Related Fees" },
  { value: "utility", label: "Utility & Service Fees" },
  { value: "key", label: "Key & Access Fees" },
  { value: "maintenance", label: "Maintenance Fees" },
  { value: "optional", label: "Optional Fees" },
  { value: "refunds", label: "Refunds" },
  { value: "condo", label: "Condo / HOA fees" },
  { value: "misc", label: "Miscellaneous Fees" },
];

export const expenseCategoriesList = [
  { value: "maintenance", label: "Maintenance" },
  { value: "repairs", label: "Repairs" },
  { value: "utilities", label: "Utilities" },
  { value: "turnover", label: "Turnover / Make Ready" },
  { value: "dues", label: "Dues and Fees" },
  { value: "cleaning", label: "Cleaning" },
  { value: "insurance", label: "Insurance" },
  { value: "taxes", label: "Taxes" },
  { value: "marketing", label: "Marketing" },
  { value: "professional", label: "Professional Services" },
];

export function PaymentDetailsInput({
  revenueCategories,
  expensesCategories,
  onToggleRevenueCategory,
  onToggleExpenseCategory,
}: PaymentDetailsInputProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Revenue Categories</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                Select Categories <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-3" align="end">
              <div className="space-y-2">
                {revenueCategoriesList.map((item) => (
                  <div
                    key={item.value}
                    onClick={() => onToggleRevenueCategory(item.value)}
                    className={`flex items-center p-2 cursor-pointer rounded-md transition-colors ${
                      revenueCategories.includes(item.value)
                        ? "bg-primary/5"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <span className="flex-1 text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="text-sm text-muted-foreground">
          Selected: {revenueCategories.map((cat, i) => {
            const item = revenueCategoriesList.find(r => r.value === cat);
            return item?.label + (i < revenueCategories.length - 1 ? ', ' : '');
          })}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Expense Categories</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                Select Categories <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-3" align="end">
              <div className="space-y-2">
                {expenseCategoriesList.map((item) => (
                  <div
                    key={item.value}
                    onClick={() => onToggleExpenseCategory(item.value)}
                    className={`flex items-center p-2 cursor-pointer rounded-md transition-colors ${
                      expensesCategories.includes(item.value)
                        ? "bg-primary/5"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <span className="flex-1 text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="text-sm text-muted-foreground">
          Selected: {expensesCategories.map((cat, i) => {
            const item = expenseCategoriesList.find(e => e.value === cat);
            return item?.label + (i < expensesCategories.length - 1 ? ', ' : '');
          })}
        </div>
      </div>
    </div>
  );
}
