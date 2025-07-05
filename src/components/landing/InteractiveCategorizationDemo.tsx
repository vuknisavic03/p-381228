import React, { useState, useEffect } from 'react';
import { Tag, Zap, Filter, ChevronDown, Users, Building2, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const mockTransactions = [
  {
    id: 1,
    from: "Wells Fargo Business",
    desc: "Monthly Rent Collection - Unit 4B",
    amount: "+$2,400",
    category: null,
    time: "Just now",
    rawCategory: "Rent Income",
    color: "text-green-500"
  },
  {
    id: 2,
    from: "ServiceMaster Commercial",
    desc: "Emergency HVAC System Repair",
    amount: "-$850",
    category: null,
    time: "2 min ago",
    rawCategory: "Maintenance",
    color: "text-red-500"
  },
  {
    id: 3,
    from: "Property Insurance Co",
    desc: "Quarterly Insurance Premium",
    amount: "-$1,200",
    category: null,
    time: "5 min ago",
    rawCategory: "Insurance",
    color: "text-blue-500"
  },
  {
    id: 4,
    from: "ConEd Business",
    desc: "Monthly Utility Bill - January",
    amount: "-$320",
    category: null,
    time: "8 min ago",
    rawCategory: "Utilities",
    color: "text-orange-500"
  }
];

const categoryStats = [
  { name: "Rent Income", value: "$7,200", trend: "+12%", icon: DollarSign, color: "text-green-600" },
  { name: "Maintenance", value: "$2,150", trend: "-8%", icon: Building2, color: "text-red-600" },
  { name: "Insurance", value: "$3,600", trend: "0%", icon: Users, color: "text-blue-600" },
  { name: "Utilities", value: "$960", trend: "+5%", icon: Zap, color: "text-orange-600" }
];

export default function InteractiveCategorizationDemo() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showStats, setShowStats] = useState(false);

  const startAutoCategorization = () => {
    setIsProcessing(true);
    setCurrentIndex(0);
    setShowStats(false);
    
    // Reset all transactions
    setTransactions(mockTransactions.map(t => ({ ...t, category: null })));
    
    // Auto-categorize with delays
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const nextIndex = prev + 1;
        if (nextIndex <= mockTransactions.length) {
          setTransactions(current => 
            current.map((t, idx) => 
              idx < nextIndex 
                ? { ...t, category: t.rawCategory }
                : t
            )
          );
          
          if (nextIndex === mockTransactions.length) {
            setIsProcessing(false);
            setTimeout(() => setShowStats(true), 500);
            clearInterval(interval);
          }
          
          return nextIndex;
        }
        return prev;
      });
    }, 1200);
  };

  const categorizedCount = transactions.filter(t => t.category).length;

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="border-b border-gray-100 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CardTitle className="flex items-center gap-2 text-gray-900 font-semibold">
                <Tag className="w-5 h-5 text-blue-600" />
                Smart Transaction Categorization
              </CardTitle>
              <Badge variant="secondary" className="bg-gray-100 text-gray-700 font-medium">
                {categorizedCount}/{transactions.length} Categorized
              </Badge>
            </div>
            
            <Button 
              onClick={startAutoCategorization}
              disabled={isProcessing}
              className="bg-black text-white hover:bg-gray-800"
            >
              {isProcessing ? (
                <>
                  <Zap className="w-4 h-4 mr-2 animate-pulse" />
                  Auto-categorizing...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Try Smart Categorization
                </>
              )}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Transaction Feed */}
      <Card className="shadow-sm border-gray-200 overflow-hidden">
        <CardHeader className="border-b border-gray-100 bg-white">
          <CardTitle className="flex items-center gap-2 text-gray-900 font-semibold">
            Live Transaction Feed
            {isProcessing && (
              <Badge className="bg-green-100 text-green-700 animate-pulse">
                Processing
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden rounded-b-xl">
            <Table>
              <TableHeader>
                <TableRow className="border-b bg-gray-50/80 hover:bg-gray-50/80">
                  <TableHead className="font-semibold text-gray-800">Source</TableHead>
                  <TableHead className="font-semibold text-gray-800">Description</TableHead>
                  <TableHead className="font-semibold text-gray-800">Category</TableHead>
                  <TableHead className="font-semibold text-gray-800 text-right">Amount</TableHead>
                  <TableHead className="font-semibold text-gray-800">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction, index) => (
                  <TableRow 
                    key={transaction.id} 
                    className={`hover:bg-gray-50/70 border-b border-gray-100 last:border-b-0 transition-all duration-300 ${
                      !transaction.category ? 'bg-yellow-50/30' : ''
                    }`}
                  >
                    <TableCell className="py-4">
                      <div className="font-semibold text-gray-900">{transaction.from}</div>
                      <div className="text-xs text-gray-500">{transaction.time}</div>
                    </TableCell>
                    <TableCell className="py-4">
                      <span className="text-sm text-gray-700">{transaction.desc}</span>
                    </TableCell>
                    <TableCell className="py-4">
                      {transaction.category ? (
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-medium">
                          {transaction.category}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-dashed animate-pulse">
                          Analyzing...
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right py-4">
                      <span className={transaction.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                        {transaction.amount}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      {transaction.category ? (
                        <Badge className="bg-green-100 text-green-700">
                          Auto-labeled
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-orange-200 text-orange-600">
                          Pending
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Category Analytics */}
      {showStats && (
        <div className="animate-fade-in">
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="border-b border-gray-100 bg-white">
              <CardTitle className="text-gray-900 font-semibold">Category Analytics</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categoryStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.name} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <Icon className={`h-5 w-5 ${stat.color}`} />
                        <span className={`text-xs font-medium ${stat.color}`}>
                          {stat.trend}
                        </span>
                      </div>
                      <div className="text-lg font-bold text-gray-900 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-600">
                        {stat.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}