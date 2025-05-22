
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
          <div className="backdrop-blur-md bg-white/95 p-2.5 border border-slate-100 shadow-xl rounded-lg">
            <p className="font-medium text-slate-800 text-xs mb-1">{payload[0].name}</p>
            <p className="font-semibold text-slate-900 flex items-center gap-1.5 text-xs">
              <span className="font-medium">{`${payload[0].value}%`}</span>
            </p>
          </div>
        );
      }
      
      // Ensure label is a string before rendering it
      const safeLabel = typeof label === 'string' ? label : String(label);
      
      return (
        <div className="backdrop-blur-md bg-white/95 p-2.5 border border-slate-100 shadow-xl rounded-lg">
          <p className="font-medium text-slate-800 mb-1 text-xs">{safeLabel}</p>
          <p className="font-semibold text-slate-900 flex items-center gap-1.5 text-xs">
            <span style={{ color: colorValue }}>
              {title === "Income" ? `${payload[0].value}%` : `$${payload[0].value}k`}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <Card className="p-4 shadow-md border border-slate-100 h-full transition-all bg-white rounded-xl">
        <CardHeader className="p-0 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">{title}</CardTitle>
            <div className={`${color} text-white p-1.5 rounded-lg`}>
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
          <div className="h-[150px] bg-gray-50 animate-pulse rounded-lg"></div>
        </div>
      </Card>
    );
  }

  const renderChart = () => {
    if (chartType === "donut") {
      return (
        <div className="flex flex-col items-center h-full">
          <div className="w-full h-[150px] mb-1">
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
                  animationBegin={200}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === 0 ? colorValue : "#F8F9FE"} 
                      stroke={index === 0 ? colorValue : "#F0F2FA"}
                      strokeWidth={1}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-1 px-1 text-xs">
            {(chartData as DonutDataPoint[]).map((entry, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <div 
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ 
                    backgroundColor: index === 0 ? colorValue : "#F8F9FE", 
                    border: `1px solid ${index === 0 ? colorValue : "#F0F2FA"}` 
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
      <div className="h-[150px]">
        <ResponsiveContainer width="100%" height="100%" className="animate-fade-in">
          <AreaChart
            data={chartData as ChartDataPoint[]}
            margin={{
              top: 10,
              right: 5,
              bottom: 5,
              left: 10,
            }}
          >
            <defs>
              <linearGradient id={`color${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colorValue} stopOpacity={gradientStartOpacity} />
                <stop offset="95%" stopColor={colorValue} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke="#F0F2FA" 
              opacity={0.4} 
            />
            <XAxis 
              dataKey="month" 
              axisLine={{ stroke: '#F5F5F6', strokeWidth: 0.5 }}
              tickLine={false}
              tick={{ fill: '#6E6E76', fontSize: 10 }}
              dy={5}
              padding={{ left: 5, right: 5 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6E6E76', fontSize: 10 }}
              width={30}
              tickFormatter={(value) => `${value}`}
              padding={{ top: 5 }}
              allowDecimals={false}
              domain={['auto', 'auto']}
            />
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ 
                stroke: "#F5F5F6", 
                strokeWidth: 0.5, 
                fill: "rgba(240, 240, 245, 0.2)"  
              }} 
            />
            <Area
              type={chartType === "spline" ? "monotone" : "linear"}
              dataKey="value"
              stroke={colorValue}
              fillOpacity={1}
              fill={`url(#color${title.replace(/\s+/g, '')})`}
              strokeWidth={1.5}
              name={title}
              animationDuration={1200}
              animationBegin={300}
              activeDot={{ 
                r: 4, 
                stroke: colorValue, 
                strokeWidth: 1.5, 
                fill: '#fff',
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <Card className="p-4 shadow-sm border border-slate-100/80 h-full transition-all duration-300 hover:shadow-md hover:border-slate-200 bg-white flex flex-col animate-fade-in card-hover-effect rounded-xl">
      <CardHeader className="p-0 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <div className={`${color} text-white p-1.5 rounded-lg`}>
            <Icon size={18} />
          </div>
        </div>
      </CardHeader>
      
      <div className="mt-1">
        <div className="flex items-baseline space-x-2">
          <span className="text-xl font-bold">{value}</span>
          <span className={`text-xs ${change.positive ? 'text-green-500' : 'text-red-500'} flex items-center`}>
            {change.positive ? '+' : '-'}{Math.abs(change.value)}%
          </span>
        </div>
      </div>
      
      <div className="mt-3 flex-grow border-t border-[#F5F5F6]/70 pt-3">
        <div className="chart-animation-container">
          {renderChart()}
        </div>
      </div>
    </Card>
  );
}
