
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
      case "Analytics":
        return "#9333ea"; // Purple
      case "Expenses":
        return "#dc2626"; // Red
      default:
        return "#6b7280"; // Gray
    }
  };

  const colorValue = getNotionColor();

  // Enhanced color mapping for expense categories with more distinct colors
  const getCategoryColor = (name: string, index: number) => {
    const colors = {
      "Property Maintenance": "#dc2626", // Red
      "Marketing & Advertising": "#f59e0b", // Amber
      "Utilities & Services": "#0ea5e9", // Sky
      "Insurance & Legal": "#8b5cf6", // Purple
      "Office & Administration": "#059669" // Emerald
    };
    return colors[name] || ["#dc2626", "#f59e0b", "#0ea5e9", "#8b5cf6", "#059669"][index];
  };

  // Custom tooltip component for better visualization
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      if (chartType === "donut") {
        return (
          <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
            <p className="font-medium text-gray-900 mb-1 text-sm">{payload[0].name}</p>
            <p className="font-semibold text-gray-900 flex items-center gap-1 text-sm">
              <span className="text-sm font-medium">Value: </span>
              <span style={{ color: getCategoryColor(payload[0].name, 0) }}>{`${payload[0].value}%`}</span>
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
              {title === "Analytics" ? `${payload[0].value.toLocaleString()}%` : `$${payload[0].value.toLocaleString()}`}
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
        <div className="flex items-center justify-center h-full gap-6">
          {/* Chart centered */}
          <div className="w-[60%] h-[200px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Pie
                  data={chartData as DonutDataPoint[]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius="85%"
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
                      fill={getCategoryColor(entry.name, index)} 
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend on the right */}
          <div className="w-[40%] flex flex-col justify-center gap-3">
            <div className="space-y-3">
              <div className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-1">
                Top Expenses Categories
              </div>
              {(chartData as DonutDataPoint[]).map((entry, index) => (
                <div key={index} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: getCategoryColor(entry.name, index) }} 
                    />
                    <span className="text-sm text-gray-700 truncate">{entry.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 flex-shrink-0">{entry.value}%</span>
                </div>
              ))}
            </div>
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
              top: 10,
              right: 5,
              bottom: 10,
              left: 5,
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
              padding={{ left: 18, right: 10 }}
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
              dx={-8}
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

  // Analytics card gets special treatment - no title section
  if (title === "Analytics") {
    return (
      <Card className="p-5 border border-gray-200 h-full min-h-[280px] bg-white flex flex-col">
        <div className="flex-grow">
          {renderChart()}
        </div>
      </Card>
    );
  }

  // All other cards get the full header with title, value, and change
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
