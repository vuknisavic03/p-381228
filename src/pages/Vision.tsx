import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Vision() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-4 py-3 border-b border-gray-100 h-16 flex items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 md:gap-6">
            <Link to="/" className="w-7 h-7 md:w-8 md:h-8 bg-black rounded flex items-center justify-center hover:bg-gray-800 transition-colors">
              <span className="text-white font-bold text-sm">S</span>
            </Link>
            <nav className="flex items-center gap-2 md:gap-6">
              <Link to="/vision" className="text-black text-sm font-medium bg-blue-100 px-3 py-1.5 rounded hover:bg-blue-200 transition-colors">Vision</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white">
          {/* Letter Header */}
          <div className="mb-12">
            <div className="text-right text-sm text-gray-500 mb-8">
              January 2025
            </div>
            
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-black mb-2">
                Vision
              </h1>
              <div className="w-16 h-0.5 bg-black"></div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-black text-center">
                The Future of Real Estate Starts Here
              </h2>
            </div>
          </div>

          {/* Letter Content */}
          <div className="space-y-6 text-gray-700 leading-relaxed mb-12">
            <p className="text-base font-medium">
              Dear Property Managers,
            </p>
            
            <p className="text-base">
              After seeing how needlessly complex and outdated property management can be, we present a solution that's been reinvented for the next generation of property managers. A platform where every part of your business – from rent collection to maintenance to finances – flows seamlessly and intuitively. One that's built to save time, reduce stress, and help you scale without chaos.
            </p>
            
            <p className="text-base">
              And this is just the beginning. We believe the future of real estate isn't a single tool – it's an ecosystem. After we launch this platform, we're building a suite of apps designed to support every part of the real estate lifecycle: construction, renovation, financing, compliance, vendor coordination, and more. Each tool will integrate deeply with the others, so whether you're managing 3 units or building a 300-unit development, you'll be supported every step of the way.
            </p>
            
            <p className="text-base">
              Our mission is simple: to give real estate operators the tools they need to run stronger businesses and build better communities.
            </p>
            
            <p className="text-base">
              We're thrilled to have you on this journey with us. Let's build something that lasts.
            </p>
          </div>

          {/* Letter Signature */}
          <div className="mb-16">
            <div className="text-right">
              <p className="text-base text-gray-700 mb-2">Sincerely,</p>
              <p className="text-base font-semibold text-black">The Square Team</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="border-t border-gray-200 pt-12">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-black mb-2">Get in Touch</h2>
              <p className="text-sm text-gray-600">Have questions about our vision? We'd love to hear from you.</p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Tell us what's on your mind..."
                ></textarea>
              </div>
              
              <div className="text-center">
                <Button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}