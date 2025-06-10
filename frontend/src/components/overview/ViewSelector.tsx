import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Building, Home, PieChart, ChevronDown } from 'lucide-react';

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

  const currentView = views.find(view => view.id === activeView);
  const CurrentIcon = currentView?.icon || PieChart;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 px-4 py-2 h-10 font-medium transition-colors focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <CurrentIcon className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-900">
            {currentView?.label || 'Portfolio'}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-white shadow-lg z-50" align="start">
        {views.map(view => {
          const Icon = view.icon;
          return (
            <DropdownMenuItem
              key={view.id}
              onClick={() => onViewChange(view.id)}
              className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <Icon className="h-4 w-4 text-gray-600" />
              {view.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
