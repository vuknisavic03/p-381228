
import { useQuery } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";
import { subDays, eachDayOfInterval, eachHourOfInterval, format, differenceInDays, isEqual, startOfDay, endOfDay } from "date-fns";

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
  // Default to last 7 days if no range specified
  const defaultEnd = new Date();
  const defaultStart = subDays(defaultEnd, 6);
  
  const start = range?.from ? startOfDay(range.from) : defaultStart;
  const end = range?.to ? endOfDay(range.to) : defaultEnd;
  
  // Calculate the difference in days to determine data granularity
  const diffInDays = differenceInDays(end, start);
  
  // Single day selected - show hourly data (3-hour intervals)
  if (diffInDays === 0 || (range?.from && range?.to && isEqual(startOfDay(range.from), startOfDay(range.to)))) {
    const hours = eachHourOfInterval({ start, end });
    const filteredHours = hours.filter((_, index) => index % 3 === 0); // Every 3 hours
    
    return {
      timePoints: filteredHours,
      formatter: (date: Date) => format(date, "HH:mm"),
      groupKey: "hour"
    };
  }
  
  // Multiple days - daily data
  const days = eachDayOfInterval({ start, end });
  return {
    timePoints: days,
    formatter: (date: Date) => format(date, "MMM dd"),
    groupKey: "day"
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
  
  // Generate revenue data
  const revenue = timePoints.map((point: Date) => ({
    month: formatter(point),
    value: getRandomValue(20, 110),
    [groupKey]: point
  }));
  
  // Generate profit data
  const profit = timePoints.map((point: Date) => ({
    month: formatter(point),
    value: getRandomValue(10, 55),
    [groupKey]: point
  }));
  
  // Generate peak profit data
  const peakProfit = timePoints.map((point: Date) => ({
    month: formatter(point),
    value: getRandomValue(15, 100),
    [groupKey]: point
  }));
  
  // Generate timeline data
  const timeline = timePoints.map((point: Date) => ({
    month: formatter(point),
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
  
  return {
    revenue,
    profit,
    income: [
      { name: "Income", value: incomeValue },
      { name: "Expenses", value: 100 - incomeValue },
    ],
    peakProfit,
    timeline,
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
