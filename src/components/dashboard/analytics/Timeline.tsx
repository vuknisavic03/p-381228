
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
import { DateRange } from "react-day-picker";

interface TimelineProps {
  data: TimelineDataPoint[];
  isLoading?: boolean;
  periodLabel?: string;
  dateRange?: DateRange;
}

export function Timeline({ data, isLoading = false, periodLabel = "Performance Timeline", dateRange }: TimelineProps) {
  if (isLoading) {
    return (
      <Card className="border border-gray-200 p-5 bg-white h-[280px]">
        <CardHeader className="p-0 pb-3">
          <CardTitle className="text-lg font-medium text-gray-900">Performance Timeline</CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-full">
          <div className="h-[220px] animate-pulse bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 text-sm">Loading data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Clean the data to ensure proper formatting and remove any timezone info
  const cleanData = data.map(point => {
    let cleanMonth = typeof point.month === 'string' ? point.month : String(point.month);
    
    // Remove timezone information if present (like "GMT+0000 (Coordinated Universal Time)")
    cleanMonth = cleanMonth.replace(/\s+GMT[+-]\d{4}.*$/i, '').trim();
    
    return {
      ...point,
      month: cleanMonth
    };
  });

  // Detect if we have hourly data by checking the format
  const isHourlyData = cleanData.length > 0 && 
                      cleanData[0].month.includes(':');

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

  // Determine title based on data type and period
  const getChartTitle = () => {
    if (isHourlyData) {
      return "Today's Performance";
    }
    
    // Handle period labels from date picker
    if (periodLabel === "Custom range") {
      return "Custom range";
    }
    
    // For other periods, use the period label directly
    return periodLabel || "Performance Timeline";
  };

  return (
    <Card className="border border-gray-200 p-5 bg-white h-[280px]">
      <CardHeader className="p-0 pb-3">
        <CardTitle className="text-lg font-medium text-gray-900">
          {getChartTitle()}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={cleanData}
              margin={{
                top: 25,
                right: 15,
                bottom: 30,
                left: 60,
              }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.01} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
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
                padding={{ left: 10, right: 10 }}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value/1000}k`}
                width={55}
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
                fill="url(#colorRevenue)"
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
                fill="url(#colorProfit)"
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
      </CardContent>
    </Card>
  );
}
