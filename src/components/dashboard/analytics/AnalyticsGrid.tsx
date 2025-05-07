
import { BarChart, TrendingUp, LineChart, CircleDollarSign } from "lucide-react";
import { AnalyticsCard } from "./AnalyticsCard";

export function AnalyticsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 max-w-[1400px] mx-auto p-4 lg:p-8">
      <AnalyticsCard
        title="Revenue"
        icon={BarChart}
        color="bg-[#9b87f5]"
      />
      <AnalyticsCard
        title="Profit"
        icon={TrendingUp}
        color="bg-[#F97316]"
      />
      <AnalyticsCard
        title="Income"
        icon={CircleDollarSign}
        color="bg-[#0EA5E9]"
      />
      <AnalyticsCard
        title="Peak Profit Achieved"
        icon={LineChart}
        color="bg-[#D946EF]"
      />
    </div>
  );
}
