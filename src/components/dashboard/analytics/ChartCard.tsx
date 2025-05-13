
import React from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import { ChartDataPoint, DonutDataPoint } from "@/services/analyticsService";

interface ChartCardProps {
  title: string;
  icon: LucideIcon;
  color: string;
  value: string | number;
  change: {
    value: number;
    positive: boolean;
  };
  chartData: ChartDataPoint[] | DonutDataPoint[];
  chartType: "area" | "donut" | "spline";
  isLoading?: boolean;
}

export function ChartCard({
  title,
  icon: Icon,
  color,
  value,
  change,
  chartData,
  chartType,
  isLoading = false
}: ChartCardProps) {
  const colorValue = color.replace("bg-[", "").replace("]", "");

  // Custom tooltip component for better visualization
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      if (chartType === "donut") {
        return (
          <div className="bg-white p-2 border border-[#F5F5F6] shadow-lg rounded-md">
            <p className="font-medium text-gray-700">{payload[0].name}</p>
            <p className="font-semibold text-gray-800">{`${payload[0].value}%`}</p>
          </div>
        );
      }
      
      return (
        <div className="bg-white p-2 border border-[#F5F5F6] shadow-lg rounded-md">
          <p className="font-medium text-gray-700">{label || 'Month'}</p>
          <p className="font-semibold text-gray-800" style={{ color: colorValue }}>
            {title === "Income" ? `${payload[0].value}%` : `${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <Card className="p-5 shadow-md border border-[#F5F5F6] h-[450px] transition-all hover:shadow-lg bg-white">
        <CardHeader className="p-0 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">{title}</CardTitle>
            <div className={`${color} text-white p-2 rounded-md`}>
              <Icon size={18} />
            </div>
          </div>
        </CardHeader>
        
        <div className="mt-2">
          <div className="flex items-baseline space-x-2">
            <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-md"></div>
          </div>
        </div>
        
        <div className="mt-4 flex-grow">
          <div className="h-[340px] bg-gray-100 animate-pulse rounded-lg"></div>
        </div>
      </Card>
    );
  }

  const renderChart = () => {
    if (chartType === "donut") {
      return (
        <div className="flex flex-col items-center h-full">
          <ResponsiveContainer width="100%" height="88%">
            <PieChart margin={{ top: 0, right: 0, bottom: 10, left: 0 }}>
              <Pie
                data={chartData as DonutDataPoint[]}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={110}
                innerRadius={85}
                fill={colorValue}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === 0 ? colorValue : "#F8F8F9"} 
                    stroke={index === 0 ? colorValue : "#F5F5F6"}
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-1">
            {(chartData as DonutDataPoint[]).map((entry, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <div 
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ 
                    backgroundColor: index === 0 ? colorValue : "#F8F8F9", 
                    border: `1px solid ${index === 0 ? colorValue : "#F5F5F6"}` 
                  }} 
                />
                <span className="text-xs text-gray-700">{entry.name}: {entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData as ChartDataPoint[]}
          margin={{
            top: 15,
            right: 5,
            bottom: 15,
            left: -10,
          }}
        >
          <defs>
            <linearGradient id={`color${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colorValue} stopOpacity={0.8} />
              <stop offset="95%" stopColor={colorValue} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5F6" />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6E6E76', fontSize: 11 }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6E6E76', fontSize: 11 }}
            width={30}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type={chartType === "spline" ? "monotone" : "linear"}
            dataKey="value"
            stroke={colorValue}
            fillOpacity={1}
            fill={`url(#color${title.replace(/\s+/g, '')})`}
            strokeWidth={2.5}
            activeDot={{ 
              r: 6, 
              stroke: colorValue, 
              strokeWidth: 1, 
              fill: '#fff',
              strokeDasharray: "" 
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Card className="p-5 shadow-md border border-[#F5F5F6] h-[450px] transition-all hover:shadow-lg bg-white flex flex-col">
      <CardHeader className="p-0 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <div className={`${color} text-white p-2 rounded-md`}>
            <Icon size={18} />
          </div>
        </div>
      </CardHeader>
      
      <div className="mt-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold">{value}</span>
          <span className={`text-sm ${change.positive ? 'text-green-500' : 'text-red-500'}`}>
            {change.positive ? '+' : '-'}{Math.abs(change.value)}%
          </span>
        </div>
      </div>
      
      <div className="mt-2 flex-grow h-[340px]">
        {renderChart()}
      </div>
    </Card>
  );
}
