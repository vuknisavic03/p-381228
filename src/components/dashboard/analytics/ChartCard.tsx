
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
  // Notion-inspired color mapping
  const getNotionColor = () => {
    switch (title) {
      case "Revenue":
        return "#2563eb"; // Blue
      case "Profit":
        return "#16a34a"; // Green
      case "Income":
        return "#9333ea"; // Purple
      case "Peak Profit":
        return "#ea580c"; // Orange
      default:
        return "#6b7280"; // Gray
    }
  };

  const colorValue = getNotionColor();

  // Custom tooltip component for better visualization
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      if (chartType === "donut") {
        return (
          <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
            <p className="font-medium text-gray-900 mb-1 text-sm">{payload[0].name}</p>
            <p className="font-semibold text-gray-900 flex items-center gap-1 text-sm">
              <span className="text-sm font-medium">Value: </span>
              <span style={{ color: colorValue }}>{`${payload[0].value}%`}</span>
            </p>
          </div>
        );
      }
      
      const safeLabel = typeof label === 'string' ? label : String(label);
      
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
          <p className="font-medium text-gray-900 mb-1 text-sm">{safeLabel || 'Month'}</p>
          <p className="font-semibold text-gray-900 flex items-center gap-1 text-sm">
            <span className="text-sm font-medium">{title}: </span>
            <span style={{ color: colorValue }}>
              {title === "Income" ? `${payload[0].value}%` : `$${payload[0].value.toLocaleString()}`}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

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

  const renderChart = () => {
    if (chartType === "donut") {
      return (
        <div className="flex flex-col items-center h-full">
          <div className="w-full h-[200px] mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Pie
                  data={chartData as DonutDataPoint[]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius="80%"
                  innerRadius="65%"
                  fill={colorValue}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                  animationDuration={800}
                  animationBegin={300}
                  animationEasing="ease-out"
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === 0 ? colorValue : "#f3f4f6"} 
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-1 px-2 text-sm">
            {(chartData as DonutDataPoint[]).map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: index === 0 ? colorValue : "#f3f4f6" }} 
                />
                <span className="text-gray-700">{entry.name}: <span className="font-medium">{entry.value}%</span></span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData as ChartDataPoint[]}
            margin={{
              top: 15,
              right: 5,
              bottom: 5,
              left: 15,
            }}
          >
            <defs>
              <linearGradient id={`color${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colorValue} stopOpacity={0.1} />
                <stop offset="95%" stopColor={colorValue} stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#e5e7eb" 
              opacity={0.5} 
            />
            <XAxis 
              dataKey="month" 
              axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              dy={8}
              padding={{ left: 10, right: 10 }}
              tickFormatter={(value) => {
                if (value instanceof Date) {
                  return value.toLocaleDateString();
                }
                return value;
              }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              width={45}
              tickFormatter={(value) => `$${value}k`}
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
              dataKey="value"
              stroke={colorValue}
              fillOpacity={1}
              fill={`url(#color${title.replace(/\s+/g, '')})`}
              strokeWidth={2}
              name={title}
              animationDuration={1200}
              animationBegin={300}
              animationEasing="ease-out"
              activeDot={{ 
                r: 4, 
                stroke: colorValue, 
                strokeWidth: 2, 
                fill: '#fff',
                strokeOpacity: 1
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
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
        {renderChart()}
      </div>
    </Card>
  );
}
