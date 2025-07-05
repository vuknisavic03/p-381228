import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, Search, Tag, DollarSign, Building2, CreditCard, TrendingUp, Target } from "lucide-react";

export default function MobileLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <header className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-7 h-7 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <nav className="flex items-center gap-4">
              <Link to="/" className="text-gray-600 text-sm">Accounting</Link>
              <Link to="/vision" className="text-blue-600 text-sm font-medium">Vision</Link>
            </nav>
          </div>
          
          <Button className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800">
            Get Square free
          </Button>
        </div>
      </header>

      {/* Mobile Hero Section */}
      <section className="px-4 py-12">
        <div className="text-center">
          
          <div className="mb-8 flex justify-center">
            <div className="w-16 h-16 flex items-center justify-center">
              <Building2 className="w-12 h-12 text-black" strokeWidth={1.5} />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-black leading-tight mb-4">
            The dashboard that thinks like you
          </h1>
          
          <p className="text-base text-gray-600 mb-8 leading-relaxed px-4 max-w-md mx-auto">
            Meet Square Accounting, the dashboard that organizes itself, tracks revenue, and manages expenses any way you'd like.
          </p>
          
          <div className="flex justify-center mb-12">
            <Button className="bg-black text-white text-base px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
              Get Square free
            </Button>
          </div>
        </div>
      </section>

      {/* Mobile Dashboard Demo Section */}
      <section className="px-4 pb-12">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-4">
          <div className="bg-gray-900 px-3 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
                <span className="text-gray-900 font-bold text-xs">S</span>
              </div>
              <div>
                <div className="text-white font-medium text-sm">Square Accounting</div>
                <div className="text-gray-300 text-xs">Dashboard</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
              <Search className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-3.5 h-3.5 text-gray-600" />
              <span className="text-sm font-medium">Financial Overview</span>
              <div className="ml-auto flex items-center gap-1">
                <Tag className="w-2.5 h-2.5 text-gray-400" />
                <span className="text-xs text-gray-500">Auto</span>
              </div>
            </div>
          </div>

          <div className="p-3">
            <div className="grid grid-cols-3 gap-2">
              {[
                { metric: "Revenue", value: "$125K", change: "+12.5%" },
                { metric: "Expenses", value: "$89K", change: "-3.2%" },
                { metric: "Profit", value: "$36K", change: "+18.7%" },
                { metric: "Cash Flow", value: "$42K", change: "+5.4%" },
                { metric: "Receivable", value: "$29K", change: "+2.1%" },
                { metric: "Payable", value: "$16K", change: "-8.3%" },
              ].map((metric, index) => (
                <div key={index} className="bg-white p-2 rounded-lg border border-gray-100">
                  <div className="text-xs font-medium text-gray-700 mb-1 truncate">{metric.metric}</div>
                  <div className="text-sm font-bold text-gray-900">{metric.value}</div>
                  <div className={`text-xs font-medium ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Listings Section */}
      <section className="px-4 pb-12">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-black mb-3">Organize your properties</h2>
          <p className="text-sm text-gray-600 px-4">
            Group properties by type, filter by performance, and track everything in one view.
          </p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="border-b border-gray-100 bg-white px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-gray-600" />
                <span className="font-semibold text-gray-900 text-sm">Portfolio Performance</span>
                <div className="bg-blue-50 text-blue-700 font-medium px-2 py-1 rounded-full text-xs">24</div>
              </div>
              <div className="bg-green-50 text-green-700 font-medium px-2 py-1 rounded-full text-xs">↑ 12%</div>
            </div>
          </div>

          <div className="p-3 space-y-2.5">
            {[
              { property: "Sunset Apartments", type: "Apartment", tenants: "Multiple Tenants", revenue: 48000, expenses: 12000, profit: 36000 },
              { property: "Downtown Office", type: "Office", tenants: "Multiple Tenants", revenue: 72000, expenses: 18000, profit: 54000 },
              { property: "Riverside Condos", type: "Condo", tenants: "Multiple Tenants", revenue: 54000, expenses: 15000, profit: 39000 },
            ].map((property, index) => (
              <div key={index} className="bg-white p-2.5 rounded-lg border border-gray-200 hover:shadow-sm transition-all">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-gray-900 text-xs">{property.property}</div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400 text-xs">🏢</span>
                      <span className="text-xs font-medium text-gray-700">{property.type}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">{property.tenants}</div>
                  <div className="grid grid-cols-3 gap-1.5 text-xs">
                    <div>
                      <div className="text-gray-500 text-xs">Revenue</div>
                      <div className="font-medium text-green-500">+${property.revenue.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs">Expenses</div>
                      <div className="font-medium text-red-400">-${property.expenses.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs">Profit</div>
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
      <section className="px-4 pb-12">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-black mb-3">Filter out noise</h2>
          <p className="text-sm text-gray-600 px-4">
            Auto-categorize transactions, group by property, and focus on what matters.
          </p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="border-b border-gray-100 bg-white px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-gray-600" />
                <span className="font-semibold text-gray-900 text-sm">Transaction Stream</span>
                <div className="bg-gray-50 text-gray-700 font-medium px-2 py-1 rounded-full text-xs">Live</div>
              </div>
              <div className="bg-green-50 text-green-700 font-medium px-2 py-1 rounded-full text-xs">Auto</div>
            </div>
          </div>
          <div className="p-3">
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="space-y-2.5 p-3">
                {[
                  { from: "Rent Payment - Apt #12", notes: "Monthly rent collection", amount: 2400, date: "Jan 15", category: "Rent", type: "revenue", method: "Bank Transfer" },
                  { from: "HVAC Repair", notes: "Emergency repair service", amount: 850, date: "Jan 14", category: "Maintenance", type: "expense", method: "Credit Card" },
                  { from: "Office Rent - Suite 304", notes: "Commercial lease payment", amount: 6200, date: "Jan 14", category: "Rent", type: "revenue", method: "ACH" },
                  { from: "Property Insurance", notes: "Annual insurance premium", amount: 1200, date: "Jan 12", category: "Insurance", type: "expense", method: "Check" },
                ].map((transaction, index) => (
                  <div key={index} className="bg-white p-2.5 rounded-lg border border-gray-200 hover:shadow-sm transition-all">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-gray-900 text-xs truncate flex-1">{transaction.from}</div>
                        <div className={`text-xs font-medium ${
                          transaction.type === "revenue" ? "text-green-500" : "text-red-400"
                        }`}>
                          {transaction.type === "revenue" ? "+" : "-"}${transaction.amount.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 leading-relaxed">{transaction.notes}</div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="text-gray-700">{transaction.date}</div>
                        <div className="flex items-center gap-2">
                          <div className="inline-flex items-center gap-1">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              transaction.category === 'Rent' ? 'bg-green-500' :
                              transaction.category === 'Maintenance' ? 'bg-red-500' :
                              transaction.category === 'Insurance' ? 'bg-blue-500' :
                              'bg-gray-400'
                            }`}></div>
                            <span className="font-medium px-1 py-0.5 bg-gray-50 text-gray-700 rounded text-xs">
                              {transaction.category}
                            </span>
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


      {/* Mobile Testimonials Section */}
      <section className="px-4 py-12">
        <div className="space-y-4 mb-8">
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
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-100">
              <blockquote className="text-gray-900 mb-3 text-sm">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <div className="font-medium text-gray-900 text-sm">{testimonial.author}</div>
                <div className="text-gray-500 text-sm">{testimonial.handle}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile Footer */}
      <footer className="px-4 py-8">
        <div className="text-center">
          <div className="text-gray-500 text-sm">
            © 2025 SquareLabs
          </div>
        </div>
      </footer>
    </div>
  );
}