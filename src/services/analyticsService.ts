
import { useQuery } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";
import { 
  subDays, 
  eachDayOfInterval, 
  eachHourOfInterval, 
  eachWeekOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
  format, 
  differenceInDays, 
  isEqual, 
  startOfDay, 
  endOfDay,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  startOfWeek
} from "date-fns";

// Types for our analytics data
export interface ChartDataPoint {
  month: string;
  value: number;
}

export interface DonutDataPoint {
  name: string;
  value: number;
}

export interface TimelineDataPoint {
  month: string;
  revenue: number;
  profit: number;
}

// Generate data points for a specific date range
const generateDataForRange = (range: DateRange | undefined): any => {
  // Default to current month if no range specified
  const defaultEnd = endOfMonth(new Date());
  const defaultStart = startOfMonth(new Date());
  
  const start = range?.from ? startOfDay(range.from) : defaultStart;
  const end = range?.to ? endOfDay(range.to) : defaultEnd;
  
  // Calculate the difference in days to determine data granularity
  const diffDays = differenceInDays(end, start);
  
  // Single day selected - show hourly data (3-hour intervals)
  if (diffDays === 0 || (range?.from && range?.to && isEqual(startOfDay(range.from), startOfDay(range.to)))) {
    const hours = eachHourOfInterval({ start, end });
    const filteredHours = hours.filter((_, index) => index % 3 === 0); // Every 3 hours
    
    return {
      timePoints: filteredHours,
      formatter: (date: Date) => format(date, "HH:mm"),
      groupKey: "hour"
    };
  }
  
  // For short ranges (7-40 days), show weekly data - covers "This month", "Last month"
  if (diffDays >= 7 && diffDays <= 40) {
    const weeks = eachWeekOfInterval({ start, end }, { weekStartsOn: 1 }); // Start week on Monday
    
    return {
      timePoints: weeks,
      formatter: (date: Date) => format(date, "MMM dd"),
      groupKey: "week"
    };
  }
  
  // For very short ranges (less than 7 days), show daily data
  if (diffDays < 7) {
    const days = eachDayOfInterval({ start, end });
    return {
      timePoints: days,
      formatter: (date: Date) => format(date, "MMM dd"),
      groupKey: "day"
    };
  }
  
  // For medium ranges (40-400 days), show monthly data - covers "Last 3 months", quarters, "This year", "Last year"
  if (diffDays > 40 && diffDays <= 400) {
    const months = eachMonthOfInterval({ start, end });
    
    return {
      timePoints: months,
      formatter: (date: Date) => format(date, "MMM yyyy"),
      groupKey: "month"
    };
  }
  
  // For very long ranges (more than 400 days, like "All time"), show yearly data
  if (diffDays > 400) {
    const years = eachYearOfInterval({ start, end });
    
    return {
      timePoints: years,
      formatter: (date: Date) => format(date, "yyyy"),
      groupKey: "year"
    };
  }
  
  // Fallback to monthly data
  const months = eachMonthOfInterval({ start, end });
  
  return {
    timePoints: months,
    formatter: (date: Date) => format(date, "MMM yyyy"),
    groupKey: "month"
  };
};

// Function to generate random values for demo purposes
const getRandomValue = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Mock function that would be replaced with actual database calls
const fetchAnalyticsData = async (dateRange: DateRange | undefined) => {
  // This would be replaced with an actual API call to your database
  // For example: const response = await fetch('/api/analytics?from=${dateRange?.from}&to=${dateRange?.to}');
  // return await response.json();
  
  // Generate time-based data points for the selected date range
  const { timePoints, formatter, groupKey } = generateDataForRange(dateRange);
  
  // Generate revenue data - ensure month is a string
  const revenue = timePoints.map((point: Date) => ({
    month: formatter(point),
    value: getRandomValue(20, 110),
    [groupKey]: point
  }));
  
  // Generate profit data - ensure month is a string
  const profit = timePoints.map((point: Date) => ({
    month: formatter(point),
    value: getRandomValue(10, 55),
    [groupKey]: point
  }));
  
  // Generate peak profit data - ensure month is a string
  const peakProfit = timePoints.map((point: Date) => ({
    month: formatter(point),
    value: getRandomValue(15, 100),
    [groupKey]: point
  }));
  
  // Generate timeline data - ensure month is a string
  const timeline = timePoints.map((point: Date) => ({
    month: formatter(point), // Convert date to string format without timezone
    revenue: getRandomValue(20000, 110000),
    profit: getRandomValue(10000, 55000),
    [groupKey]: point
  }));
  
  // Calculate totals based on the generated data
  const calculateTotal = (data: ChartDataPoint[]) => 
    data.reduce((sum, item) => sum + item.value, 0);
  
  const revenueTotal = calculateTotal(revenue) * 1000;
  const profitTotal = calculateTotal(profit) * 1000;
  const peakProfitTotal = Math.max(...peakProfit.map(item => item.value)) * 1000;
  
  // Generate income percentage
  const incomeValue = getRandomValue(55, 75);
  
  // Generate time period label for display
  const periodLabel = (() => {
    if (!dateRange?.from) return "This Month";
    
    const diffDays = differenceInDays(
      dateRange?.to ? endOfDay(dateRange.to) : endOfDay(new Date()),
      startOfDay(dateRange.from)
    );
    
    if (diffDays === 0) return "Today";
    
    if (diffDays < 14) return "Daily View";
    
    if (diffDays < 90) return "Weekly View";
    
    return "Monthly View";
  })();
  
  return {
    revenue,
    profit,
    income: [
      { name: "Income", value: incomeValue },
      { name: "Expenses", value: 100 - incomeValue },
    ],
    peakProfit,
    timeline,
    periodLabel,
    totals: {
      revenue: revenueTotal,
      profit: profitTotal,
      income: incomeValue,
      peakProfit: peakProfitTotal
    },
    changes: {
      revenue: { value: getRandomValue(5, 15), positive: Math.random() > 0.3 },
      profit: { value: getRandomValue(3, 10), positive: Math.random() > 0.3 },
      income: { value: getRandomValue(1, 5), positive: Math.random() > 0.3 },
      peakProfit: { value: getRandomValue(1, 8), positive: Math.random() > 0.3 }
    }
  };
};

// Hook for fetching analytics data using React Query
export const useAnalyticsData = (dateRange?: DateRange) => {
  return useQuery({
    queryKey: ['analytics', dateRange?.from?.toISOString(), dateRange?.to?.toISOString()],
    queryFn: () => fetchAnalyticsData(dateRange),
    refetchOnWindowFocus: false,
    // Will be used when we connect to a real database
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
