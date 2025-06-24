import { useQuery } from '@tanstack/react-query';
import { DateRange } from 'react-day-picker';

export interface ChartDataPoint {
  month: string;
  value: number;
}

export interface DonutDataPoint {
  name: string;
  value: number;
}

export interface CategoryDataPoint {
  name: string;
  value: number;
  type: 'revenue' | 'expense';
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

export interface ExpenseDataPoint {
  name: string;
  value: number;
  percentage: number;
  description: string;
}

export interface AnalyticsData {
  revenue: ChartDataPoint[];
  profit: ChartDataPoint[];
  income: DonutDataPoint[];
  categories: CategoryDataPoint[];
  expenses: ExpenseDataPoint[];
  timeline: TimelineEvent[];
  totals: {
    revenue: number;
    profit: number;
    income: number;
  };
  changes: {
    revenue: { value: number; positive: boolean };
    profit: { value: number; positive: boolean };
    income: { value: number; positive: boolean };
    categories: { value: number; positive: boolean };
    expenses: { value: number; positive: boolean };
  };
  periodLabel: string;
}

// Mock data for revenue chart
const mockRevenue: ChartDataPoint[] = [
  { month: "Jan", value: 35 },
  { month: "Feb", value: 42 },
  { month: "Mar", value: 38 },
  { month: "Apr", value: 55 },
  { month: "May", value: 48 },
  { month: "Jun", value: 62 }
];

// Mock data for profit chart
const mockProfit: ChartDataPoint[] = [
  { month: "Jan", value: 12 },
  { month: "Feb", value: 15 },
  { month: "Mar", value: 13 },
  { month: "Apr", value: 18 },
  { month: "May", value: 16 },
  { month: "Jun", value: 22 }
];

// Mock data for income donut chart
const mockIncome: DonutDataPoint[] = [
  { name: "Income", value: 78 },
  { name: "Expenses", value: 22 }
];

// Mock data for categories bar chart
const mockCategories: CategoryDataPoint[] = [
  { name: "Rentals", value: 120, type: 'revenue' },
  { name: "Sales", value: 85, type: 'revenue' },
  { name: "Services", value: 40, type: 'revenue' },
];

// Mock data for expense categories
const mockExpenses: ExpenseDataPoint[] = [
  { name: "Property Tax", value: 45, percentage: 35, description: "Annual property taxes and assessments" },
  { name: "Maintenance", value: 32, percentage: 25, description: "Repairs, upkeep, and property maintenance" },
  { name: "Utilities", value: 28, percentage: 22, description: "Water, electricity, gas, and internet" },
  { name: "Insurance", value: 23, percentage: 18, description: "Property and liability insurance premiums" },
];

// Mock data for timeline
const mockTimeline: TimelineEvent[] = [
  { date: "2024-01-15", title: "New Property Added", description: "Acquired a new apartment complex in downtown." },
  { date: "2024-02-28", title: "Successful Renovation", description: "Completed renovations on main street property." },
  { date: "2024-03-10", title: "Increased Rental Rates", description: "Adjusted rental rates based on market analysis." }
];

export function useAnalyticsData(dateRange?: DateRange) {
  return useQuery({
    queryKey: ['analytics', dateRange],
    queryFn: async (): Promise<AnalyticsData> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        revenue: mockRevenue,
        profit: mockProfit,
        income: mockIncome,
        categories: mockCategories,
        expenses: mockExpenses,
        timeline: mockTimeline,
        totals: {
          revenue: 245000,
          profit: 89000,
          income: 78,
        },
        changes: {
          revenue: { value: 12.5, positive: true },
          profit: { value: 8.3, positive: true },
          income: { value: 5.2, positive: true },
          categories: { value: 3.1, positive: true },
          expenses: { value: 2.8, positive: false },
        },
        periodLabel: dateRange ? 'Selected period' : 'This month'
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
