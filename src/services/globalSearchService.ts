
import { Transaction } from "@/types/transaction";
import { Listing } from "@/types/listing";
import { Tenant } from "@/types/tenant";

export interface GlobalSearchResult {
  type: 'property' | 'transaction' | 'tenant';
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  amount?: number;
  date?: Date;
  category?: string;
  data: any;
}

export interface SearchOptions {
  includeProperties?: boolean;
  includeTransactions?: boolean;
  includeTenants?: boolean;
  fuzzy?: boolean;
  maxResults?: number;
}

// Simple fuzzy search implementation
function fuzzyMatch(pattern: string, text: string): { matches: boolean; score: number } {
  const patternLower = pattern.toLowerCase();
  const textLower = text.toLowerCase();
  
  // Exact match gets highest score
  if (textLower.includes(patternLower)) {
    return { matches: true, score: 1 };
  }
  
  // Fuzzy matching for typos
  let patternIndex = 0;
  let matches = 0;
  
  for (let i = 0; i < textLower.length && patternIndex < patternLower.length; i++) {
    if (textLower[i] === patternLower[patternIndex]) {
      matches++;
      patternIndex++;
    }
  }
  
  const score = matches / patternLower.length;
  return { matches: score > 0.6, score };
}

function searchInText(query: string, text: string, fuzzy: boolean = false): boolean {
  if (!query || !text) return false;
  
  if (fuzzy) {
    return fuzzyMatch(query, text).matches;
  }
  
  return text.toLowerCase().includes(query.toLowerCase());
}

export class GlobalSearchService {
  static search(
    query: string,
    properties: Listing[],
    transactions: Transaction[],
    tenants: Tenant[] = [],
    options: SearchOptions = {}
  ): GlobalSearchResult[] {
    const {
      includeProperties = true,
      includeTransactions = true,
      includeTenants = true,
      fuzzy = false,
      maxResults = 50
    } = options;

    const results: GlobalSearchResult[] = [];

    if (!query.trim()) return results;

    // Search properties
    if (includeProperties) {
      properties.forEach(property => {
        const searchableText = `${property.name} ${property.address} ${property.type}`;
        if (searchInText(query, searchableText, fuzzy)) {
          results.push({
            type: 'property',
            id: property.id,
            title: property.name,
            subtitle: property.address,
            description: property.type,
            data: property
          });
        }
      });
    }

    // Search transactions
    if (includeTransactions) {
      transactions.forEach(transaction => {
        const searchableText = `${transaction.from} ${transaction.category} ${transaction.paymentMethod} ${transaction.notes || ''}`;
        if (searchInText(query, searchableText, fuzzy)) {
          results.push({
            type: 'transaction',
            id: transaction.id.toString(),
            title: transaction.from,
            subtitle: transaction.category,
            description: transaction.notes,
            amount: transaction.amount,
            date: transaction.date,
            category: transaction.category,
            data: transaction
          });
        }
      });
    }

    // Search tenants
    if (includeTenants) {
      tenants.forEach(tenant => {
        const searchableText = `${tenant.name} ${tenant.email || ''} ${tenant.phone || ''} ${tenant.type}`;
        if (searchInText(query, searchableText, fuzzy)) {
          results.push({
            type: 'tenant',
            id: tenant.id || tenant.name,
            title: tenant.name,
            subtitle: tenant.email || tenant.phone || '',
            description: tenant.type,
            data: tenant
          });
        }
      });
    }

    // Sort by relevance (exact matches first, then by type)
    results.sort((a, b) => {
      const aExact = a.title.toLowerCase().includes(query.toLowerCase());
      const bExact = b.title.toLowerCase().includes(query.toLowerCase());
      
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      
      // Type priority: properties > transactions > tenants
      const typePriority = { property: 0, transaction: 1, tenant: 2 };
      return typePriority[a.type] - typePriority[b.type];
    });

    return results.slice(0, maxResults);
  }

  static getSuggestions(
    query: string,
    properties: Listing[],
    transactions: Transaction[],
    tenants: Tenant[] = []
  ): string[] {
    const suggestions = new Set<string>();

    if (!query.trim()) return [];

    const queryLower = query.toLowerCase();

    // Collect suggestions from various sources
    const addSuggestion = (text: string) => {
      if (text && text.toLowerCase().includes(queryLower)) {
        suggestions.add(text);
      }
    };

    // Property suggestions
    properties.forEach(property => {
      addSuggestion(property.name);
      addSuggestion(property.address);
      addSuggestion(property.type);
    });

    // Transaction suggestions
    transactions.forEach(transaction => {
      addSuggestion(transaction.from);
      addSuggestion(transaction.category);
      addSuggestion(transaction.paymentMethod);
    });

    // Tenant suggestions
    tenants.forEach(tenant => {
      addSuggestion(tenant.name);
      addSuggestion(tenant.type);
    });

    return Array.from(suggestions).slice(0, 10);
  }
}
