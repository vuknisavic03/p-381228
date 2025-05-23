
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Index";
import UserSpace from "@/pages/UserSpace";
import WorkspacePicker from "@/pages/workspace/WorkspacePicker";
import Listings from "@/pages/Listings";
import Transactions from "@/pages/Transactions";
import Profile from "@/pages/Profile";
import Vision from "@/pages/Vision";
import NotFound from "@/pages/NotFound";
import MapSearch from "@/pages/MapSearch";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workspace" element={<UserSpace />} />
        <Route path="/workspace/picker" element={<WorkspacePicker />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/map-search" element={<MapSearch />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
      <SonnerToaster position="top-right" />
    </Router>
  );
}

export default App;
