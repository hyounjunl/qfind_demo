# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import stock, trending, macro, news
from app.core.config import settings
from app.db.database import engine
from app.db import models

# Create tables in the database
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(stock.router, prefix="/api/stock", tags=["stock"])
app.include_router(trending.router, prefix="/api/trending", tags=["trending"])
app.include_router(macro.router, prefix="/api/macro", tags=["macro"])
app.include_router(news.router, prefix="/api/news", tags=["news"])

@app.get("/")
async def root():
    return {"message": "Welcome to Qfind API"}