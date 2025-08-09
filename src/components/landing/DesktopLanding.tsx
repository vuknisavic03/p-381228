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
            Self-driving<br />
            property management
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Property accounting software that does the work for you
          </p>
          
          <div className="flex justify-center mb-16">
            <Button 
              className="bg-black text-white text-lg px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors"
              onClick={() => setShowUserTypeDialog(true)}
            >
              Sign up
            </Button>
          </div>
          
          {/* Demo Product Card */}
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                  </div>
                  <span className="text-sm text-gray-600">Autopilot</span>
                  <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">ON</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-blue-600 font-medium">2024</span>
                  <span className="text-sm text-blue-600 font-medium">+ $1.9k saved</span>
                  <span className="text-sm text-blue-600 font-medium">+ 21hrs saved</span>
                </div>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                <div className="w-6 h-6 flex items-center justify-center">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                </div>
                <span className="text-sm text-gray-700">29 transactions categorized</span>
                <span className="text-sm text-green-600 font-medium">Internet Money, LLC</span>
                <span className="text-sm text-green-600">+5 min saved</span>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-6 h-6 flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm text-gray-700">CSV auto imported with</span>
                <span className="text-sm text-green-600 font-medium">Internet Money, LLC</span>
                <Check className="w-4 h-4 text-green-600" />
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-6 h-6 flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm text-gray-700">Starbucks Receipt Matched</span>
                <Check className="w-4 h-4 text-green-600" />
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-xl opacity-60">
                <div className="w-6 h-6 flex items-center justify-center">
                  <div className="w-4 h-4 bg-gray-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-sm text-gray-500">Stripe $2,000 invoice matched</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-24 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-black mb-6">Personalize your actions</h2>
          </div>
          
          {/* Auto-categorization Feature */}
          <div className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl font-bold text-black mb-4">Auto-categorization</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Get your business transactions categorized in real-time and reviewed by an expert for accuracy
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <div className="space-y-4">
                  {[
                    { desc: "Office rent payment", amount: "-$3,200", category: "Office Expenses", vendor: "Property Management LLC" },
                    { desc: "Utility bill - Electricity", amount: "-$245", category: "Utilities", vendor: "ConEd" },
                    { desc: "Monthly rent collection", amount: "+$8,400", category: "Rental Income", vendor: "Tenant Portal" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.desc}</div>
                        <div className="text-xs text-gray-500">{item.vendor}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${item.amount.startsWith('+') ? 'text-green-600' : 'text-gray-900'}`}>
                          {item.amount}
                        </div>
                        <div className="text-xs text-gray-500">{item.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* No deduction left behind */}
          <div className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-gray-900">Home office deduction</span>
                      </div>
                      <span className="text-sm text-green-600 font-medium">$2,400 saved</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-gray-900">Vehicle expenses</span>
                      </div>
                      <span className="text-sm text-green-600 font-medium">$1,800 saved</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-gray-900">Business travel</span>
                      </div>
                      <span className="text-sm text-green-600 font-medium">$950 saved</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-3xl font-bold text-black mb-4">No deduction left behind</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Get the easy-to-miss deductions like your home office, vehicle, travel all handled
                </p>
              </div>
            </div>
          </div>

          {/* Customize rules */}
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl font-bold text-black mb-4">Customize rules</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Adapt suggested rules to your business and life
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">When vendor contains "Starbucks"</span>
                      <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Edit</button>
                    </div>
                    <span className="text-xs text-gray-600">→ Categorize as "Business Meals"</span>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">When amount &gt; $1,000</span>
                      <button className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Edit</button>
                    </div>
                    <span className="text-xs text-gray-600">→ Flag for manual review</span>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">Rent payments from tenants</span>
                      <button className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Edit</button>
                    </div>
                    <span className="text-xs text-gray-600">→ Auto-categorize as "Rental Income"</span>
                  </div>
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
          <h2 className="text-5xl font-bold text-black mb-8">Ready to automate your property accounting?</h2>
          <p className="text-xl text-gray-600 mb-12">
            Join thousands of property owners who have automated their finances with Square
          </p>
          <Button 
            className="bg-black text-white text-lg px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors"
            onClick={() => setShowUserTypeDialog(true)}
          >
            Sign up for free
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
              © 2025 Square. All rights reserved.
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