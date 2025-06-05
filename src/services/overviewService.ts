
import { fetchListings } from "./listingsService";
import { PropertyType } from "@/components/transactions/TransactionFormTypes";

export interface OverviewMetrics {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  occupancyRate: number;
  totalUnits: number;
  occupiedUnits: number;
  vacantUnits: number;
  totalListings: number;
  averageRent: number;
}

export interface ListingOverview {
  id: string;
  name: string;
  type: PropertyType;
  category: string;
  occupancyStatus: string;
  revenue: number;
  expenses: number;
  profit: number;
  unitsCount: number;
  occupiedUnits: number;
  tenantName?: string;
}

export interface UnitOverview {
  id: string;
  unitNumber: string;
  listingName: string;
  listingId: string;
  category: string;
  occupancyStatus: string;
  revenue: number;
  expenses: number;
  profit: number;
  tenantName?: string;
  tenantType?: string;
}

// Mock transaction data for calculations
const mockTransactions = [
  { id: 1, type: 'revenue', amount: 1200, selectedListingId: '1', selectedUnitId: '1-1' },
  { id: 2, type: 'revenue', amount: 1500, selectedListingId: '1', selectedUnitId: '' },
  { id: 3, type: 'expense', amount: 350, selectedListingId: '1', selectedUnitId: '1-1' },
  { id: 4, type: 'revenue', amount: 950, selectedListingId: '2', selectedUnitId: '' },
  { id: 5, type: 'expense', amount: 120, selectedListingId: '2', selectedUnitId: '' },
  { id: 6, type: 'revenue', amount: 2200, selectedListingId: '3', selectedUnitId: '' },
  { id: 7, type: 'expense', amount: 800, selectedListingId: '3', selectedUnitId: '' },
  { id: 8, type: 'revenue', amount: 1800, selectedListingId: '5', selectedUnitId: '5-1' },
  { id: 9, type: 'revenue', amount: 1600, selectedListingId: '5', selectedUnitId: '5-3' },
  { id: 10, type: 'expense', amount: 250, selectedListingId: '5', selectedUnitId: '' },
];

export const fetchOverviewMetrics = async (): Promise<OverviewMetrics> => {
  const listings = await fetchListings();
  
  let totalUnits = 0;
  let occupiedUnits = 0;
  let totalRevenue = 0;
  let totalExpenses = 0;
  
  // Calculate revenue and expenses from transactions
  mockTransactions.forEach(transaction => {
    if (transaction.type === 'revenue') {
      totalRevenue += transaction.amount;
    } else {
      totalExpenses += transaction.amount;
    }
  });
  
  // Calculate unit statistics
  listings.forEach(listing => {
    if (listing.units && listing.units.length > 0) {
      totalUnits += listing.units.length;
      occupiedUnits += listing.units.filter(unit => unit.occupancyStatus === 'occupied').length;
    } else {
      // Single unit listing
      totalUnits += 1;
      if (listing.occupancyStatus === 'occupied') {
        occupiedUnits += 1;
      }
    }
  });
  
  const vacantUnits = totalUnits - occupiedUnits;
  const occupancyRate = totalUnits > 0 ? (occupiedUnits / totalUnits) * 100 : 0;
  const netProfit = totalRevenue - totalExpenses;
  const averageRent = occupiedUnits > 0 ? totalRevenue / occupiedUnits : 0;
  
  return {
    totalRevenue,
    totalExpenses,
    netProfit,
    occupancyRate,
    totalUnits,
    occupiedUnits,
    vacantUnits,
    totalListings: listings.length,
    averageRent
  };
};

export const fetchListingOverviews = async (): Promise<ListingOverview[]> => {
  const listings = await fetchListings();
  
  return listings.map(listing => {
    // Calculate revenue and expenses for this listing
    const listingTransactions = mockTransactions.filter(t => t.selectedListingId === listing.id);
    const revenue = listingTransactions.filter(t => t.type === 'revenue').reduce((sum, t) => sum + t.amount, 0);
    const expenses = listingTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    
    const unitsCount = listing.units ? listing.units.length : 1;
    const occupiedUnits = listing.units 
      ? listing.units.filter(unit => unit.occupancyStatus === 'occupied').length 
      : (listing.occupancyStatus === 'occupied' ? 1 : 0);
    
    return {
      id: listing.id,
      name: listing.name,
      type: listing.type as PropertyType,
      category: listing.category,
      occupancyStatus: listing.occupancyStatus,
      revenue,
      expenses,
      profit: revenue - expenses,
      unitsCount,
      occupiedUnits,
      tenantName: listing.tenant?.name
    };
  });
};

export const fetchUnitOverviews = async (): Promise<UnitOverview[]> => {
  const listings = await fetchListings();
  const units: UnitOverview[] = [];
  
  listings.forEach(listing => {
    if (listing.units && listing.units.length > 0) {
      // Multi-unit listing
      listing.units.forEach(unit => {
        const unitTransactions = mockTransactions.filter(t => 
          t.selectedListingId === listing.id && t.selectedUnitId === unit.id
        );
        const revenue = unitTransactions.filter(t => t.type === 'revenue').reduce((sum, t) => sum + t.amount, 0);
        const expenses = unitTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        
        units.push({
          id: unit.id,
          unitNumber: unit.unitNumber,
          listingName: listing.name,
          listingId: listing.id,
          category: unit.category,
          occupancyStatus: unit.occupancyStatus,
          revenue,
          expenses,
          profit: revenue - expenses,
          tenantName: unit.tenant?.name,
          tenantType: unit.tenant?.type
        });
      });
    } else {
      // Single unit listing
      const listingTransactions = mockTransactions.filter(t => t.selectedListingId === listing.id);
      const revenue = listingTransactions.filter(t => t.type === 'revenue').reduce((sum, t) => sum + t.amount, 0);
      const expenses = listingTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
      
      units.push({
        id: `${listing.id}-main`,
        unitNumber: 'Main Unit',
        listingName: listing.name,
        listingId: listing.id,
        category: listing.category,
        occupancyStatus: listing.occupancyStatus,
        revenue,
        expenses,
        profit: revenue - expenses,
        tenantName: listing.tenant?.name,
        tenantType: listing.tenant?.type
      });
    }
  });
  
  return units;
};
