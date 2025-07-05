import React, { useState, useEffect } from 'react';
import { Tag, Zap, Filter, ChevronDown, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockTransactions = [
  {
    id: 1,
    from: "Wells Fargo Business",
    desc: "Monthly Rent Collection - Unit 4B",
    amount: "+$2,400",
    category: null,
    time: "Just now",
    rawCategory: "Rent Income",
    color: "bg-green-500"
  },
  {
    id: 2,
    from: "ServiceMaster Commercial",
    desc: "Emergency HVAC System Repair",
    amount: "-$850",
    category: null,
    time: "2 min ago",
    rawCategory: "Maintenance",
    color: "bg-red-500"
  },
  {
    id: 3,
    from: "Property Insurance Co",
    desc: "Quarterly Insurance Premium",
    amount: "-$1,200",
    category: null,
    time: "5 min ago",
    rawCategory: "Insurance",
    color: "bg-blue-500"
  },
  {
    id: 4,
    from: "ConEd Business",
    desc: "Monthly Utility Bill - January",
    amount: "-$320",
    category: null,
    time: "8 min ago",
    rawCategory: "Utilities",
    color: "bg-orange-500"
  }
];

const categories = [
  { name: "Rent Income", color: "bg-green-500", count: 0 },
  { name: "Maintenance", color: "bg-red-500", count: 0 },
  { name: "Insurance", color: "bg-blue-500", count: 0 },
  { name: "Utilities", color: "bg-orange-500", count: 0 }
];

export default function InteractiveCategorizationDemo() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedView, setSelectedView] = useState('All Transactions');
  const [showFilters, setShowFilters] = useState(false);

  const views = ['All Transactions', 'Inbox', 'Rent Income', 'Maintenance', 'Insurance', 'Utilities'];

  const startAutoCategorization = () => {
    setIsProcessing(true);
    setCurrentIndex(0);
    
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
            clearInterval(interval);
          }
          
          return nextIndex;
        }
        return prev;
      });
    }, 1200);
  };

  const filteredTransactions = selectedView === 'All Transactions' || selectedView === 'Inbox'
    ? transactions
    : transactions.filter(t => t.category === selectedView);

  const getCategoryCounts = () => {
    return categories.map(cat => ({
      ...cat,
      count: transactions.filter(t => t.category === cat.name).length
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">Square</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={startAutoCategorization}
              disabled={isProcessing}
              className="text-xs h-7 px-3"
            >
              {isProcessing ? (
                <>
                  <Zap className="w-3 h-3 mr-1 animate-pulse" />
                  Auto-categorizing...
                </>
              ) : (
                <>
                  <Zap className="w-3 h-3 mr-1" />
                  Try Auto-Label
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-48 bg-gray-50 border-r border-gray-200">
          <div className="p-3">
            <div className="text-xs font-medium text-gray-500 mb-2">Views</div>
            
            <div className="space-y-1">
              {views.map((view, index) => {
                const isActive = selectedView === view;
                const count = view === 'All Transactions' || view === 'Inbox' 
                  ? transactions.length 
                  : transactions.filter(t => t.category === view).length;
                
                return (
                  <button
                    key={view}
                    onClick={() => setSelectedView(view)}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-xs transition-colors ${
                      isActive 
                        ? 'bg-blue-100 text-blue-700 font-medium' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {index === 0 && <Tag className="w-3 h-3" />}
                      {index === 1 && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                      {index > 1 && (
                        <div className={`w-2 h-2 rounded-full ${
                          categories.find(c => c.name === view)?.color || 'bg-gray-400'
                        }`}></div>
                      )}
                      <span>{view}</span>
                    </div>
                    {count > 0 && (
                      <span className="text-xs text-gray-500">{count}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Content Header */}
          <div className="px-4 py-3 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-gray-900">{selectedView}</span>
              </div>
              <div className="flex items-center gap-2">
                {isProcessing && (
                  <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium animate-pulse">
                    Auto-categorizing
                  </div>
                )}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900"
                >
                  <Filter className="w-3 h-3" />
                  Filter
                  <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          {showFilters && (
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
              <div className="flex gap-2 text-xs">
                <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">All Categories</div>
                <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">This Month</div>
                <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Property: All</div>
              </div>
            </div>
          )}

          {/* Transaction List */}
          <div className="p-4">
            <div className="space-y-2">
              {filteredTransactions.map((transaction, index) => (
                <div 
                  key={transaction.id} 
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    transaction.category 
                      ? 'bg-gray-50 hover:bg-gray-100' 
                      : 'bg-white border border-dashed border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        transaction.category 
                          ? transaction.color 
                          : 'bg-gray-300 animate-pulse'
                      }`}></div>
                      <span className="text-sm font-medium text-gray-900">{transaction.from}</span>
                      <span className="text-xs text-gray-500">{transaction.time}</span>
                    </div>
                    <span className={`text-sm font-semibold ${
                      transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount}
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-700 mb-2 ml-4">
                    {transaction.desc}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {transaction.category ? (
                      <>
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                          {transaction.category}
                        </span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          Auto-labeled
                        </span>
                      </>
                    ) : (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full animate-pulse">
                        Analyzing...
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}