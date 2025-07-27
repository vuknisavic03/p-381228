import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, Search, Tag, DollarSign, FileText, TrendingUp, Users, Calendar, Building2, CreditCard, Receipt, PieChart, Target } from "lucide-react";
import InteractiveCategorizationDemo from "./InteractiveCategorizationDemo";
import UserTypeDialog from "./UserTypeDialog";
import dashboard from "/images/1.svg";

export default function DesktopLanding() {
  const [showUserTypeDialog, setShowUserTypeDialog] = useState(false);

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
            <Button 
              className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800"
              onClick={() => setShowUserTypeDialog(true)}
            >
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
          
          <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-8 max-w-4xl mx-auto">
            Property Management Has Evolved. Have You?
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Old tools can't manage a modern portfolio.<br />
            Goodbye spreadsheets. Hello automation.
          </p>
          
          <div className="flex justify-center mb-16">
            <Button 
              className="bg-black text-white text-lg px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors"
              onClick={() => setShowUserTypeDialog(true)}
            >
              Get Square free
            </Button>
          </div>
          
          <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">S</span>
                </div>
                <div className="text-left">
                  <div className="text-gray-900 font-semibold text-left">Live Dashboard</div>
                  <div className="text-gray-600 text-sm text-left">Real-time insights • Categorized transactions • Performance tracking</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-600 text-sm font-medium">Live Updates</span>
              </div>
            </div>
            <div className="p-8">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {[
                  { 
                    metric: "Total Revenue", 
                    value: "$125,430", 
                    change: "+12.5%", 
                    subtext: "vs last month"
                  },
                  { 
                    metric: "Net Profit", 
                    value: "$36,220", 
                    change: "+18.7%", 
                    subtext: "after all expenses"
                  },
                  { 
                    metric: "Monthly Growth", 
                    value: "15.3%", 
                    change: "+2.1%", 
                    subtext: "portfolio expansion"
                  },
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="text-sm font-medium text-gray-600 mb-2 text-left">{item.metric}</div>
                    <div className="text-3xl font-bold text-gray-900 mb-2 text-left">{item.value}</div>
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-600">{item.change}</span>
                    </div>
                    <div className="text-xs text-gray-500 text-left">{item.subtext}</div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-gray-700">Overall Portfolio Health</span>
                  <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Excellent Performance</span>
                </div>
                <div className="text-sm text-gray-600 text-left">All 3 properties performing above target • Revenue up 15.3% this quarter</div>
                <div className="text-xs text-gray-500 mt-2 text-left">✨ Square automatically tracks performance across all your properties</div>
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
              Listings
            </div>
            <h2 className="text-4xl font-bold text-black mb-4">Map your listings with precision</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Visualize all your property or business listings on an interactive map. Manage availability, get insights, and plan with confidence.
            </p>
          </div>
          <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex flex-wrap gap-3 mb-6">
                {['All Properties', 'Apartments', 'Office', 'Retail', 'Mixed Use'].map((view, index) => (
                  <div key={index} className={`px-4 py-2 rounded-full text-sm font-medium ${
                    index === 0 ? 'bg-gray-200 text-gray-700' : 'bg-gray-100 text-gray-600'
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
                      <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">{property.occupancy} occupied</span>
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
              Transactions
            </div>
            <h2 className="text-4xl font-bold text-black mb-4">A place to get all transactions tracked</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Get real-time visibility into all your transactions in one powerful dashboard. Analyze trends, identify gaps, and grow confidently.
            </p>
          </div>
          <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex gap-3 mb-6">
                <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
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
                      <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">{transaction.property}</span>
                      {transaction.urgent && <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">Urgent</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workspace Manager Feature */}
      <section className="px-4 pb-16">
        <div className="container mx-auto">
          <div className="mb-12">
            <div className="inline-block bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Workspaces
            </div>
            <h2 className="text-4xl font-bold text-black mb-4">Workspaces built for managers and individuals</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Switch effortlessly between workspaces. Keep data organized and see performance across them all.
            </p>
          </div>
          <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex gap-3 mb-6">
                <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Personal Portfolio
                </div>
                <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">Company Assets</div>
                <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">Client Projects</div>
              </div>
              
              <div className="space-y-4">
                {[
                  { 
                    workspace: "Personal Portfolio", 
                    properties: "12 properties", 
                    revenue: "$89,400", 
                    change: "+15.2%",
                    status: "Growing",
                    lastUpdate: "2 minutes ago",
                    color: "bg-green-500"
                  },
                  { 
                    workspace: "Downtown Commercial", 
                    properties: "8 office buildings", 
                    revenue: "$156,800", 
                    change: "+22.1%",
                    status: "Excellent",
                    lastUpdate: "5 minutes ago",
                    color: "bg-blue-500"
                  },
                  { 
                    workspace: "Residential Management Co.", 
                    properties: "24 apartment units", 
                    revenue: "$74,200", 
                    change: "+8.9%",
                    status: "Stable",
                    lastUpdate: "12 minutes ago",
                    color: "bg-purple-500"
                  },
                ].map((workspace, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${workspace.color}`}></div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{workspace.workspace}</div>
                          <div className="text-xs text-gray-600">{workspace.properties}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">{workspace.revenue}</div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-green-600" />
                          <span className="text-xs font-semibold text-green-600">{workspace.change}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">{workspace.status}</span>
                        <span className="text-xs text-gray-500">Updated {workspace.lastUpdate}</span>
                      </div>
                      <button className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full font-medium hover:bg-gray-300 transition-colors">
                        Switch to workspace
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-gray-700">Cross-Workspace Insights</span>
                  <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">All workspaces performing well</span>
                </div>
                <div className="text-sm text-gray-600 text-left">Total portfolio value: $320,400 • Average growth: +15.4% this quarter</div>
                <div className="text-xs text-gray-500 mt-2 text-left">✨ Switch between workspaces instantly while keeping unified analytics</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">What people are saying</h2>
          </div>
          
          <div className="relative overflow-hidden">
            <div className="flex gap-6 animate-scroll">
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
                <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 min-w-[350px] flex-shrink-0">
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

      <UserTypeDialog 
        open={showUserTypeDialog} 
        onOpenChange={setShowUserTypeDialog} 
      />
    </div>
  );
}