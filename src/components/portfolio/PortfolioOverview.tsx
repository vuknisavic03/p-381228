
import React from 'react';
import { MetricsCards } from './MetricsCards';
import { RevenueChart } from './charts/RevenueChart';
import { OccupancyChart } from './charts/OccupancyChart';
import { ExpenseBreakdown } from './charts/ExpenseBreakdown';
import { PropertyPerformance } from './charts/PropertyPerformance';
import { usePortfolioData } from '../../services/portfolioService';
import { DateRange } from 'react-day-picker';

interface PortfolioOverviewProps {
  dateRange?: DateRange;
  periodLabel?: string;
}

export function PortfolioOverview({ dateRange, periodLabel }: PortfolioOverviewProps) {
  const { data, isLoading } = usePortfolioData(dateRange);

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-2xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-[400px] bg-gray-100 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <MetricsCards data={data?.metrics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RevenueChart 
          data={data?.revenueData} 
          periodLabel={periodLabel} 
        />
        <OccupancyChart 
          data={data?.occupancyData} 
        />
        <ExpenseBreakdown 
          data={data?.expenseData} 
        />
        <PropertyPerformance 
          data={data?.propertyData} 
        />
      </div>
    </div>
  );
}
