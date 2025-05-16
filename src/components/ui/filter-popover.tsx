
import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ListFilter, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface FilterGroup {
  title: string;
  options: string[];
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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button variant="outline" className="flex items-center gap-2 h-9 text-xs font-medium">
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
      <PopoverContent align="end" className="w-[320px] p-0 shadow-lg">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-lg">Filters</h4>
            {selectedCount > 0 && (
              <Button variant="ghost" size="sm" onClick={onReset} className="h-8 text-xs">
                Reset all
              </Button>
            )}
          </div>
          
          <div className="space-y-4">
            {groups.map((group, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-semibold text-sm">{group.title}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {group.options.map((option) => {
                    const isSelected = group.selectedValues.includes(option);
                    return (
                      <label
                        key={option}
                        className={cn(
                          "flex items-center gap-1.5 text-xs cursor-pointer p-2 rounded-md border",
                          isSelected 
                            ? "bg-gray-100 border-gray-300" 
                            : "border-gray-200 hover:bg-gray-50"
                        )}
                      >
                        <input
                          type="checkbox"
                          className="accent-gray-800 rounded"
                          checked={isSelected}
                          onChange={() => group.onToggle(option)}
                        />
                        <span>{option}</span>
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
              className="text-xs"
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
              className="text-xs"
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
