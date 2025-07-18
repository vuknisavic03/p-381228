
import { BarChart, TrendingUp, LineChart, CircleDollarSign } from "lucide-react";
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
    <div className="flex flex-col w-full h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-6 h-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <div>
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
          <div>
            <ChartCard
              title="Expenses"
              icon={LineChart}
              color="bg-gray-100"
              value={isLoading ? "Loading..." : `$${data?.totals.expenses.toLocaleString()}`}
              change={isLoading ? { value: 0, positive: true } : data?.changes?.expenses}
              chartData={isLoading ? [] : data?.expenses || []}
              chartType="area"
              isLoading={isLoading}
              legendLabel="Expenses"
            />
          </div>
          <div>
            <ChartCard
              title="Analytics"
              icon={CircleDollarSign}
              color="bg-gray-100"
              value={isLoading ? "Loading..." : `${data?.totals.analytics}%`}
              change={isLoading ? { value: 0, positive: true } : data?.changes?.analytics}
              chartData={isLoading ? [] : data?.analytics || []}
              chartType="donut"
              isLoading={isLoading}
              legendLabel="Analytics"
            />
          </div>
          <div>
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
        </div>
        <div>
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
      </div>
    </div>
  );
}
