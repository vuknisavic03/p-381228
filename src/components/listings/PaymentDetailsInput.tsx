
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Category {
  value: string;
  label: string;
}

interface PaymentDetailsInputProps {
  label: string;
  value: string;
  categories: Category[];
  selectedCategories: string[];
  onValueChange: (value: string) => void;
  onCategoryToggle: (category: string) => void;
  className?: string;
}

export function PaymentDetailsInput({
  label,
  value,
  categories,
  selectedCategories,
  onValueChange,
  onCategoryToggle,
  className
}: PaymentDetailsInputProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder={label}
          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-lg"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category.value}
            variant={selectedCategories.includes(category.value) ? "default" : "outline"}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:opacity-80",
              selectedCategories.includes(category.value) 
                ? "bg-primary/10 hover:bg-primary/20 text-primary border-primary" 
                : "bg-background hover:bg-accent"
            )}
            onClick={() => onCategoryToggle(category.value)}
          >
            {category.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
