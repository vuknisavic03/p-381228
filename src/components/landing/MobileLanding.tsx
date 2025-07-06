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
          
          <h1 className="text-2xl font-bold text-black leading-tight mb-4">
            Break free from the old way
          </h1>
          
          <p className="text-sm text-gray-600 mb-8 leading-relaxed px-4 max-w-md mx-auto">
            Personalized to your work.<br />
            Solution that makes your life simpler.
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
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white text-left">Live Dashboard</div>
                    <div className="text-xs text-gray-300 text-left">Auto-categorizes • Tracks • Updates</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-medium">Live</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-1 text-left">Square organizes your finances automatically</h3>
                <p className="text-xs text-gray-600 text-left">Every transaction categorized, every property tracked—without lifting a finger.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { 
                    metric: "Monthly Revenue", 
                    value: "$125,430", 
                    change: "+12.5%",
                    subtext: "vs last month"
                  },
                  { 
                    metric: "Net Profit", 
                    value: "$36,220", 
                    change: "+18.7%",
                    subtext: "after expenses"
                  },
                ].map((item, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-3 rounded-xl border border-gray-100">
                    <div className="text-xs font-medium text-gray-600 mb-1 text-left">{item.metric}</div>
                    <div className="text-lg font-bold text-gray-900 mb-1 text-left">{item.value}</div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs font-semibold text-green-600">{item.change}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-left">{item.subtext}</div>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg border border-green-100">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-gray-700">Portfolio Health</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Excellent</span>
                </div>
                <div className="text-xs text-gray-600 text-left">All properties performing above target</div>
                <div className="text-xs text-gray-500 mt-1 text-left">✨ Automatic tracking</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Organization Feature */}
      <section className="px-4 pb-14">
        <div className="mb-6">
          <div className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
            Listings
          </div>
          <h2 className="text-xl font-bold text-black mb-2">Map your listings with precision</h2>
          <p className="text-sm text-gray-600">
            Visualize all your property or business listings on an interactive map. Manage availability, get insights, and plan with confidence.
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
      <section className="px-4 pb-14">
        <div className="mb-6">
          <div className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
            Transactions
          </div>
          <h2 className="text-xl font-bold text-black mb-2">A place to get all transactions tracked</h2>
          <p className="text-sm text-gray-600">
            Get real-time visibility into all your transactions in one powerful dashboard. Analyze trends, identify gaps, and grow confidently.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-gray-900">Transactions</span>
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

      {/* Workspace Manager Feature */}
      <section className="px-4 pb-14">
        <div className="mb-6">
          <div className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
            Workspaces
          </div>
          <h2 className="text-xl font-bold text-black mb-2">Workspaces built for managers and individuals</h2>
          <p className="text-sm text-gray-600">
            Switch effortlessly between workspaces. Keep data organized and see performance across them all.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-semibold text-gray-900">Workspace Manager</span>
              </div>
              <div className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">3 active</div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex gap-2 text-xs mb-4">
              <div className="bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                Personal Portfolio
              </div>
              <div className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">Company</div>
            </div>
            <div className="space-y-3">
              {[
                { 
                  workspace: "Personal Portfolio", 
                  properties: "12 properties", 
                  revenue: "$89,400", 
                  change: "+15.2%",
                  status: "Growing",
                  color: "bg-green-500"
                },
                { 
                  workspace: "Downtown Commercial", 
                  properties: "8 buildings", 
                  revenue: "$156,800", 
                  change: "+22.1%",
                  status: "Excellent",
                  color: "bg-blue-500"
                },
                { 
                  workspace: "Residential Mgmt", 
                  properties: "24 units", 
                  revenue: "$74,200", 
                  change: "+8.9%",
                  status: "Stable",
                  color: "bg-purple-500"
                },
              ].map((workspace, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${workspace.color}`}></div>
                      <span className="text-sm font-semibold text-gray-900">{workspace.workspace}</span>
                    </div>
                    <span className="text-sm font-semibold text-green-600">{workspace.revenue}</span>
                  </div>
                  <div className="text-xs text-gray-600 mb-2">{workspace.properties}</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{workspace.status}</span>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-green-600" />
                        <span className="text-xs font-semibold text-green-600">{workspace.change}</span>
                      </div>
                    </div>
                    <button className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">Switch</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-gradient-to-r from-orange-50 to-yellow-50 p-3 rounded-lg border border-orange-100">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-xs font-semibold text-gray-700">Cross-Workspace</span>
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">All performing well</span>
              </div>
              <div className="text-xs text-gray-600 text-left">Total: $320,400 • Avg growth: +15.4%</div>
              <div className="text-xs text-gray-500 mt-1 text-left">✨ Unified analytics across workspaces</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Testimonials Section */}
      <section className="px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-black mb-4">What people are saying</h2>
        </div>
        
        <div className="relative overflow-hidden -mx-4">
          <div className="flex gap-4 animate-scroll">
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
              // Duplicate for seamless loop
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
              <div key={index} className="bg-white p-4 rounded-lg border border-gray-100 min-w-[280px] flex-shrink-0 mx-2">
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