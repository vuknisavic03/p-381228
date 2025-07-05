import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, Search, Tag, DollarSign, FileText, TrendingUp, Users, Calendar, Building2, CreditCard, Receipt, PieChart, Target } from "lucide-react";

export default function DesktopLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-4 py-4 border-b border-gray-100">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <nav className="flex items-center gap-6">
              <Link to="/" className="text-gray-600 text-sm">Accounting</Link>
              <Link to="/vision" className="text-blue-600 text-sm font-medium">Vision</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-gray-600 text-sm">Log in</button>
            <Button className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800">
              Get Square free
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto text-center">
          <div className="mb-12 flex justify-center">
            <div className="w-20 h-20 flex items-center justify-center">
              <Building2 className="w-16 h-16 text-black" strokeWidth={1.5} />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-black leading-tight mb-8 max-w-4xl mx-auto">
            The dashboard that thinks like you
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Meet Square Accounting, the dashboard that organizes itself, tracks revenue, and manages expenses any way you'd like.
          </p>
          
          <div className="flex justify-center mb-16">
            <Button className="bg-black text-white text-lg px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors">
              Get Square free
            </Button>
          </div>
        </div>
      </section>

      {/* Financial Overview Section */}
      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-gray-900 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-gray-900 text-lg font-bold">S</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Square Accounting</div>
                  <div className="text-gray-300 text-sm">Financial Dashboard</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm">Live</span>
                </div>
                <Search className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="flex">
              <div className="w-72 bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 p-6">
                <div className="space-y-6">
                  <div>
                    <div className="text-sm font-semibold text-gray-900 mb-4">Financial Overview</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 px-3 py-2.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 shadow-sm">
                        <BarChart3 className="w-4 h-4" />
                        <span className="font-medium">Dashboard</span>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                        <TrendingUp className="w-4 h-4" />
                        <span>Analytics</span>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                        <DollarSign className="w-4 h-4" />
                        <span>Revenue Tracking</span>
                      </div>
                      <div className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                        <Receipt className="w-4 h-4" />
                        <span>Expense Management</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-gray-900 mb-4">Quick Actions</div>
                    <div className="space-y-2">
                      <div className="px-3 py-2 text-gray-600 hover:bg-white rounded-lg transition-all cursor-pointer flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Add Transaction</span>
                      </div>
                      <div className="px-3 py-2 text-gray-600 hover:bg-white rounded-lg transition-all cursor-pointer flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Generate Report</span>
                      </div>
                      <div className="px-3 py-2 text-gray-600 hover:bg-white rounded-lg transition-all cursor-pointer flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">Export Data</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-white">
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Financial Overview</div>
                        <div className="text-sm text-gray-500">Real-time metrics</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
                      <Tag className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Auto Categorize</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {[
                      { metric: "Total Revenue", value: "$125,430", change: "+12.5%", tag: "Revenue", color: "green" },
                      { metric: "Total Expenses", value: "$89,210", change: "-3.2%", tag: "Expenses", color: "red" },
                      { metric: "Net Profit", value: "$36,220", change: "+18.7%", tag: "Profit", color: "purple" },
                      { metric: "Cash Flow", value: "$42,100", change: "+5.4%", tag: "Cash", color: "blue" },
                      { metric: "Accounts Receivable", value: "$28,900", change: "+2.1%", tag: "AR", color: "orange" },
                      { metric: "Accounts Payable", value: "$15,600", change: "-8.3%", tag: "AP", color: "pink" },
                    ].map((metric, index) => (
                      <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-sm font-medium text-gray-900">{metric.metric}</div>
                          <div className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                            metric.color === 'green' ? 'bg-green-100 text-green-700' :
                            metric.color === 'red' ? 'bg-red-100 text-red-700' :
                            metric.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                            metric.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                            metric.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                            metric.color === 'pink' ? 'bg-pink-100 text-pink-700' : ''
                          }`}>
                            {metric.tag}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                          <span className={`text-sm font-semibold ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {metric.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Management Section */}
      <section className="px-4 pb-20">
        <div className="container mx-auto mb-16">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-black mb-6">Organize your properties</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Group properties by type, filter by performance, and track everything in one view.
            </p>
          </div>
        </div>
        <div className="container mx-auto">
            <div className="max-w-7xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="border-b border-gray-100 bg-white px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Building2 className="h-5 w-5 text-gray-600" />
                  <span className="font-semibold text-gray-900">Portfolio Performance</span>
                  <div className="bg-blue-50 text-blue-700 font-medium px-3 py-1 rounded-full text-xs">24 Properties</div>
                  <div className="bg-green-50 text-green-700 font-medium px-3 py-1 rounded-full text-xs">↑ 12% Growth</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-xs text-gray-500">Last updated: 2 min ago</div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="p-0">
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50/80">
                      <th className="font-semibold text-gray-800 text-left py-3 px-6">Property</th>
                      <th className="font-semibold text-gray-800 text-left py-3 px-4">Type</th>
                      <th className="font-semibold text-gray-800 text-left py-3 px-4">Tenants</th>
                      <th className="font-semibold text-gray-800 text-right py-3 px-4">Revenue</th>
                      <th className="font-semibold text-gray-800 text-right py-3 px-4">Expenses</th>
                      <th className="font-semibold text-gray-800 text-right py-3 px-6">Net Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { property: "Sunset Apartments", type: "Apartment", tenants: "Multiple Tenants", revenue: 48000, expenses: 12000, profit: 36000 },
                      { property: "Downtown Office Complex", type: "Office", tenants: "Multiple Tenants", revenue: 72000, expenses: 18000, profit: 54000 },
                      { property: "Riverside Condos", type: "Condo", tenants: "Multiple Tenants", revenue: 54000, expenses: 15000, profit: 39000 },
                      { property: "Metro Plaza", type: "Mixed Use", tenants: "Multiple Tenants", revenue: 36000, expenses: 10000, profit: 26000 },
                    ].map((property, index) => (
                      <tr key={index} className="hover:bg-gray-50/70 border-b border-gray-100 last:border-b-0">
                        <td className="py-4 px-6">
                          <div className="font-semibold text-gray-900">{property.property}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">🏢</span>
                            <span className="text-sm font-medium text-gray-700">{property.type}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-gray-900 font-medium">{property.tenants}</span>
                        </td>
                        <td className="text-right py-4 px-4">
                          <span className="text-green-500">+${property.revenue.toLocaleString()}</span>
                        </td>
                        <td className="text-right py-4 px-4">
                          <span className="text-red-400">-${property.expenses.toLocaleString()}</span>
                        </td>
                        <td className="text-right py-4 px-6">
                          <span className="text-green-500">+${property.profit.toLocaleString()}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transaction Tracking Section */}
      <section className="px-4 pb-20">
        <div className="container mx-auto mb-16">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-black mb-6">Filter out noise</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Auto-categorize transactions, group by property, and focus on what matters.
            </p>
          </div>
        </div>
        {/* Transaction Tracking Section */}
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-16">
            <div className="border-b border-gray-100 bg-white px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CreditCard className="h-5 w-5 text-gray-600" />
                  <span className="font-semibold text-gray-900">Transaction Stream</span>
                  <div className="bg-gray-50 text-gray-700 font-medium px-3 py-1 rounded-full text-xs">Real-time</div>
                  <div className="bg-green-50 text-green-700 font-medium px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Auto-categorized
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-xs text-gray-500 hover:text-gray-700">Export</button>
                  <button className="text-xs text-gray-500 hover:text-gray-700">Filter</button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50/80">
                    <th className="font-semibold text-gray-800 text-left py-3 px-6 w-[35%]">Description</th>
                    <th className="font-semibold text-gray-800 text-left py-3 px-4 w-[15%]">Amount</th>
                    <th className="font-semibold text-gray-800 text-left py-3 px-4 w-[15%]">Date</th>
                    <th className="font-semibold text-gray-800 text-left py-3 px-4 w-[15%]">Category</th>
                    <th className="font-semibold text-gray-800 text-left py-3 px-4 w-[15%]">Payment Method</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { from: "Rent Payment - Apt #12", notes: "Monthly rent collection", amount: 2400, date: "Jan 15, 2024", category: "Rent", type: "revenue", method: "Bank Transfer" },
                    { from: "HVAC Repair - Building A", notes: "Emergency repair service", amount: 850, date: "Jan 14, 2024", category: "Maintenance", type: "expense", method: "Credit Card" },
                    { from: "Office Rent - Suite 304", notes: "Commercial lease payment", amount: 6200, date: "Jan 14, 2024", category: "Rent", type: "revenue", method: "ACH" },
                    { from: "Property Insurance", notes: "Annual insurance premium", amount: 1200, date: "Jan 12, 2024", category: "Insurance", type: "expense", method: "Check" },
                    { from: "Parking Fees", notes: "Monthly parking revenue", amount: 450, date: "Jan 11, 2024", category: "Fees", type: "revenue", method: "Cash" },
                  ].map((transaction, index) => (
                    <tr key={index} className="hover:bg-gray-50/70 border-b border-gray-100 last:border-b-0">
                      <td className="py-4 px-6 w-[35%]">
                        <div className="space-y-1">
                          <div className="font-medium text-gray-900 text-sm">{transaction.from}</div>
                          <div className="text-xs text-gray-500 leading-relaxed">{transaction.notes}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4 w-[15%]">
                        <span className={`text-sm font-medium ${
                          transaction.type === "revenue" ? "text-green-500" : "text-red-400"
                        }`}>
                          {transaction.type === "revenue" ? "+" : "-"}${transaction.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-4 w-[15%]">
                        <span className="text-gray-700 text-sm">{transaction.date}</span>
                      </td>
                      <td className="py-4 px-4 w-[15%]">
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            transaction.category === 'Rent' ? 'bg-green-500' :
                            transaction.category === 'Maintenance' ? 'bg-red-500' :
                            transaction.category === 'Insurance' ? 'bg-blue-500' :
                            transaction.category === 'Fees' ? 'bg-purple-500' :
                            'bg-gray-400'
                          }`}></div>
                          <span className="text-xs font-medium px-1 py-0.5 bg-gray-50 text-gray-700 rounded">
                            {transaction.category}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 w-[15%]">
                        <span className="text-gray-600 text-sm">{transaction.method}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto">
        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
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
              },
              {
                quote: "They really cooked with Square. Especially the AI auto-categorization. Maybe organized books can finally be achieved.",
                author: "David Kim",
                handle: "@davidkimdata"
              },
              {
                quote: "Using @Square is like building filtered views for your finances, but the properties are elements from your transactions. So excited to set this up.",
                author: "Emily Watson",
                handle: "@emilywatson"
              },
              {
                quote: "Square Accounting is finally bringing innovation to property management accounting.",
                author: "Robert Taylor",
                handle: "@roberttaylor"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-100">
                <blockquote className="text-gray-900 mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-medium text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-500 text-sm">{testimonial.handle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8">
        <div className="container mx-auto text-center">
          <div className="text-gray-600 text-sm">
            © 2025 SquareLabs
          </div>
        </div>
      </footer>
    </div>
  );
}