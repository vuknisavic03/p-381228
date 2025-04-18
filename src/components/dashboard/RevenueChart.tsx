
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

const data = [
  { month: "Sep", value: 0 },
  { month: "Oct", value: 0 },
  { month: "Nov", value: 0 },
  { month: "Dec", value: 0 },
  { month: "Jan", value: 0 },
  { month: "Feb", value: 0 },
];

export function RevenueChart() {
  return (
    <div className="bg-white shadow-[0px_4px_12px_5px_rgba(243,243,246,0.3)] flex w-full flex-col items-stretch mx-auto p-6 rounded-[10px] border-[rgba(228,229,234,1)]">
      <h2 className="text-black text-[22px] font-medium mb-8">Revenue</h2>
      <div className="w-full h-[300px]">
        <ChartContainer
          config={{
            revenue: {
              color: "#FF718B",
            },
          }}
        >
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
              dataKey="value"
              name="revenue"
              stroke="#FF718B"
              strokeWidth={2}
              dot={{ fill: "#FF718B", r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
}
