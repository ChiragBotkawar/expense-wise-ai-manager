
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home, PieChart, Settings, CreditCard, BarChart3, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

// Navigation items
const navItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: CreditCard, label: "Expenses", path: "/expenses" },
  { icon: Target, label: "Budget", path: "/budget" },
  { icon: BarChart3, label: "Reports", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function AppSidebar() {
  const [expanded, setExpanded] = useState(true);
  const isMobile = useIsMobile();
  
  // Always collapse on mobile
  const isExpanded = !isMobile && expanded;
  
  return (
    <aside 
      className={cn(
        "h-screen fixed left-0 top-0 z-30 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isExpanded ? "w-64" : "w-16"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border h-16">
        {isExpanded ? (
          <h1 className="font-bold text-sidebar-primary text-lg">ExpenseIQ</h1>
        ) : (
          <PieChart className="h-6 w-6 text-sidebar-primary mx-auto" />
        )}
        
        {!isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setExpanded(!expanded)} 
            className="text-sidebar-foreground"
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </Button>
        )}
      </div>
      
      <nav className="flex-1 py-4">
        <TooltipProvider>
          <ul className="space-y-2 px-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-all hover:bg-sidebar-accent group",
                        !isExpanded && "justify-center"
                      )}
                    >
                      <item.icon 
                        size={20} 
                        className="text-sidebar-foreground group-hover:text-sidebar-primary transition-colors"
                      />
                      {isExpanded && (
                        <span className="text-sidebar-foreground">{item.label}</span>
                      )}
                    </Link>
                  </TooltipTrigger>
                  {!isExpanded && (
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  )}
                </Tooltip>
              </li>
            ))}
          </ul>
        </TooltipProvider>
      </nav>
      
      <div className="p-4 mt-auto border-t border-sidebar-border">
        {isExpanded && (
          <div className="text-xs text-sidebar-foreground/60">
            © 2025 ExpenseIQ
          </div>
        )}
      </div>
    </aside>
  );
}
