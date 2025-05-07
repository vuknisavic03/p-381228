
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
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
      <Card className="shadow-md border border-[#E7E8EC] p-4 bg-white h-[300px]">
        <CardHeader className="p-0 pb-2">
          <CardTitle className="text-lg font-medium">Analytics</CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-full">
          <div className="h-[230px] animate-pulse bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Loading data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-lg rounded-md">
          <p className="font-semibold text-gray-700">{label}</p>
          <div className="mt-1">
            {payload.map((entry, index) => (
              <p key={`item-${index}`} style={{ color: entry.color }} className="flex items-center gap-1 text-sm">
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
    <Card className="shadow-md border border-[#E7E8EC] p-4 bg-white h-[300px]">
      <CardHeader className="p-0 pb-2">
        <CardTitle className="text-lg font-medium">Analytics</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[230px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 20,
                left: 10,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#6E6E76', fontSize: 10 }} 
                tickLine={false} 
                axisLine={{ strokeWidth: 1, stroke: '#E7E8EC' }}
              />
              <YAxis 
                tick={{ fill: '#6E6E76', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value/1000}k`}
                width={35}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top"
                height={25}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: '10px' }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#9b87f5"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                strokeWidth={2}
                activeDot={{ r: 4 }}
                name="Revenue"
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#F97316"
                fillOpacity={1}
                fill="url(#colorProfit)"
                strokeWidth={2}
                activeDot={{ r: 4 }}
                name="Profit"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
