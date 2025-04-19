
import { Activity, BarChart, ChartPie, Gauge } from "lucide-react";
import { AnalyticsCard } from "./AnalyticsCard";

export function AnalyticsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <AnalyticsCard
        title="Total Revenue"
        value="$45,231"
        icon={BarChart}
        color="bg-[#9b87f5]"
      />
      <AnalyticsCard
        title="Active Users"
        value="1,234"
        icon={Activity}
        color="bg-[#F97316]"
      />
      <AnalyticsCard
        title="Conversion Rate"
        value="12.5%"
        icon={ChartPie}
        color="bg-[#0EA5E9]"
      />
      <AnalyticsCard
        title="Average Score"
        value="8.9"
        icon={Gauge}
        color="bg-[#D946EF]"
      />
    </div>
  );
}
