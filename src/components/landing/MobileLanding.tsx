import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, Search, Tag, DollarSign, Building2, CreditCard, TrendingUp, Target, Calendar } from "lucide-react";

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

      {/* Core Features Overview */}
      <section className="px-4 py-12 bg-gray-50">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-black mb-4">Everything you need to manage properties</h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            From live analytics to calendar scheduling, Square gives you complete control over your real estate portfolio
          </p>
        </div>

        {/* Live Analytics Dashboard Preview */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-white font-medium text-sm">Live Analytics</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-200 text-xs">Real-time</span>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-xl border border-green-100">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-medium text-green-800">Total Revenue</span>
                </div>
                <div className="text-lg font-bold text-green-900">$125,430</div>
                <div className="text-xs text-green-600">+12.5% this month</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-medium text-blue-800">Properties</span>
                </div>
                <div className="text-lg font-bold text-blue-900">8 Active</div>
                <div className="text-xs text-blue-600">94% occupied</div>
              </div>
            </div>
            
            {/* Mini Chart Visualization */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">Revenue Trend</span>
                <span className="text-xs text-gray-500">Last 6 months</span>
              </div>
              <div className="flex items-end gap-1 h-12">
                {[65, 78, 82, 95, 88, 100].map((height, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-sm flex-1"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Calendar & Scheduling */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-100 p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-semibold text-gray-900">Smart Calendar</span>
            </div>
          </div>
          <div className="p-4">
            <div className="text-xs text-gray-600 mb-3">Schedule maintenance, track rent dates, set reminders</div>
            <div className="grid grid-cols-7 gap-1 mb-3">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <div key={index} className="text-center text-xs font-medium text-gray-500 py-1">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => {
                const day = ((i + 1) % 31) + 1;
                const hasEvent = [5, 12, 18, 25, 28].includes(day);
                return (
                  <div
                    key={i}
                    className={`text-center text-xs py-1 rounded ${
                      hasEvent 
                        ? 'bg-blue-100 text-blue-700 font-medium' 
                        : day > 31 ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {day > 31 ? '' : day}
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Rent Due</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-600">Maintenance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio & Units Management */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-semibold text-gray-900">Portfolio Management</span>
              </div>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">8 properties</span>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {[
                { name: "Sunset Apartments", units: "24 units", occupied: "23/24", revenue: "+$36,000", color: "bg-green-500" },
                { name: "Downtown Office", units: "12 suites", occupied: "12/12", revenue: "+$54,000", color: "bg-blue-500" },
                { name: "Riverside Condos", units: "18 units", occupied: "16/18", revenue: "+$29,000", color: "bg-purple-500" }
              ].map((property, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${property.color}`}></div>
                      <span className="text-sm font-medium text-gray-900">{property.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-green-600">{property.revenue}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">{property.units}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{property.occupied} occupied</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Auto-Categorization Feature */}
      <section className="px-4 pb-8">
        <div className="mb-6">
          <div className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
            Organization
          </div>
          <h2 className="text-xl font-bold text-black mb-2">Smart categorization does the work for you</h2>
          <p className="text-sm text-gray-600">
            Tell Square AI what types of transactions are important to track, and it'll automatically label and sort them as they arrive.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-gray-900">Transaction Feed</span>
              </div>
              <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Auto-categorizing</div>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {[
                { 
                  from: "Wells Fargo Business", 
                  desc: "Rent Payment - Unit 4B", 
                  amount: "+$2,400", 
                  category: "Rent Income",
                  time: "2 min ago",
                  color: "bg-green-500"
                },
                { 
                  from: "ServiceMaster", 
                  desc: "HVAC Emergency Repair", 
                  amount: "-$850", 
                  category: "Maintenance",
                  time: "1 hour ago",
                  color: "bg-red-500"
                },
                { 
                  from: "State Farm Insurance", 
                  desc: "Property Insurance Premium", 
                  amount: "-$1,200", 
                  category: "Insurance",
                  time: "3 hours ago",
                  color: "bg-blue-500"
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                      <span className="text-sm font-medium text-gray-900">{item.from}</span>
                      <span className="text-xs text-gray-500">{item.time}</span>
                    </div>
                    <div className="text-xs text-gray-700 ml-4">{item.desc}</div>
                    <div className="flex items-center gap-2 mt-1 ml-4">
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{item.category}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">Auto-tagged</span>
                    </div>
                  </div>
                  <div className={`text-sm font-semibold ${item.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {item.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Metrics Feature */}
      <section className="px-4 pb-8">
        <div className="mb-6">
          <div className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
            Analytics
          </div>
          <h2 className="text-xl font-bold text-black mb-2">Live metrics that update themselves</h2>
          <p className="text-sm text-gray-600">
            See your portfolio performance in real-time with metrics that refresh automatically.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
          <div className="bg-gray-900 px-4 py-3 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white">Live Dashboard</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 font-medium">Live</span>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { 
                  metric: "Monthly Revenue", 
                  value: "$125,430", 
                  change: "+12.5%", 
                  trend: "up",
                  subtext: "vs last month"
                },
                { 
                  metric: "Net Profit", 
                  value: "$36,220", 
                  change: "+18.7%", 
                  trend: "up",
                  subtext: "after expenses"
                },
              ].map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-3 rounded-xl border border-gray-100">
                  <div className="text-xs font-medium text-gray-600 mb-1">{item.metric}</div>
                  <div className="text-lg font-bold text-gray-900 mb-1">{item.value}</div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-semibold text-green-600">{item.change}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{item.subtext}</div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg border border-green-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-gray-700">Portfolio Health</span>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Excellent</span>
              </div>
              <div className="text-xs text-gray-600 mt-1">All properties performing above target</div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Organization Feature */}
      <section className="px-4 pb-8">
        <div className="mb-6">
          <div className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
            Views
          </div>
          <h2 className="text-xl font-bold text-black mb-2">Split your portfolio into custom views</h2>
          <p className="text-sm text-gray-600">
            Group properties by type, filter by performance, and focus on what matters most.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-gray-900">Portfolio Manager</span>
              </div>
              <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">3 properties</div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex gap-2 text-xs mb-4">
              <div className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-medium">All Properties</div>
              <div className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">Apartments</div>
              <div className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">Office</div>
            </div>
            <div className="space-y-3">
              {[
                { 
                  name: "Sunset Apartments", 
                  type: "Residential • 24 units", 
                  profit: "+$36,000", 
                  status: "High Performance",
                  occupancy: "96%",
                  color: "bg-green-500"
                },
                { 
                  name: "Downtown Office Plaza", 
                  type: "Commercial • 12 suites", 
                  profit: "+$54,000", 
                  status: "Excellent",
                  occupancy: "100%",
                  color: "bg-blue-500"
                },
                { 
                  name: "Riverside Condos", 
                  type: "Residential • 18 units", 
                  profit: "+$29,000", 
                  status: "Strong",
                  occupancy: "89%",
                  color: "bg-purple-500"
                },
              ].map((property, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${property.color}`}></div>
                      <span className="text-sm font-semibold text-gray-900">{property.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-green-600">{property.profit}</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-2">{property.type}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{property.status}</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{property.occupancy} occupied</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transaction Filtering Feature */}
      <section className="px-4 pb-8">
        <div className="mb-6">
          <div className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
            Filtering
          </div>
          <h2 className="text-xl font-bold text-black mb-2">Group and filter by what you need</h2>
          <p className="text-sm text-gray-600">
            Filter transactions by property, category, or amount—whatever helps you focus.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-gray-900">Smart Filters</span>
              </div>
              <div className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">2 active</div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex gap-2 text-xs mb-4">
              <div className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                Sunset Apartments
              </div>
              <div className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">Maintenance</div>
            </div>
            <div className="space-y-3">
              {[
                { 
                  desc: "HVAC System Repair", 
                  amount: "-$850", 
                  vendor: "ServiceMaster HVAC",
                  date: "Jan 15, 2025",
                  category: "Maintenance"
                },
                { 
                  desc: "Plumbing Emergency Fix", 
                  amount: "-$650", 
                  vendor: "Quick Fix Plumbing",
                  date: "Jan 12, 2025",
                  category: "Maintenance"
                },
                { 
                  desc: "Unit 4B Rent Payment", 
                  amount: "+$2,400", 
                  vendor: "Tenant Payment",
                  date: "Jan 1, 2025",
                  category: "Rent"
                },
              ].map((transaction, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{transaction.desc}</span>
                    <span className={`text-sm font-semibold ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 mb-2">{transaction.vendor} • {transaction.date}</div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      transaction.category === 'Rent' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {transaction.category}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Sunset Apartments</span>
                  </div>
                </div>
              ))}
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