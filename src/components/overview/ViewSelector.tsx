
import React from 'react';
import { Button } from "@/components/ui/button";
import { Building, Home, PieChart } from 'lucide-react';
import { cn } from "@/lib/utils";

export type ViewType = 'portfolio' | 'listings' | 'units';

interface ViewSelectorProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function ViewSelector({ activeView, onViewChange }: ViewSelectorProps) {
  const views = [
    { id: 'portfolio' as ViewType, label: 'Portfolio', icon: PieChart },
    { id: 'listings' as ViewType, label: 'Listings', icon: Building },
    { id: 'units' as ViewType, label: 'Units', icon: Home }
  ];

  return (
    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
      {views.map(view => {
        const Icon = view.icon;
        return (
          <Button
            key={view.id}
            variant="ghost"
            size="sm"
            onClick={() => onViewChange(view.id)}
            className={cn(
              "gap-2 px-4 py-2 rounded-md transition-all",
              activeView === view.id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
            )}
          >
            <Icon className="h-4 w-4" />
            {view.label}
          </Button>
        );
      })}
    </div>
  );
}
