
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from "@/hooks/use-toast";
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
              <Route path="*" element={<Index />} />
            </Routes>
          </ToastProvider>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
