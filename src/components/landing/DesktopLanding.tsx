import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, TrendingUp, ArrowUpRight, Check, BarChart3, PieChart, DollarSign, Users, Target, Zap, Shield, Clock } from "lucide-react";
import UserTypeDialog from "./UserTypeDialog";

export default function DesktopLanding() {
  const [showUserTypeDialog, setShowUserTypeDialog] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div>
              <span className="font-semibold text-foreground">Square</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Accounting</a>
              <Link to="/vision" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Vision</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-sm">Log in</Button>
            <Button 
              className="text-sm"
              onClick={() => setShowUserTypeDialog(true)}
            >
              Sign up
            </Button>
          </div>
        </div>
      </header>


      {/* Hero Section */}
      <section className="px-6 py-32 pt-24 bg-gradient-to-b from-background to-brand-light">
        <div className="container mx-auto text-center max-w-7xl">
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-card px-4 py-2 rounded-full border border-border shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              💗 by 3k+ property owners and accountants
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[0.9] mb-8 tracking-tight">
            Self-driving<br />
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              property management
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Property accounting software that does the work for you. Automate transactions, track revenue, and optimize your portfolio.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
            <Button 
              size="lg"
              className="text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
              onClick={() => setShowUserTypeDialog(true)}
            >
              Start free trial
              <ArrowUpRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 rounded-lg"
            >
              Watch demo
            </Button>
          </div>
          
          {/* App Preview Dashboard */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Dashboard Header */}
              <div className="bg-card border-b border-border px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">Property Dashboard</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-blue rounded-full"></div>
                      <span className="text-muted-foreground">Live Data</span>
                    </div>
                    <span className="text-green-600 font-medium">+$12.4k this month</span>
                  </div>
                </div>
              </div>
              
              {/* Dashboard Content */}
              <div className="p-6 bg-gradient-to-br from-background to-muted/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {/* Metric Cards */}
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">$24,680</div>
                    <div className="text-sm text-muted-foreground">Monthly Revenue</div>
                  </div>
                  
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">8 active</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">12</div>
                    <div className="text-sm text-muted-foreground">Properties Managed</div>
                  </div>
                  
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-purple-600" />
                      </div>
                      <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">Auto</span>
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">847</div>
                    <div className="text-sm text-muted-foreground">Transactions Processed</div>
                  </div>
                </div>
                
                {/* Activity Feed */}
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">Recent Activity</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Live updates
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg border border-green-200">
                      <Check className="w-5 h-5 text-green-600" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground">Rent payment processed</div>
                        <div className="text-xs text-muted-foreground">Property A - Unit 2B • $2,400</div>
                      </div>
                      <div className="text-xs text-green-600 font-medium">Just now</div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <Zap className="w-5 h-5 text-blue-600" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground">Expense auto-categorized</div>
                        <div className="text-xs text-muted-foreground">Maintenance fee • $180 → Repairs & Maintenance</div>
                      </div>
                      <div className="text-xs text-blue-600 font-medium">2m ago</div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg border border-border">
                      <BarChart3 className="w-5 h-5 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground">Monthly report generated</div>
                        <div className="text-xs text-muted-foreground">Portfolio overview • Ready for review</div>
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">5m ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-32 bg-background">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Built for property owners<br />
              <span className="text-muted-foreground">who value their time</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Automate the tedious work so you can focus on growing your portfolio
            </p>
          </div>
          
          {/* Feature Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
            {/* Smart Automation */}
            <div className="group">
              <div className="bg-card border border-border rounded-2xl p-8 h-full hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Smart Automation</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Automatically categorize transactions, match receipts, and generate reports without manual input.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-foreground">Auto-categorization</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-foreground">Receipt matching</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-foreground">Expense tracking</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio Insights */}
            <div className="group">
              <div className="bg-card border border-border rounded-2xl p-8 h-full hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <PieChart className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Portfolio Insights</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Real-time dashboards showing revenue, expenses, and profitability across all properties.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-foreground">Revenue tracking</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-foreground">Expense monitoring</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-foreground">Profit analysis</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tax Optimization */}
            <div className="group">
              <div className="bg-card border border-border rounded-2xl p-8 h-full hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Tax Optimization</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Maximize deductions and ensure compliance with automated tax preparation features.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-foreground">Deduction tracking</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-foreground">Compliance checks</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-foreground">Tax report generation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Feature Showcase */}
          <div className="space-y-32">
            {/* Auto-categorization Feature */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-sm text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full mb-6">
                  <Zap className="w-4 h-4" />
                  Smart Automation
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Transactions categorized<br />in real-time
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Our AI automatically categorizes every transaction as it happens. No more manual sorting or end-of-month catch-up sessions.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-foreground">99.7% accuracy rate</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-foreground">Learns from your patterns</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-foreground">Custom rule creation</span>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                <div className="space-y-4">
                  {[
                    { desc: "Rent payment - Property A", amount: "+$2,400", category: "Rental Income", vendor: "Tenant Portal", status: "auto" },
                    { desc: "Maintenance repair - Unit 2B", amount: "-$280", category: "Repairs & Maintenance", vendor: "ABC Plumbing", status: "auto" },
                    { desc: "Property insurance payment", amount: "-$450", category: "Insurance", vendor: "State Farm", status: "auto" },
                    { desc: "Utility bill - Electricity", amount: "-$180", category: "Utilities", vendor: "ConEd", status: "processing" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-border">
                      <div className="flex items-center gap-3">
                        {item.status === 'auto' ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <div className="w-5 h-5 bg-brand-blue/20 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-brand-blue rounded-full animate-pulse"></div>
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-foreground">{item.desc}</div>
                          <div className="text-xs text-muted-foreground">{item.vendor}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${item.amount.startsWith('+') ? 'text-green-600' : 'text-foreground'}`}>
                          {item.amount}
                        </div>
                        <div className="text-xs text-muted-foreground">{item.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Portfolio Dashboard Feature */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="text-2xl font-bold text-green-600 mb-1">$24,680</div>
                      <div className="text-sm text-muted-foreground">Monthly Revenue</div>
                      <div className="text-xs text-green-600 mt-1">+12% vs last month</div>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <div className="text-2xl font-bold text-red-600 mb-1">$8,340</div>
                      <div className="text-sm text-muted-foreground">Monthly Expenses</div>
                      <div className="text-xs text-red-600 mt-1">-3% vs last month</div>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="text-3xl font-bold text-blue-600 mb-1">$16,340</div>
                    <div className="text-sm text-muted-foreground">Net Profit</div>
                    <div className="text-xs text-blue-600 mt-1">66.2% profit margin</div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full mb-6">
                  <PieChart className="w-4 h-4" />
                  Portfolio Insights
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Your entire portfolio<br />at a glance
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Track performance across all properties with real-time metrics, trend analysis, and automated reporting.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-foreground">Real-time profit tracking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-foreground">Property-by-property breakdown</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-foreground">Trend analysis & forecasting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="px-6 py-32 bg-brand-light">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Trusted by property owners worldwide
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands who have automated their property finances
            </p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">10,000+</div>
              <div className="text-muted-foreground">Transactions Automated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">3,000+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-4xl md:text-5xl font-bold text-foreground mb-2 text-center">$2.1M+</div>
            <div className="text-center">
              <div className="text-muted-foreground">Revenue Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">99.7%</div>
              <div className="text-muted-foreground">Accuracy Rate</div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-yellow-400 rounded-sm"></div>
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed">
                "Square saved me 15+ hours every month. The automation is incredible and the insights help me make better investment decisions."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center">
                  <span className="text-sm text-white font-medium">JD</span>
                </div>
                <div>
                  <div className="font-medium text-foreground">Jane Doe</div>
                  <div className="text-sm text-muted-foreground">Portfolio: 8 properties</div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-yellow-400 rounded-sm"></div>
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed">
                "The tax optimization features alone saved me $4,000 last year. Best investment I've made for my rental business."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-sm text-white font-medium">MS</span>
                </div>
                <div>
                  <div className="font-medium text-foreground">Mike Smith</div>
                  <div className="text-sm text-muted-foreground">Portfolio: 12 properties</div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-yellow-400 rounded-sm"></div>
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed">
                "Finally, property accounting that just works. Real-time tracking and beautiful reports make everything so much easier."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-sm text-white font-medium">SJ</span>
                </div>
                <div>
                  <div className="font-medium text-foreground">Sarah Johnson</div>
                  <div className="text-sm text-muted-foreground">Portfolio: 5 properties</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-32 bg-foreground text-background">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
            Ready to automate your<br />property accounting?
          </h2>
          <p className="text-xl md:text-2xl text-background/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of property owners who save hours every month with automated financial management
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
              onClick={() => setShowUserTypeDialog(true)}
            >
              Start free trial
              <ArrowUpRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 rounded-lg border-background/20 text-background hover:bg-background/10"
            >
              Schedule a demo
            </Button>
          </div>
          <div className="mt-8 text-sm text-background/60">
            No credit card required • 14-day free trial • Cancel anytime
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 bg-background border-t border-border">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">S</span>
                </div>
                <span className="font-semibold text-foreground text-lg">Square</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Automate your property finances with intelligent accounting software built for modern property owners.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><Link to="/vision" className="hover:text-foreground transition-colors">Vision</Link></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-muted-foreground text-sm">
              © 2025 Square. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
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