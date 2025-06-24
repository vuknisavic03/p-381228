
import { useQuery } from '@tanstack/react-query';
import { DateRange } from 'react-day-picker';

export interface PortfolioMetrics {
  totalRevenue: number;
  revenueChange: number;
  totalProperties: number;
  propertiesChange: number;
  occupancyRate: number;
  occupancyChange: number;
  netProfit: number;
  profitChange: number;
}

export interface RevenueDataPoint {
  period: string;
  revenue: number;
  profit: number;
}

export interface OccupancyDataPoint {
  name: string;
  value: number;
  percentage: number;
}

export interface ExpenseDataPoint {
  category: string;
  amount: number;
}

export interface PropertyDataPoint {
  property: string;
  revenue: number;
  expenses: number;
}

export interface PortfolioData {
  metrics: PortfolioMetrics;
  revenueData: RevenueDataPoint[];
  occupancyData: OccupancyDataPoint[];
  expenseData: ExpenseDataPoint[];
  propertyData: PropertyDataPoint[];
}

// Mock data
const mockMetrics: PortfolioMetrics = {
  totalRevenue: 284500,
  revenueChange: 12.5,
  totalProperties: 15,
  propertiesChange: 7.1,
  occupancyRate: 87,
  occupancyChange: 3.2,
  netProfit: 125000,
  profitChange: 18.3
};

const mockRevenueData: RevenueDataPoint[] = [
  { period: 'Jan', revenue: 45000, profit: 18000 },
  { period: 'Feb', revenue: 42000, profit: 16000 },
  { period: 'Mar', revenue: 48000, profit: 19500 },
  { period: 'Apr', revenue: 52000, profit: 22000 },
  { period: 'May', revenue: 49000, profit: 20500 },
  { period: 'Jun', revenue: 55000, profit: 24000 },
];

const mockOccupancyData: OccupancyDataPoint[] = [
  { name: 'Occupied', value: 52, percentage: 87 },
  { name: 'Vacant', value: 6, percentage: 10 },
  { name: 'Maintenance', value: 2, percentage: 3 },
];

const mockExpenseData: ExpenseDataPoint[] = [
  { category: 'Maintenance', amount: 25000 },
  { category: 'Property Tax', amount: 18000 },
  { category: 'Insurance', amount: 12000 },
  { category: 'Utilities', amount: 8000 },
  { category: 'Management', amount: 6000 },
];

const mockPropertyData: PropertyDataPoint[] = [
  { property: 'Sunset Apartments', revenue: 28000, expenses: 12000 },
  { property: 'Oak Manor', revenue: 24000, expenses: 10000 },
  { property: 'Pine Complex', revenue: 22000, expenses: 9500 },
  { property: 'Maple Heights', revenue: 20000, expenses: 8500 },
  { property: 'Cedar View', revenue: 18000, expenses: 7500 },
];

export function usePortfolioData(dateRange?: DateRange) {
  return useQuery({
    queryKey: ['portfolio-data', dateRange],
    queryFn: async (): Promise<PortfolioData> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return {
        metrics: mockMetrics,
        revenueData: mockRevenueData,
        occupancyData: mockOccupancyData,
        expenseData: mockExpenseData,
        propertyData: mockPropertyData,
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
