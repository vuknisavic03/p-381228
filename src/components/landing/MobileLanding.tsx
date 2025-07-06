import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, Search, Tag, DollarSign, Building2, CreditCard, TrendingUp, Target, Calendar } from "lucide-react";
import InteractiveCategorizationDemo from "./InteractiveCategorizationDemo";
import dashboard from "/images/1.svg";

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
          
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
            <div className="bg-gray-900 px-4 py-3 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-white" />
                  <div>
                    <div className="text-sm font-semibold text-white">Live Dashboard</div>
                    <div className="text-xs text-gray-300">Auto-categorizes • Tracks • Updates</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-medium">Live</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="text-center mb-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Square organizes your finances automatically</h3>
                <p className="text-xs text-gray-600">Every transaction categorized, every property tracked—without lifting a finger.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { 
                    metric: "Monthly Revenue", 
                    value: "$125,430", 
                    change: "+12.5%",
                    subtext: "vs last month",
                    icon: "💰"
                  },
                  { 
                    metric: "Net Profit", 
                    value: "$36,220", 
                    change: "+18.7%",
                    subtext: "after expenses",
                    icon: "📈"
                  },
                ].map((item, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-3 rounded-xl border border-gray-100 text-center">
                    <div className="text-lg mb-1">{item.icon}</div>
                    <div className="text-xs font-medium text-gray-600 mb-1">{item.metric}</div>
                    <div className="text-lg font-bold text-gray-900 mb-1">{item.value}</div>
                    <div className="flex items-center justify-center gap-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs font-semibold text-green-600">{item.change}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{item.subtext}</div>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg border border-green-100 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-gray-700">Portfolio Health</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Excellent</span>
                </div>
                <div className="text-xs text-gray-600">All properties performing above target</div>
                <div className="text-xs text-gray-500 mt-1">✨ Automatic tracking</div>
              </div>
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