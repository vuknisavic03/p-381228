
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

// Initialize the ref with useState to avoid directly modifying the read-only current property
const toastsRef = React.createRef<Toast[]>();
// Initialize the ref value if needed
if (toastsRef.current === null) {
  // Using Object.defineProperty to set initial value without directly assigning to .current
  Object.defineProperty(toastsRef, 'current', {
    value: [],
    writable: false
  });
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
  if (toastsRef.current) {
    // Create a new array instead of modifying the current one
    const newToasts = [...toastsRef.current];
    
    // Remove oldest toasts if we exceed the limit
    if (newToasts.length >= TOAST_LIMIT) {
      newToasts.shift();
    }
    
    // Add the new toast
    newToasts.push({ 
      id, 
      title, 
      description, 
      action, 
      variant, 
      duration 
    });
    
    // Replace the entire ref.current value with the new array
    Object.defineProperty(toastsRef, 'current', {
      value: newToasts,
      writable: false
    });
  }
  
  return id;
};

export function useToast() {
  const [localToasts, setLocalToasts] = React.useState<Toast[]>(toastsRef.current || []);
  
  React.useEffect(() => {
    // Update local state when toasts ref changes
    setLocalToasts([...(toastsRef.current || [])]);
    
    // We could add some cleanup logic here if needed
    return () => {};
  }, [toastsRef.current?.length]);
  
  return {
    toast,
    toasts: localToasts,
  };
}
