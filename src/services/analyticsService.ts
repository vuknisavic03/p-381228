
import { useQuery } from "@tanstack/react-query";

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

// Mock function that would be replaced with actual database calls
const fetchAnalyticsData = async () => {
  // This would be replaced with an actual API call to your database
  // For example: const response = await fetch('/api/analytics');
  // return await response.json();
  
  // For now, returning mock data that matches the shape of the expected data
  return {
    revenue: [
      { month: "Jan", value: 31 },
      { month: "Feb", value: 40 },
      { month: "Mar", value: 28 },
      { month: "Apr", value: 51 },
      { month: "May", value: 42 },
      { month: "Jun", value: 109 },
      { month: "Jul", value: 100 },
    ],
    profit: [
      { month: "Jan", value: 11 },
      { month: "Feb", value: 32 },
      { month: "Mar", value: 45 },
      { month: "Apr", value: 32 },
      { month: "May", value: 34 },
      { month: "Jun", value: 52 },
      { month: "Jul", value: 41 },
    ],
    income: [
      { name: "Income", value: 67 },
      { name: "Expenses", value: 33 },
    ],
    peakProfit: [
      { month: "Jan", value: 80 },
      { month: "Feb", value: 50 },
      { month: "Mar", value: 30 },
      { month: "Apr", value: 40 },
      { month: "May", value: 100 },
      { month: "Jun", value: 20 },
    ],
    timeline: [
      { month: "Jan", revenue: 31000, profit: 11000 },
      { month: "Feb", revenue: 40000, profit: 32000 },
      { month: "Mar", revenue: 28000, profit: 45000 },
      { month: "Apr", revenue: 51000, profit: 32000 },
      { month: "May", revenue: 42000, profit: 34000 },
      { month: "Jun", revenue: 109000, profit: 52000 },
      { month: "Jul", revenue: 100000, profit: 41000 },
    ],
    totals: {
      revenue: 352000,
      profit: 213500,
      income: 67,
      peakProfit: 165000
    },
    changes: {
      revenue: { value: 12.5, positive: true },
      profit: { value: 8.2, positive: true },
      income: { value: 3.7, positive: true },
      peakProfit: { value: 2.1, positive: false }
    }
  };
};

// Hook for fetching analytics data using React Query
export const useAnalyticsData = () => {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: fetchAnalyticsData,
    refetchOnWindowFocus: false,
    // Will be used when we connect to a real database
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
