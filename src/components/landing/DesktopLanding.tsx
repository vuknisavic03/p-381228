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
              <Link to="/" className="text-black text-sm font-medium">Accounting</Link>
              <Link to="/vision" className="text-black text-sm font-medium bg-blue-100 px-2 py-1 rounded hover:bg-blue-200 transition-colors">Vision</Link>
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
            Break free from the old way
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Personalized to your work and beautifully designed. An accounting solution that makes your life simpler.
          </p>
          
          <Button className="bg-black text-white text-base px-6 py-3 rounded-md hover:bg-gray-800 mb-16">
            Get Square free
          </Button>
        </div>
      </section>

      {/* Financial Overview Section */}
      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex items-center justify-between">
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
          <h2 className="text-4xl font-bold text-black mb-6">Map your listings with precision</h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Visualize all your property or business listings on an interactive map. Manage availability, get 
            insights, and plan with confidence.
          </p>
        </div>
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-700 to-green-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Building2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-white font-semibold">Property Management</div>
                  <div className="text-green-100 text-sm">Interactive Map & Portfolio</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 text-green-100">
                  <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                  <span className="text-sm">98 Properties</span>
                </div>
                <Button className="bg-white text-green-700 text-sm px-4 py-2 rounded-lg hover:bg-green-50 font-medium">
                  Add Property
                </Button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Portfolio Overview</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>91.8% Avg Occupancy</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { property: "Sunset Apartments", units: "24 units", revenue: "$48,000/mo", occupancy: "92%", status: "Active", color: "green" },
                      { property: "Downtown Office Complex", units: "12 units", revenue: "$72,000/mo", occupancy: "88%", status: "Active", color: "green" },
                      { property: "Riverside Condos", units: "36 units", revenue: "$54,000/mo", occupancy: "95%", status: "Active", color: "green" },
                      { property: "Market Street Retail", units: "8 units", revenue: "$32,000/mo", occupancy: "75%", status: "Maintenance", color: "yellow" },
                    ].map((property, index) => (
                      <div key={index} className="bg-gradient-to-r from-white to-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                              <Building2 className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{property.property}</div>
                              <div className="text-sm text-gray-500 flex items-center gap-3">
                                <span>{property.units}</span>
                                <span>•</span>
                                <span className="font-medium text-gray-700">{property.revenue}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900 mb-1">{property.occupancy}</div>
                            <div className={`text-sm px-3 py-1 rounded-full font-medium ${
                              property.color === 'green' ? 'bg-green-100 text-green-700' :
                              property.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' : ''
                            }`}>
                              {property.status}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Analytics</h4>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
                      <div className="text-center mb-4">
                        <Building2 className="w-12 h-12 mx-auto mb-3 text-green-600" />
                        <div className="text-sm text-green-700 mb-1">Interactive Map View</div>
                        <div className="text-xs text-green-600">Click properties for details</div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                          <div className="text-xs font-medium text-gray-600 mb-1">Total Properties</div>
                          <div className="text-2xl font-bold text-green-600">98</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                          <div className="text-xs font-medium text-gray-600 mb-1">Monthly Revenue</div>
                          <div className="text-2xl font-bold text-blue-600">$206K</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Filters</h4>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                        <div className="text-sm font-medium text-gray-900 mb-2">Property Type</div>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Residential</span>
                          <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">Commercial</span>
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                        <div className="text-sm font-medium text-gray-900 mb-2">Status</div>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Active</span>
                          <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">Maintenance</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transaction Tracking Section */}
      <section className="px-4 pb-20">
        <div className="container mx-auto mb-16">
          <h2 className="text-4xl font-bold text-black mb-6">A place to get all transactions tracked</h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Get real-time visibility into all your transactions in one powerful dashboard. Analyze trends, 
            identify gaps, and gain confidence.
          </p>
        </div>
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-700 to-purple-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-white font-semibold">Transaction Management</div>
                  <div className="text-purple-100 text-sm">Real-time Activity & Analytics</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 text-purple-100">
                  <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                  <span className="text-sm">247 This Month</span>
                </div>
                <Button className="bg-white text-purple-700 text-sm px-4 py-2 rounded-lg hover:bg-purple-50 font-medium">
                  Add Transaction
                </Button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">Recent Activity</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>+$12.7K This Month</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { description: "Rent Payment - Sunset Apt #12", amount: "+$2,400", date: "Jan 15, 2025", category: "Income", color: "green" },
                      { description: "Maintenance - HVAC Repair", amount: "-$850", date: "Jan 14, 2025", category: "Maintenance", color: "red" },
                      { description: "Rent Payment - Downtown #304", amount: "+$6,200", date: "Jan 14, 2025", category: "Income", color: "green" },
                      { description: "Property Insurance", amount: "-$1,200", date: "Jan 12, 2025", category: "Insurance", color: "red" },
                      { description: "Rent Payment - Riverside #8A", amount: "+$1,800", date: "Jan 12, 2025", category: "Income", color: "green" },
                    ].map((transaction, index) => (
                      <div key={index} className="bg-gradient-to-r from-white to-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              transaction.color === 'green' ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                              <div className={`w-3 h-3 rounded-full ${
                                transaction.color === 'green' ? 'bg-green-500' : 'bg-red-500'
                              }`}></div>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{transaction.description}</div>
                              <div className="text-sm text-gray-500">{transaction.date}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-xl font-bold mb-1 ${
                              transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.amount}
                            </div>
                            <div className={`text-sm px-3 py-1 rounded-full font-medium ${
                              transaction.color === 'green' ? 'bg-green-100 text-green-700' :
                              transaction.color === 'red' ? 'bg-red-100 text-red-700' : ''
                            }`}>
                              {transaction.category}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Transaction Analytics</h4>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <div className="text-sm font-medium text-gray-600 mb-2">This Month</div>
                          <div className="text-3xl font-bold text-green-600 mb-1">+$12,750</div>
                          <div className="text-xs text-gray-500">Net Income</div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                            <div className="text-xs font-medium text-gray-600 mb-1">Income</div>
                            <div className="text-lg font-bold text-green-600">$18.4K</div>
                          </div>
                          <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                            <div className="text-xs font-medium text-gray-600 mb-1">Expenses</div>
                            <div className="text-lg font-bold text-red-600">$5.7K</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Smart Filters</h4>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                        <div className="text-sm font-medium text-gray-900 mb-2">Date Range</div>
                        <div className="text-sm text-gray-600">Last 30 days</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                        <div className="text-sm font-medium text-gray-900 mb-2">Categories</div>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Income</span>
                          <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">Expenses</span>
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Maintenance</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-black mb-6">Solution that is built for you</h2>
          <p className="text-2xl text-gray-600 mb-12">Use for free</p>
          
          <div className="max-w-md mx-auto">
            <div className="flex gap-2 mb-6">
              <input 
                type="email" 
                placeholder="Email" 
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
              />
              <Button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800">
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Workspaces Section */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="container mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-6">Workspaces built for managers and individuals</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Seamlessly collaborate between workspaces. Keep data organized and set performance across 
            teams all.
          </p>
        </div>
        
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
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