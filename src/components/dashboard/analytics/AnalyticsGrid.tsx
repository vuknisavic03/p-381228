
import { Activity, BarChart, ChartPie, Gauge } from "lucide-react";
import { AnalyticsCard } from "./AnalyticsCard";

export function AnalyticsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1400px] mx-auto">
      <AnalyticsCard
        title="Total Revenue"
        icon={BarChart}
        color="bg-[#9b87f5]"
      />
      <AnalyticsCard
        title="Active Users"
        icon={Activity}
        color="bg-[#F97316]"
      />
      <AnalyticsCard
        title="Conversion Rate"
        icon={ChartPie}
        color="bg-[#0EA5E9]"
      />
      <AnalyticsCard
        title="Average Score"
        icon={Gauge}
        color="bg-[#D946EF]"
      />
    </div>
  );
}
