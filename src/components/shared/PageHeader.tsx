
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface PageHeaderProps {
  title?: string;
  lastEdited?: string;
  onAddClick: () => void;
  addButtonText: string;
  children?: React.ReactNode;
}

export function PageHeader({ 
  title, 
  lastEdited = "Edited just now", 
  onAddClick, 
  addButtonText,
  children 
}: PageHeaderProps) {
  return (
    <div className="border-b border-gray-100 bg-white">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          {title && <h1 className="text-xl font-semibold text-gray-900 mr-4">{title}</h1>}
          <span className="text-sm text-gray-500">{lastEdited}</span>
        </div>
        <div className="flex items-center gap-3">
          {children}
          <Button
            onClick={onAddClick}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 h-9 rounded-lg font-medium transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            {addButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
