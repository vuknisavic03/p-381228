
import React from 'react';
import { Button } from "@/components/ui/button";
import { BarChart, TrendingUp } from 'lucide-react';

interface ChartToggleButtonsProps {
  activeChartType: 'revenue' | 'commission';
  onChartTypeChange: (type: 'revenue' | 'commission') => void;
}

export const ChartToggleButtons: React.FC<ChartToggleButtonsProps> = ({
  activeChartType,
  onChartTypeChange
}) => {
  return (
    <div className="flex gap-3 mt-4">
      <Button
        onClick={() => onChartTypeChange('revenue')}
        variant={activeChartType === 'revenue' ? 'outline' : 'outline'}
        className={`gap-2 py-1.5 px-3 rounded-md border border-gray-200 bg-white hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 ${
          activeChartType === 'revenue' ? 'text-gray-900 shadow-sm' : 'text-gray-600'
        }`}
        size="sm"
      >
        <BarChart className={`w-4 h-4 ${activeChartType === 'revenue' ? 'text-blue-600' : 'text-gray-600'}`} />
        <span className={`text-xs ${activeChartType === 'revenue' ? 'font-medium' : 'font-normal'}`}>
          Property Revenue
        </span>
      </Button>
      <Button
        onClick={() => onChartTypeChange('commission')}
        variant={activeChartType === 'commission' ? 'outline' : 'outline'}
        className={`gap-2 py-1.5 px-3 rounded-md border border-gray-200 bg-white hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 ${
          activeChartType === 'commission' ? 'text-gray-900 shadow-sm' : 'text-gray-600'
        }`}
        size="sm"
      >
        <TrendingUp className={`w-4 h-4 ${activeChartType === 'commission' ? 'text-green-600' : 'text-gray-600'}`} />
        <span className={`text-xs ${activeChartType === 'commission' ? 'font-medium' : 'font-normal'}`}>
          Manager Commission
        </span>
      </Button>
    </div>
  );
};
