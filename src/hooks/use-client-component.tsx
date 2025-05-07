
import React, { useState, useEffect } from 'react';

export function useClientComponent<T>(importFunc: () => Promise<{ default: React.ComponentType<T> }>) {
  const [Component, setComponent] = useState<React.ComponentType<T> | null>(null);

  useEffect(() => {
    let mounted = true;
    
    const loadComponent = async () => {
      const module = await importFunc();
      if (mounted) {
        setComponent(() => module.default);
      }
    };
    
    loadComponent();
    
    return () => {
      mounted = false;
    };
  }, [importFunc]);

  return Component;
}
