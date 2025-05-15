
import * as React from "react";
import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
  duration?: number;
};

type Toast = ToastProps & {
  id: string;
};

const TOAST_LIMIT = 5;

const toasts = React.createRef<Toast[]>();
if (!toasts.current) {
  toasts.current = [];
}

export const toast = ({ title, description, action, variant, duration = 5000 }: ToastProps) => {
  // Use sonner toast for visual display
  sonnerToast(title, {
    description,
    action,
    duration,
  });
  
  // Create a unique ID for this toast
  const id = Math.random().toString(36).substring(2, 9);
  
  // Add to our internal toast tracking
  if (toasts.current) {
    // Remove oldest toasts if we exceed the limit
    if (toasts.current.length >= TOAST_LIMIT) {
      toasts.current.shift();
    }
    
    // Add the new toast
    toasts.current.push({ 
      id, 
      title, 
      description, 
      action, 
      variant, 
      duration 
    });
  }
  
  return id;
};

export function useToast() {
  const [localToasts, setLocalToasts] = React.useState<Toast[]>(toasts.current || []);
  
  React.useEffect(() => {
    // Update local state when toasts ref changes
    setLocalToasts([...(toasts.current || [])]);
    
    // We could add some cleanup logic here if needed
    return () => {};
  }, [toasts.current?.length]);
  
  return {
    toast,
    toasts: localToasts,
  };
}
