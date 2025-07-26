import React from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ListingsUnitsFilter } from "@/components/ui/listings-units-filter";

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
  listings?: any[]; // Add listings data for the special listings filter
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
    <div className={cn("flex items-center gap-3 w-full", className)}>
      {/* Search Bar */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-9 bg-muted/20 border-border/40 rounded-lg shadow-none focus:border-border focus:ring-0 focus:bg-background transition-all"
        />
        {searchValue && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSearchChange('')}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 hover:bg-muted/60 transition-colors"
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
                  "gap-2 h-9 px-3 rounded-lg border hover:bg-muted/40 transition-all text-muted-foreground hover:text-foreground",
                  section.selectedValues.length > 0 
                    ? "border-border/60 bg-muted/30 text-foreground" 
                    : "border-transparent"
                )}
              >
                <span className="text-sm font-medium">{section.title}</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className={cn("p-0 shadow-lg border border-border/40", section.id === 'listings' ? "w-96" : "w-72")} align="start">
              <div className={cn("space-y-0.5 max-h-80 overflow-auto", section.id === 'listings' ? "p-3" : "p-3")}>
                {/* Special handling for listings filter */}
                {section.id === 'listings' && section.listings ? (
                  <ListingsUnitsFilter
                    listings={section.listings}
                    selectedValues={section.selectedValues}
                    onToggle={section.onToggle}
                  />
                ) : (
                  section.options.map((option) => {
                  const isSelected = section.selectedValues.includes(option.value);
                  return (
                    <div
                      key={option.value}
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 cursor-pointer rounded-md transition-all",
                        isSelected 
                          ? "bg-muted/40 text-foreground" 
                          : "hover:bg-muted/30 text-muted-foreground hover:text-foreground"
                      )}
                      onClick={() => {
                        // Allow deselection for all filters, including type filter
                        if (section.id === 'type' && isSelected && option.value === 'all') {
                          // Don't allow deselecting "all" if it's the only option
                          return;
                        }
                        section.onToggle(option.value);
                      }}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className={cn(
                          "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all",
                          isSelected 
                            ? "bg-blue-500 border-blue-500" 
                            : "border-muted-foreground/30 hover:border-blue-300"
                        )}>
                          {isSelected && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <span className="text-sm">{option.label}</span>
                      </div>
                      {option.count !== undefined && (
                        <Badge variant="outline" className="h-5 text-xs px-2 bg-muted/20 border-border/40 text-muted-foreground">
                          {option.count}
                        </Badge>
                      )}
                    </div>
                    );
                  })
                )}
                {section.options.length === 0 && section.id !== 'listings' && (
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
            <Separator orientation="vertical" className="h-5 bg-border/40" />
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-9 text-sm text-muted-foreground hover:text-foreground transition-colors px-3"
            >
              Clear ({activeFilterCount})
            </Button>
          </>
        )}
      </div>
    </div>
  );
}