# Property Management Dashboard

A comprehensive property management application built with React, TypeScript, and modern UI components. This application allows users to manage property listings, track transactions, and analyze performance across different property types.

## 🏗️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Routing**: React Router v6
- **Maps Integration**: Google Maps API via @react-google-maps/api
- **Charts**: Recharts for analytics visualization
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form with Zod validation
- **Date Handling**: date-fns and react-day-picker
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (shadcn/ui)
│   ├── dashboard/       # Dashboard-specific components
│   ├── listings/        # Property listing components
│   ├── transactions/    # Transaction management components
│   ├── workspace/       # Workspace management components
│   ├── landing/         # Landing page components
│   ├── overview/        # Overview/analytics components
│   └── shared/          # Shared utility components
├── pages/               # Page components (route handlers)
├── hooks/               # Custom React hooks
├── services/            # API services and data fetching
├── types/               # TypeScript type definitions
├── utils/               # Utility functions and helpers
└── lib/                 # Third-party library configurations
```

## 🎯 Core Features

### 1. Property Listings Management
- **Multi-view Display**: Switch between map and list views
- **Property Types**: Support for 6 property categories:
  - Residential Rental (Single-family, Multi-family, Apartment/Condo)
  - Commercial Rental (Office, Retail, Medical/Professional)
  - Hospitality (Hotel, Motel, Bed & Breakfast)
  - Vacation Rental (Short-term, Serviced Apartment, Holiday Home)
  - Mixed-Use (Residential-Commercial, Live-Work, Multi-Purpose)
  - Industrial (Warehouse, Distribution, Manufacturing)
- **Advanced Filtering**: Filter by property type, category, occupancy status, and country
- **Interactive Maps**: Google Maps integration with custom markers
- **Unit Management**: Multi-unit property support with individual tenant tracking

### 2. Transaction Management
- **Revenue & Expense Tracking**: Categorized transaction management
- **Property-Specific Transactions**: Link transactions to specific properties/units
- **Date Range Filtering**: Flexible date range selection
- **Category-Based Organization**: Property-type-specific revenue/expense categories
- **Bulk Operations**: Import/export capabilities

### 3. Workspace Management
- **Multi-Workspace Support**: Organize properties by different portfolios
- **Analytics Dashboard**: Revenue, commission, and performance metrics
- **Chart Visualizations**: Interactive charts for financial tracking

### 4. Advanced Filtering System
- **Horizontal Filter UI**: Modern, space-efficient filter interface
- **Real-time Search**: Instant search across addresses, tenant names, and IDs
- **Multi-select Filters**: Select multiple options within each filter category
- **Filter Persistence**: Maintain filter state across navigation
- **Clear All Functionality**: Quick reset of all applied filters

## 🏛️ Architecture Overview

### Component Hierarchy

```
App
├── Router
│   ├── Index (Landing Page)
│   ├── Listings
│   │   ├── ListingFilters (Horizontal filter bar)
│   │   ├── ListingMap (Google Maps view)
│   │   └── ListingList (Card-based list view)
│   ├── Transactions
│   │   ├── TransactionFiltersNew (Horizontal filter bar)
│   │   ├── TransactionsTable (Data table)
│   │   └── DateRangeHeader (Date selection)
│   ├── UserSpace (Workspace overview)
│   └── Profile
└── DashboardLayout (Shared layout wrapper)
```

### Data Flow

1. **Property Data**: Managed in `listingsService.ts` with mock data for development
2. **Transaction Data**: Handled through transaction-specific services
3. **Filter State**: Managed at page level and passed to child components
4. **UI State**: Local component state for modals, sheets, and interactions

### Filter System Architecture

The application uses a sophisticated filtering system:

- **HorizontalFilter Component**: Reusable filter interface
- **FilterSection Interface**: Standardized filter configuration
- **Parent-Level State Management**: Filters managed at page level
- **Dynamic Option Generation**: Filter options generated from actual data
- **Count Display**: Shows number of items matching each filter option

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn package manager
- Google Maps API key (for map functionality)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd property-management-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file (if needed for API keys):
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
```

## 🎮 Usage Guide

### Managing Properties

1. **Adding New Properties**
   - Click "Add New Listing" button in the top-right
   - Fill out the property form with address, type, and tenant information
   - For multi-unit properties, use the Units Manager to add individual units
   - Submit to save the property

2. **Viewing Properties**
   - **List View**: Detailed card-based view with tenant information
   - **Map View**: Geographic view with location markers
   - Use filters to narrow down properties by type, category, occupancy, or location

