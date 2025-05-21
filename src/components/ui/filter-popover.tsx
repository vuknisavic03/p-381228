
import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ListFilter, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

// Define the option type that can be either a string or an object with value and label
export type FilterOption = string | { value: string; label: string };

// Updated interface to handle both types of options
export interface FilterGroup {
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onToggle: (value: string) => void;
}

interface FilterPopoverProps {
  groups: FilterGroup[];
  selectedCount: number;
  onReset: () => void;
  onApply?: () => void;
  trigger?: ReactNode;
  title?: string;
}

export function FilterPopover({
  groups,
  selectedCount,
  onReset,
  onApply,
  trigger,
  title = "Filter"
}: FilterPopoverProps) {
  const [open, setOpen] = React.useState(false);

  // Helper function to get option value
  const getOptionValue = (option: FilterOption): string => {
    return typeof option === 'string' ? option : option.value;
  }

  // Helper function to get option display label
  const getOptionLabel = (option: FilterOption): string => {
    return typeof option === 'string' ? option : option.label;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button variant="outline" className="flex items-center gap-2 h-9 text-xs font-medium bg-white border-gray-200 hover:bg-gray-50">
            <ListFilter className="h-3.5 w-3.5" />
            <span>{title}</span>
            {selectedCount > 0 && (
              <span className="flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs min-w-5 h-5 px-1">
                {selectedCount}
              </span>
            )}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[320px] p-0 shadow-lg border border-gray-200">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-lg">Filters</h4>
            {selectedCount > 0 && (
              <Button variant="ghost" size="sm" onClick={onReset} className="h-8 text-xs text-gray-500 hover:text-gray-700">
                Reset all
              </Button>
            )}
          </div>
          
          <div className="space-y-5">
            {groups.map((group, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-medium text-sm text-gray-700">{group.title}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {group.options.map((option) => {
                    const value = getOptionValue(option);
                    const label = getOptionLabel(option);
                    const isSelected = group.selectedValues.includes(value);
                    
                    return (
                      <label
                        key={value}
                        className={cn(
                          "flex items-center gap-1.5 text-xs cursor-pointer p-2 rounded-md border transition-all duration-200",
                          isSelected 
                            ? "bg-gray-100 border-gray-300" 
                            : "border-gray-200 hover:bg-gray-50"
                        )}
                      >
                        <input
                          type="checkbox"
                          className="accent-gray-800 rounded"
                          checked={isSelected}
                          onChange={() => group.onToggle(value)}
                        />
                        <span className="text-gray-700">{label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpen(false)}
              className="text-xs bg-white hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                if (onApply) onApply();
                setOpen(false);
              }}
              className="text-xs bg-gray-900 hover:bg-gray-800"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
