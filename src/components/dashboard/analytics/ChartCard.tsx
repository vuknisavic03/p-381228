
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
  legendLabel?: string;
}

export function ChartCard({
  title,
  icon: Icon,
  color,
  value,
  change,
  chartData,
  chartType,
  isLoading = false,
  legendLabel
}: ChartCardProps) {
  const colorValue = color.replace("bg-[", "").replace("]", "");

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      if (chartType === "donut") {
        return (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
            <p className="text-sm font-medium text-gray-900 mb-1">{payload[0].name}</p>
            <p className="text-sm text-gray-600">{`${payload[0].value}%`}</p>
          </div>
        );
      }
      
      const safeLabel = typeof label === 'string' ? label : String(label);
      
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
          <p className="text-sm font-medium text-gray-900 mb-1">{safeLabel}</p>
          <p className="text-sm text-gray-600">
            {title === "Income" ? `${payload[0].value}%` : `$${payload[0].value.toLocaleString()}`}
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <Card className="p-6 border border-gray-200 rounded-lg bg-white">
        <CardHeader className="p-0 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium text-gray-900">{title}</CardTitle>
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
              <Icon size={16} className="text-gray-400" />
            </div>
          </div>
        </CardHeader>
        
        <div className="space-y-4">
          <div className="h-5 w-24 bg-gray-100 rounded animate-pulse"></div>
          <div className="h-32 bg-gray-50 rounded animate-pulse"></div>
        </div>
      </Card>
    );
  }

  const renderChart = () => {
    if (chartType === "donut") {
      return (
        <div className="h-32 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData as DonutDataPoint[]}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={50}
                fill={colorValue}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === 0 ? colorValue : "#f3f4f6"} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
    }

    return (
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData as ChartDataPoint[]}
            margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
          >
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colorValue} stopOpacity={0.1} />
                <stop offset="95%" stopColor={colorValue} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#6b7280' }}
              tickFormatter={(value) => {
                if (value instanceof Date) {
                  return value.toLocaleDateString();
                }
                return value;
              }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={colorValue}
              strokeWidth={2}
              fill={`url(#gradient-${title})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <Card className="p-6 border border-gray-200 rounded-lg bg-white hover:border-gray-300 transition-colors">
      <CardHeader className="p-0 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium text-gray-900">{title}</CardTitle>
          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
            <Icon size={16} className="text-gray-600" />
          </div>
        </div>
      </CardHeader>
      
      <div className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-gray-900">{value}</span>
          <span className={`text-sm ${change.positive ? 'text-green-600' : 'text-red-600'}`}>
            {change.positive ? '+' : '-'}{Math.abs(change.value)}%
          </span>
        </div>
        
        {renderChart()}
      </div>
    </Card>
  );
}
