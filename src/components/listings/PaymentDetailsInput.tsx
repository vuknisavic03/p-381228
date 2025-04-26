
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, Check } from "lucide-react";

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
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-lg text-gray-500 font-medium">Revenue</span>
          <div className="flex-1 flex flex-wrap gap-2">
            {revenueCategories.map((category) => {
              const item = revenueCategoriesList.find((c) => c.value === category);
              return (
                <Badge
                  key={category}
                  variant="secondary"
                  className="px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
                  onClick={() => onToggleRevenueCategory(category)}
                >
                  {item?.label}
                </Badge>
              );
            })}
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                Add <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-3" align="end">
              <div className="space-y-2">
                {revenueCategoriesList.map((item) => (
                  <div
                    key={item.value}
                    onClick={() => onToggleRevenueCategory(item.value)}
                    className={`flex items-center gap-2 p-2 cursor-pointer rounded-md transition-colors ${
                      revenueCategories.includes(item.value)
                        ? "bg-primary/5"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <span className="flex-1 text-sm">{item.label}</span>
                    {revenueCategories.includes(item.value) && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-lg text-gray-500 font-medium">Expenses</span>
          <div className="flex-1 flex flex-wrap gap-2">
            {expensesCategories.map((category) => {
              const item = expenseCategoriesList.find((c) => c.value === category);
              return (
                <Badge
                  key={category}
                  variant="secondary"
                  className="px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
                  onClick={() => onToggleExpenseCategory(category)}
                >
                  {item?.label}
                </Badge>
              );
            })}
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                Add <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-3" align="end">
              <div className="space-y-2">
                {expenseCategoriesList.map((item) => (
                  <div
                    key={item.value}
                    onClick={() => onToggleExpenseCategory(item.value)}
                    className={`flex items-center gap-2 p-2 cursor-pointer rounded-md transition-colors ${
                      expensesCategories.includes(item.value)
                        ? "bg-primary/5"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <span className="flex-1 text-sm">{item.label}</span>
                    {expensesCategories.includes(item.value) && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
