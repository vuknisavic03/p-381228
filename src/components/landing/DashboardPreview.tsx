import React from "react";
import { format } from "date-fns";
import { BarChart, TrendingUp, LineChart, CircleDollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

export default function DashboardPreview() {
  const currentHour = new Date().getHours();
  let greeting = "Good morning";
  
  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  } else if (currentHour >= 17) {
    greeting = "Good evening";
  }

  // Mock data matching the real overview
  const chartData = [
    { month: "Jan", value: 45 },
    { month: "Feb", value: 52 },
    { month: "Mar", value: 48 },
    { month: "Apr", value: 61 },
    { month: "May", value: 55 },
    { month: "Jun", value: 67 }
  ];

  const expenseCategories = [
    { name: "Property Maintenance", value: 34 },
    { name: "Marketing & Advertising", value: 26 },
    { name: "Utilities & Services", value: 21 },
    { name: "Insurance & Legal", value: 19 },
    { name: "Office & Administration", value: 8 }
  ];

  const timelineData = [
    { month: "Jan", revenue: 45000, profit: 28000, expenses: 17000 },
    { month: "Feb", revenue: 52000, profit: 31000, expenses: 21000 },
    { month: "Mar", revenue: 48000, profit: 29000, expenses: 19000 },
    { month: "Apr", revenue: 61000, profit: 35000, expenses: 26000 },
    { month: "May", revenue: 55000, profit: 32000, expenses: 23000 },
    { month: "Jun", revenue: 67000, profit: 38000, expenses: 29000 }
  ];

  const getCategoryColor = (index: number) => {
    const colors = ["#dc2626", "#f59e0b", "#0ea5e9", "#8b5cf6", "#059669"];
    return colors[index];
  };

  const getNotionColor = (title: string) => {
    switch (title) {
      case "Revenue":
        return "#2563eb";
      case "Profit":
        return "#16a34a";
      case "Analytics":
        return "#9333ea";
      case "Expenses":
        return "#dc2626";
      default:
        return "#6b7280";
    }
  };

  const ChartCard = ({ title, icon: Icon, value, change, chartData, chartType }: any) => {
    const colorValue = getNotionColor(title);

    if (title === "Analytics") {
      return (
        <Card className="p-5 border border-gray-200 h-full min-h-[280px] bg-white flex flex-col">
          <CardHeader className="p-0 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium text-gray-900">Top Expenses Categories</CardTitle>
              <div className="bg-gray-100 text-gray-600 p-2 rounded-lg">
                <Icon size={18} />
              </div>
            </div>
          </CardHeader>
          <div className="mt-5 flex-grow border-t border-gray-200 pt-4">
            <div className="flex items-center justify-center h-full gap-4">
              <div className="w-[65%] h-[200px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 24, bottom: 0, left: 0 }}>
                    <Pie
                      data={expenseCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius="85%"
                      innerRadius="65%"
                      fill="#8884d8"
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                      stroke="none"
                    >
                      {expenseCategories.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={getCategoryColor(index)} 
                          stroke="none"
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-[35%] flex flex-col justify-center gap-3 mr-10">
                <div className="space-y-3">
                  {expenseCategories.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <div 
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: getCategoryColor(index) }} 
                        />
                        <span className="text-sm text-gray-700 truncate">{entry.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 flex-shrink-0">{entry.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      );
    }

    return (
      <Card className="p-5 border border-gray-200 h-full min-h-[280px] bg-white flex flex-col">
        <CardHeader className="p-0 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium text-gray-900">{title}</CardTitle>
            <div className="bg-gray-100 text-gray-600 p-2 rounded-lg">
              <Icon size={18} />
            </div>
          </div>
        </CardHeader>
        <div className="mt-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-gray-900">{value}</span>
            <span className={`text-sm ${change.positive ? 'text-green-600' : 'text-red-600'} flex items-center`}>
              {change.positive ? '+' : '-'}{Math.abs(change.value)}%
            </span>
          </div>
        </div>
        <div className="mt-5 flex-grow border-t border-gray-200 pt-4">
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 5,
                  bottom: 10,
                  left: 5,
                }}
              >
                <defs>
                  <linearGradient id={`color${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colorValue} stopOpacity={0.1} />
                    <stop offset="95%" stopColor={colorValue} stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  vertical={false} 
                  stroke="#e5e7eb" 
                  opacity={0.5} 
                />
                <XAxis 
                  dataKey="month" 
                  axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  dy={8}
                  padding={{ left: 18, right: 10 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  width={45}
                  dx={-8}
                  tickFormatter={(value) => `$${value}k`}
                  padding={{ top: 10 }}
                  allowDecimals={false}
                  domain={['auto', 'auto']}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={colorValue}
                  fillOpacity={1}
                  fill={`url(#color${title.replace(/\s+/g, '')})`}
                  strokeWidth={2}
                  name={title}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
      {/* Header matching the real overview */}
      <div className="flex-none px-6 pt-6 pb-3">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-[32px] md:text-[36px] text-[#1A1A1A] font-semibold leading-tight mb-2">
              {greeting}, Kevin
            </h1>
            <p className="text-[24px] md:text-[28px] text-[#9EA3AD] font-medium leading-none">
              Today, {format(new Date(), "MMM dd")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg">Portfolio</div>
            <div className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg">This month</div>
          </div>
        </div>
      </div>

      {/* Analytics Grid - 2x2 layout */}
      <div className="px-6 pb-6">
        <div className="flex flex-col w-full space-y-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              <ChartCard
                title="Revenue"
                icon={BarChart}
                value="$336,000"
                change={{ value: 11, positive: false }}
                chartData={chartData}
                chartType="area"
              />
              <ChartCard
                title="Expenses"
                icon={LineChart}
                value="$229,000"
                change={{ value: 5, positive: true }}
                chartData={chartData}
                chartType="area"
              />
              <ChartCard
                title="Analytics"
                icon={CircleDollarSign}
                value="87%"
                change={{ value: 3, positive: true }}
                chartData={expenseCategories}
                chartType="donut"
              />
              <ChartCard
                title="Profit"
                icon={TrendingUp}
                value="$151,000"
                change={{ value: 9, positive: true }}
                chartData={chartData}
                chartType="spline"
              />
            </div>
            
            {/* Timeline */}
            <Card className="border border-gray-200 p-5 bg-white h-[280px]">
              <CardHeader className="p-0 pb-3">
                <CardTitle className="text-lg font-medium text-gray-900">
                  This month
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={timelineData}
                      margin={{
                        top: 20,
                        right: 10,
                        bottom: 20,
                        left: 5,
                      }}
                    >
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0.01} />
                        </linearGradient>
                        <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#16a34a" stopOpacity={0.1} />
                          <stop offset="95%" stopColor="#16a34a" stopOpacity={0.01} />
                        </linearGradient>
                        <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#dc2626" stopOpacity={0.1} />
                          <stop offset="95%" stopColor="#dc2626" stopOpacity={0.01} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.5} stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fill: '#6b7280', fontSize: 12 }} 
                        tickLine={false} 
                        axisLine={{ strokeWidth: 1, stroke: '#e5e7eb' }}
                        dy={8}
                        padding={{ left: 18, right: 10 }}
                      />
                      <YAxis 
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value/1000}k`}
                        width={50}
                        dx={-8}
                        padding={{ top: 10 }}
                        allowDecimals={false}
                        domain={['auto', 'auto']}
                      />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#2563eb"
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                        strokeWidth={2}
                        activeDot={{ r: 4, fill: "#2563eb", strokeWidth: 0 }}
                        name="Revenue"
                      />
                      <Area
                        type="monotone"
                        dataKey="profit"
                        stroke="#16a34a"
                        fillOpacity={1}
                        fill="url(#colorProfit)"
                        strokeWidth={2}
                        activeDot={{ r: 4, fill: "#16a34a", strokeWidth: 0 }}
                        name="Profit"
                      />
                      <Area
                        type="monotone"
                        dataKey="expenses"
                        stroke="#dc2626"
                        fillOpacity={1}
                        fill="url(#colorExpenses)"
                        strokeWidth={2}
                        activeDot={{ r: 4, fill: "#dc2626", strokeWidth: 0 }}
                        name="Expenses"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}