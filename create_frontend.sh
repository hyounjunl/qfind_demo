#!/bin/bash
# Create frontend directory structure

# Create main directories
mkdir -p frontend/public/{images,icons}
mkdir -p frontend/src/app/{industry,macro,news}
mkdir -p frontend/src/components/{layout,search,trending,stock,macro}
mkdir -p frontend/src/hooks
mkdir -p frontend/src/types
mkdir -p frontend/src/services
mkdir -p frontend/src/utils
mkdir -p frontend/src/styles

# Create component subdirectories
mkdir -p frontend/src/components/layout
mkdir -p frontend/src/components/search
mkdir -p frontend/src/components/trending
mkdir -p frontend/src/components/stock
mkdir -p frontend/src/components/macro

# Create files in app directory
touch frontend/src/app/page.tsx
touch frontend/src/app/layout.tsx

# Create layout component files
touch frontend/src/components/layout/Sidebar.tsx
touch frontend/src/components/layout/Header.tsx
touch frontend/src/components/layout/Layout.tsx

# Create search component files
touch frontend/src/components/search/SearchBar.tsx
touch frontend/src/components/search/AskAgent.tsx

# Create trending component files
touch frontend/src/components/trending/TrendingKeyword.tsx
touch frontend/src/components/trending/TrendingTicker.tsx
touch frontend/src/components/trending/TrendingNews.tsx

# Create stock component files
touch frontend/src/components/stock/StockHeader.tsx
touch frontend/src/components/stock/BusinessOverview.tsx
touch frontend/src/components/stock/MarketPosition.tsx
touch frontend/src/components/stock/OperatingResults.tsx
touch frontend/src/components/stock/RiskAssessment.tsx
touch frontend/src/components/stock/CompetitorsAnalysis.tsx
touch frontend/src/components/stock/SharePerformance.tsx

# Create macro component files
touch frontend/src/components/macro/MacroAnalysis.tsx
touch frontend/src/components/macro/PositiveFactors.tsx
touch frontend/src/components/macro/RiskFactors.tsx
touch frontend/src/components/macro/EconomicIndicators.tsx

# Create service files
touch frontend/src/services/api.ts
touch frontend/src/services/stock.ts
touch frontend/src/services/macro.ts

# Create config files
touch frontend/next.config.js
touch frontend/package.json
touch frontend/tsconfig.json