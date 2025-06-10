import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterTag {
  category: string;
  value: string;
  onRemove: () => void;
}

interface FilterTagsProps {
  tags: FilterTag[];
  onClearAll?: () => void;
}

export function FilterTags({ tags, onClearAll }: FilterTagsProps) {
  if (tags.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-2 my-3">
      {tags.map((tag, index) => (
        <div 
          key={index} 
          className="inline-flex items-center gap-1.5 text-xs py-1 px-2.5 bg-gray-100 text-gray-800 rounded-md border border-gray-200"
        >
          <span>
            <span className="font-medium">{tag.category}:</span> {tag.value}
          </span>
          <button 
            onClick={tag.onRemove} 
            className="text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-200 flex items-center justify-center h-4 w-4"
            aria-label={`Remove ${tag.category}: ${tag.value} filter`}
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}
      
      {onClearAll && tags.length > 1 && (
        <Button 
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-xs h-6 py-0 px-2 hover:bg-gray-100"
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );
}
