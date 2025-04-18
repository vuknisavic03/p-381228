
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { month: "Sep", revenue: 0, expenses: 0 },
  { month: "Oct", revenue: 0, expenses: 0 },
  { month: "Nov", revenue: 0, expenses: 0 },
  { month: "Dec", revenue: 0, expenses: 0 },
  { month: "Jan", revenue: 0, expenses: 0 },
  { month: "Feb", revenue: 0, expenses: 0 },
];

export function ProfitChart() {
  return (
    <div className="bg-white shadow-[0px_4px_12px_5px_rgba(243,243,246,0.3)] p-6 rounded-[10px] border-[#E4E5EA]">
      <h2 className="text-black text-[22px] font-medium">Profit</h2>
      <div className="flex gap-4 mt-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-[#0283FA] rounded-[10px]" />
          <span className="text-sm text-[#9EA3AD]">Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-[#FF718B] rounded-lg" />
          <span className="text-sm text-[#9EA3AD]">Expenses</span>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              ticks={[0, 10, 20, 30]}
              domain={[0, 30]}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#0283FA"
              strokeWidth={2}
              dot={{ fill: "#0283FA", r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#FF718B"
              strokeWidth={2}
              dot={{ fill: "#FF718B", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
