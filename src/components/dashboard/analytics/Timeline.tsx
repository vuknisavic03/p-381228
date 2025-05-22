
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
      <Card className="shadow-md border border-[#F0F2FA] p-5 sm:p-6 bg-white h-[240px] sm:h-[280px] md:h-[300px] animate-fade-in rounded-xl">
        <CardHeader className="p-0 pb-3">
          <CardTitle className="text-sm sm:text-base md:text-lg font-medium">Performance Timeline</CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-full">
          <div className="h-[180px] sm:h-[200px] md:h-[240px] animate-pulse bg-[#F8F9FE] rounded-lg flex items-center justify-center">
            <p className="text-[#9EA3AD] text-sm">Loading data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Safely determine if we have hourly data by checking the first data point
  const isHourlyData = data.length > 0 && 
                      typeof data[0].month === 'string' && 
                      data[0].month.includes(':');

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      // Ensure label is a string
      const safeLabel = typeof label === 'string' ? label : 
                         String(label);
      
      return (
        <div className="backdrop-blur-md bg-white/95 p-3 sm:p-4 border border-[#F0F2FA] shadow-xl rounded-xl">
          <p className="font-medium text-[#1A1F2C] mb-2 text-xs sm:text-sm">{safeLabel}</p>
          <div className="mt-2">
            {payload.map((entry, index) => (
              <p key={`item-${index}`} style={{ color: entry.color }} className="flex items-center gap-2 text-xs sm:text-sm my-1.5">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
                <span className="font-medium">{entry.name}: </span>
                <span>${Number(entry.value).toLocaleString()}</span>
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // Determine title based on data type
  const chartTitle = isHourlyData ? "Today's Performance" : periodLabel || "Performance Timeline";

  // Make sure data is formatted correctly
  const safeData = data.map(point => ({
    ...point,
    month: typeof point.month === 'string' ? point.month : String(point.month)
  }));

  return (
    <Card className="shadow-md border border-[#F0F2FA] p-5 sm:p-6 bg-white h-[240px] sm:h-[280px] md:h-[300px] hover:shadow-lg transition-all duration-300 animate-fade-in rounded-xl">
      <CardHeader className="p-0 pb-3">
        <CardTitle className="text-sm sm:text-base md:text-lg font-medium text-[#1A1F2C]">
          {chartTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[180px] sm:h-[200px] md:h-[240px]">
          <ResponsiveContainer width="100%" height="100%" className="animate-fade-in">
            <AreaChart
              data={safeData}
              margin={{
                top: 20,
                right: 5,
                bottom: 5,
                left: 15,
              }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="5 5" vertical={false} opacity={0.12} stroke="#9EA3AD" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#6E6E76', fontSize: 11 }} 
                tickLine={false} 
                axisLine={{ strokeWidth: 1, stroke: '#F5F5F6' }}
                dy={8}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis 
                tick={{ fill: '#6E6E76', fontSize: 11 }}
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
                  stroke: "#F5F5F6", 
                  strokeWidth: 1, 
                  strokeDasharray: "5 5",
                  fill: "rgba(240, 240, 245, 0.4)"  
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#9b87f5"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                strokeWidth={2.5}
                activeDot={{ r: 5, fill: "#9b87f5", strokeWidth: 0 }}
                name="Revenue"
                animationDuration={1500}
                animationBegin={300}
                animationEasing="ease-out"
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#F97316"
                fillOpacity={1}
                fill="url(#colorProfit)"
                strokeWidth={2.5}
                activeDot={{ r: 5, fill: "#F97316", strokeWidth: 0 }}
                name="Profit"
                animationDuration={1500}
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
