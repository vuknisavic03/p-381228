import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onFilterClick?: () => void;
  filterCount?: number;
  onClearFilters?: () => void;
  className?: string;
  showFilterButton?: boolean;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  onFilterClick,
  filterCount = 0,
  onClearFilters,
  className,
  showFilterButton = true
}: SearchBarProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pl-10 h-10 border-gray-200 focus:border-blue-300 focus:ring-blue-300 bg-white"
        />
      </div>
      
      {showFilterButton && onFilterClick && (
        <Button 
          variant="outline" 
          onClick={onFilterClick}
          className="h-10 px-4 border-gray-200 hover:bg-gray-50 bg-white"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {filterCount > 0 && (
            <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">
              {filterCount}
            </span>
          )}
        </Button>
      )}
      
      {filterCount > 0 && onClearFilters && (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onClearFilters}
          className="h-10 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        >
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
}
