#!/bin/bash
# Create backend directory structure

# Create main directories
mkdir -p backend/app/{api/routes,core,db,schemas,services}

# Create main FastAPI app file
touch backend/app/main.py

# Create API routes files
touch backend/app/api/__init__.py
touch backend/app/api/dependencies.py
touch backend/app/api/routes/__init__.py
touch backend/app/api/routes/stock.py
touch backend/app/api/routes/trending.py
touch backend/app/api/routes/macro.py
touch backend/app/api/routes/news.py

# Create core files
touch backend/app/core/__init__.py
touch backend/app/core/config.py
touch backend/app/core/security.py

# Create database files
touch backend/app/db/__init__.py
touch backend/app/db/models.py
touch backend/app/db/database.py

# Create schema files
touch backend/app/schemas/__init__.py
touch backend/app/schemas/stock.py
touch backend/app/schemas/trending.py
touch backend/app/schemas/macro.py

# Create service files
touch backend/app/services/__init__.py
touch backend/app/services/stock_service.py
touch backend/app/services/macro_service.py

# Create config files
touch backend/requirements.txt
touch backend/.env
touch backend/Dockerfile

# Create project-level files
touch docker-compose.yml
touch README.md