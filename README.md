
# Workspace Management Application

This is a React-based workspace management application built with modern technologies and a clean, responsive design.

## Project Structure

The application follows a component-based architecture with the following main sections:

### Navigation
- **WorkspaceNav**: Main navigation sidebar component that includes:
  - User's Space button (with user initial badge)
  - Workspace sections (Overview, Listings, Transactions)
  - Active state highlighting for current route

### Pages
- **/**: Workspace picker page showing available workspaces
- **/dashboard**: Overview page with workspace statistics
- **/listings**: Listings management page
- **/transactions**: Transactions tracking page

### Layout Components
- **DashboardLayout**: Wraps all authenticated pages with the WorkspaceNav sidebar
- **WorkspaceList**: Displays available workspaces with owner information

## Features

1. **Workspace Selection**
   - List of available workspaces with owner details
   - Visual indication of workspace selection
   - Easy navigation between workspaces

2. **Navigation System**
   - Clear route-based navigation
   - Visual feedback for active routes
   - Consistent layout across all pages

## Technical Implementation

### Routing
The application uses React Router for navigation with the following structure:
```tsx
<Routes>
  <Route path="/" element={<WorkspacePicker />} />
  <Route path="/dashboard" element={<Index />} />
  <Route path="/listings" element={<Listings />} />
  <Route path="/transactions" element={<Transactions />} />
  <Route path="/profile" element={<Profile />} />
</Routes>
```

### Styling
- **Tailwind CSS** for utility-first styling
- Custom color scheme:
  - Primary text: #1A1A1A
  - Secondary text: #9EA3AD
  - Border color: #E4E5EA
  - Hover/Active state: #F6F6F7

### Components Structure
```
src/
├── components/
│   ├── dashboard/
│   │   └── DashboardLayout.tsx
│   └── workspace/
│       ├── WorkspaceNav.tsx
│       └── WorkspaceList.tsx
└── pages/
    ├── Index.tsx
    ├── Listings.tsx
    ├── Profile.tsx
    ├── Transactions.tsx
    └── workspace/
        └── WorkspacePicker.tsx
```

## Design System

The application follows a consistent design system:

### Typography
- Headers: text-2xl with semibold weight
- Navigation items: Regular text with medium/semibold weight
- Secondary text: text-sm with normal weight

### Spacing
- Consistent padding (p-4, p-8)
- Standardized gap spacing for flex layouts
- Uniform border widths and colors

### Interactive Elements
- Hover states with background color changes
- Active state indicators for current routes
- Clickable areas with proper padding for good UX

## Current Status

The application has the basic structure and navigation system implemented. The next steps will involve:
1. Implementing content for each section
2. Adding workspace management functionality
3. Implementing user authentication
4. Adding data visualization and statistics

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- React Router DOM
- Lucide React (for icons)
- Shadcn UI components

