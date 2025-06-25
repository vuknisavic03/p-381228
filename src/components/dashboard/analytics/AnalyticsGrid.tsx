
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
    <div className="flex flex-col w-full space-y-8">
      <div className="bg-gradient-to-br from-gray-50/80 to-gray-100/50 rounded-3xl p-8 border border-gray-200/60 shadow-lg backdrop-blur-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Revenue Card */}
          <div className="group bg-white rounded-2xl p-2 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200/80 hover:border-blue-200/60 hover:bg-blue-50/20">
            <ChartCard
              title="Revenue"
              icon={BarChart}
              color="bg-blue-100"
              value={isLoading ? "Loading..." : `$${data?.totals.revenue.toLocaleString()}`}
              change={isLoading ? { value: 0, positive: true } : data?.changes?.revenue}
              chartData={isLoading ? [] : data?.revenue || []}
              chartType="area"
              isLoading={isLoading}
              legendLabel="Revenue"
            />
          </div>
          
          {/* Profit Card */}
          <div className="group bg-white rounded-2xl p-2 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200/80 hover:border-green-200/60 hover:bg-green-50/20">
            <ChartCard
              title="Profit"
              icon={TrendingUp}
              color="bg-green-100"
              value={isLoading ? "Loading..." : `$${data?.totals.profit.toLocaleString()}`}
              change={isLoading ? { value: 0, positive: true } : data?.changes?.profit}
              chartData={isLoading ? [] : data?.profit || []}
              chartType="spline"
              isLoading={isLoading}
              legendLabel="Profit"
            />
          </div>
          
          {/* Income Card */}
          <div className="group bg-white rounded-2xl p-2 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200/80 hover:border-purple-200/60 hover:bg-purple-50/20">
            <ChartCard
              title="Income"
              icon={PieChart}
              color="bg-purple-100"
              value={isLoading ? "Loading..." : `${data?.totals.income}%`}
              change={isLoading ? { value: 0, positive: true } : data?.changes?.income}
              chartData={isLoading ? [] : data?.income || []}
              chartType="donut"
              isLoading={isLoading}
              legendLabel="Income"
            />
          </div>
          
          {/* Timeline Card */}
          <div className="group bg-white rounded-2xl p-2 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200/80 hover:border-indigo-200/60 hover:bg-indigo-50/20">
            <CompactTimeline
              title={periodLabel || "This month"}
              icon={LineChart}
              value="Revenue vs Expenses"
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
