
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/hooks/use-theme";
import { AppHeader } from "./components/AppHeader";
import { AppSidebar } from "./components/AppSidebar";
import { useIsMobile } from "./hooks/use-mobile";

import Dashboard from "./pages/Index";
import Expenses from "./pages/Expenses";
import Budget from "./pages/Budget";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from "react";

// Initialize query client with better defaults for Indian network conditions
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const isMobile = useIsMobile();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [festivalMode, setFestivalMode] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated, e.g., by looking for a token
    const checkAuth = () => {
      // In a real app, you would check for a token in localStorage or similar
      setIsAuthenticated(localStorage.getItem("auth") === "true");
    };
    
    checkAuth();
    
    // Just for demo purposes - set authentication after first visit
    if (localStorage.getItem("auth") === null) {
      localStorage.setItem("auth", "false");
    }
    
    // Check for current Indian festivals
    const currentMonth = new Date().getMonth();
    // Diwali is typically in October/November (month 9 or 10)
    if (currentMonth === 9 || currentMonth === 10) {
      setFestivalMode(true);
    }
  }, []);
  
  // Function to handle login
  const handleLogin = () => {
    localStorage.setItem("auth", "true");
    setIsAuthenticated(true);
  };
  
  // Function to handle logout
  const handleLogout = () => {
    localStorage.setItem("auth", "false");
    setIsAuthenticated(false);
  };
  
  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="text-lg font-medium">Loading FinWise Bharat...</p>
        </div>
      </div>
    );
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {isAuthenticated ? (
              <div className={cn(
                "min-h-screen flex flex-col bg-background animate-fade-in",
                festivalMode && "rangoli-pattern"
              )}>
                <AppHeader onLogout={handleLogout} />
                {!isMobile && <AppSidebar />}
                <main className="flex-1 pt-16 md:ml-16 lg:ml-64 p-4 md:p-6">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/expenses" element={<Expenses />} />
                    <Route path="/budget" element={<Budget />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            ) : (
              <Routes>
                <Route path="*" element={<Login onLogin={handleLogin} />} />
              </Routes>
            )}
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
