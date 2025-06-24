
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
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-xl">
          <p className="font-semibold text-gray-900 mb-2">{data.name}</p>
          <p className="text-sm text-gray-600">
            <span className="font-bold">{data.value}</span> units ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-0 shadow-sm bg-white rounded-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-900">
          Unit Occupancy Status
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="flex items-center h-[320px]">
          <div className="w-3/5 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data || []}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
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
          <div className="w-2/5 pl-6">
            <div className="space-y-4">
              {(data || []).map((entry, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm font-medium text-gray-700">{entry.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{entry.value}</div>
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
