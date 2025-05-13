
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
  CartesianGrid,
  Legend
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
          <div className="backdrop-blur-md bg-white/90 p-3 border border-slate-200/50 shadow-xl rounded-lg">
            <p className="font-medium text-slate-800 mb-1">{payload[0].name}</p>
            <p className="font-semibold text-slate-900 flex items-center gap-1">
              <span className="text-sm font-medium">Value: </span>
              <span style={{ color: colorValue }}>{`${payload[0].value}%`}</span>
            </p>
          </div>
        );
      }
      
      return (
        <div className="backdrop-blur-md bg-white/90 p-3 border border-slate-200/50 shadow-xl rounded-lg">
          <p className="font-medium text-slate-800 mb-1">{label || 'Month'}</p>
          <p className="font-semibold text-slate-900 flex items-center gap-1">
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

  // Custom legend that better follows the image design
  const CustomLegend = () => {
    if (!legendLabel) return null;
    
    return (
      <div className="flex items-center gap-2 mb-3 ml-2 mt-2">
        <div className="w-5 h-5 rounded-sm" style={{ backgroundColor: colorValue }}></div>
        <span className="text-sm text-gray-600">{legendLabel}</span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <Card className="p-5 shadow-md border border-slate-100 h-[520px] transition-all hover:shadow-lg bg-white">
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
          <div className="h-[420px] bg-gray-100 animate-pulse rounded-lg"></div>
        </div>
      </Card>
    );
  }

  const renderChart = () => {
    if (chartType === "donut") {
      return (
        <div className="flex flex-col items-center h-full">
          <CustomLegend />
          <ResponsiveContainer width="100%" height="88%">
            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Pie
                data={chartData as DonutDataPoint[]}
                cx="50%"
                cy="45%"
                labelLine={false}
                outerRadius={140}
                innerRadius={110}
                fill={colorValue}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                stroke="none"
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
          <div className="flex justify-center gap-6 mt-1">
            {(chartData as DonutDataPoint[]).map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ 
                    backgroundColor: index === 0 ? colorValue : "#F8F9FE", 
                    border: `1.5px solid ${index === 0 ? colorValue : "#F0F2FA"}` 
                  }} 
                />
                <span className="text-sm text-gray-700">{entry.name}: <span className="font-medium">{entry.value}%</span></span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    const gradientStartOpacity = chartType === "spline" ? 0.8 : 0.7;

    return (
      <div className="h-full flex flex-col">
        <CustomLegend />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData as ChartDataPoint[]}
            margin={{
              top: 20,
              right: 10,
              bottom: 20,
              left: 0,
            }}
          >
            <defs>
              <linearGradient id={`color${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colorValue} stopOpacity={gradientStartOpacity} />
                <stop offset="95%" stopColor={colorValue} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#F0F2FA" opacity={0.5} />
            <XAxis 
              dataKey="month" 
              axisLine={{ stroke: '#F5F5F6', strokeWidth: 1 }}
              tickLine={false}
              tick={{ fill: '#6E6E76', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6E6E76', fontSize: 12 }}
              width={40}
              tickFormatter={(value) => `$${value}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type={chartType === "spline" ? "monotone" : "linear"}
              dataKey="value"
              stroke={colorValue}
              fillOpacity={1}
              fill={`url(#color${title.replace(/\s+/g, '')})`}
              strokeWidth={3}
              name={title}
              activeDot={{ 
                r: 7, 
                stroke: colorValue, 
                strokeWidth: 2, 
                fill: '#fff',
                strokeOpacity: 0.8
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <Card className="p-6 shadow-sm border border-slate-100 h-[520px] transition-all hover:shadow-md hover:border-slate-200 bg-white flex flex-col">
      <CardHeader className="p-0 pb-5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <div className={`${color} text-white p-2.5 rounded-md`}>
            <Icon size={20} />
          </div>
        </div>
      </CardHeader>
      
      <div className="mt-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold">{value}</span>
          <span className={`text-sm ${change.positive ? 'text-green-500' : 'text-red-500'} flex items-center`}>
            {change.positive ? '+' : '-'}{Math.abs(change.value)}%
          </span>
        </div>
      </div>
      
      <div className="mt-6 flex-grow h-[420px] border-t border-[#F5F5F6] pt-4">
        {renderChart()}
      </div>
    </Card>
  );
}
