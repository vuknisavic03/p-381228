
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
  Legend
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
      <Card className="shadow-md border border-[#F0F2FA]/60 p-4 bg-white h-[240px] animate-fade-in rounded-xl">
        <CardHeader className="p-0 pb-3">
          <CardTitle className="text-base font-medium">Performance Timeline</CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-full">
          <div className="h-[180px] animate-pulse bg-[#F8F9FE] rounded-lg flex items-center justify-center">
            <p className="text-[#9EA3AD] text-sm">Loading data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Make sure data is formatted correctly
  const safeData = data.map(point => ({
    ...point,
    month: typeof point.month === 'string' ? point.month : String(point.month)
  }));

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="backdrop-blur-md bg-white/95 p-3 border border-[#F0F2FA]/80 shadow-lg rounded-lg">
          <p className="font-medium text-[#1A1F2C] mb-1.5 text-xs">{label}</p>
          <div className="space-y-1">
            {payload.map((entry, index) => (
              <p key={`item-${index}`} className="flex items-center gap-1.5 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }}></span>
                <span className="font-medium">{entry.name}:</span>
                <span className="font-semibold">${Number(entry.value).toLocaleString()}</span>
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-sm border border-[#F0F2FA]/60 p-4 bg-white h-[240px] hover:shadow-md transition-all duration-300 animate-fade-in rounded-xl">
      <CardHeader className="p-0 pb-2.5">
        <CardTitle className="text-base font-medium text-[#1A1F2C]">
          {periodLabel}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[190px]">
          <ResponsiveContainer width="100%" height="100%" className="animate-fade-in">
            <AreaChart
              data={safeData}
              margin={{
                top: 15,
                right: 5,
                bottom: 25,
                left: 5,
              }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} stroke="#9EA3AD" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#6E6E76', fontSize: 10 }} 
                tickLine={false} 
                axisLine={{ strokeWidth: 0.5, stroke: '#F5F5F6' }}
                dy={10}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis 
                tick={{ fill: '#6E6E76', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value/1000}k`}
                width={40}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ 
                  stroke: "#F5F5F6", 
                  strokeWidth: 0.5,
                  fill: "rgba(240, 240, 245, 0.2)"  
                }}
              />
              <Legend 
                verticalAlign="bottom"
                height={30}
                iconType="circle"
                iconSize={8}
                formatter={(value) => <span className="text-xs font-medium text-gray-700">{value}</span>}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#9b87f5"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                strokeWidth={1.5}
                activeDot={{ r: 4, fill: "#9b87f5", strokeWidth: 0 }}
                name="Revenue"
                animationDuration={1200}
                animationBegin={300}
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#F97316"
                fillOpacity={1}
                fill="url(#colorProfit)"
                strokeWidth={1.5}
                activeDot={{ r: 4, fill: "#F97316", strokeWidth: 0 }}
                name="Profit"
                animationDuration={1200}
                animationBegin={500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
