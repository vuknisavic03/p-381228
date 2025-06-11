
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Plus, BarChart, TrendingUp } from 'lucide-react';
import { CreateWorkspaceDialog } from '@/components/workspace/CreateWorkspaceDialog';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from '@clerk/clerk-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  ResponsiveContainer, 
  Tooltip,
  BarChart as RechartsBarChart,
  Bar,
  YAxis,
  CartesianGrid
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

// New yearly commission data for the main chart
const yearlyCommissionData = [
  { year: "2018", commission: 48.2 },
  { year: "2019", commission: 53.7 },
  { year: "2020", commission: 42.1 },
  { year: "2021", commission: 61.5 },
  { year: "2022", commission: 68.2 },
  { year: "2023", commission: 72.9 },
  { year: "2024", commission: 65.3 },
];

// New monthly commission data for the current year
const monthlyCommissionData = [
  { month: "Jan", commission: 4.8 },
  { month: "Feb", commission: 5.3 },
  { month: "Mar", commission: 4.2 },
  { month: "Apr", commission: 6.2 },
  { month: "May", commission: 6.8 },
  { month: "Jun", commission: 7.2 },
  { month: "Jul", commission: 6.5 },
  { month: "Aug", commission: 5.9 },
  { month: "Sep", commission: 6.8 },
  { month: "Oct", commission: 7.1 },
  { month: "Nov", commission: 5.8 },
  { month: "Dec", commission: 6.3 },
];

export default function WorkspacePicker() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeChartType, setActiveChartType] = useState<'revenue' | 'commission'>('revenue');

  const handleWorkspaceSelect = (workspace: Workspace) => {
    // Pass the workspace data to the dashboard via state
    navigate('/dashboard', { 
      state: { 
        workspace: {
          name: workspace.name,
          owner: workspace.owner,
          initials: workspace.initials
        } 
      } 
    });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="backdrop-blur-md bg-white/90 p-3 border border-slate-200/50 shadow-lg rounded-md">
          <p className="font-medium text-slate-800 mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="font-semibold text-slate-900 flex items-center gap-1" style={{ color: entry.color }}>
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
              onClick={() => handleWorkspaceSelect(workspace)}
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
              {/* PROPERTY REVENUE BUTTON */}
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
              {/* MANAGER COMMISSION BUTTON */}
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
          
          {/* REVENUE FROM CLIENTS GRAPH */}
          {activeChartType === 'revenue' ? (
            <div className="grid grid-cols-2 gap-4 px-1">
              {workspaces.map((workspace, index) => (
                <Card 
                  key={index}
                  className="overflow-hidden border border-[#F5F5F6] rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer bg-white"
                  onClick={() => handleWorkspaceSelect(workspace)}
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
                          margin={{ top: 5, right: 5, left: 10, bottom: 5 }}
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
                            padding={{ left: 10, right: 10 }}
                          />
                          <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9EA3AD', fontSize: 10 }}
                            width={35}
                            tickFormatter={(value) => `$${value}k`}
                            padding={{ top: 5 }}
                            domain={['auto', 'auto']}
                          />
                          <Tooltip 
                            content={<CustomTooltip />} 
                            cursor={{ 
                              stroke: "#F5F5F6", 
                              strokeWidth: 1, 
                              strokeDasharray: "3 3",
                              fill: "rgba(240, 240, 245, 0.8)"
                            }}
                          />
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
              {/* MANAGER COMMISSION GRAPH */}
              <Card 
                className="overflow-hidden border border-[#F5F5F6] rounded-lg shadow-sm hover:shadow-md transition-all bg-white h-full"
              >
                <CardContent className="p-5 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-medium text-[#1A1A1A]">Monthly Manager Commission</h3>
                      <p className="text-sm text-[#6E6E76]">Commission earnings for current year (2025)</p>
                    </div>
                    <div className="text-[#0EA5E9] p-1 rounded-lg">
                      <TrendingUp size={22} />
                    </div>
                  </div>
                  
                  <div className="h-[calc(100%-70px)] pt-3 border-t border-[#F5F5F6]">
                    <ResponsiveContainer width="100%" height="95%">
                      <RechartsBarChart
                        data={monthlyCommissionData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} stroke="#F5F5F6" />
                        <XAxis 
                          dataKey="month" 
                          axisLine={{ stroke: '#F5F5F6', strokeWidth: 1 }}
                          tickLine={false}
                          tick={{ fill: '#6E6E76', fontSize: 12 }}
                          padding={{ left: 10, right: 10 }}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#6E6E76', fontSize: 12 }}
                          tickFormatter={(value) => `$${value}k`}
                          width={45}
                          padding={{ top: 10 }}
                          domain={['auto', 'auto']}
                        />
                        <Tooltip 
                          content={<CustomTooltip />}
                          cursor={{ 
                            fill: "rgba(240, 240, 245, 0.8)", 
                            stroke: "#F5F5F6",
                            strokeWidth: 1,
                            opacity: 0.9
                          }} 
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
