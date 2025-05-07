
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
  TooltipProps
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
          <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
            <p className="font-medium text-gray-700">{payload[0].name}</p>
            <p className="font-semibold text-gray-800">{`${payload[0].value}%`}</p>
          </div>
        );
      }
      
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
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
      <Card className="p-6 shadow-md border border-[#E7E8EC] min-h-[250px] transition-all hover:shadow-lg bg-white">
        <CardHeader className="p-0 pb-4 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <div className={`${color} text-white p-2 rounded-md`}>
            <Icon size={18} />
          </div>
        </CardHeader>
        
        <div className="mt-2">
          <div className="flex items-baseline space-x-2">
            <div className="h-8 w-20 bg-gray-200 animate-pulse rounded-md"></div>
          </div>
        </div>
        
        <div className="mt-4 flex-grow">
          <div className="h-[180px] bg-gray-100 animate-pulse rounded-lg"></div>
        </div>
      </Card>
    );
  }

  const renderChart = () => {
    if (chartType === "donut") {
      return (
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={chartData as DonutDataPoint[]}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={60}
              innerRadius={40}
              fill={colorValue}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === 0 ? colorValue : "#F3F4F6"} 
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    // Default to area chart
    return (
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart
          data={chartData as ChartDataPoint[]}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id={`color${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colorValue} stopOpacity={0.8} />
              <stop offset="95%" stopColor={colorValue} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Tooltip content={<CustomTooltip />} />
          <Area
            type={chartType === "spline" ? "monotone" : "linear"}
            dataKey="value"
            stroke={colorValue}
            fillOpacity={1}
            fill={`url(#color${title.replace(/\s+/g, '')})`}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Card className="p-6 shadow-md border border-[#E7E8EC] min-h-[250px] transition-all hover:shadow-lg bg-white">
      <CardHeader className="p-0 pb-4 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <div className={`${color} text-white p-2 rounded-md`}>
          <Icon size={18} />
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
      
      <div className="mt-4 flex-grow">
        {renderChart()}
      </div>
    </Card>
  );
}
