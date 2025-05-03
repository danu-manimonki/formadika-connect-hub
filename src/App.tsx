
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Members from "./pages/Members";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Gallery from "./pages/Gallery";
import Register from "./pages/Register";
import Articles from "./pages/Articles";
import Forum from "./pages/Forum";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import NotFound from "./pages/NotFound";
import LogoProcessor from "./pages/LogoProcessor";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

// Wrap dengan BrowserRouter terlebih dahulu di App
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Komponen untuk aplikasi setelah autentikasi diinisialisasi
const AppRoutes = () => {
  return (
    <>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/members" element={<Members />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/register" element={<Register />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/logo-processor" element={<LogoProcessor />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
