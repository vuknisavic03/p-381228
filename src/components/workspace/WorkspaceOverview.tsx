
import React, { useState, useEffect } from 'react';
import { Header } from "@/components/dashboard/Header";
import { AnalyticsGrid } from "@/components/dashboard/analytics/AnalyticsGrid";
import { ViewType } from "@/components/overview/ViewSelector";
import { ListingsTable } from "@/components/overview/ListingsTable";
import { UnitsTable } from "@/components/overview/UnitsTable";
import { DateRange } from "react-day-picker";
import { startOfMonth, endOfMonth } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { fetchListingOverviews, fetchUnitOverviews } from "@/services/overviewService";

interface WorkspaceOverviewProps {
  userName?: string;
  workspaceName?: string;
}

export function WorkspaceOverview({ userName = "Kevin", workspaceName = "Kevin's Workspace" }: WorkspaceOverviewProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });
  
  const [periodLabel, setPeriodLabel] = useState<string>("This month");
  const [activeView, setActiveView] = useState<ViewType>('portfolio');

  const { data: listings, isLoading: listingsLoading } = useQuery({
    queryKey: ['listing-overviews', dateRange],
    queryFn: () => fetchListingOverviews(dateRange),
    enabled: activeView === 'listings',
  });

  const { data: units, isLoading: unitsLoading } = useQuery({
    queryKey: ['unit-overviews', dateRange],
    queryFn: () => fetchUnitOverviews(dateRange),
    enabled: activeView === 'units',
  });

  const handleDateRangeChange = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange);
  };

  const handlePeriodLabelChange = (label: string) => {
    setPeriodLabel(label);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'portfolio':
        return (
          <div className="space-y-8">
            <AnalyticsGrid dateRange={dateRange} periodLabel={periodLabel} />
          </div>
        );
      case 'listings':
        return (
          <div className="space-y-8">
            <ListingsTable listings={listings || []} isLoading={listingsLoading} />
          </div>
        );
      case 'units':
        return (
          <div className="space-y-8">
            <UnitsTable units={units || []} isLoading={unitsLoading} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-background animate-fade-in">
      <Header 
        userName={userName} 
        workspaceName={workspaceName} 
        onDateRangeChange={handleDateRangeChange}
        onPeriodLabelChange={handlePeriodLabelChange}
        dateRange={dateRange}
        activeView={activeView}
        onViewChange={setActiveView}
        showViewSelector={true}
      />
      
      <div className="flex-1 overflow-auto px-4 sm:px-6 lg:px-10 pb-8 pt-6">
        <div className="max-w-[1600px] mx-auto">
          {renderActiveView()}
        </div>
      </div>
    </div>
  );
}
