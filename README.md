
# Workspace Analytics Dashboard v1.0

A comprehensive React-based analytics dashboard for workspace management with modern design, interactive charts, and responsive UI.

## Overview

This application provides a powerful dashboard for monitoring workspace analytics, including revenue, profit, income, and other important metrics. Built with modern web technologies, it offers an intuitive user experience with interactive data visualization.

## Key Features

- **Interactive Analytics Dashboard**: Visualize key performance indicators with responsive charts
- **Date Range Selection**: Filter data by custom date ranges, including day, week, month views
- **Responsive Design**: Optimized for all device sizes from mobile to desktop
- **Modern UI**: Clean, professional interface with consistent design language
- **Real-time Updates**: Dynamic data representation with smooth transitions and animations

## Tech Stack

### Frontend
- **React**: UI component library
- **TypeScript**: Type-safe JavaScript
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Responsive charting library
- **Shadcn UI**: Component library with consistent design
- **React Query**: Data fetching and state management
- **Lucide React**: Scalable icon library
- **Date-fns**: Date manipulation utilities

## Project Structure

```
src/
├── components/
│   ├── dashboard/
│   │   ├── analytics/          # Analytics visualization components
│   │   │   ├── AnalyticsGrid.tsx
│   │   │   ├── ChartCard.tsx
│   │   │   └── Timeline.tsx
│   │   ├── DashboardLayout.tsx # Main dashboard layout
│   │   ├── Header.tsx
│   │   ├── Overview.tsx
│   │   └── Sidebar.tsx
│   ├── ui/                     # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   └── workspace/             
│       ├── WorkspaceList.tsx
│       ├── WorkspaceNav.tsx
│       └── WorkspaceOverview.tsx
├── hooks/                      # Custom React hooks
│   └── use-toast.tsx
├── lib/
│   └── utils.ts                # Utility functions
├── pages/                      # Page components
│   ├── Index.tsx               # Home page
│   ├── Listings.tsx
│   ├── Profile.tsx
│   ├── Transactions.tsx
│   └── workspace/
│       └── WorkspacePicker.tsx
└── services/                   # API and data services
    └── analyticsService.ts     # Analytics data handling
```

## Backend Integration Guide

The frontend is designed to be easily integrated with any backend API. Follow these steps to connect your backend:

### 1. API Service Configuration

Replace the mock data in `analyticsService.ts` with actual API calls:

```typescript
// Example API integration
const fetchAnalyticsData = async (dateRange: DateRange | undefined) => {
  try {
    // Replace with your API endpoint
    const response = await fetch(`/api/analytics?from=${dateRange?.from?.toISOString()}&to=${dateRange?.to?.toISOString()}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch analytics data:", error);
    throw error;
  }
};
```

### 2. Data Format

Your API should return data in the following format to be compatible with the dashboard:

```typescript
{
  revenue: Array<{ month: string, value: number }>,
  profit: Array<{ month: string, value: number }>,
  income: Array<{ name: string, value: number }>,
  peakProfit: Array<{ month: string, value: number }>,
  timeline: Array<{ month: string, revenue: number, profit: number }>,
  periodLabel: string,
  totals: {
    revenue: number,
    profit: number,
    income: number,
    peakProfit: number
  },
  changes: {
    revenue: { value: number, positive: boolean },
    profit: { value: number, positive: boolean },
    income: { value: number, positive: boolean },
    peakProfit: { value: number, positive: boolean }
  }
}
```

### 3. Authentication Integration

To add authentication:

1. Create an authentication service:

```typescript
// src/services/authService.ts
export const login = async (email: string, password: string) => {
  // Connect to your authentication API
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  if (!response.ok) {
    throw new Error('Authentication failed');
  }
  
  const data = await response.json();
  // Store auth token
  localStorage.setItem('authToken', data.token);
  
  return data.user;
};
```

2. Create a context for authentication state.

### 4. Database Integration

The application can integrate with any database through your backend API. Common patterns include:

- **REST API**: Standard HTTP methods for CRUD operations
- **GraphQL**: Single endpoint for more complex data requirements
- **WebSockets**: Real-time data updates for live analytics

## Deployment

This application can be deployed to any static hosting service:

1. Build the production version:
```
npm run build
```

2. Deploy the contents of the `dist` directory to your hosting service.

## Customization

### Adding New Charts

1. Create a new chart component in `src/components/dashboard/analytics/`
2. Add the necessary data structure to `analyticsService.ts`
3. Include the component in `AnalyticsGrid.tsx`

### Changing Theme

The application uses Tailwind CSS for styling. To modify the theme:

1. Update the `tailwind.config.ts` file
2. Adjust color variables in the theme configuration

## Performance Considerations

- Charts use lazy loading to optimize initial load time
- React Query implements caching for API requests
- Data transformations are optimized for efficient rendering

## Browser Compatibility

The application is compatible with all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

[MIT](LICENSE)
