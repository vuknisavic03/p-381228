
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Plus, BarChart, TrendingUp } from 'lucide-react';
import { CreateWorkspaceDialog } from '@/components/workspace/CreateWorkspaceDialog';
import { Card, CardContent } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  ResponsiveContainer, 
  Tooltip,
  BarChart as RechartsBarChart,
  Bar,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

interface Workspace {
  name: string;
  owner: string;
  initials: string;
  revenueData: {
    month: string;
    value: number;
  }[];
  commissionData: {
    month: string;
    commission: number;
  }[];
}

const workspaces: Workspace[] = [
  { 
    name: "Kevin's Workspace", 
    owner: "Kevin Anderson", 
    initials: "KA",
    revenueData: [
      { month: "Jan", value: 31 },
      { month: "Feb", value: 40 },
      { month: "Mar", value: 28 },
      { month: "Apr", value: 51 },
      { month: "May", value: 42 },
      { month: "Jun", value: 61 }
    ],
    commissionData: [
      { month: "Jan", commission: 3.1 },
      { month: "Feb", commission: 4.0 },
      { month: "Mar", commission: 2.8 },
      { month: "Apr", commission: 5.1 },
      { month: "May", commission: 4.2 },
      { month: "Jun", commission: 6.1 }
    ]
  },
  { 
    name: "Lucas's Workspace", 
    owner: "Lucas Everett", 
    initials: "LE",
    revenueData: [
      { month: "Jan", value: 25 },
      { month: "Feb", value: 35 },
      { month: "Mar", value: 45 },
      { month: "Apr", value: 30 },
      { month: "May", value: 55 },
      { month: "Jun", value: 48 }
    ],
    commissionData: [
      { month: "Jan", commission: 2.5 },
      { month: "Feb", commission: 3.5 },
      { month: "Mar", commission: 4.5 },
      { month: "Apr", commission: 3.0 },
      { month: "May", commission: 5.5 },
      { month: "Jun", commission: 4.8 }
    ]
  },
  { 
    name: "Mia's Workspace", 
    owner: "Mia Holloway", 
    initials: "MH",
    revenueData: [
      { month: "Jan", value: 40 },
      { month: "Feb", value: 30 },
      { month: "Mar", value: 50 },
      { month: "Apr", value: 45 },
      { month: "May", value: 35 },
      { month: "Jun", value: 55 }
    ],
    commissionData: [
      { month: "Jan", commission: 4.0 },
      { month: "Feb", commission: 3.0 },
      { month: "Mar", commission: 5.0 },
      { month: "Apr", commission: 4.5 },
      { month: "May", commission: 3.5 },
      { month: "Jun", commission: 5.5 }
    ]
  },
  { 
    name: "Nathan's Workspace", 
    owner: "Nathan Caldwell", 
    initials: "NC",
    revenueData: [
      { month: "Jan", value: 38 },
      { month: "Feb", value: 42 },
      { month: "Mar", value: 35 },
      { month: "Apr", value: 60 },
      { month: "May", value: 48 },
      { month: "Jun", value: 52 }
    ],
    commissionData: [
      { month: "Jan", commission: 3.8 },
      { month: "Feb", commission: 4.2 },
      { month: "Mar", commission: 3.5 },
      { month: "Apr", commission: 6.0 },
      { month: "May", commission: 4.8 },
      { month: "Jun", commission: 5.2 }
    ]
  },
  { 
    name: "Sophia's Workspace", 
    owner: "Sophia Riggins", 
    initials: "SR",
    revenueData: [
      { month: "Jan", value: 45 },
      { month: "Feb", value: 52 },
      { month: "Mar", value: 40 },
      { month: "Apr", value: 38 },
      { month: "May", value: 65 },
      { month: "Jun", value: 50 }
    ],
    commissionData: [
      { month: "Jan", commission: 4.5 },
      { month: "Feb", commission: 5.2 },
      { month: "Mar", commission: 4.0 },
      { month: "Apr", commission: 3.8 },
      { month: "May", commission: 6.5 },
      { month: "Jun", commission: 5.0 }
    ]
  },
];

