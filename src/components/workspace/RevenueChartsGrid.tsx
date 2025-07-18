
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BarChart } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  ResponsiveContainer, 
  Tooltip,
  YAxis,
  CartesianGrid
} from "recharts";
import { Workspace } from '@/data/workspaceData';

interface RevenueChartsGridProps {
  workspaces: Workspace[];
  onWorkspaceSelect: (workspace: Workspace) => void;
}

export const RevenueChartsGrid: React.FC<RevenueChartsGridProps> = ({
  workspaces,
  onWorkspaceSelect
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
          <p className="font-medium text-gray-900 mb-1 text-sm">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="font-semibold text-gray-900 flex items-center gap-1 text-sm">
              <span className="text-sm font-medium">{entry.dataKey === 'value' ? 'Revenue: ' : ''}</span>
              <span>${entry.value}k</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-2 gap-4 px-1">
      {workspaces.map((workspace, index) => (
        <Card 
          key={index}
          className="overflow-hidden border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer bg-white"
          onClick={() => onWorkspaceSelect(workspace)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="min-w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                  {workspace.initials}
                </div>
                <div>
                  <div className="text-gray-900 font-medium text-base">{workspace.name}</div>
                  <div className="text-sm text-gray-600">{workspace.owner}</div>
                </div>
              </div>
              <div className="text-blue-600 p-1 rounded-lg">
                <BarChart size={18} />
              </div>
            </div>
            
            <div className="h-36 mt-2 pt-3 border-t border-gray-200">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={workspace.revenueData}
                  margin={{ top: 5, right: 5, left: 8, bottom: 8 }}
                >
                  <defs>
                    <linearGradient id={`colorRevenue${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    dy={8}
                    tick={{ fill: '#6b7280', fontSize: 10 }}
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6b7280', fontSize: 10 }}
                    width={35}
                    dx={-8}
                    tickFormatter={(value) => `$${value}k`}
                    padding={{ top: 10 }}
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
                    stroke="#2563eb"
                    fillOpacity={1}
                    fill={`url(#colorRevenue${index})`}
                    strokeWidth={2}
                    name="revenue"
                    activeDot={{ r: 4, strokeWidth: 0, fill: "#2563eb" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
