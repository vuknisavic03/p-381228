
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
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TimelineDataPoint } from "@/services/analyticsService";
import { LucideIcon } from "lucide-react";

interface CompactTimelineProps {
  data: TimelineDataPoint[];
  isLoading?: boolean;
  periodLabel?: string;
  title: string;
  icon: LucideIcon;
  value: string;
  change: {
    value: number;
    positive: boolean;
  };
}

export function CompactTimeline({ 
  data, 
  isLoading = false, 
  title,
  icon: Icon,
  value,
  change
}: CompactTimelineProps) {
  if (isLoading) {
    return (
      <Card className="p-5 border border-gray-200 h-full min-h-[280px] bg-white">
        <CardHeader className="p-0 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium text-gray-900">{title}</CardTitle>
            <div className="bg-gray-100 text-gray-600 p-2 rounded-lg">
              <Icon size={18} />
            </div>
          </div>
        </CardHeader>
        
        <div className="mt-2">
          <div className="flex items-baseline space-x-2">
            <div className="h-6 w-24 bg-gray-100 animate-pulse rounded-md"></div>
          </div>
        </div>
        
        <div className="mt-4 flex-grow">
          <div className="h-[200px] bg-gray-50 animate-pulse rounded-lg"></div>
        </div>
      </Card>
    );
  }

  // Clean the data to ensure proper formatting
  const cleanData = data.map(point => {
    let cleanMonth = typeof point.month === 'string' ? point.month : String(point.month);
    cleanMonth = cleanMonth.replace(/\s+GMT[+-]\d{4}.*$/i, '').trim();
    
    return {
      ...point,
      month: cleanMonth
    };
  });

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const safeLabel = typeof label === 'string' ? label : String(label);
      
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
          <p className="font-medium text-gray-900 mb-2 text-sm">{safeLabel}</p>
          <div className="mt-2">
            {payload.map((entry, index) => (
              <p key={`item-${index}`} className="flex items-center gap-2 text-sm my-1">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
                <span className="font-medium text-gray-700">{entry.name}: </span>
                <span className="text-gray-900">${Number(entry.value).toLocaleString()}</span>
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-5 border border-gray-200 h-full min-h-[280px] bg-white flex flex-col">
      <CardHeader className="p-0 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium text-gray-900">{title}</CardTitle>
          <div className="bg-gray-100 text-gray-600 p-2 rounded-lg">
            <Icon size={18} />
          </div>
        </div>
      </CardHeader>
      
      <div className="mt-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-gray-900">{value}</span>
          <span className={`text-sm ${change.positive ? 'text-green-600' : 'text-red-600'} flex items-center`}>
            {change.positive ? '+' : '-'}{Math.abs(change.value)}%
          </span>
        </div>
      </div>
      
      <div className="mt-5 flex-grow border-t border-gray-200 pt-4">
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={cleanData}
              margin={{
                top: 15,
                right: 15,
                bottom: 5,
                left: 0,
              }}
            >
              <defs>
                <linearGradient id="colorRevenueCompact" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.01} />
                </linearGradient>
                <linearGradient id="colorProfitCompact" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.5} stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#6b7280', fontSize: 12 }} 
                tickLine={false} 
                axisLine={{ strokeWidth: 1, stroke: '#e5e7eb' }}
                dy={8}
                padding={{ left: 5, right: 5 }}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value/1000}k`}
                width={50}
                padding={{ top: 10 }}
                allowDecimals={false}
                domain={['auto', 'auto']}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ 
                  stroke: "#e5e7eb", 
                  strokeWidth: 1, 
                  strokeDasharray: "3 3",
                  fill: "rgba(229, 231, 235, 0.1)"  
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                fillOpacity={1}
                fill="url(#colorRevenueCompact)"
                strokeWidth={2}
                activeDot={{ r: 4, fill: "#2563eb", strokeWidth: 0 }}
                name="Revenue"
                animationDuration={1200}
                animationBegin={300}
                animationEasing="ease-out"
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#16a34a"
                fillOpacity={1}
                fill="url(#colorProfitCompact)"
                strokeWidth={2}
                activeDot={{ r: 4, fill: "#16a34a", strokeWidth: 0 }}
                name="Profit"
                animationDuration={1200}
                animationBegin={600}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
