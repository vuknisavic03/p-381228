
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Home, Users, BarChart3 } from 'lucide-react';
import { OverviewMetrics } from "@/services/overviewService";
import { cn } from "@/lib/utils";

interface MetricsOverviewProps {
  metrics: OverviewMetrics;
  isLoading?: boolean;
}

export function MetricsOverview({ metrics, isLoading }: MetricsOverviewProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const metricCards = [
    {
      title: "Total Revenue",
      value: `$${metrics.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      trend: metrics.totalRevenue > 0 ? "positive" : "neutral",
      color: "text-green-600"
    },
    {
      title: "Net Profit",
      value: `$${metrics.netProfit.toLocaleString()}`,
      icon: metrics.netProfit >= 0 ? TrendingUp : TrendingDown,
      trend: metrics.netProfit >= 0 ? "positive" : "negative",
      color: metrics.netProfit >= 0 ? "text-green-600" : "text-red-600"
    },
    {
      title: "Occupancy Rate",
      value: `${metrics.occupancyRate.toFixed(1)}%`,
      icon: BarChart3,
      trend: metrics.occupancyRate >= 80 ? "positive" : metrics.occupancyRate >= 60 ? "neutral" : "negative",
      color: metrics.occupancyRate >= 80 ? "text-green-600" : metrics.occupancyRate >= 60 ? "text-yellow-600" : "text-red-600"
    },
    {
      title: "Total Properties",
      value: metrics.totalListings.toString(),
      icon: Home,
      trend: "neutral",
      color: "text-blue-600"
    },
    {
      title: "Total Units",
      value: `${metrics.occupiedUnits}/${metrics.totalUnits}`,
      icon: Users,
      trend: "neutral",
      color: "text-purple-600"
    },
    {
      title: "Average Rent",
      value: `$${metrics.averageRent.toLocaleString()}`,
      icon: DollarSign,
      trend: "neutral",
      color: "text-indigo-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metricCards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <Icon className={cn("h-4 w-4", card.color)} />
            </CardHeader>
            <CardContent>
              <div className={cn("text-2xl font-bold", card.color)}>
                {card.value}
              </div>
              {card.title === "Total Units" && (
                <p className="text-xs text-gray-500 mt-1">
                  {metrics.vacantUnits} vacant
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
