
import { BarChart, TrendingUp, LineChart, CircleDollarSign } from "lucide-react";
import { ChartCard } from "./ChartCard";
import { useAnalyticsData } from "@/services/analyticsService";
import { Timeline } from "./Timeline";
import { DateRange } from "react-day-picker";

interface AnalyticsGridProps {
  dateRange?: DateRange;
}

export function AnalyticsGrid({ dateRange }: AnalyticsGridProps) {
  const { data, isLoading, error } = useAnalyticsData(dateRange);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ChartCard
          title="Revenue"
          icon={BarChart}
          color="bg-[#6366f1]"
          value={isLoading ? "Loading..." : `$${data?.totals.revenue.toLocaleString()}`}
          change={isLoading ? { value: 0, positive: true } : data?.changes?.revenue}
          chartData={isLoading ? [] : data?.revenue || []}
          chartType="area"
          isLoading={isLoading}
          legendLabel="Revenue"
        />
        <ChartCard
          title="Profit"
          icon={TrendingUp}
          color="bg-[#f59e0b]"
          value={isLoading ? "Loading..." : `$${data?.totals.profit.toLocaleString()}`}
          change={isLoading ? { value: 0, positive: true } : data?.changes?.profit}
          chartData={isLoading ? [] : data?.profit || []}
          chartType="spline"
          isLoading={isLoading}
          legendLabel="Profit"
        />
        <ChartCard
          title="Income"
          icon={CircleDollarSign}
          color="bg-[#10b981]"
          value={isLoading ? "Loading..." : `${data?.totals.income}%`}
          change={isLoading ? { value: 0, positive: true } : data?.changes?.income}
          chartData={isLoading ? [] : data?.income || []}
          chartType="donut"
          isLoading={isLoading}
          legendLabel="Income"
        />
        <ChartCard
          title="Peak Profit"
          icon={LineChart}
          color="bg-[#8b5cf6]"
          value={isLoading ? "Loading..." : `$${data?.totals.peakProfit.toLocaleString()}`}
          change={isLoading ? { value: 0, positive: true } : data?.changes?.peakProfit}
          chartData={isLoading ? [] : data?.peakProfit || []}
          chartType="area"
          isLoading={isLoading}
          legendLabel="Peak Profit"
        />
      </div>

      {!isLoading && data?.timeline && (
        <Timeline 
          data={data.timeline || []} 
          periodLabel={data.periodLabel} 
        />
      )}
    </div>
  );
}
