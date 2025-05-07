
import { BarChart, TrendingUp, LineChart, CircleDollarSign } from "lucide-react";
import { ChartCard } from "./ChartCard";
import { Timeline } from "./Timeline";

// Chart data
const revenueData = [
  { month: "Jan", value: 31 },
  { month: "Feb", value: 40 },
  { month: "Mar", value: 28 },
  { month: "Apr", value: 51 },
  { month: "May", value: 42 },
  { month: "Jun", value: 109 },
  { month: "Jul", value: 100 },
];

const profitData = [
  { month: "Jan", value: 11 },
  { month: "Feb", value: 32 },
  { month: "Mar", value: 45 },
  { month: "Apr", value: 32 },
  { month: "May", value: 34 },
  { month: "Jun", value: 52 },
  { month: "Jul", value: 41 },
];

const incomeData = [
  { name: "Income", value: 67 },
  { name: "Expenses", value: 33 },
];

const peakProfitData = [
  { month: "Jan", value: 80 },
  { month: "Feb", value: 50 },
  { month: "Mar", value: 30 },
  { month: "Apr", value: 40 },
  { month: "May", value: 100 },
  { month: "Jun", value: 20 },
];

export function AnalyticsGrid() {
  return (
    <div className="flex flex-col gap-8 max-w-[1400px] mx-auto p-4 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
        <ChartCard
          title="Revenue"
          icon={BarChart}
          color="bg-[#9b87f5]"
          value="$352,000"
          change={{ value: 12.5, positive: true }}
          chartData={revenueData}
          chartType="area"
        />
        <ChartCard
          title="Profit"
          icon={TrendingUp}
          color="bg-[#F97316]"
          value="$213,500"
          change={{ value: 8.2, positive: true }}
          chartData={profitData}
          chartType="area"
        />
        <ChartCard
          title="Income"
          icon={CircleDollarSign}
          color="bg-[#0EA5E9]"
          value="67%"
          change={{ value: 3.7, positive: true }}
          chartData={incomeData}
          chartType="donut"
        />
        <ChartCard
          title="Peak Profit Achieved"
          icon={LineChart}
          color="bg-[#D946EF]"
          value="$165,000"
          change={{ value: 2.1, positive: false }}
          chartData={peakProfitData}
          chartType="area"
        />
      </div>
      
      <Timeline />
    </div>
  );
}
