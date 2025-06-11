
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from './pages/Index';
import Vision from './pages/Vision';
import Profile from './pages/Profile';
import Listings from './pages/Listings';
import Transactions from './pages/Transactions';
import NotFound from './pages/NotFound';
import UserSpace from './pages/UserSpace';
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/hooks/use-toast";
import { SecurityErrorBoundary } from "@/components/ui/SecurityErrorBoundary";

// Create a client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <SecurityErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/vision" element={<Vision />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/listings" element={<Listings />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/dashboard" element={<UserSpace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Toaster />
          </Router>
        </ToastProvider>
      </QueryClientProvider>
    </SecurityErrorBoundary>
  );
}

export default App;
