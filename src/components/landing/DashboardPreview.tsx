import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

export default function DashboardPreview() {
  const expenseCategories = [
    { name: "Property Maintenance", percentage: 34, color: "#ef4444" },
    { name: "Marketing & Advertising", percentage: 26, color: "#f97316" },
    { name: "Utilities & Services", percentage: 21, color: "#3b82f6" },
    { name: "Insurance & Legal", percentage: 19, color: "#8b5cf6" },
    { name: "Office & Administration", percentage: 8, color: "#10b981" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
      {/* Dashboard Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Good evening, Kevin</h3>
            <p className="text-gray-500 text-sm">Today, Jul 05</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg">Portfolio</div>
            <div className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg">This month</div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6 space-y-6">
        {/* Top Row - Revenue, Expenses, Profit */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Revenue Card */}
          <Card className="bg-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Revenue</CardTitle>
                <BarChart3 className="w-4 h-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">$336,000</span>
                  <div className="flex items-center gap-1">
                    <TrendingDown className="w-3 h-3 text-red-500" />
                    <span className="text-sm text-red-500 font-medium">-11%</span>
                  </div>
                </div>
                {/* Simple line chart representation */}
                <div className="h-20 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-end p-2">
                  <svg className="w-full h-full" viewBox="0 0 200 60">
                    <path
                      d="M10,50 Q30,40 50,35 T90,25 T130,30 T170,45 T190,20"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M10,50 Q30,40 50,35 T90,25 T130,30 T170,45 T190,20 L190,60 L10,60 Z"
                      fill="url(#blueGradient)"
                      opacity="0.1"
                    />
                    <defs>
                      <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expenses Card */}
          <Card className="bg-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Expenses</CardTitle>
                <TrendingUp className="w-4 h-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">$229,000</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-sm text-green-500 font-medium">+5%</span>
                  </div>
                </div>
                <div className="h-20 bg-gradient-to-r from-red-50 to-red-100 rounded-lg flex items-end p-2">
                  <svg className="w-full h-full" viewBox="0 0 200 60">
                    <path
                      d="M10,40 Q30,20 50,15 T90,35 T130,25 T170,35 T190,40"
                      stroke="#ef4444"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M10,40 Q30,20 50,15 T90,35 T130,25 T170,35 T190,40 L190,60 L10,60 Z"
                      fill="url(#redGradient)"
                      opacity="0.1"
                    />
                    <defs>
                      <linearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profit Card */}
          <Card className="bg-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Profit</CardTitle>
                <div className="w-4 h-4 flex items-center justify-center">
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                    <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">$151,000</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-sm text-green-500 font-medium">+9%</span>
                  </div>
                </div>
                <div className="h-20 bg-gradient-to-r from-green-50 to-green-100 rounded-lg flex items-end p-2">
                  <svg className="w-full h-full" viewBox="0 0 200 60">
                    <path
                      d="M10,45 Q30,35 50,30 T90,20 T130,35 T170,25 T190,15"
                      stroke="#10b981"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M10,45 Q30,35 50,30 T90,20 T130,35 T170,25 T190,15 L190,60 L10,60 Z"
                      fill="url(#greenGradient)"
                      opacity="0.1"
                    />
                    <defs>
                      <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row - Expenses Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold text-gray-900">Top Expenses Categories</CardTitle>
                <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <span className="text-xs text-gray-500">$</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-6">
                {/* Donut Chart */}
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="12"
                      strokeDasharray="85.3 250.3"
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="12"
                      strokeDasharray="65.3 250.3"
                      strokeDashoffset="-85.3"
                      transform="rotate(-90 50 50)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="12"
                      strokeDasharray="52.7 250.3"
                      strokeDashoffset="-150.6"
                      transform="rotate(-90 50 50)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="12"
                      strokeDasharray="47.7 250.3"
                      strokeDashoffset="-203.3"
                      transform="rotate(-90 50 50)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="12"
                      strokeDasharray="20.1 250.3"
                      strokeDashoffset="-251"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
                
                {/* Legend */}
                <div className="flex-1 space-y-2">
                  {expenseCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="text-sm text-gray-700">{category.name}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{category.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}