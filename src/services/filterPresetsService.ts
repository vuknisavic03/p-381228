
export interface FilterPreset {
  id: string;
  name: string;
  description?: string;
  filters: {
    search?: string;
    categories?: string[];
    paymentMethods?: string[];
    transactionType?: 'revenue' | 'expense';
    dateRange?: {
      from?: Date;
      to?: Date;
    };
    amountRange?: {
      min?: number;
      max?: number;
    };
    properties?: string[];
  };
  createdAt: Date;
  lastUsed?: Date;
}

export class FilterPresetsService {
  private static STORAGE_KEY = 'transaction_filter_presets';

  static getPresets(): FilterPreset[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      
      const presets = JSON.parse(stored);
      return presets.map((preset: any) => ({
        ...preset,
        createdAt: new Date(preset.createdAt),
        lastUsed: preset.lastUsed ? new Date(preset.lastUsed) : undefined,
        filters: {
          ...preset.filters,
          dateRange: preset.filters.dateRange ? {
            from: preset.filters.dateRange.from ? new Date(preset.filters.dateRange.from) : undefined,
            to: preset.filters.dateRange.to ? new Date(preset.filters.dateRange.to) : undefined,
          } : undefined
        }
      }));
    } catch (error) {
      console.error('Error loading filter presets:', error);
      return [];
    }
  }

  static savePreset(preset: Omit<FilterPreset, 'id' | 'createdAt'>): FilterPreset {
    const newPreset: FilterPreset = {
      ...preset,
      id: `preset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date()
    };

    const presets = this.getPresets();
    presets.push(newPreset);
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(presets));
    } catch (error) {
      console.error('Error saving filter preset:', error);
    }

    return newPreset;
  }

  static updatePreset(id: string, updates: Partial<FilterPreset>): FilterPreset | null {
    const presets = this.getPresets();
    const index = presets.findIndex(p => p.id === id);
    
    if (index === -1) return null;

    presets[index] = { ...presets[index], ...updates };
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(presets));
    } catch (error) {
      console.error('Error updating filter preset:', error);
    }

    return presets[index];
  }

  static deletePreset(id: string): boolean {
    const presets = this.getPresets();
    const filtered = presets.filter(p => p.id !== id);
    
    if (filtered.length === presets.length) return false;

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error deleting filter preset:', error);
      return false;
    }
  }

  static markAsUsed(id: string): void {
    this.updatePreset(id, { lastUsed: new Date() });
  }
}
