
import React from 'react';
import { ModernFilter, FilterSection } from "@/components/ui/modern-filter";

interface TransactionFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  filterSections: FilterSection[];
  activeFilterCount: number;
  clearFilters: () => void;
}

export const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  search,
  setSearch,
  filterSections,
  activeFilterCount,
  clearFilters,
}) => {
  return (
    <ModernFilter
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search transactions..."
      filterSections={filterSections}
      activeFilterCount={activeFilterCount}
      onClearFilters={clearFilters}
    />
  );
};
