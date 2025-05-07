
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Sample data for the timeline
const timelineData = [
  { month: "Jan", revenue: 31000, profit: 11000 },
  { month: "Feb", revenue: 40000, profit: 32000 },
  { month: "Mar", revenue: 28000, profit: 45000 },
  { month: "Apr", revenue: 51000, profit: 32000 },
  { month: "May", revenue: 42000, profit: 34000 },
  { month: "Jun", revenue: 109000, profit: 52000 },
  { month: "Jul", revenue: 100000, profit: 41000 },
];

export function Timeline() {
  return (
    <Card className="shadow-md border border-[#E7E8EC] p-6 bg-white">
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-lg font-medium">Performance Timeline</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={timelineData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#6E6E76', fontSize: 12 }} 
                tickLine={false} 
              />
              <YAxis 
                tick={{ fill: '#6E6E76', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value/1000}k`}
              />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
                labelFormatter={(label) => `Month: ${label}`}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E7E8EC",
                  borderRadius: "4px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#9b87f5"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                strokeWidth={2}
                activeDot={{ r: 6 }}
                name="Revenue"
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#F97316"
                fillOpacity={1}
                fill="url(#colorProfit)"
                strokeWidth={2}
                activeDot={{ r: 6 }}
                name="Profit"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
