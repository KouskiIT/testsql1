# Système de Gestion d'Inventaire - Architecture Documentation

## Overview

This is a full-stack inventory management system (Système de Gestion d'Inventaire) built with modern web technologies. The application provides comprehensive inventory tracking with advanced features including barcode scanning, mobile optimization, Excel import/export, PDF generation, and real-time search capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **UI Framework**: Radix UI with Tailwind CSS for styling
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for client-side routing
- **Component Library**: Shadcn/ui components with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Database Provider**: Neon serverless PostgreSQL
- **File Upload**: Multer for handling Excel imports
- **API Design**: RESTful APIs with comprehensive error handling

### Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon serverless
- **Schema Management**: Drizzle ORM with TypeScript-first approach
- **Local Storage**: Browser localStorage for offline capabilities and auto-save
- **File Storage**: Memory-based for temporary file processing

## Key Components

### Database Schema
The system uses a single primary table `inventory_items` with the following structure:
- Unique identifiers: `code_barre` (barcode), `num_inventaire` (inventory number)
- Organizational fields: `departement`, `num_bureau`, `beneficiaire`
- Item details: `designation`, `quantite`, `condition`, `prix`, `categorie`
- Metadata: `date_ajouter`, `date_modification`, `custom_fields` (JSONB)

### Core Features
1. **Inventory Management**: Full CRUD operations with bulk actions
2. **Barcode Scanning**: Real-time camera scanning with manual input fallback
3. **Search & Filtering**: Advanced search with multiple filter criteria
4. **Import/Export**: Excel file processing with validation
5. **PDF Generation**: Custom PDF reports using jsPDF
6. **Mobile Optimization**: Responsive design with touch-friendly interface
7. **Offline Support**: Local storage with sync capabilities

### Security & Performance
- **Rate Limiting**: Express-rate-limit for API protection
- **Input Validation**: Zod schemas for type-safe validation
- **Error Handling**: Comprehensive error boundaries and logging
- **Performance**: Virtual scrolling for large datasets
- **Caching**: React Query for intelligent data caching

## Data Flow

### Read Operations
1. Client requests data via TanStack Query
2. Express server processes request with filters/pagination
3. Drizzle ORM queries PostgreSQL database
4. Data returned through type-safe interfaces
5. Client caches and displays data with optimistic updates

### Write Operations
1. Client submits data through validated forms
2. Server validates input using Zod schemas
3. Database operations executed with transaction support
4. Audit logging for change tracking
5. Cache invalidation and UI updates

### File Processing
1. Excel files uploaded via Multer
2. XLSX parsing with data validation
3. Batch processing with progress tracking
4. Database insertion with error handling
5. Results summary and error reporting

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/react-***: Accessible UI components
- **tailwindcss**: Utility-first CSS framework
- **zod**: Schema validation
- **jspdf**: PDF generation
- **xlsx**: Excel file processing

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **@testing-library/react**: Component testing
- **jest**: Testing framework

## Deployment Strategy

### Production Builds
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations applied via `drizzle-kit push`

### Platform Support
- **Railway**: Primary deployment platform (configured via railway.json)
- **Vercel**: Alternative deployment with custom routing (vercel.json)
- **Health Checks**: `/api/health` endpoint for monitoring

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment mode (development/production)
- **Build Commands**: `npm run build && npm start`

## Changelog

```
Changelog:
- July 04, 2025. Initial setup
- July 04, 2025. Fixed production deployment issues:
  * Resolved Vite dependency errors in production builds
  * Created separate production server (server/production.ts) 
  * Updated Docker and cloud deployment configurations
  * Production build now works correctly without development dependencies
  * Ready for deployment to Render.com, Railway, or Vercel
- July 05, 2025. Successful Railway deployment:
  * Fixed npm install errors by switching to Nixpacks builder
  * Resolved static file serving path issues with ES module compatibility
  * Successfully deployed to Railway at test2-production-1139.up.railway.app
  * PostgreSQL database connected and running
  * All production optimizations working correctly
- July 05, 2025. Railway deployment enhancements:
  * Fixed PORT variable validation with enhanced error handling
  * Resolved ES module compatibility issues in deployment scripts
  * Added comprehensive database connection testing
  * Enhanced health check endpoint with database status
  * Simplified deployment process with direct server startup
  * Ready for deployment with railway-deployment-clean.tar.gz
  * Database connection verified locally with 1,364 inventory items
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```