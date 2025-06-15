
import { Toaster } from "@/components/ui/sonner";  // Use only one toaster implementation
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from "@/hooks/use-toast";
import WorkspacePicker from "./pages/workspace/WorkspacePicker";
import { Overview } from "./components/dashboard/Overview";
import Profile from "./pages/Profile";
import Listings from "./pages/Listings";
import Transactions from "./pages/Transactions";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import Vision from "./pages/Vision";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <ToastProvider>
            <Toaster />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/vision" element={<Vision />} />
              <Route path="/workspace" element={<WorkspacePicker />} />
              <Route path="/dashboard" element={<Overview />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ToastProvider>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
