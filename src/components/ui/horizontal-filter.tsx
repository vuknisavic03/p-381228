import React from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterSection {
  id: string;
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onToggle: (value: string) => void;
}

interface HorizontalFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filterSections: FilterSection[];
  activeFilterCount: number;
  onClearFilters: () => void;
  className?: string;
}

export function HorizontalFilter({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filterSections,
  activeFilterCount,
  onClearFilters,
  className = ""
}: HorizontalFilterProps) {
  return (
    <div className={cn("bg-background border-b border-border/50 px-6 py-4", className)}>
      <div className="flex items-center gap-3 w-full">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-9 bg-background border-border/60 rounded-md shadow-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
          />
          {searchValue && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onSearchChange('')}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 hover:bg-muted/80 transition-colors"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2">
          {filterSections.map((section) => (
            <Popover key={section.id}>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={cn(
                    "gap-2 h-9 px-3 rounded-md border border-transparent hover:bg-muted/50 transition-all",
                    section.selectedValues.length > 0 && "bg-primary/10 border-primary/20 text-primary hover:bg-primary/15"
                  )}
                >
                  <span className="text-sm font-medium">{section.title}</span>
                  {section.selectedValues.length > 0 && (
                    <Badge variant="secondary" className="h-5 text-xs px-1.5 bg-primary/20 text-primary border-0">
                      {section.selectedValues.length}
                    </Badge>
                  )}
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-0 shadow-lg border border-border/50" align="start">
                <div className="px-4 py-3 border-b border-border/50 bg-muted/30">
                  <h4 className="font-medium text-sm text-foreground">{section.title}</h4>
                </div>
                <div className="p-2 space-y-1 max-h-80 overflow-auto">
                  {section.options.map((option) => {
                    const isSelected = section.selectedValues.includes(option.value);
                    return (
                      <div
                        key={option.value}
                        className={cn(
                          "flex items-center justify-between px-3 py-2 cursor-pointer rounded-md transition-all",
                          isSelected 
                            ? "bg-primary/10 text-primary border border-primary/20" 
                            : "hover:bg-muted/50 border border-transparent"
                        )}
                        onClick={() => section.onToggle(option.value)}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className={cn(
                            "w-4 h-4 rounded border-2 flex items-center justify-center transition-all",
                            isSelected 
                              ? "bg-primary border-primary" 
                              : "border-muted-foreground/30 hover:border-muted-foreground/50"
                          )}>
                            {isSelected && (
                              <div className="w-2 h-2 bg-primary-foreground rounded-sm" />
                            )}
                          </div>
                          <span className="text-sm font-medium">{option.label}</span>
                        </div>
                        {option.count !== undefined && (
                          <Badge variant="outline" className="h-5 text-xs px-2 bg-background">
                            {option.count}
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                  {section.options.length === 0 && (
                    <div className="px-3 py-4 text-sm text-muted-foreground text-center">
                      No options available
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          ))}

          {/* Clear Filters */}
          {activeFilterCount > 0 && (
            <>
              <Separator orientation="vertical" className="h-6 bg-border/50" />
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="h-9 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear all ({activeFilterCount})
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}