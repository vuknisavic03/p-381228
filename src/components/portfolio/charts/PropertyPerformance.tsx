
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
  Legend
} from 'recharts';
import { PropertyDataPoint } from '../../../services/portfolioService';

interface PropertyPerformanceProps {
  data?: PropertyDataPoint[];
}

export function PropertyPerformance({ data }: PropertyPerformanceProps) {
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const netProfit = (payload[0]?.value || 0) - (payload[1]?.value || 0);
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-xl">
          <p className="font-semibold text-gray-900 mb-3">{label}</p>
          <div className="space-y-2">
            {payload.map((entry, index) => (
              <div key={index} className="flex items-center justify-between gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-square" style={{ backgroundColor: entry.color }}></div>
                  <span className="text-sm font-medium text-gray-700">{entry.name}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">${Number(entry.value).toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-3">
              <div className="flex items-center justify-between gap-8">
                <span className="text-sm font-medium text-green-700">Net Profit</span>
                <span className="text-sm font-bold text-green-600">${netProfit.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-0 shadow-sm bg-white rounded-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-900">
          Property Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data || []} 
              margin={{ top: 10, right: 10, left: 10, bottom: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis 
                dataKey="property"
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="rect"
                wrapperStyle={{ paddingTop: '20px' }}
              />
              <Bar 
                dataKey="revenue" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                name="Revenue"
              />
              <Bar 
                dataKey="expenses" 
                fill="#ef4444"
                radius={[4, 4, 0, 0]}
                name="Expenses"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
