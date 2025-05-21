
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotificationBadgeProps {
  count: number;
}

export function NotificationBadge({ count }: NotificationBadgeProps) {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="rounded-full relative"
      aria-label={`${count} notifications`}
    >
      <Bell className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground font-medium">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Button>
  );
}
