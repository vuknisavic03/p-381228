
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Save, BookmarkPlus, Trash2, Clock, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterPresetsService, FilterPreset } from "@/services/filterPresetsService";
import { useToast } from "@/hooks/use-toast";

interface FilterPresetsProps {
  currentFilters: any;
  onPresetApply: (preset: FilterPreset) => void;
  className?: string;
}

export function FilterPresets({
  currentFilters,
  onPresetApply,
  className
}: FilterPresetsProps) {
  const [presets, setPresets] = useState<FilterPreset[]>(() => 
    FilterPresetsService.getPresets()
  );
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [presetName, setPresetName] = useState('');
  const [presetDescription, setPresetDescription] = useState('');
  const { toast } = useToast();

  const refreshPresets = () => {
    setPresets(FilterPresetsService.getPresets());
  };

  const handleSavePreset = () => {
    if (!presetName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for this filter preset",
        variant: "destructive"
      });
      return;
    }

    try {
      const newPreset = FilterPresetsService.savePreset({
        name: presetName.trim(),
        description: presetDescription.trim() || undefined,
        filters: currentFilters
      });

      refreshPresets();
      setIsCreateOpen(false);
      setPresetName('');
      setPresetDescription('');

      toast({
        title: "Preset saved",
        description: `"${newPreset.name}" has been saved to your filter presets`
      });
    } catch (error) {
      toast({
        title: "Save failed",
        description: "Could not save the filter preset. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleApplyPreset = (preset: FilterPreset) => {
    FilterPresetsService.markAsUsed(preset.id);
    refreshPresets();
    onPresetApply(preset);
    
    toast({
      title: "Preset applied",
      description: `Applied "${preset.name}" filter preset`
    });
  };

  const handleDeletePreset = (preset: FilterPreset) => {
    if (FilterPresetsService.deletePreset(preset.id)) {
      refreshPresets();
      toast({
        title: "Preset deleted",
        description: `"${preset.name}" has been removed`
      });
    }
  };

  const hasActiveFilters = () => {
    return Object.values(currentFilters).some(value => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'object' && value !== null) return Object.values(value).some(v => v !== undefined && v !== null);
      return value !== undefined && value !== null && value !== '';
    });
  };

  const getFilterSummary = (filters: any) => {
    const parts = [];
    
    if (filters.search) parts.push(`Search: "${filters.search}"`);
    if (filters.categories?.length) parts.push(`${filters.categories.length} categories`);
    if (filters.paymentMethods?.length) parts.push(`${filters.paymentMethods.length} payment methods`);
    if (filters.transactionType) parts.push(filters.transactionType);
    if (filters.dateRange?.from || filters.dateRange?.to) parts.push('Date range');
    if (filters.amountRange?.min !== undefined || filters.amountRange?.max !== undefined) parts.push('Amount range');
    
    return parts.length > 0 ? parts.join(', ') : 'No filters';
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Save Current Filters */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            disabled={!hasActiveFilters()}
            className="h-8 gap-1 text-xs"
          >
            <Save className="h-3 w-3" />
            Save Filters
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save Filter Preset</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Preset Name *
              </label>
              <Input
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                placeholder="e.g., Monthly Rent Payments"
                className="h-9"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Description (optional)
              </label>
              <Textarea
                value={presetDescription}
                onChange={(e) => setPresetDescription(e.target.value)}
                placeholder="Brief description of this filter preset..."
                className="h-20 text-sm"
              />
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-xs font-medium text-gray-600 mb-1">Current Filters:</div>
              <div className="text-xs text-gray-700">{getFilterSummary(currentFilters)}</div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSavePreset}>
                Save Preset
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Load Presets */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
            <BookmarkPlus className="h-3 w-3" />
            Presets
            {presets.length > 0 && (
              <Badge variant="secondary" className="ml-1 text-xs px-1.5 py-0">
                {presets.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel>Saved Filter Presets</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {presets.length === 0 ? (
            <div className="p-3 text-center text-sm text-gray-500">
              No saved presets yet
            </div>
          ) : (
            presets
              .sort((a, b) => (b.lastUsed?.getTime() || 0) - (a.lastUsed?.getTime() || 0))
              .map((preset) => (
                <DropdownMenuItem
                  key={preset.id}
                  className="flex-col items-start p-3 cursor-pointer"
                  onClick={() => handleApplyPreset(preset)}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-medium text-sm">{preset.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePreset(preset);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  {preset.description && (
                    <div className="text-xs text-gray-600 mb-2 w-full">
                      {preset.description}
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500 w-full">
                    {getFilterSummary(preset.filters)}
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-400 mt-2 w-full">
                    <span>Created {preset.createdAt.toLocaleDateString()}</span>
                    {preset.lastUsed && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Last used {preset.lastUsed.toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </DropdownMenuItem>
              ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