3. **Editing Properties**
   - Click on any property card to open the edit form
   - Modify property details, tenant information, or unit configurations
   - Save changes or delete the property

### Transaction Management

1. **Adding Transactions**
   - Navigate to Transactions page
   - Click "Add Transaction" button
   - Select property/unit (optional for general transactions)
   - Choose transaction type (Revenue/Expense)
   - Select appropriate category based on property type
   - Enter amount, date, and payment method

2. **Filtering Transactions**
   - Use the horizontal filter bar to search and filter
   - Filter by transaction type, property, category, or date range
   - Apply multiple filters simultaneously

3. **Date Range Selection**
   - Use the calendar picker to select custom date ranges
   - Quick preset options available (Last 30 days, This month, etc.)

### Workspace Management

1. **Creating Workspaces**
   - Access workspace picker from navigation
   - Create new workspaces to organize different property portfolios
   - Switch between workspaces to view different data sets

2. **Analytics & Reports**
   - View revenue trends and commission tracking
   - Analyze performance by property type or time period
   - Export data for external reporting

## 🎨 Design System

The application uses a comprehensive design system built on Tailwind CSS:

### Color System
- **Primary Colors**: HSL-based semantic tokens
- **Secondary Colors**: Complementary palette for UI elements
- **Status Colors**: Success, warning, error, and info states
- **Dark Mode Support**: Automatic theme switching

### Typography
- **Font Stack**: Inter with system fallbacks
- **Scale**: Responsive typography scale (text-xs to text-4xl)
- **Weight**: Multiple font weights (300-900)

### Component Variants
- **Buttons**: Default, outline, ghost, destructive variants
- **Cards**: Various elevation and border styles
- **Badges**: Status indicators with semantic colors
- **Forms**: Consistent input styling with validation states

## 🔧 Development Guidelines

### Code Organization

1. **Components**: Single responsibility, reusable components
2. **Types**: Centralized TypeScript definitions in `/types`
3. **Utils**: Pure functions for data transformation and formatting
4. **Services**: API calls and data management
5. **Hooks**: Custom React hooks for shared logic

### Naming Conventions

- **Components**: PascalCase (`PropertyCard`, `FilterButton`)
- **Files**: PascalCase for components, camelCase for utilities
- **Props**: Descriptive names with proper TypeScript types
- **CSS Classes**: Tailwind utility classes, semantic naming

### State Management

- **Local State**: React useState for component-specific state
- **Props Drilling**: For simple parent-child communication
- **Context**: For deeply nested state (not currently implemented)
- **URL State**: For filter persistence and shareable links

### Performance Optimizations

- **React.memo**: Used for expensive components
- **useMemo**: For computed values and filtered data
- **useCallback**: For event handlers passed to children
- **Code Splitting**: Route-based splitting with React.lazy
- **Image Optimization**: Proper sizing and loading strategies

## 🧪 Testing Strategy

### Component Testing
- Test component rendering with different props
- Verify user interactions and state changes
- Check accessibility features

### Integration Testing
- Test filter combinations and data flow
- Verify form submissions and API interactions
- Check routing and navigation

### E2E Testing
- Complete user workflows (add property, create transaction)
- Cross-browser compatibility
- Mobile responsiveness

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: 320px - 768px (sm)
- **Tablet**: 768px - 1024px (md)
- **Desktop**: 1024px - 1440px (lg)
- **Large Desktop**: 1440px+ (xl)

### Mobile Optimizations
- Touch-friendly interface elements
- Simplified navigation patterns
- Optimized filter UI for small screens
- Swipe gestures for carousels and lists

## 🔒 Security Considerations

### Input Validation
- Zod schemas for form validation
- XSS prevention through proper sanitization
- CSRF protection for form submissions

### API Security
- Proper error handling and user feedback
- Rate limiting considerations
- Secure API key management

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Configuration
- Configure API endpoints for production
- Set up proper error logging
- Enable performance monitoring

### Hosting Options
- **Vercel**: Optimized for React applications
- **Netlify**: Easy deployment with continuous integration
- **AWS S3 + CloudFront**: Scalable static hosting

## 🤝 Contributing

### Development Workflow
1. Create feature branch from main
2. Implement changes with proper testing
3. Follow code style guidelines
4. Submit pull request with detailed description

### Code Review Process
- Check for TypeScript errors
- Verify responsive design
- Test functionality across browsers
- Review accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions or issues:
1. Check the documentation above
2. Review existing GitHub issues
3. Create a new issue with detailed description
4. Join our Discord community for real-time support

---

*Built with ❤️ using Lovable*