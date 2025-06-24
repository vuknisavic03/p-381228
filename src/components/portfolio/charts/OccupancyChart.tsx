
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  TooltipProps
} from 'recharts';
import { OccupancyDataPoint } from '../../../services/portfolioService';

interface OccupancyChartProps {
  data?: OccupancyDataPoint[];
}

export function OccupancyChart({ data }: OccupancyChartProps) {
  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
          <p className="font-medium text-gray-900 mb-1">{data.name}</p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">{data.value}</span> units ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-0 shadow-sm bg-white rounded-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Unit Occupancy Status
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="h-[280px] flex items-center">
          <div className="w-1/2 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                  stroke="none"
                >
                  {(data || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-1/2 pl-4">
            <div className="space-y-3">
              {(data || []).map((entry, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm font-medium text-gray-700">{entry.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-semibold text-gray-900">{entry.value}</div>
                    <div className="text-xs text-gray-500">{entry.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
