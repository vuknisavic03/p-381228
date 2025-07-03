import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, Search, Tag, DollarSign, FileText, TrendingUp, Users, Calendar, Building2, CreditCard, Receipt, PieChart, Target } from "lucide-react";

export default function DesktopLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <nav className="flex items-center gap-6">
              <span className="text-gray-600 text-sm">Accounting</span>
              <span className="text-black text-sm font-medium bg-blue-100 px-2 py-1 rounded">Vision</span>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-gray-600 text-sm">Log in</button>
            <Button className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800">
              Get Square free
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-16 h-16 flex items-center justify-center">
              <BarChart3 className="w-12 h-12 text-black" strokeWidth={1.5} />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-black leading-tight mb-6 max-w-4xl mx-auto">
            The accounting that thinks like you
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Meet Square Accounting, the platform that organizes itself, tracks finances, and generates insights any way you'd like.
          </p>
          
          <Button className="bg-black text-white text-base px-6 py-3 rounded-md hover:bg-gray-800 mb-16">
            Get Square free
          </Button>
        </div>
      </section>

      {/* Overview Dashboard Interface */}
      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden mb-16">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-medium">S</span>
                </div>
                <span className="text-sm font-medium">Square Accounting</span>
              </div>
              <div className="flex items-center gap-4">
                <Search className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Search</span>
              </div>
            </div>

            <div className="flex min-h-[500px]">
              <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-900 mb-3">Overview</div>
                  <div className="flex items-center gap-2 px-2 py-1.5 bg-blue-50 text-blue-600 rounded text-sm">
                    <BarChart3 className="w-4 h-4" />
                    <span>Dashboard</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 text-gray-600 rounded text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>Analytics</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 text-gray-600 rounded text-sm">
                    <div className="w-4 h-4 bg-green-100 rounded-sm"></div>
                    <span>Revenue</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 text-gray-600 rounded text-sm">
                    <div className="w-4 h-4 bg-red-100 rounded-sm"></div>
                    <span>Expenses</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 text-gray-600 rounded text-sm">
                    <div className="w-4 h-4 bg-purple-100 rounded-sm"></div>
                    <span>Profit</span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-sm font-medium text-gray-900 mb-3">Quick Actions</div>
                  <div className="space-y-1">
                    <div className="px-2 py-1.5 text-gray-600 text-sm">New Transaction</div>
                    <div className="px-2 py-1.5 text-gray-600 text-sm">Generate Report</div>
                    <div className="px-2 py-1.5 text-gray-600 text-sm">Export Data</div>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium">Financial Overview</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Auto Categorize</span>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {[
                    { metric: "Total Revenue", value: "$125,430", change: "+12.5%", tag: "Revenue", color: "green" },
                    { metric: "Total Expenses", value: "$89,210", change: "-3.2%", tag: "Expenses", color: "red" },
                    { metric: "Net Profit", value: "$36,220", change: "+18.7%", tag: "Profit", color: "purple" },
                    { metric: "Cash Flow", value: "$42,100", change: "+5.4%", tag: "Cash", color: "blue" },
                    { metric: "Accounts Receivable", value: "$28,900", change: "+2.1%", tag: "AR", color: "orange" },
                    { metric: "Accounts Payable", value: "$15,600", change: "-8.3%", tag: "AP", color: "pink" },
                  ].map((metric, index) => (
                    <div key={index} className="px-4 py-3 hover:bg-gray-50 flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-900 min-w-0 flex-shrink-0">{metric.metric}</span>
                          <span className="text-sm text-gray-600">{metric.value}</span>
                          <span className={`text-xs ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{metric.change}</span>
                        </div>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
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
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Listings Management Interface */}
      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden mb-16">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium">Property Listings</span>
              </div>
              <div className="flex items-center gap-4">
                <Button className="bg-green-600 text-white text-xs px-3 py-1 rounded hover:bg-green-700">
                  Add Property
                </Button>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {[
                { property: "Sunset Apartments", units: "24 units", revenue: "$48,000/mo", occupancy: "92%", status: "Active", color: "green" },
                { property: "Downtown Office Complex", units: "12 units", revenue: "$72,000/mo", occupancy: "88%", status: "Active", color: "green" },
                { property: "Riverside Condos", units: "36 units", revenue: "$54,000/mo", occupancy: "95%", status: "Active", color: "green" },
                { property: "Market Street Retail", units: "8 units", revenue: "$32,000/mo", occupancy: "75%", status: "Maintenance", color: "yellow" },
                { property: "Oak Hill Townhomes", units: "18 units", revenue: "$36,000/mo", occupancy: "100%", status: "Active", color: "green" },
              ].map((property, index) => (
                <div key={index} className="px-4 py-3 hover:bg-gray-50 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900">{property.property}</div>
                        <div className="text-xs text-gray-500">{property.units}</div>
                      </div>
                      <div className="text-sm text-gray-600">{property.revenue}</div>
                      <div className="text-sm text-gray-600">Occupancy: {property.occupancy}</div>
                    </div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    property.color === 'green' ? 'bg-green-100 text-green-700' :
                    property.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' : ''
                  }`}>
                    {property.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transactions Interface */}
      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden mb-16">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium">Recent Transactions</span>
              </div>
              <div className="flex items-center gap-4">
                <Button className="bg-purple-600 text-white text-xs px-3 py-1 rounded hover:bg-purple-700">
                  Add Transaction
                </Button>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {[
                { description: "Rent Payment - Sunset Apt #12", amount: "+$2,400", date: "Jan 15, 2025", category: "Income", color: "green" },
                { description: "Maintenance - HVAC Repair", amount: "-$850", date: "Jan 14, 2025", category: "Maintenance", color: "red" },
                { description: "Rent Payment - Downtown #304", amount: "+$6,200", date: "Jan 14, 2025", category: "Income", color: "green" },
                { description: "Property Insurance", amount: "-$1,200", date: "Jan 12, 2025", category: "Insurance", color: "red" },
                { description: "Rent Payment - Riverside #8A", amount: "+$1,800", date: "Jan 12, 2025", category: "Income", color: "green" },
                { description: "Landscaping Services", amount: "-$450", date: "Jan 11, 2025", category: "Maintenance", color: "red" },
                { description: "Security Deposit Return", amount: "-$2,000", date: "Jan 10, 2025", category: "Deposit", color: "red" },
              ].map((transaction, index) => (
                <div key={index} className="px-4 py-3 hover:bg-gray-50 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                        <div className="text-xs text-gray-500">{transaction.date}</div>
                      </div>
                      <div className={`text-sm font-medium ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount}
                      </div>
                    </div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    transaction.color === 'green' ? 'bg-green-100 text-green-700' :
                    transaction.color === 'red' ? 'bg-red-100 text-red-700' : ''
                  }`}>
                    {transaction.category}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
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