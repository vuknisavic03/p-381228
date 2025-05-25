
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TimelineDataPoint } from "@/services/analyticsService";

interface TimelineProps {
  data: TimelineDataPoint[];
  isLoading?: boolean;
  periodLabel?: string;
}

export function Timeline({ data, isLoading = false, periodLabel = "Performance Timeline" }: TimelineProps) {
  if (isLoading) {
    return (
      <Card className="p-6 border border-gray-200 rounded-lg bg-white">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-base font-medium text-gray-900">Performance Timeline</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-48 bg-gray-50 rounded animate-pulse flex items-center justify-center">
            <p className="text-gray-400 text-sm">Loading data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isHourlyData = data.length > 0 && 
                      typeof data[0].month === 'string' && 
                      data[0].month.includes(':');

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const safeLabel = typeof label === 'string' ? label : String(label);
      
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
          <p className="text-sm font-medium text-gray-900 mb-2">{safeLabel}</p>
          <div className="space-y-1">
            {payload.map((entry, index) => (
              <div key={`item-${index}`} className="flex items-center gap-2 text-sm">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-gray-600">{entry.name}:</span>
                <span className="font-medium text-gray-900">
                  ${Number(entry.value).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const chartTitle = isHourlyData ? "Today's Performance" : periodLabel || "Performance Timeline";

  const safeData = data.map(point => ({
    ...point,
    month: typeof point.month === 'string' ? point.month : String(point.month)
  }));

  return (
    <Card className="p-6 border border-gray-200 rounded-lg bg-white hover:border-gray-300 transition-colors">
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-base font-medium text-gray-900">
          {chartTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={safeData}
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#6b7280', fontSize: 11 }} 
                tickLine={false} 
                axisLine={false}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value/1000}k`}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                fill="url(#colorRevenue)"
                strokeWidth={2}
                name="Revenue"
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#f59e0b"
                fill="url(#colorProfit)"
                strokeWidth={2}
                name="Profit"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
