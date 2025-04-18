
import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

const data = [
  { name: "Base rent", value: 0 },
  { name: "Other fees", value: 1 },
];

const COLORS = ["#0283FA", "#F3F3F6"];

export function IncomeChart() {
  return (
    <div className="shadow-[0px_4px_12px_5px_rgba(243,243,246,0.30)] bg-white flex w-full flex-col items-center p-6 rounded-[10px] border-[0.2px] border-solid border-[#E4E5EA]">
      <h2 className="text-black text-[22px] font-medium self-start">Income</h2>
      <div className="flex flex-col items-center justify-center my-8 relative w-full h-[200px]">
        <ChartContainer config={{}}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-[#615E83] text-sm">Total income</div>
          <div className="text-[#1E1B39] text-2xl font-bold mt-2">$0,00</div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between px-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="bg-[#0283FA] w-3.5 h-3.5 rounded-full" />
          <span className="text-sm text-[#9EA3AD]">Base rent</span>
        </div>
        <span className="text-sm text-[#1E1B39] font-medium">0%</span>
        <div className="flex items-center gap-2">
          <div className="bg-[#F3F3F6] w-3.5 h-3.5 rounded-full" />
          <span className="text-sm text-[#9EA3AD]">Other fees</span>
        </div>
        <span className="text-sm text-[#1E1B39] font-medium">0%</span>
      </div>
    </div>
  );
}
