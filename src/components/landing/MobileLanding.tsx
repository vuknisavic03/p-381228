import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, Search, Tag, DollarSign, Building2, CreditCard, TrendingUp } from "lucide-react";

export default function MobileLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <header className="px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <Link to="/" className="text-gray-600 text-sm">Accounting</Link>
            <Link to="/vision" className="text-black text-sm font-medium bg-blue-100 px-2 py-1 rounded">Vision</Link>
          </div>
          
          <Button className="bg-black text-white text-xs px-3 py-2 rounded-md hover:bg-gray-800">
            Get free
          </Button>
        </div>
      </header>

      {/* Mobile Hero Section */}
      <section className="px-4 py-12">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-12 h-12 flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-black" strokeWidth={1.5} />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-black leading-tight mb-4">
            Break free from the old way
          </h1>
          
          <p className="text-base text-gray-600 mb-8 leading-relaxed">
            Personalized to your work and beautifully designed. An accounting solution that makes your life simpler.
          </p>
          
          <Button className="bg-black text-white text-sm px-6 py-3 rounded-md hover:bg-gray-800 mb-12 w-full max-w-xs">
            Get Square free
          </Button>
        </div>
      </section>

      {/* Mobile Overview Section */}
      <section className="px-4 pb-8">
        <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-gray-900 font-bold">S</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Square Accounting</div>
                <div className="text-gray-300 text-xs">Financial Dashboard</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <Search className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-3 h-3 text-blue-600" />
              </div>
              <span className="text-sm font-semibold">Financial Overview</span>
              <div className="ml-auto flex items-center gap-1">
                <Tag className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-600">Auto</span>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { metric: "Total Revenue", value: "$125,430", change: "+12.5%", tag: "Revenue", color: "green" },
                { metric: "Total Expenses", value: "$89,210", change: "-3.2%", tag: "Expenses", color: "red" },
                { metric: "Net Profit", value: "$36,220", change: "+18.7%", tag: "Profit", color: "purple" },
                { metric: "Cash Flow", value: "$42,100", change: "+5.4%", tag: "Cash", color: "blue" },
                { metric: "Accounts Receivable", value: "$28,900", change: "+2.1%", tag: "AR", color: "orange" },
              ].map((metric, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-3 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-medium text-gray-900 truncate">{metric.metric}</div>
                    <div className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                      metric.color === 'green' ? 'bg-green-100 text-green-700' :
                      metric.color === 'red' ? 'bg-red-100 text-red-700' :
                      metric.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                      metric.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                      metric.color === 'orange' ? 'bg-orange-100 text-orange-700' : ''
                    }`}>
                      {metric.tag}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-bold text-gray-900">{metric.value}</div>
                    <div className={`text-xs font-semibold ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Listings Section */}
      <section className="px-4 pb-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Map your listings with precision</h2>
          <p className="text-sm text-gray-600">
            Visualize all your property or business listings on an interactive map.
          </p>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-green-700 to-green-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Building2 className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Property Management</div>
                <div className="text-green-100 text-xs">Portfolio & Analytics</div>
              </div>
            </div>
            <Button className="bg-white text-green-700 text-xs px-3 py-1 rounded-lg hover:bg-green-50 font-medium">
              Add
            </Button>
          </div>

          <div className="p-4 space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg border border-green-200">
              <div className="text-sm font-medium text-green-800 mb-3">Portfolio Overview</div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white p-2 rounded text-center shadow-sm">
                  <div className="text-xs text-gray-600">Properties</div>
                  <div className="text-lg font-bold text-green-600">98</div>
                </div>
                <div className="bg-white p-2 rounded text-center shadow-sm">
                  <div className="text-xs text-gray-600">Occupancy</div>
                  <div className="text-lg font-bold text-blue-600">91.8%</div>
                </div>
                <div className="bg-white p-2 rounded text-center shadow-sm">
                  <div className="text-xs text-gray-600">Revenue</div>
                  <div className="text-lg font-bold text-purple-600">$206K</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900">Active Properties</h4>
              {[
                { property: "Sunset Apartments", units: "24 units", revenue: "$48K/mo", occupancy: "92%", status: "Active", color: "green" },
                { property: "Downtown Office", units: "12 units", revenue: "$72K/mo", occupancy: "88%", status: "Active", color: "green" },
                { property: "Riverside Condos", units: "36 units", revenue: "$54K/mo", occupancy: "95%", status: "Active", color: "green" },
              ].map((property, index) => (
                <div key={index} className="bg-gradient-to-r from-white to-gray-50 p-3 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-900 truncate">{property.property}</div>
                        <div className="text-xs text-gray-600">{property.units} • {property.revenue}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">{property.occupancy}</div>
                      <div className={`text-xs px-2 py-1 rounded-full font-medium ${
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
        </div>
      </section>

      {/* Mobile Transactions Section */}
      <section className="px-4 pb-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">All transactions tracked</h2>
          <p className="text-sm text-gray-600">
            Get real-time visibility into all your transactions in one powerful dashboard.
          </p>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-700 to-purple-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <CreditCard className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Transaction Management</div>
                <div className="text-purple-100 text-xs">Real-time Activity</div>
              </div>
            </div>
            <Button className="bg-white text-purple-700 text-xs px-3 py-1 rounded-lg hover:bg-purple-50 font-medium">
              Add
            </Button>
          </div>

          <div className="p-4 space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 rounded-lg border border-purple-200">
              <div className="text-sm font-medium text-purple-800 mb-3">Monthly Summary</div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white p-2 rounded text-center shadow-sm">
                  <div className="text-xs text-gray-600">Net Income</div>
                  <div className="text-lg font-bold text-green-600">+$12.7K</div>
                </div>
                <div className="bg-white p-2 rounded text-center shadow-sm">
                  <div className="text-xs text-gray-600">Transactions</div>
                  <div className="text-lg font-bold text-blue-600">247</div>
                </div>
                <div className="bg-white p-2 rounded text-center shadow-sm">
                  <div className="text-xs text-gray-600">Income</div>
                  <div className="text-lg font-bold text-purple-600">$18.4K</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900">Recent Activity</h4>
              {[
                { description: "Rent Payment - Apt #12", amount: "+$2,400", date: "Jan 15", category: "Income", color: "green" },
                { description: "HVAC Repair", amount: "-$850", date: "Jan 14", category: "Maintenance", color: "red" },
                { description: "Rent - Office #304", amount: "+$6,200", date: "Jan 14", category: "Income", color: "green" },
                { description: "Property Insurance", amount: "-$1,200", date: "Jan 12", category: "Insurance", color: "red" },
              ].map((transaction, index) => (
                <div key={index} className="bg-gradient-to-r from-white to-gray-50 p-3 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.color === 'green' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        <div className={`w-3 h-3 rounded-full ${
                          transaction.color === 'green' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-900 truncate">{transaction.description}</div>
                        <div className="text-xs text-gray-600">{transaction.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-bold ${
                        transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full font-medium ${
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
        </div>
        
        {/* Mobile CTA */}
        <div className="px-4 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">Solution that is built for you</h2>
          <p className="text-lg text-gray-600 mb-8">Use for free</p>
          
          <div className="max-w-sm mx-auto">
            <div className="flex flex-col gap-3 mb-6">
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black text-sm"
              />
              <Button className="bg-black text-white w-full py-3 rounded-lg hover:bg-gray-800 text-sm">
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Workspaces Section */}
      <section className="px-4 py-12 bg-gray-50">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Workspaces built for teams</h2>
          <p className="text-sm text-gray-600">
            Seamlessly collaborate between workspaces and keep data organized.
          </p>
        </div>
        
        <div className="space-y-6 mb-12">
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
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <blockquote className="text-gray-900 mb-3 text-sm">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <div className="font-medium text-gray-900 text-sm">{testimonial.author}</div>
                <div className="text-gray-500 text-xs">{testimonial.handle}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile Footer */}
      <footer className="px-4 py-6">
        <div className="text-center">
          <div className="text-gray-600 text-sm">
            © 2025 SquareLabs
          </div>
        </div>
      </footer>
    </div>
  );
}