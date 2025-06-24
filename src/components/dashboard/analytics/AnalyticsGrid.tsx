
import { BarChart, TrendingUp, LineChart, PieChart } from "lucide-react";
import { ChartCard } from "./ChartCard";
import { useAnalyticsData } from "@/services/analyticsService";
import { Timeline } from "./Timeline";
import { DateRange } from "react-day-picker";

interface AnalyticsGridProps {
  dateRange?: DateRange;
  periodLabel?: string;
}

export function AnalyticsGrid({ dateRange, periodLabel }: AnalyticsGridProps) {
  const { data, isLoading, error } = useAnalyticsData(dateRange);
  
  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="col-span-1">
          <ChartCard
            title="Revenue"
            icon={BarChart}
            color="bg-gray-100"
            value={isLoading ? "Loading..." : `$${data?.totals.revenue.toLocaleString()}`}
            change={isLoading ? { value: 0, positive: true } : data?.changes?.revenue}
            chartData={isLoading ? [] : data?.revenue || []}
            chartType="area"
            isLoading={isLoading}
            legendLabel="Revenue"
          />
        </div>
        <div className="col-span-1">
          <ChartCard
            title="Income vs Expenses Ratio"
            icon={PieChart}
            color="bg-gray-100"
            value={isLoading ? "Loading..." : `${data?.totals.income}%`}
            change={isLoading ? { value: 0, positive: true } : data?.changes?.income}
            chartData={isLoading ? [] : data?.income || []}
            chartType="donut"
            isLoading={isLoading}
            legendLabel="Income"
          />
        </div>
        <div className="col-span-1">
          <ChartCard
            title="Revenue Categories"
            icon={TrendingUp}
            color="bg-gray-100"
            value={isLoading ? "Loading..." : "6 Categories"}
            change={isLoading ? { value: 0, positive: true } : data?.changes?.categories}
            chartData={isLoading ? [] : data?.categories || []}
            chartType="categories"
            isLoading={isLoading}
            legendLabel="Categories"
          />
        </div>
        <div className="col-span-1">
          <ChartCard
            title="Expense Categories"
            icon={LineChart}
            color="bg-gray-100"
            value={isLoading ? "Loading..." : "4 Categories"}
            change={isLoading ? { value: 0, positive: true } : data?.changes?.expenses}
            chartData={isLoading ? [] : data?.expenses || []}
            chartType="expenses"
            isLoading={isLoading}
            legendLabel="Expenses"
          />
        </div>
      </div>

      {!isLoading && data?.timeline && (
        <div style={{ animationDelay: "200ms" }}>
          <Timeline 
            data={data.timeline || []} 
            periodLabel={periodLabel || data.periodLabel}
            dateRange={dateRange}
          />
        </div>
      )}
    </div>
  );
}
