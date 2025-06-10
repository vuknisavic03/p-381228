import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Building2, Eye, Home, UserRound } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div>
              <Link to="/" className="flex items-center">
                <span className="text-xl font-medium text-gray-900">PropertyHub</span>
              </Link>
            </div>
            
            {/* Center navigation */}
            <div className="flex items-center gap-4">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="#"
                            >
                              <div className="mb-2 mt-4 text-lg font-medium">
                                PropertyHub Platform
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Manage your real estate portfolio efficiently with our streamlined tools and analytics.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              href="#"
                            >
                              <div className="text-sm font-medium leading-none">Listings Management</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Track and manage your property listings in one place
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              href="#"
                            >
                              <div className="text-sm font-medium leading-none">Transaction Tracking</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Keep track of all your property transactions
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              href="#"
                            >
                              <div className="text-sm font-medium leading-none">Analytics Dashboard</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Get insights into your property portfolio performance
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/vision" className={navigationMenuTriggerStyle()}>
                      <Eye className="mr-1 h-4 w-4" />
                      Vision
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            
            {/* Right side buttons */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="hidden sm:flex">
                Sign In
              </Button>
              <Button>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-gray-900 leading-tight mb-6">
            Manage your property portfolio with ease
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Whether you're an individual owner or a property manager, PropertyHub provides tools to streamline your real estate operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="w-full sm:w-auto">
              Get Started Now
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Book a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* User Journey Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold text-center mb-12">Choose Your Path</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Personal User */}
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="bg-gray-50 p-4 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                  <UserRound className="h-8 w-8 text-gray-700" />
                </div>
                <CardTitle className="text-2xl">Personal User</CardTitle>
                <CardDescription className="text-lg">
                  Manage your individual property portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-gray-500" />
                    Track personal properties
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-gray-500" />
                    Manage your transactions
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-gray-500" />
                    View personal analytics
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-gray-500" />
                    Simplified interface
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/dashboard" className="w-full">
                  <Button className="w-full">
                    Start as Personal User
                    <Home className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            {/* Property Manager */}
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="bg-gray-50 p-4 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                  <Building2 className="h-8 w-8 text-gray-700" />
                </div>
                <CardTitle className="text-2xl">Property Manager</CardTitle>
                <CardDescription className="text-lg">
                  Manage properties for multiple clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-gray-500" />
                    Multiple workspace management
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-gray-500" />
                    Client property tracking
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-gray-500" />
                    Advanced reporting tools
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-gray-500" />
                    Team collaboration features
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/workspace" className="w-full">
                  <Button className="w-full">
                    Start as Property Manager
                    <Building2 className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold text-center mb-12">Everything You Need to Manage Properties</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Listing Management</h3>
              <p className="text-gray-600">Easily create, update and manage property listings in one centralized dashboard.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Transaction Tracking</h3>
              <p className="text-gray-600">Monitor all your property transactions, from offers to closing, in real time.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                  <line x1="12" y1="20" x2="12" y2="10" />
                  <line x1="18" y1="20" x2="18" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="16" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600">Get valuable insights into your property portfolio with comprehensive analytics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8 sm:p-10 text-center">
          <h2 className="text-3xl font-semibold mb-4">Ready to simplify your property management?</h2>
          <p className="text-lg text-gray-600 mb-6">Join thousands of property owners and managers who are already using PropertyHub.</p>
          <Button size="lg">
            Get Started for Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-medium text-sm mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Features</a></li>
                <li><a href="#" className="hover:text-gray-900">Case Studies</a></li>
                <li><Link to="/vision" className="hover:text-gray-900">Vision</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-sm mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">About Us</a></li>
                <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900">Careers</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-sm mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Documentation</a></li>
                <li><a href="#" className="hover:text-gray-900">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-900">API Reference</a></li>
                <li><a href="#" className="hover:text-gray-900">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-sm mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-900">Terms of Service</a></li>
                <li><a href="#" className="hover:text-gray-900">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>&copy; 2025 PropertyHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
