import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, Search, Tag, DollarSign, Building2, CreditCard, TrendingUp, Target } from "lucide-react";

export default function MobileLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <header className="px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <Link to="/" className="text-gray-600 text-sm">Accounting</Link>
            <Link to="/vision" className="text-black text-sm font-medium bg-blue-100 px-2 py-1 rounded">Vision</Link>
          </div>
          
          <Button className="bg-black text-white text-xs px-3 py-2 rounded-md hover:bg-gray-800">
            Get free
          </Button>
        </div>
      </header>

      {/* Mobile Hero Section */}
      <section className="px-4 py-12">
        <div className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium">
            ✨ Trusted by 10,000+ Property Managers
          </div>
          
          <div className="mb-6 flex justify-center">
            <div className="w-12 h-12 flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-black" strokeWidth={1.5} />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-black leading-tight mb-4">
            Manage your entire <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">property portfolio</span> in one dashboard
          </h1>
          
          <p className="text-base text-gray-600 mb-6 leading-relaxed">
            Track revenue, expenses, and profitability across all properties. Automated categorization and real-time insights built for property managers.
          </p>
          
          <div className="flex flex-col gap-2 mb-8 text-sm">
            <div className="flex items-center justify-center gap-2 text-green-600">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span>+47% Average ROI Increase</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              <span>5 Hours Saved Weekly</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 mb-12 max-w-xs mx-auto">
            <Button className="bg-black text-white text-sm px-6 py-3 rounded-lg hover:bg-gray-800 w-full flex items-center justify-center gap-2">
              <span>Start Free Trial</span>
              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">14 days</span>
            </Button>
            <Button variant="outline" className="text-gray-600 border-gray-300 text-sm px-6 py-3 rounded-lg hover:bg-gray-50 w-full flex items-center justify-center gap-2">
              <span>Watch Demo</span>
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
            </Button>
          </div>
        </div>
      </section>

      {/* Mobile Overview Section */}
      <section className="px-4 pb-8">
        <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-gray-900 font-bold">S</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Square Accounting</div>
                <div className="text-gray-300 text-xs">Financial Dashboard</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <Search className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-3 h-3 text-blue-600" />
              </div>
              <span className="text-sm font-semibold">Financial Overview</span>
              <div className="ml-auto flex items-center gap-1">
                <Tag className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-600">Auto</span>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { metric: "Total Revenue", value: "$125,430", change: "+12.5%", tag: "Revenue", color: "green" },
                { metric: "Total Expenses", value: "$89,210", change: "-3.2%", tag: "Expenses", color: "red" },
                { metric: "Net Profit", value: "$36,220", change: "+18.7%", tag: "Profit", color: "purple" },
                { metric: "Cash Flow", value: "$42,100", change: "+5.4%", tag: "Cash", color: "blue" },
                { metric: "Accounts Receivable", value: "$28,900", change: "+2.1%", tag: "AR", color: "orange" },
              ].map((metric, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-3 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-medium text-gray-900 truncate">{metric.metric}</div>
                    <div className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                      metric.color === 'green' ? 'bg-green-100 text-green-700' :
                      metric.color === 'red' ? 'bg-red-100 text-red-700' :
                      metric.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                      metric.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                      metric.color === 'orange' ? 'bg-orange-100 text-orange-700' : ''
                    }`}>
                      {metric.tag}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-bold text-gray-900">{metric.value}</div>
                    <div className={`text-xs font-semibold ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Listings Section */}
      <section className="px-4 pb-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium mb-4">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            Live Property Data
          </div>
          <h2 className="text-2xl font-bold text-black mb-3">Portfolio Overview at a Glance</h2>
          <p className="text-sm text-gray-600">
            Monitor all your properties in real-time. Track performance and identify opportunities with intelligent insights.
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="border-b border-gray-100 bg-white px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-gray-600" />
                <span className="font-semibold text-gray-900 text-sm">Portfolio Performance</span>
                <div className="bg-blue-50 text-blue-700 font-medium px-2 py-1 rounded-full text-xs">24</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-green-50 text-green-700 font-medium px-2 py-1 rounded-full text-xs">↑ 12%</div>
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3">
            {[
              { property: "Sunset Apartments", type: "Apartment", tenants: "Multiple Tenants", revenue: 48000, expenses: 12000, profit: 36000 },
              { property: "Downtown Office", type: "Office", tenants: "Multiple Tenants", revenue: 72000, expenses: 18000, profit: 54000 },
              { property: "Riverside Condos", type: "Condo", tenants: "Multiple Tenants", revenue: 54000, expenses: 15000, profit: 39000 },
            ].map((property, index) => (
              <div key={index} className="bg-white p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-all">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-gray-900 text-sm">{property.property}</div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400 text-xs">🏢</span>
                      <span className="text-xs font-medium text-gray-700">{property.type}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">{property.tenants}</div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <div className="text-gray-500">Revenue</div>
                      <div className="font-medium text-green-500">+${property.revenue.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Expenses</div>
                      <div className="font-medium text-red-400">-${property.expenses.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Profit</div>
                      <div className="font-medium text-green-500">+${property.profit.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Transactions Section */}
      <section className="px-4 pb-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-xs font-medium mb-4">
            <Target className="w-3 h-3" />
            Smart Categorization
          </div>
          <h2 className="text-2xl font-bold text-black mb-3">Every Transaction Automatically Organized</h2>
          <p className="text-sm text-gray-600">
            AI-powered categorization saves hours of manual work. Get instant insights into cash flow patterns across your portfolio.
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="border-b border-gray-100 bg-white px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-gray-600" />
                <span className="font-semibold text-gray-900 text-sm">Transaction Stream</span>
                <div className="bg-gray-50 text-gray-700 font-medium px-2 py-1 rounded-full text-xs">Live</div>
              </div>
              <div className="bg-green-50 text-green-700 font-medium px-2 py-1 rounded-full text-xs flex items-center gap-1">
                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                Auto
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="space-y-3 p-4">
                {[
                  { from: "Rent Payment - Apt #12", notes: "Monthly rent collection", amount: 2400, date: "Jan 15", category: "Rent", type: "revenue", method: "Bank Transfer" },
                  { from: "HVAC Repair", notes: "Emergency repair service", amount: 850, date: "Jan 14", category: "Maintenance", type: "expense", method: "Credit Card" },
                  { from: "Office Rent - Suite 304", notes: "Commercial lease payment", amount: 6200, date: "Jan 14", category: "Rent", type: "revenue", method: "ACH" },
                  { from: "Property Insurance", notes: "Annual insurance premium", amount: 1200, date: "Jan 12", category: "Insurance", type: "expense", method: "Check" },
                ].map((transaction, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-all">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-gray-900 text-sm truncate flex-1">{transaction.from}</div>
                        <div className={`text-sm font-medium ${
                          transaction.type === "revenue" ? "text-green-500" : "text-red-400"
                        }`}>
                          {transaction.type === "revenue" ? "+" : "-"}${transaction.amount.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 leading-relaxed">{transaction.notes}</div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="text-gray-700">{transaction.date}</div>
                        <div className="flex items-center gap-2">
                          <div className="font-medium px-2 py-1 bg-gray-100 text-gray-700 rounded">
                            {transaction.category}
                          </div>
                          <div className="text-gray-600">{transaction.method}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile ROI Section */}
      <section className="px-4 py-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium mb-6">
            <TrendingUp className="w-3 h-3" />
            Proven Results
          </div>
          <h2 className="text-3xl font-bold text-black mb-4">See Your ROI in <span className="text-blue-600">30 Days</span></h2>
          <p className="text-base text-gray-600 mb-8">
            Property managers using Square see an average 47% increase in portfolio ROI within the first month.
          </p>
          
          <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto mb-8">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <div className="text-xl font-bold text-green-600 mb-1">47%</div>
              <div className="text-xs text-gray-600">ROI Increase</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <div className="text-xl font-bold text-blue-600 mb-1">5hrs</div>
              <div className="text-xs text-gray-600">Time Saved</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <div className="text-xl font-bold text-purple-600 mb-1">99.9%</div>
              <div className="text-xs text-gray-600">Accuracy</div>
            </div>
          </div>
          
          <div className="max-w-sm mx-auto">
            <div className="flex flex-col gap-3 mb-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm"
              />
              <Button className="bg-black text-white w-full py-3 rounded-lg hover:bg-gray-800 text-sm flex items-center justify-center gap-2">
                <span>Start Free Trial</span>
                <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">14 days</span>
              </Button>
            </div>
            <p className="text-xs text-gray-500">No credit card required • Setup in 2 minutes</p>
          </div>
        </div>
      </section>

      {/* Mobile Workspaces Section */}
      <section className="px-4 py-12 bg-gray-50">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Workspaces built for teams</h2>
          <p className="text-sm text-gray-600">
            Seamlessly collaborate between workspaces and keep data organized.
          </p>
        </div>
        
        <div className="space-y-6 mb-12">
          {[
            {
              quote: "Square Accounting is finally bringing innovation to something that stayed stagnant for decades.",
              author: "Sarah Chen",
              handle: "@sarahchen"
            },
            {
              quote: "Square let me create a system so customized to the way I work, my properties, and my financial goals that there's no way I could go back.",
              author: "Marcus Johnson",
              handle: "@marcusjohnson"
            },
            {
              quote: "OK: Square Accounting is pretty sick.",
              author: "Alex Rivera",
              handle: "@alexrivera"
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <blockquote className="text-gray-900 mb-3 text-sm">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <div className="font-medium text-gray-900 text-sm">{testimonial.author}</div>
                <div className="text-gray-500 text-xs">{testimonial.handle}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile Footer */}
      <footer className="px-4 py-6">
        <div className="text-center">
          <div className="text-gray-600 text-sm">
            © 2025 SquareLabs
          </div>
        </div>
      </footer>
    </div>
  );
}