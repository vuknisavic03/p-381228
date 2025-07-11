import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown, Search, X, Building } from "lucide-react";
import { cn } from "@/lib/utils";

interface Property {
  id: string;
  name: string;
  units?: Array<{ id: string; unitNumber: string }>;
}

interface SimplePropertyFilterProps {
  properties: Property[];
  selectedProperties: string[];
  onPropertyToggle: (propertyId: string) => void;
  onClear: () => void;
}

export const SimplePropertyFilter: React.FC<SimplePropertyFilterProps> = ({
  properties,
  selectedProperties,
  onPropertyToggle,
  onClear,
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Flatten properties and units into a single searchable list
  const allItems = properties.flatMap(property => {
    const items: Array<{
      id: string;
      name: string;
      type: 'property' | 'unit';
      isProperty: boolean;
      parentProperty?: string;
    }> = [{ 
      id: property.id, 
      name: property.name,
      type: 'property' as const,
      isProperty: true 
    }];
    
    if (property.units?.length) {
      property.units.forEach(unit => {
        items.push({
          id: `${property.id}-${unit.id}`,
          name: `${property.name} - Unit ${unit.unitNumber}`,
          type: 'unit' as const,
          isProperty: false,
          parentProperty: property.name
        });
      });
    }
    
    return items;
  });

  const filteredItems = allItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCount = selectedProperties.length;
  const hasSelection = selectedCount > 0;

  const handleItemToggle = (itemId: string) => {
    onPropertyToggle(itemId);
  };

  const handleClearAll = () => {
    onClear();
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-10 justify-between gap-2 min-w-0 bg-background hover:bg-hover border-border",
            hasSelection && "border-primary bg-primary/5"
          )}
        >
          <div className="flex items-center gap-2 min-w-0">
            <Building className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="truncate text-sm">
              {hasSelection 
                ? `${selectedCount} Properties Selected`
                : "All Properties"
              }
            </span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {hasSelection && (
              <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                {selectedCount}
              </Badge>
            )}
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0 bg-popover border shadow-[var(--shadow-medium)]" 
        align="start"
        sideOffset={4}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-semibold text-foreground">Select Properties</h4>
          {hasSelection && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="h-8 px-2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
        
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 bg-background"
            />
          </div>
        </div>

        <div className="max-h-64 overflow-y-auto">
          {filteredItems.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground text-sm">
              No properties found
            </div>
          ) : (
            <div className="p-2">
              {filteredItems.map((item) => {
                const isSelected = selectedProperties.includes(item.id);
                
                return (
                  <div
                    key={item.id}
                    className={cn(
                      "flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors hover:bg-hover",
                      isSelected && "bg-primary/5"
                    )}
                    onClick={() => handleItemToggle(item.id)}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={cn(
                        "w-4 h-4 rounded border-2 flex items-center justify-center transition-colors",
                        isSelected 
                          ? "bg-primary border-primary" 
                          : "border-border bg-background"
                      )}>
                        {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">
                          {item.isProperty ? item.name : item.name}
                        </div>
                        {!item.isProperty && (
                          <div className="text-xs text-muted-foreground">
                            Unit in {item.parentProperty}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={cn(
                      "text-xs px-2 py-1 rounded-md",
                      item.isProperty 
                        ? "bg-primary/10 text-primary" 
                        : "bg-muted text-muted-foreground"
                    )}>
                      {item.isProperty ? "Property" : "Unit"}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};