export default function WorkspacePicker() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeChartType, setActiveChartType] = useState<'revenue' | 'commission'>('revenue');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-lg rounded-md">
          <p className="font-medium text-gray-700">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="font-semibold text-gray-800" style={{ color: entry.color }}>
              {entry.name === 'commission' ? `$${entry.value}k` : `$${entry.value}k`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-screen bg-white flex">
      <div className="w-[280px] border-r border-[#E4E5EA] h-full bg-white">
        <div className="p-4 border-b border-[#E4E5EA]">
          <div className="flex items-center justify-between">
            <h2 className="text-[#1A1A1A] text-lg font-semibold">Choose Workspace</h2>
            <button 
              onClick={() => setIsDialogOpen(true)}
              className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
            >
              <Plus className="w-4 h-4 text-[#1A1A1A]" />
            </button>
          </div>
        </div>
        <div className="space-y-1 p-2">
          {workspaces.map((workspace) => (
            <button
              key={workspace.name}
              onClick={() => navigate('/dashboard')}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#F6F6F7] transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="min-w-8 h-8 rounded-lg bg-[#F6F6F7] flex items-center justify-center text-sm font-medium text-[#9EA3AD]">
                  {workspace.initials}
                </div>
                <div>
                  <div className="text-[#1A1A1A] font-medium">{workspace.name}</div>
                  <div className="text-sm text-[#9EA3AD]">{workspace.owner}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#9EA3AD]" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold mb-2">Workspace Analytics</h1>
            <p className="text-[#9EA3AD]">Select a workspace to view detailed analytics</p>
            
            <div className="flex gap-4 mt-4 mb-6">
              <button
                onClick={() => setActiveChartType('revenue')}
                className={`px-4 py-2 rounded-md transition-all ${
                  activeChartType === 'revenue' 
                  ? 'bg-[#9b87f5] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Property Revenue
              </button>
              <button
                onClick={() => setActiveChartType('commission')}
                className={`px-4 py-2 rounded-md transition-all ${
                  activeChartType === 'commission' 
                  ? 'bg-[#0EA5E9] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Manager Commission
              </button>
            </div>
          </div>
          
          {activeChartType === 'revenue' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workspaces.map((workspace, index) => (
                <Card 
                  key={index}
                  className="shadow-md border border-[#E7E8EC] hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => navigate('/dashboard')}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="min-w-8 h-8 rounded-lg bg-[#F6F6F7] flex items-center justify-center text-sm font-medium text-[#9EA3AD]">
                          {workspace.initials}
                        </div>
                        <div>
                          <div className="text-[#1A1A1A] font-semibold">{workspace.name}</div>
                          <div className="text-sm text-[#9EA3AD]">{workspace.owner}</div>
                        </div>
                      </div>
                      <div className="bg-[#9b87f5] text-white p-2 rounded-md">
                        <BarChart size={18} />
                      </div>
                    </div>
                    
                    <div className="h-[160px] mt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={workspace.revenueData}
                          margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                        >
                          <defs>
                            <linearGradient id={`colorRevenue${index}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.1} />
                            </linearGradient>
                          </defs>
                          <XAxis 
                            dataKey="month" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6E6E76', fontSize: 10 }}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#9b87f5"
                            fillOpacity={1}
                            fill={`url(#colorRevenue${index})`}
                            strokeWidth={2}
                            name="revenue"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workspaces.map((workspace, index) => (
                <Card 
                  key={index}
                  className="shadow-md border border-[#E7E8EC] hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => navigate('/dashboard')}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="min-w-8 h-8 rounded-lg bg-[#F6F6F7] flex items-center justify-center text-sm font-medium text-[#9EA3AD]">
                          {workspace.initials}
                        </div>
                        <div>
                          <div className="text-[#1A1A1A] font-semibold">{workspace.name}</div>
                          <div className="text-sm text-[#9EA3AD]">{workspace.owner}</div>
                        </div>
                      </div>
                      <div className="bg-[#0EA5E9] text-white p-2 rounded-md">
                        <TrendingUp size={18} />
                      </div>
                    </div>
                    
                    <div className="h-[200px] mt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart
                          data={workspace.commissionData}
                          margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                          <XAxis 
                            dataKey="month" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6E6E76', fontSize: 10 }}
                          />
                          <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6E6E76', fontSize: 10 }}
                            tickFormatter={(value) => `$${value}k`}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar 
                            dataKey="commission" 
                            fill="#0EA5E9" 
                            radius={[4, 4, 0, 0]}
                            name="commission"
                          />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <CreateWorkspaceDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}
