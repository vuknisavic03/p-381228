import * as React from "react";
import { toast as sonnerToast } from "sonner";

export type ToastProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
  duration?: number;
};

export type Toast = ToastProps & {
  id: string;
};

const TOAST_LIMIT = 5;

// Use useState with a function initializer instead of a ref
const useToastsState = () => {
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  
  const addToast = React.useCallback((toast: ToastProps) => {
    // Generate a unique ID
    const id = Math.random().toString(36).substring(2, 9);
    
    setToasts(prevToasts => {
      const newToasts = [...prevToasts];
      
      // Remove oldest toasts if we exceed the limit
      if (newToasts.length >= TOAST_LIMIT) {
        newToasts.shift();
      }
      
      // Add the new toast
      newToasts.push({ ...toast, id });
      
      return newToasts;
    });
    
    return id;
  }, []);
  
  return { toasts, addToast };
};

// Create a React context to share toast state across the app
const ToastContext = React.createContext<ReturnType<typeof useToastsState> | undefined>(undefined);

// Toast provider component
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toastsState = useToastsState();
  
  return (
    <ToastContext.Provider value={toastsState}>
      {children}
    </ToastContext.Provider>
  );
};

// Singleton pattern for toast state outside of React component tree
let globalToastsState: { 
  toasts: Toast[], 
  addToast: (toast: ToastProps) => string 
} | undefined;

// Export the toast function for use anywhere in the app
export const toast = ({ title, description, action, variant, duration = 5000 }: ToastProps) => {
  // Use sonner toast for visual display
  sonnerToast(title || "", {
    description,
    action,
    duration,
    // Map our variant to sonner's variant
    className: variant === 'destructive' ? 'bg-destructive text-destructive-foreground' : undefined,
  });
  
  // Generate a unique ID
  const id = Math.random().toString(36).substring(2, 9);
  
  // If we're in a React component with the context, use that
  if (globalToastsState) {
    return globalToastsState.addToast({ 
      title, 
      description, 
      action, 
      variant, 
      duration 
    });
  }
  
  // Return the ID even if we couldn't add to the global state
  return id;
};

// Hook to use toast within React components
export function useToast() {
  const context = React.useContext(ToastContext);
  
  React.useEffect(() => {
    // If the context exists, make it available globally
    if (context) {
      globalToastsState = context;
    }
    
    return () => {
      // Clean up when component unmounts
      if (globalToastsState === context) {
        globalToastsState = undefined;
      }
    };
  }, [context]);
  
  // If used outside a ToastProvider, return a limited version
  return {
    toast,
    toasts: context?.toasts || []
  };
}
