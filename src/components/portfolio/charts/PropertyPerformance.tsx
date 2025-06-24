
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
      const revenue = payload.find(p => p.dataKey === 'revenue')?.value || 0;
      const expenses = payload.find(p => p.dataKey === 'expenses')?.value || 0;
      const netProfit = Number(revenue) - Number(expenses);
      
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry, index) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: entry.color }}></div>
                  <span className="text-sm text-gray-600">{entry.name}:</span>
                </div>
                <span className="text-sm font-semibold">${Number(entry.value).toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t pt-1 mt-2">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-green-700">Net Profit:</span>
                <span className="text-sm font-semibold text-green-600">${netProfit.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-0 shadow-sm bg-white rounded-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Property Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data || []} 
              margin={{ top: 5, right: 5, left: 5, bottom: 70 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis 
                dataKey="property"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={25}
                iconType="rect"
                wrapperStyle={{ paddingTop: '8px', fontSize: '12px' }}
              />
              <Bar 
                dataKey="revenue" 
                fill="#3b82f6"
                radius={[2, 2, 0, 0]}
                name="Revenue"
              />
              <Bar 
                dataKey="expenses" 
                fill="#ef4444"
                radius={[2, 2, 0, 0]}
                name="Expenses"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
