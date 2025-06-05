
import React, { useState, useEffect } from 'react';
import { Header } from "@/components/dashboard/Header";
import { AnalyticsGrid } from "@/components/dashboard/analytics/AnalyticsGrid";
import { ViewSelector, ViewType } from "@/components/overview/ViewSelector";
import { MetricsOverview } from "@/components/overview/MetricsOverview";
import { ListingsTable } from "@/components/overview/ListingsTable";
import { UnitsTable } from "@/components/overview/UnitsTable";
import { DateRange } from "react-day-picker";
import { startOfMonth, endOfMonth } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { fetchOverviewMetrics, fetchListingOverviews, fetchUnitOverviews } from "@/services/overviewService";

interface WorkspaceOverviewProps {
  userName?: string;
  workspaceName?: string;
}

export function WorkspaceOverview({ userName = "Kevin", workspaceName = "Kevin's Workspace" }: WorkspaceOverviewProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });
  
  const [activeView, setActiveView] = useState<ViewType>('portfolio');

  // Fetch overview data
  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['overview-metrics'],
    queryFn: fetchOverviewMetrics,
  });

  const { data: listings, isLoading: listingsLoading } = useQuery({
    queryKey: ['listing-overviews'],
    queryFn: fetchListingOverviews,
    enabled: activeView === 'listings',
  });

  const { data: units, isLoading: unitsLoading } = useQuery({
    queryKey: ['unit-overviews'],
    queryFn: fetchUnitOverviews,
    enabled: activeView === 'units',
  });

  const handleDateRangeChange = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'portfolio':
        return (
          <div className="space-y-8">
            {metrics && <MetricsOverview metrics={metrics} isLoading={metricsLoading} />}
            <AnalyticsGrid dateRange={dateRange} />
          </div>
        );
      case 'listings':
        return (
          <div className="space-y-8">
            {metrics && <MetricsOverview metrics={metrics} isLoading={metricsLoading} />}
            <ListingsTable listings={listings || []} isLoading={listingsLoading} />
          </div>
        );
      case 'units':
        return (
          <div className="space-y-8">
            {metrics && <MetricsOverview metrics={metrics} isLoading={metricsLoading} />}
            <UnitsTable units={units || []} isLoading={unitsLoading} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white animate-fade-in">
      <div className="flex-none px-3 sm:px-4 md:px-6 pt-4 md:pt-6 pb-2 md:pb-3">
        <Header 
          userName={userName} 
          workspaceName={workspaceName} 
          onDateRangeChange={handleDateRangeChange}
          dateRange={dateRange}
        />
        
        <div className="mt-6 flex justify-center">
          <ViewSelector activeView={activeView} onViewChange={setActiveView} />
        </div>
      </div>
      
      <div className="flex-1 overflow-auto px-4 sm:px-6 lg:px-10 pb-8 pt-2 md:pt-4">
        <div className="max-w-[1600px] mx-auto">
          {renderActiveView()}
        </div>
      </div>
    </div>
  );
}
