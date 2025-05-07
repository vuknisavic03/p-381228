
import { BarChart, TrendingUp, LineChart, CircleDollarSign } from "lucide-react";
import { ChartCard } from "./ChartCard";
import { useAnalyticsData } from "@/services/analyticsService";

export function AnalyticsGrid() {
  const { data, isLoading } = useAnalyticsData();
  
  return (
    <div className="flex flex-col max-w-[1400px] mx-auto p-4 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="col-span-1">
          <ChartCard
            title="Revenue"
            icon={BarChart}
            color="bg-[#9b87f5]"
            value={isLoading ? "Loading..." : `$${data?.totals.revenue.toLocaleString()}`}
            change={isLoading ? { value: 0, positive: true } : data?.changes.revenue}
            chartData={isLoading ? [] : data?.revenue}
            chartType="area"
            isLoading={isLoading}
          />
        </div>
        <div className="col-span-1">
          <ChartCard
            title="Profit"
            icon={TrendingUp}
            color="bg-[#F97316]"
            value={isLoading ? "Loading..." : `$${data?.totals.profit.toLocaleString()}`}
            change={isLoading ? { value: 0, positive: true } : data?.changes.profit}
            chartData={isLoading ? [] : data?.profit}
            chartType="spline"
            isLoading={isLoading}
          />
        </div>
        <div className="col-span-1">
          <ChartCard
            title="Income"
            icon={CircleDollarSign}
            color="bg-[#0EA5E9]"
            value={isLoading ? "Loading..." : `${data?.totals.income}%`}
            change={isLoading ? { value: 0, positive: true } : data?.changes.income}
            chartData={isLoading ? [] : data?.income}
            chartType="donut"
            isLoading={isLoading}
          />
        </div>
        <div className="col-span-1">
          <ChartCard
            title="Peak Profit Achieved"
            icon={LineChart}
            color="bg-[#D946EF]"
            value={isLoading ? "Loading..." : `$${data?.totals.peakProfit.toLocaleString()}`}
            change={isLoading ? { value: 0, positive: false } : data?.changes.peakProfit}
            chartData={isLoading ? [] : data?.peakProfit}
            chartType="area"
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
