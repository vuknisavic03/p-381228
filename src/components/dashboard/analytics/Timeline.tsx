
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
}

export function Timeline({ data, isLoading = false }: TimelineProps) {
  if (isLoading) {
    return (
      <Card className="shadow-md border border-slate-100 p-3 sm:p-4 bg-white h-[220px] sm:h-[260px] md:h-[280px]">
        <CardHeader className="p-0 pb-2 sm:pb-3">
          <CardTitle className="text-sm sm:text-base md:text-lg font-medium">Performance Timeline</CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-full">
          <div className="h-[160px] sm:h-[180px] md:h-[220px] animate-pulse bg-slate-50 rounded-lg flex items-center justify-center">
            <p className="text-slate-400 text-sm">Loading data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="backdrop-blur-md bg-white/90 p-2 sm:p-3 border border-slate-200/50 shadow-xl rounded-lg">
          <p className="font-medium text-slate-800 mb-1 text-xs sm:text-sm">{label}</p>
          <div className="mt-1">
            {payload.map((entry, index) => (
              <p key={`item-${index}`} style={{ color: entry.color }} className="flex items-center gap-1 text-xs sm:text-sm my-0.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
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

  return (
    <Card className="shadow-sm border border-slate-100 p-3 sm:p-4 bg-white h-[220px] sm:h-[260px] md:h-[280px] hover:shadow-md hover:border-slate-200 transition-all">
      <CardHeader className="p-0 pb-2">
        <CardTitle className="text-sm sm:text-base md:text-lg font-medium">Performance Timeline</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[160px] sm:h-[180px] md:h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                bottom: 5,
                left: 12, // Increased from 0 to 12 to give more space for y-axis labels
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
              <CartesianGrid strokeDasharray="5 5" opacity={0.1} stroke="#9EA3AD" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#6E6E76', fontSize: 10 }} 
                tickLine={false} 
                axisLine={{ strokeWidth: 1, stroke: '#F5F5F6' }}
                dy={5}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis 
                tick={{ fill: '#6E6E76', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value/1000}k`}
                width={50} // Increased width from 35 to 50 to ensure "$" is fully visible
                padding={{ top: 10 }}
                allowDecimals={false}
                domain={['auto', 'auto']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#9b87f5"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                strokeWidth={1.5}
                activeDot={{ r: 3.5, fill: "#9b87f5", strokeWidth: 0 }}
                name="Revenue"
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#F97316"
                fillOpacity={1}
                fill="url(#colorProfit)"
                strokeWidth={1.5}
                activeDot={{ r: 3.5, fill: "#F97316", strokeWidth: 0 }}
                name="Profit"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
