
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Listings from "./pages/Listings";
import Transactions from "./pages/Transactions";
import NotFound from "./pages/NotFound";
import UserSpace from "./pages/UserSpace";
import WorkspacePicker from "./pages/workspace/WorkspacePicker";
import Profile from "./pages/Profile";
import WorkspaceManager from "./pages/WorkspaceManager";
import { Toaster } from "./components/ui/toaster";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/user-space" element={<UserSpace />} />
          <Route path="/workspace" element={<WorkspacePicker />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/workspace-manager" element={<WorkspaceManager />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
