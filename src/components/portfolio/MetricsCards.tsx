
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
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Properties',
      value: data?.totalProperties || 0,
      change: data?.propertiesChange || 0,
      icon: Building,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Occupancy Rate',
      value: data ? `${data.occupancyRate}%` : '0%',
      change: data?.occupancyChange || 0,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Net Profit',
      value: data ? `$${data.netProfit.toLocaleString()}` : '$0',
      change: data?.profitChange || 0,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const isPositive = metric.change >= 0;
        
        return (
          <Card key={index} className="border-0 shadow-sm bg-white rounded-2xl hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                {metric.title}
              </CardTitle>
              <div className={`p-2 rounded-xl ${metric.bgColor}`}>
                <Icon className={`h-5 w-5 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
              <div className="flex items-center">
                <span className={`text-sm font-semibold ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isPositive ? '+' : ''}{metric.change}%
                </span>
                <span className="text-sm text-gray-500 ml-2">from last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
