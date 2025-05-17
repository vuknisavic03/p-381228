
import { BarChart, TrendingUp, LineChart, CircleDollarSign } from "lucide-react";
import { ChartCard } from "./ChartCard";
import { useAnalyticsData } from "@/services/analyticsService";
import { Timeline } from "./Timeline";
import { DateRange } from "react-day-picker";

interface AnalyticsGridProps {
  dateRange?: DateRange;
}

export function AnalyticsGrid({ dateRange }: AnalyticsGridProps) {
  const { data, isLoading } = useAnalyticsData(dateRange);
  
  return (
    <div className="flex flex-col w-full space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 sm:gap-6">
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
            legendLabel="Revenue"
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
            legendLabel="Profit"
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
            legendLabel="Income"
          />
        </div>
        <div className="col-span-1">
          <ChartCard
            title="Peak Profit"
            icon={LineChart}
            color="bg-[#D946EF]"
            value={isLoading ? "Loading..." : `$${data?.totals.peakProfit.toLocaleString()}`}
            change={isLoading ? { value: 0, positive: false } : data?.changes.peakProfit}
            chartData={isLoading ? [] : data?.peakProfit}
            chartType="area"
            isLoading={isLoading}
            legendLabel="Peak Profit"
          />
        </div>
      </div>

      {!isLoading && data?.timeline && (
        <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <Timeline 
            data={data.timeline} 
            periodLabel={data.periodLabel} 
          />
        </div>
      )}
    </div>
  );
}
