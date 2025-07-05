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

      {/* Core Features Overview */}
      <section className="px-4 py-20 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Everything you need to manage properties</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From live analytics to calendar scheduling, Square gives you complete control over your real estate portfolio
            </p>
          </div>

          {/* Live Analytics Dashboard Preview */}
          <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg mb-12 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-white font-semibold text-lg">Live Analytics Dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-200 text-sm">Real-time updates</span>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className="w-6 h-6 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Total Revenue</span>
                  </div>
                  <div className="text-3xl font-bold text-green-900 mb-2">$125,430</div>
                  <div className="text-sm text-green-600">+12.5% this month</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Building2 className="w-6 h-6 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Properties</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-900 mb-2">8 Active</div>
                  <div className="text-sm text-blue-600">94% occupied</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">Net Profit</span>
                  </div>
                  <div className="text-3xl font-bold text-purple-900 mb-2">$36,220</div>
                  <div className="text-sm text-purple-600">+18.7% growth</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="w-6 h-6 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800">Units</span>
                  </div>
                  <div className="text-3xl font-bold text-orange-900 mb-2">124/132</div>
                  <div className="text-sm text-orange-600">8 vacant units</div>
                </div>
              </div>
              
              {/* Enhanced Chart Visualization */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-800">Revenue Performance</span>
                  <span className="text-sm text-gray-500">Last 12 months</span>
                </div>
                <div className="flex items-end gap-2 h-24">
                  {[45, 52, 68, 74, 82, 78, 95, 88, 92, 100, 87, 94].map((height, index) => (
                    <div className="flex-1 flex flex-col items-center gap-1">
                      <div
                        key={index}
                        className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-sm w-full transition-all hover:from-blue-700 hover:to-blue-500"
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="text-xs text-gray-500">
                        {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Calendar & Scheduling */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg mb-12 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-100 p-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-orange-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Smart Calendar System</h3>
                  <p className="text-sm text-gray-600">Schedule maintenance, track rent dates, set automated reminders</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                      <div key={index} className="text-center text-sm font-medium text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 42 }, (_, i) => {
                      const day = ((i + 1) % 31) + 1;
                      const hasEvent = [5, 12, 18, 25, 28].includes(day);
                      const isPastMonth = i < 6;
                      const isNextMonth = i > 35;
                      return (
                        <div
                          key={i}
                          className={`text-center text-sm py-2 rounded transition-colors hover:bg-gray-100 ${
                            hasEvent 
                              ? 'bg-blue-100 text-blue-700 font-semibold' 
                              : isPastMonth || isNextMonth ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          {isPastMonth || isNextMonth ? '' : day > 31 ? '' : day}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 mb-3">Upcoming Events</h4>
                  {[
                    { title: "Rent Collection - Building A", date: "Jan 1", type: "rent", color: "bg-green-500" },
                    { title: "HVAC Maintenance Check", date: "Jan 5", type: "maintenance", color: "bg-orange-500" },
                    { title: "Lease Renewal Meeting", date: "Jan 12", type: "meeting", color: "bg-blue-500" },
                    { title: "Property Inspection", date: "Jan 18", type: "inspection", color: "bg-purple-500" }
                  ].map((event, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{event.title}</div>
                        <div className="text-xs text-gray-500">{event.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Rent Collection</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Maintenance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Meetings</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Inspections</span>
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio & Units Management */}
          <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-purple-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Portfolio & Units Management</h3>
                    <p className="text-sm text-gray-600">Complete overview of properties, units, and performance metrics</p>
                  </div>
                </div>
                <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full font-medium">8 active properties</span>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[
                  { name: "Sunset Apartments", units: "24 units", occupied: "23/24", revenue: "+$36,000", color: "bg-green-500", location: "Brooklyn, NY", type: "Residential" },
                  { name: "Downtown Office Plaza", units: "12 suites", occupied: "12/12", revenue: "+$54,000", color: "bg-blue-500", location: "Manhattan, NY", type: "Commercial" },
                  { name: "Riverside Condos", units: "18 units", occupied: "16/18", revenue: "+$29,000", color: "bg-purple-500", location: "Queens, NY", type: "Residential" }
                ].map((property, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${property.color}`}></div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{property.name}</div>
                          <div className="text-xs text-gray-500">{property.location}</div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-green-600">{property.revenue}</div>
                    </div>
                    <div className="text-sm text-gray-700 mb-3">{property.type} • {property.units}</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">High Performance</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">{property.occupied} occupied</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Last updated: 2 hours ago</span>
                        <span>View Details →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Categorization Feature */}
      <section className="px-4 pb-16">
        <div className="container mx-auto">
          <div className="mb-12">
            <div className="inline-block bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Organization
            </div>
            <h2 className="text-4xl font-bold text-black mb-4">Smart categorization does the work for you</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Tell Square AI what types of transactions are important to track, and it'll automatically label and sort them as they arrive.
            </p>
          </div>
          <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Transaction Feed</h3>
                </div>
                <div className="text-sm bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-medium">Auto-categorizing</div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { 
                    from: "Wells Fargo Business", 
                    desc: "Monthly Rent Collection - Unit 4B", 
                    amount: "+$2,400", 
                    category: "Rent Income",
                    time: "2 minutes ago",
                    color: "bg-green-500"
                  },
                  { 
                    from: "ServiceMaster Commercial", 
                    desc: "Emergency HVAC System Repair", 
                    amount: "-$850", 
                    category: "Maintenance",
                    time: "1 hour ago",
                    color: "bg-red-500"
                  },
                  { 
                    from: "State Farm Insurance", 
                    desc: "Property Insurance Premium Q1", 
                    amount: "-$1,200", 
                    category: "Insurance",
                    time: "3 hours ago",
                    color: "bg-blue-500"
                  },
                  { 
                    from: "ConEd Business", 
                    desc: "Utility Bill - January", 
                    amount: "-$320", 
                    category: "Utilities",
                    time: "5 hours ago",
                    color: "bg-orange-500"
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="text-sm font-semibold text-gray-900">{item.from}</span>
                        <span className="text-xs text-gray-500">{item.time}</span>
                      </div>
                      <div className="text-sm text-gray-700 ml-6 mb-2">{item.desc}</div>
                      <div className="flex items-center gap-2 ml-6">
                        <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">{item.category}</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">Auto-categorized</span>
                      </div>
                    </div>
                    <div className={`text-lg font-semibold ${item.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {item.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Dashboard Feature */}
      <section className="px-4 pb-16">
        <div className="container mx-auto">
          <div className="mb-12">
            <div className="inline-block bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Analytics
            </div>
            <h2 className="text-4xl font-bold text-black mb-4">Live metrics that update themselves</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              See your portfolio performance in real-time with metrics that refresh automatically as transactions come in.
            </p>
          </div>
          <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gray-900 px-6 py-4 flex items-center justify-between border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-gray-900 text-sm font-bold">S</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Live Dashboard</div>
                  <div className="text-gray-300 text-sm">Real-time portfolio metrics</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Live Updates</span>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {[
                  { 
                    metric: "Total Revenue", 
                    value: "$125,430", 
                    change: "+12.5%", 
                    trend: "up", 
                    subtext: "vs last month",
                    color: "green" 
                  },
                  { 
                    metric: "Net Profit", 
                    value: "$36,220", 
                    change: "+18.7%", 
                    trend: "up", 
                    subtext: "after all expenses",
                    color: "blue" 
                  },
                  { 
                    metric: "Monthly Growth", 
                    value: "15.3%", 
                    change: "+2.1%", 
                    trend: "up", 
                    subtext: "portfolio expansion",
                    color: "purple" 
                  },
                ].map((item, index) => (
                  <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="text-sm font-medium text-gray-600 mb-2">{item.metric}</div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{item.value}</div>
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-600">{item.change}</span>
                    </div>
                    <div className="text-xs text-gray-500">{item.subtext}</div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-700">Overall Portfolio Health</span>
                  </div>
                  <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Excellent Performance</span>
                </div>
                <div className="text-sm text-gray-600">All 3 properties performing above target • Revenue up 15.3% this quarter</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Organization Feature */}
      <section className="px-4 pb-16">
        <div className="container mx-auto">
          <div className="mb-12">
            <div className="inline-block bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Views
            </div>
            <h2 className="text-4xl font-bold text-black mb-4">Split your portfolio into custom views</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Group properties by type, filter by performance, and focus on what matters most to your business.
            </p>
          </div>
          <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Portfolio Manager</h3>
                </div>
                <div className="text-sm bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-medium">3 active properties</div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-3 mb-6">
                {['All Properties', 'Apartments', 'Office', 'Retail', 'Mixed Use'].map((view, index) => (
                  <div key={index} className={`px-4 py-2 rounded-full text-sm font-medium ${
                    index === 0 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {view}
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                {[
                  { 
                    name: "Sunset Apartments", 
                    type: "Residential • 24 units", 
                    profit: "+$36,000", 
                    status: "High Performance",
                    occupancy: "96%",
                    location: "Brooklyn, NY",
                    color: "bg-green-500"
                  },
                  { 
                    name: "Downtown Office Plaza", 
                    type: "Commercial • 12 suites", 
                    profit: "+$54,000", 
                    status: "Excellent",
                    occupancy: "100%",
                    location: "Manhattan, NY",
                    color: "bg-blue-500"
                  },
                  { 
                    name: "Riverside Condos", 
                    type: "Residential • 18 units", 
                    profit: "+$29,000", 
                    status: "Strong",
                    occupancy: "89%",
                    location: "Queens, NY",
                    color: "bg-purple-500"
                  },
                ].map((property, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${property.color}`}></div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{property.name}</div>
                          <div className="text-xs text-gray-600">{property.location}</div>
                        </div>
                      </div>
                      <div className="text-lg font-semibold text-green-600">{property.profit}</div>
                    </div>
                    <div className="text-sm text-gray-700 mb-3">{property.type}</div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">{property.status}</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">{property.occupancy} occupied</span>
                      <span className="text-xs text-gray-500">Last updated: 2 hours ago</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transaction Filtering Feature */}
      <section className="px-4 pb-16">
        <div className="container mx-auto">
          <div className="mb-12">
            <div className="inline-block bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Filtering
            </div>
            <h2 className="text-4xl font-bold text-black mb-4">Group and filter by what you need</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Filter transactions by property, category, amount, or any combination—whatever helps you focus on what matters.
            </p>
          </div>
          <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Smart Transaction Filters</h3>
                </div>
                <div className="text-sm bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full font-medium">2 filters active</div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex gap-3 mb-6">
                <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Sunset Apartments
                </div>
                <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">Maintenance</div>
                <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">$500+</div>
              </div>
              
              <div className="space-y-4">
                {[
                  { 
                    desc: "Emergency HVAC System Repair", 
                    amount: "-$850", 
                    vendor: "ServiceMaster Commercial",
                    date: "January 15, 2025",
                    category: "Maintenance",
                    property: "Sunset Apartments",
                    urgent: true
                  },
                  { 
                    desc: "Plumbing Emergency Response", 
                    amount: "-$650", 
                    vendor: "Quick Fix Plumbing LLC",
                    date: "January 12, 2025",
                    category: "Maintenance",
                    property: "Sunset Apartments",
                    urgent: false
                  },
                  { 
                    desc: "Monthly Rent Collection - Unit 4B", 
                    amount: "+$2,400", 
                    vendor: "Tenant Payment Portal",
                    date: "January 1, 2025",
                    category: "Rent Income",
                    property: "Sunset Apartments",
                    urgent: false
                  },
                ].map((transaction, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {transaction.urgent && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
                        <span className="text-sm font-semibold text-gray-900">{transaction.desc}</span>
                      </div>
                      <span className={`text-lg font-semibold ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">{transaction.vendor} • {transaction.date}</div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        transaction.category === 'Rent Income' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {transaction.category}
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">{transaction.property}</span>
                      {transaction.urgent && <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">Urgent</span>}
                    </div>
                  </div>
                ))}
              </div>
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