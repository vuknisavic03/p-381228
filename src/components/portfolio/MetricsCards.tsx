
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Building, Users, TrendingUp } from 'lucide-react';
import { PortfolioMetrics } from '../../services/portfolioService';

interface MetricsCardsProps {
  data?: PortfolioMetrics;
}

export function MetricsCards({ data }: MetricsCardsProps) {
  const metrics = [
    {
      title: 'Total Revenue',
      value: data ? `$${data.totalRevenue.toLocaleString()}` : '$0',
      change: data?.revenueChange || 0,
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Active Properties',
      value: data?.totalProperties || 0,
      change: data?.propertiesChange || 0,
      icon: Building,
      color: 'text-blue-600'
    },
    {
      title: 'Occupancy Rate',
      value: data ? `${data.occupancyRate}%` : '0%',
      change: data?.occupancyChange || 0,
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Net Profit',
      value: data ? `$${data.netProfit.toLocaleString()}` : '$0',
      change: data?.profitChange || 0,
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const isPositive = metric.change >= 0;
        
        return (
          <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {metric.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <div className="flex items-center mt-1">
                <span className={`text-xs font-medium ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isPositive ? '+' : ''}{metric.change}%
                </span>
                <span className="text-xs text-gray-500 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
