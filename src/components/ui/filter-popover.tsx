
import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ListFilter, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
}

export function FilterPopover({
  groups,
  selectedCount,
  onReset,
  onApply,
  trigger,
}: FilterPopoverProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button variant="outline" className="flex items-center gap-2 h-9">
            <ListFilter className="h-4 w-4" />
            <span>Filter</span>
            {selectedCount > 0 && (
              <span className="flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs w-5 h-5 ml-1">
                {selectedCount}
              </span>
            )}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 p-0">
        <div className="p-4 space-y-4">
          {groups.map((group, index) => (
            <div key={index} className="space-y-2">
              <h4 className="font-bold text-sm mb-1">{group.title}</h4>
              <div className="grid grid-cols-2 gap-2">
                {group.options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-1.5 text-sm cursor-pointer hover:text-primary transition-colors"
                  >
                    <input
                      type="checkbox"
                      className="accent-gray-700 rounded"
                      checked={group.selectedValues.includes(option)}
                      onChange={() => group.onToggle(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
          
          <div className="flex justify-between mt-2 pt-2 border-t border-gray-100">
            <Button variant="outline" size="sm" onClick={onReset}>
              Reset
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                if (onApply) onApply();
                setOpen(false);
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
