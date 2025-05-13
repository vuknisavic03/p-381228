
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Plus, BarChart, TrendingUp } from 'lucide-react';
import { CreateWorkspaceDialog } from '@/components/workspace/CreateWorkspaceDialog';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

  const handleWorkspaceSelect = () => {
    navigate('/dashboard');
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-[#F5F5F6] shadow-lg rounded-md">
          <p className="font-medium text-gray-700 mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="font-semibold text-gray-800 flex items-center gap-1" style={{ color: entry.color }}>
              {activeChartType === 'commission' ? (
                <span className="text-sm font-medium">{entry.dataKey === 'commission' ? 'Commission: ' : ''}</span>
              ) : (
                <span className="text-sm font-medium">{entry.dataKey === 'value' ? 'Revenue: ' : ''}</span>
              )}
              <span>${entry.value}k</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <div className="w-[280px] border-r border-[#EAEAEC] bg-white shadow-sm flex-shrink-0">
        <div className="p-4 border-b border-[#EAEAEC]">
          <div className="flex items-center justify-between">
            <h2 className="text-[#1A1A1A] text-lg font-semibold">Workspaces</h2>
            <button 
              onClick={() => setIsDialogOpen(true)}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-[#F9F9FA] hover:bg-[#F0F0F2] transition-colors"
            >
              <Plus className="w-4 h-4 text-[#1A1A1A]" />
            </button>
          </div>
        </div>
        <div className="overflow-auto h-[calc(100vh-57px)]">
          {workspaces.map((workspace) => (
            <button
              key={workspace.name}
              onClick={handleWorkspaceSelect}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#F9F9FA] transition-colors text-left mx-1.5"
            >
              <div className="flex items-center gap-2.5">
                <div className="min-w-8 h-8 rounded-lg bg-gradient-to-br from-[#FAFAFA] to-[#F0F0F2] flex items-center justify-center text-sm font-medium text-[#6E6E76]">
                  {workspace.initials}
                </div>
                <div>
                  <div className="text-[#1A1A1A] font-medium truncate max-w-36 text-base">{workspace.name}</div>
                  <div className="text-sm text-[#9EA3AD] truncate max-w-36">{workspace.owner}</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#9EA3AD]" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto pb-6">
        <div className="w-full mx-auto p-2 md:px-4">
          <div className="mb-5">            
            <div className="flex gap-3 mt-4">
              <Button
                onClick={() => setActiveChartType('revenue')}
                variant={activeChartType === 'revenue' ? 'outline' : 'outline'}
                className={`gap-2 py-1.5 px-3 rounded-md border border-[#F5F5F6] bg-white hover:bg-[#F9F9FA] hover:text-[#1A1A1A] hover:border-[#DADBE0] ${
                  activeChartType === 'revenue' ? 'text-[#1A1A1A] shadow-sm' : 'text-[#6E6E76]'
                }`}
                size="sm"
              >
                <BarChart className={`w-4 h-4 ${activeChartType === 'revenue' ? 'text-[#9b87f5]' : 'text-[#6E6E76]'}`} />
                <span className={`text-xs ${activeChartType === 'revenue' ? 'font-medium' : 'font-normal'}`}>
                  Property Revenue
                </span>
              </Button>
              <Button
                onClick={() => setActiveChartType('commission')}
                variant={activeChartType === 'commission' ? 'outline' : 'outline'}
                className={`gap-2 py-1.5 px-3 rounded-md border border-[#F5F5F6] bg-white hover:bg-[#F9F9FA] hover:text-[#1A1A1A] hover:border-[#DADBE0] ${
                  activeChartType === 'commission' ? 'text-[#1A1A1A] shadow-sm' : 'text-[#6E6E76]'
                }`}
                size="sm"
              >
                <TrendingUp className={`w-4 h-4 ${activeChartType === 'commission' ? 'text-[#0EA5E9]' : 'text-[#6E6E76]'}`} />
                <span className={`text-xs ${activeChartType === 'commission' ? 'font-medium' : 'font-normal'}`}>
                  Manager Commission
                </span>
              </Button>
            </div>
          </div>
          
          {activeChartType === 'revenue' ? (
            <div className="grid grid-cols-2 gap-4 px-1">
              {workspaces.map((workspace, index) => (
                <Card 
                  key={index}
                  className="overflow-hidden border border-[#F5F5F6] rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer bg-white"
                  onClick={handleWorkspaceSelect}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="min-w-8 h-8 rounded-lg bg-gradient-to-br from-[#FAFAFA] to-[#F0F0F2] flex items-center justify-center text-sm font-medium text-[#6E6E76]">
                          {workspace.initials}
                        </div>
                        <div>
                          <div className="text-[#1A1A1A] font-medium text-base">{workspace.name}</div>
                          <div className="text-sm text-[#6E6E76]">{workspace.owner}</div>
                        </div>
                      </div>
                      <div className="text-[#9b87f5] p-1 rounded-lg">
                        <BarChart size={18} />
                      </div>
                    </div>
                    
                    <div className="h-36 mt-2 pt-3 border-t border-[#F5F5F6]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={workspace.revenueData}
                          margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                        >
                          <defs>
                            <linearGradient id={`colorRevenue${index}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.7} />
                              <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.05} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F5F6" opacity={0.7} />
                          <XAxis 
                            dataKey="month" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9EA3AD', fontSize: 10 }}
                          />
                          <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9EA3AD', fontSize: 10 }}
                            width={25}
                            tickFormatter={(value) => `$${value}k`}
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
                            activeDot={{ r: 5, strokeWidth: 1, stroke: "#9b87f5", fill: '#ffffff' }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="px-1 h-[calc(100vh-120px)]">
              <Card 
                className="overflow-hidden border border-[#F5F5F6] rounded-lg shadow-sm hover:shadow-md transition-all bg-white h-full"
              >
                <CardContent className="p-5 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-medium text-[#1A1A1A]">Manager Commission Summary</h3>
                      <p className="text-sm text-[#6E6E76]">Monthly commission earnings across all workspaces</p>
                    </div>
                    <div className="text-[#0EA5E9] p-1 rounded-lg">
                      <TrendingUp size={22} />
                    </div>
                  </div>
                  
                  <div className="h-[calc(100%-70px)] pt-3 border-t border-[#F5F5F6]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={workspaces.flatMap(workspace => 
                          workspace.commissionData.map(item => ({
                            ...item,
                            workspace: workspace.name,
                            initials: workspace.initials
                          }))
                        )}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} stroke="#F5F5F6" />
                        <XAxis 
                          dataKey="month" 
                          axisLine={{ stroke: '#F5F5F6', strokeWidth: 1 }}
                          tickLine={false}
                          tick={{ fill: '#6E6E76', fontSize: 12 }}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#6E6E76', fontSize: 12 }}
                          tickFormatter={(value) => `$${value}k`}
                          width={40}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend 
                          verticalAlign="top"
                          height={36}
                          wrapperStyle={{paddingBottom: '10px'}}
                        />
                        <Bar 
                          dataKey="commission" 
                          fill="#0EA5E9"
                          fillOpacity={0.85}
                          radius={[4, 4, 0, 0]}
                          name="Commission"
                        />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
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
