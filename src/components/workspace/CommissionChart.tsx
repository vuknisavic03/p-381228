
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from 'lucide-react';
import { 
  ResponsiveContainer, 
  Tooltip,
  BarChart as RechartsBarChart,
  Bar,
  YAxis,
  XAxis,
  CartesianGrid
} from "recharts";
import { monthlyCommissionData } from '@/data/workspaceData';

export const CommissionChart: React.FC = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
          <p className="font-medium text-gray-900 mb-1 text-sm">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="font-semibold text-gray-900 flex items-center gap-1 text-sm">
              <span className="text-sm font-medium">{entry.dataKey === 'commission' ? 'Commission: ' : ''}</span>
              <span>${entry.value}k</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="px-1 h-[calc(100vh-120px)]">
      <Card 
        className="overflow-hidden border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all bg-white h-full"
      >
        <CardContent className="p-5 h-full">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-medium text-gray-900">Monthly Manager Commission</h3>
              <p className="text-sm text-gray-600">Commission earnings for current year (2025)</p>
            </div>
            <div className="text-green-600 p-1 rounded-lg">
              <TrendingUp size={22} />
            </div>
          </div>
          
          <div className="h-[calc(100%-70px)] border-t border-gray-200">
            <ResponsiveContainer width="100%" height="95%">
              <RechartsBarChart
                data={monthlyCommissionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.5} stroke="#e5e7eb" />
                <XAxis 
                  dataKey="month" 
                  axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                  tickLine={false}
                  dy={8}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickFormatter={(value) => `$${value}k`}
                  width={45}
                  padding={{ top: 16 }}
                  domain={['auto', 'auto']}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ 
                    fill: "rgba(229, 231, 235, 0.1)", 
                    stroke: "#e5e7eb",
                    strokeWidth: 1,
                    opacity: 0.9
                  }} 
                />
                <Bar 
                  dataKey="commission" 
                  fill="#16a34a"
                  fillOpacity={0.85}
                  radius={[4, 4, 0, 0]}
                  name="Commission"
                />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
