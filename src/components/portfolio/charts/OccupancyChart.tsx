
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  Legend
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
            {data.value} units ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex flex-col space-y-3 mt-4">
        {payload?.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm font-medium text-gray-700">{entry.value}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">
                {data?.find(d => d.name === entry.value)?.value || 0}
              </div>
              <div className="text-xs text-gray-500">
                {data?.find(d => d.name === entry.value)?.percentage || 0}%
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Unit Occupancy Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data || []}
                cx="50%"
                cy="45%"
                outerRadius={80}
                dataKey="value"
                stroke="#fff"
                strokeWidth={2}
              >
                {(data || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                content={<CustomLegend />}
                wrapperStyle={{ paddingTop: '20px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
