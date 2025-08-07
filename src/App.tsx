
import { Toaster } from "@/components/ui/sonner";  // Use only one toaster implementation
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from "@/hooks/use-toast";
import WorkspacePicker from "./pages/workspace/WorkspacePicker";
import { Overview } from "./components/dashboard/Overview";
import Listings from "./pages/Listings";
import Transactions from "./pages/Transactions";
import Invoicing from "./pages/Invoicing";
import CashFlow from "./pages/CashFlow";
import Documents from "./pages/Documents";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import Vision from "./pages/Vision";
import MobilePostRegistration from "./pages/MobilePostRegistration";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <ToastProvider>
            <Toaster />
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/vision" element={<Vision />} />
              <Route path="/workspace" element={<WorkspacePicker />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/invoicing" element={<Invoicing />} />
              <Route path="/cash-flow" element={<CashFlow />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/mobile-welcome" element={<MobilePostRegistration />} />
              <Route path="/index" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ToastProvider>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
