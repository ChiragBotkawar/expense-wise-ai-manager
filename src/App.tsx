
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

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useIsMobile();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check if user is authenticated, e.g., by looking for a token
    // For demo purposes, we'll just simulate this
    const checkAuth = () => {
      // In a real app, you would check for a token in localStorage or similar
      setIsAuthenticated(localStorage.getItem("auth") === "true");
    };
    
    checkAuth();
    
    // Just for demo purposes - set authentication after first visit
    if (localStorage.getItem("auth") === null) {
      localStorage.setItem("auth", "false");
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
        <div className="animate-pulse">Loading...</div>
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
              <div className="min-h-screen flex flex-col bg-background animate-fade-in">
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
