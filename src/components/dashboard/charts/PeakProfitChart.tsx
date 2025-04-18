
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { ArrowUpRight } from "lucide-react";

const data = [
  { month: "Avg", value: 0 },
  { month: "Sep", value: 0 },
  { month: "Oct", value: 0 },
  { month: "Nov", value: 0 },
  { month: "Dec", value: 0 },
];

export function PeakProfitChart() {
  return (
    <div className="bg-white shadow-[0px_4px_12px_5px_rgba(243,243,246,0.3)] p-6 rounded-[10px] border-[#E4E5EA]">
      <h2 className="text-black text-[22px] font-medium mb-6">Peak Profit Achieved</h2>
      <div className="h-[200px] mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#0283FA"
              strokeWidth={2}
              dot={{ fill: "#0283FA", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-7">
          <span className="text-[#465365]">Avg</span>
          <span className="text-[#465365]">Sep</span>
          <span className="bg-[#006FB5] text-white px-5 py-2 rounded-[30px]">
            October
          </span>
          <span className="text-[#465365]">Nov</span>
          <span className="text-[#465365]">Dec</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-[44px] font-bold text-[#1E1B39]">$0,00</span>
          <div className="flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4 text-[#04CE00]" />
            <span className="text-sm text-[#1E1B39] font-medium">0%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
