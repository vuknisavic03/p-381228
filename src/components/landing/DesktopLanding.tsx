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
          <div className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Tag className="w-6 h-6 text-blue-600" />
                      <h3 className="text-xl font-semibold text-gray-900">Smart Categories</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {['Rent', 'Maintenance', 'Insurance', 'Utilities', 'Legal', 'Marketing'].map((category, index) => (
                        <div key={index} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-full">
                          <div className={`w-3 h-3 rounded-full ${
                            category === 'Rent' ? 'bg-green-500' :
                            category === 'Maintenance' ? 'bg-red-500' :
                            category === 'Insurance' ? 'bg-blue-500' :
                            category === 'Utilities' ? 'bg-orange-500' :
                            category === 'Legal' ? 'bg-purple-500' : 'bg-pink-500'
                          }`}></div>
                          <span className="text-sm font-medium text-gray-700">{category}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="space-y-3">
                    {[
                      { desc: "HVAC Repair - Building A", amount: "-$850", category: "Maintenance", auto: true },
                      { desc: "Rent Collection - Apt #12", amount: "+$2,400", category: "Rent", auto: true },
                      { desc: "Property Insurance Premium", amount: "-$1,200", category: "Insurance", auto: true },
                      { desc: "Utility Bill - Electric", amount: "-$320", category: "Utilities", auto: true },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{item.desc}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`w-2 h-2 rounded-full ${
                              item.category === 'Rent' ? 'bg-green-500' :
                              item.category === 'Maintenance' ? 'bg-red-500' :
                              item.category === 'Insurance' ? 'bg-blue-500' : 'bg-orange-500'
                            }`}></div>
                            <span className="text-xs text-gray-600">{item.category}</span>
                            {item.auto && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Auto-categorized</span>}
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
          <div className="max-w-5xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-gray-900 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-gray-900 text-sm font-bold">S</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Live Dashboard</div>
                  <div className="text-gray-300 text-sm">Real-time updates</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm">Live</span>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { metric: "Total Revenue", value: "$125,430", change: "+12.5%", trend: "up", color: "green" },
                  { metric: "Net Profit", value: "$36,220", change: "+18.7%", trend: "up", color: "blue" },
                  { metric: "Monthly Growth", value: "15.3%", change: "+2.1%", trend: "up", color: "purple" },
                ].map((item, index) => (
                  <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200">
                    <div className="text-sm font-medium text-gray-600 mb-2">{item.metric}</div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{item.value}</div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-600">{item.change}</span>
                      <span className="text-xs text-gray-500">vs last month</span>
                    </div>
                  </div>
                ))}
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
          <div className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Building2 className="w-6 h-6 text-blue-600" />
                      <h3 className="text-xl font-semibold text-gray-900">Property Views</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {['All Properties', 'Apartments', 'Office', 'Retail', 'Mixed Use'].map((view, index) => (
                        <div key={index} className={`px-3 py-2 rounded-full text-sm font-medium ${
                          index === 0 ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {view}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="space-y-3">
                    {[
                      { name: "Sunset Apartments", type: "Apartment", profit: "+$36,000", status: "High Performance", growth: "+15%" },
                      { name: "Downtown Office Complex", type: "Office", profit: "+$54,000", status: "Excellent", growth: "+22%" },
                      { name: "Riverside Condos", type: "Condo", profit: "+$39,000", status: "Strong", growth: "+8%" },
                    ].map((property, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-900">{property.name}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-600">{property.type}</span>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{property.status}</span>
                            <span className="text-xs text-green-600 font-medium">{property.growth}</span>
                          </div>
                        </div>
                        <div className="text-sm font-semibold text-green-600">{property.profit}</div>
                      </div>
                    ))}
                  </div>
                </div>
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
          <div className="max-w-5xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="w-6 h-6 text-purple-600" />
                      <h3 className="text-xl font-semibold text-gray-900">Filter Options</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-purple-50 text-purple-700 px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          Property
                        </div>
                        <span className="text-gray-400">→</span>
                        <span className="text-sm text-gray-600">Sunset Apartments</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-100 text-gray-600 px-3 py-2 rounded-full text-sm font-medium">Category</div>
                        <span className="text-gray-400">→</span>
                        <span className="text-sm text-gray-600">Maintenance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-100 text-gray-600 px-3 py-2 rounded-full text-sm font-medium">Amount</div>
                        <span className="text-gray-400">→</span>
                        <span className="text-sm text-gray-600">$500+</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="space-y-3">
                    {[
                      { desc: "Sunset Apartments - HVAC Repair", amount: "-$850", category: "Maintenance", property: "Sunset Apartments" },
                      { desc: "Sunset Apartments - Rent Collection", amount: "+$2,400", category: "Rent", property: "Sunset Apartments" },
                      { desc: "Sunset Apartments - Plumbing Fix", amount: "-$650", category: "Maintenance", property: "Sunset Apartments" },
                    ].map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{transaction.desc}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`w-2 h-2 rounded-full ${
                              transaction.category === 'Rent' ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                            <span className="text-xs text-gray-600">{transaction.category}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-600">{transaction.property}</span>
                          </div>
                        </div>
                        <div className={`text-sm font-semibold ${transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.amount}
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