import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, TrendingUp, ArrowUpRight, Check, X } from "lucide-react";
import UserTypeDialog from "./UserTypeDialog";

export default function DesktopLanding() {
  const [showUserTypeDialog, setShowUserTypeDialog] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <nav className="flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-black transition-colors">Features</a>
              <Link to="/vision" className="text-gray-600 hover:text-black transition-colors">About</Link>
              <a href="#pricing" className="text-gray-600 hover:text-black transition-colors">Pricing</a>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-black transition-colors">Log in</button>
            <Button 
              className="bg-black text-white hover:bg-gray-800 transition-colors"
              onClick={() => setShowUserTypeDialog(true)}
            >
              Sign up
            </Button>
          </div>
        </div>
      </header>

      {/* Announcement Bar */}
      <div className="bg-gray-50 border-b border-gray-100 pt-20">
        <div className="container mx-auto px-6 py-3 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <span className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full border">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Square has automated 50,000+ property transactions
            </span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-6 py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto text-center max-w-6xl">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full border">
              💗 by 3k+ property owners and accountants
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-black leading-tight mb-8">
            Property Management<br />
            Has Evolved. Have You?
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
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
          
          {/* Live Dashboard Demo */}
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">S</span>
                  </div>
                  <div className="text-left">
                    <div className="text-gray-900 font-semibold">Live Dashboard</div>
                    <div className="text-gray-600 text-sm">Real-time insights • Categorized transactions • Performance tracking</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 text-sm font-medium">Live Updates</span>
                </div>
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

      {/* Features Section */}
      <section id="features" className="px-6 py-24 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-black mb-6">Organize your properties like never before</h2>
          </div>
          
          {/* Property Organization Feature */}
          <div className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl font-bold text-black mb-4">All Your Properties. One Interactive View.</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Visualize all your property or business listings in one searchable map. Track occupancy, update availability, and plan with confidence.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
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

          {/* Transaction Tracking Feature */}
          <div className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
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
              <div className="order-1 lg:order-2">
                <h3 className="text-3xl font-bold text-black mb-4">Track and Categorize Property Cash Flow.</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  View all income and expenses in one place. Take advantage of real-time updates with trend analysis and growth forecasts.
                </p>
              </div>
            </div>
          </div>

          {/* Workspace Management Feature */}
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl font-bold text-black mb-4">One Platform. Infinite Workspaces.</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Whether you manage one property or hundreds, workspaces help you stay organized and allow you to scale.
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
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
                    }
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stay in control section */}
      <section className="px-6 py-24 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-black mb-6">Stay in control of your business</h2>
          </div>
          
          {/* Revenue insights */}
          <div className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl font-bold text-black mb-4">Revenue insights</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Create custom revenue lines that show you where income comes from every month
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <div className="text-sm font-medium text-gray-900">Rental Income</div>
                      <div className="text-xs text-gray-500">From all properties</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">$24,800</div>
                      <div className="text-xs text-green-600">+12% vs last month</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <div className="text-sm font-medium text-gray-900">Service Fees</div>
                      <div className="text-xs text-gray-500">Management & maintenance</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">$3,400</div>
                      <div className="text-xs text-blue-600">+8% vs last month</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div>
                      <div className="text-sm font-medium text-gray-900">Parking Revenue</div>
                      <div className="text-xs text-gray-500">Additional income streams</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-600">$1,200</div>
                      <div className="text-xs text-purple-600">+5% vs last month</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Monitor spending */}
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                      <div>
                        <div className="text-sm font-medium text-gray-900">Maintenance Costs</div>
                        <div className="text-xs text-gray-500">Across all properties</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-red-600">$4,200</div>
                        <div className="text-xs text-red-600">+15% vs last month</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div>
                        <div className="text-sm font-medium text-gray-900">Utilities</div>
                        <div className="text-xs text-gray-500">Electric, water, gas</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-orange-600">$1,800</div>
                        <div className="text-xs text-orange-600">-3% vs last month</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div>
                        <div className="text-sm font-medium text-gray-900">Insurance</div>
                        <div className="text-xs text-gray-500">Property & liability</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-yellow-600">$950</div>
                        <div className="text-xs text-yellow-600">Same as last month</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-3xl font-bold text-black mb-4">Monitor spending</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Identify and cut unnecessary expenses with monthly breakdowns by vendor across one or multiple accounts or businesses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="px-6 py-24 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-5xl font-bold text-black mb-8">Ready to modernize your property management?</h2>
          <p className="text-xl text-gray-600 mb-12">
            Join property owners who've already evolved beyond spreadsheets
          </p>
          <Button 
            className="bg-black text-white text-lg px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors"
            onClick={() => setShowUserTypeDialog(true)}
          >
            Get Square free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-gray-900 font-medium">Square</span>
            </div>
            <div className="text-gray-500 text-sm">
              © 2025 SquareLabs. All rights reserved.
            </div>
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