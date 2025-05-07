
import { BarChart, TrendingUp, LineChart, CircleDollarSign } from "lucide-react";
import { ChartCard } from "./ChartCard";
import { Timeline } from "./Timeline";
import { useAnalyticsData } from "@/services/analyticsService";

export function AnalyticsGrid() {
  const { data, isLoading } = useAnalyticsData();
  
  return (
    <div className="flex flex-col gap-6 mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        <div className="md:col-span-6">
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
        <div className="md:col-span-6">
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
        <div className="md:col-span-4">
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
        <div className="md:col-span-8">
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
      
      <Timeline 
        data={isLoading ? [] : data?.timeline} 
        isLoading={isLoading}
      />
    </div>
  );
}
