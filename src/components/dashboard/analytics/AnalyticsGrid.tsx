
import { BarChart, TrendingUp, LineChart, PieChart } from "lucide-react";
import { ChartCard } from "./ChartCard";
import { CompactTimeline } from "./CompactTimeline";
import { useAnalyticsData } from "@/services/analyticsService";
import { DateRange } from "react-day-picker";

interface AnalyticsGridProps {
  dateRange?: DateRange;
  periodLabel?: string;
}

export function AnalyticsGrid({ dateRange, periodLabel }: AnalyticsGridProps) {
  const { data, isLoading, error } = useAnalyticsData(dateRange);
  
  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100/80 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-1 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100/60">
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
          
          <div className="bg-white rounded-xl p-1 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100/60">
            <ChartCard
              title="Profit"
              icon={TrendingUp}
              color="bg-gray-100"
              value={isLoading ? "Loading..." : `$${data?.totals.profit.toLocaleString()}`}
              change={isLoading ? { value: 0, positive: true } : data?.changes?.profit}
              chartData={isLoading ? [] : data?.profit || []}
              chartType="spline"
              isLoading={isLoading}
              legendLabel="Profit"
            />
          </div>
          
          <div className="bg-white rounded-xl p-1 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100/60">
            <ChartCard
              title="Income"
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
          
          <div className="bg-white rounded-xl p-1 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100/60">
            <CompactTimeline
              title={periodLabel || "This month"}
              icon={LineChart}
              value={isLoading ? "Loading..." : "Revenue vs Expenses"}
              change={isLoading ? { value: 0, positive: true } : { value: 12, positive: true }}
              data={isLoading ? [] : data?.timeline || []}
              isLoading={isLoading}
              periodLabel={periodLabel || data?.periodLabel}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
