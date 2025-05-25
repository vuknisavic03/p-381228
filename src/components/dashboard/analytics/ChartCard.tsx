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

  // Custom tooltip component for better visualization
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      if (chartType === "donut") {
        return (
          <div className="backdrop-blur-md bg-white/95 p-2.5 sm:p-3.5 border border-slate-100 shadow-lg rounded-lg">
            <p className="font-medium text-slate-800 mb-1 text-xs sm:text-sm">{payload[0].name}</p>
            <p className="font-semibold text-slate-900 flex items-center gap-1 text-xs sm:text-sm">
              <span className="text-xs font-medium">Value: </span>
              <span style={{ color: colorValue }}>{`${payload[0].value}%`}</span>
            </p>
          </div>
        );
      }
      
      // Ensure label is a string before rendering it
      const safeLabel = typeof label === 'string' ? label : String(label);
      
      return (
        <div className="backdrop-blur-md bg-white/95 p-2.5 sm:p-3.5 border border-slate-100 shadow-lg rounded-lg">
          <p className="font-medium text-slate-800 mb-1 text-xs sm:text-sm">{safeLabel || 'Month'}</p>
          <p className="font-semibold text-slate-900 flex items-center gap-1 text-xs sm:text-sm">
            <span className="text-xs font-medium">{title}: </span>
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
      <Card className="p-4 sm:p-5 shadow-sm border border-slate-100 h-full min-h-[280px] transition-all bg-white">
        <CardHeader className="p-0 pb-3 md:pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-lg font-medium">{title}</CardTitle>
            <div className={`${color} text-white p-2 rounded-md`}>
              <Icon size={18} className="sm:w-5 sm:h-5" />
            </div>
          </div>
        </CardHeader>
        
        <div className="mt-2">
          <div className="flex items-baseline space-x-2">
            <div className="h-6 w-24 bg-gray-100 animate-pulse rounded-md"></div>
          </div>
        </div>
        
        <div className="mt-4 flex-grow">
          <div className="h-[180px] sm:h-[200px] bg-gray-50 animate-pulse rounded-lg"></div>
        </div>
      </Card>
    );
  }

  const renderChart = () => {
    if (chartType === "donut") {
      return (
        <div className="flex flex-col items-center h-full">
          <div className="w-full h-[160px] sm:h-[180px] md:h-[200px] mb-2">
            <ResponsiveContainer width="100%" height="100%" className="animate-fade-in">
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
                      fill={index === 0 ? colorValue : "#F8F9FE"} 
                      stroke={index === 0 ? colorValue : "#F0F2FA"}
                      strokeWidth={1.5}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-1 px-1 sm:px-2 text-xs sm:text-sm">
            {(chartData as DonutDataPoint[]).map((entry, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <div 
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                  style={{ 
                    backgroundColor: index === 0 ? colorValue : "#F8F9FE", 
                    border: `1.5px solid ${index === 0 ? colorValue : "#F0F2FA"}` 
                  }} 
                />
                <span className="text-xs text-gray-700">{entry.name}: <span className="font-medium">{entry.value}%</span></span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    const gradientStartOpacity = chartType === "spline" ? 0.8 : 0.7;

    return (
      <div className="h-[160px] sm:h-[180px] md:h-[220px]">
        <ResponsiveContainer width="100%" height="100%" className="animate-fade-in">
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
                <stop offset="5%" stopColor={colorValue} stopOpacity={gradientStartOpacity} />
                <stop offset="95%" stopColor={colorValue} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="5 5" 
              vertical={false} 
              stroke="#F0F2FA" 
              opacity={0.5} 
            />
            <XAxis 
              dataKey="month" 
              axisLine={{ stroke: '#F5F5F6', strokeWidth: 1 }}
              tickLine={false}
              tick={{ fill: '#6E6E76', fontSize: 10 }}
              dy={8}
              padding={{ left: 10, right: 10 }}
              // Ensure dates are converted to strings
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
              tick={{ fill: '#6E6E76', fontSize: 10 }}
              width={45}
              tickFormatter={(value) => `$${value}k`}
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
              type={chartType === "spline" ? "monotone" : "linear"}
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
    <Card className="p-4 sm:p-5 shadow-sm border border-slate-100 h-full min-h-[280px] transition-all hover:shadow-md hover:border-slate-200 bg-white flex flex-col animate-fade-in">
      <CardHeader className="p-0 pb-2 sm:pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm sm:text-base md:text-lg font-medium">{title}</CardTitle>
          <div className={`${color} text-white p-1.5 sm:p-2 rounded-md`}>
            <Icon size={18} className="sm:w-5 sm:h-5" />
          </div>
        </div>
      </CardHeader>
      
      <div className="mt-1 sm:mt-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-xl sm:text-2xl md:text-3xl font-bold">{value}</span>
          <span className={`text-xs sm:text-sm ${change.positive ? 'text-green-500' : 'text-red-500'} flex items-center`}>
            {change.positive ? '+' : '-'}{Math.abs(change.value)}%
          </span>
        </div>
      </div>
      
      <div className="mt-3 sm:mt-4 md:mt-5 flex-grow border-t border-[#F5F5F6] pt-3 sm:pt-4">
        {renderChart()}
      </div>
    </Card>
  );
}
