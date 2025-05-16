
import React from "react";
import { X } from "lucide-react";

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
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag, index) => (
        <div 
          key={index} 
          className="inline-flex items-center gap-1.5 text-xs py-1 px-2 bg-gray-100 text-gray-700 rounded-md"
        >
          <span>
            {tag.category}: {tag.value}
          </span>
          <button 
            onClick={tag.onRemove} 
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}
      
      {onClearAll && tags.length > 1 && (
        <button 
          onClick={onClearAll}
          className="inline-flex items-center gap-1.5 text-xs py-1 px-2 text-gray-600 hover:text-black"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
