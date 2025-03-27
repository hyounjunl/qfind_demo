# backend/app/api/routes/trending.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.database import get_db
from app.schemas import trending as trending_schemas

router = APIRouter()

@router.get("/keywords", response_model=List[trending_schemas.TrendingKeyword])
def get_trending_keywords(db: Session = Depends(get_db)):
    # Mock data for initial implementation
    keywords = [
        {"id": 1, "keyword": "Tesla", "rank": 1, "timestamp": "2025-03-26T12:00:00Z"},
        {"id": 2, "keyword": "Tesla", "rank": 2, "timestamp": "2025-03-26T12:00:00Z"},
        {"id": 3, "keyword": "Tesla", "rank": 3, "timestamp": "2025-03-26T12:00:00Z"},
        {"id": 4, "keyword": "Tesla", "rank": 4, "timestamp": "2025-03-26T12:00:00Z"},
        {"id": 5, "keyword": "Tesla", "rank": 5, "timestamp": "2025-03-26T12:00:00Z"},
        {"id": 6, "keyword": "Tesla", "rank": 6, "timestamp": "2025-03-26T12:00:00Z"},
        {"id": 7, "keyword": "Tesla", "rank": 7, "timestamp": "2025-03-26T12:00:00Z"},
        {"id": 8, "keyword": "Tesla", "rank": 8, "timestamp": "2025-03-26T12:00:00Z"},
        {"id": 9, "keyword": "Tesla", "rank": 9, "timestamp": "2025-03-26T12:00:00Z"},
        {"id": 10, "keyword": "Tesla", "rank": 10, "timestamp": "2025-03-26T12:00:00Z"},
        {"id": 11, "keyword": "Tesla", "rank": 11, "timestamp": "2025-03-26T12:00:00Z"},
        {"id": 12, "keyword": "Tesla", "rank": 12, "timestamp": "2025-03-26T12:00:00Z"},
        {"id": 13, "keyword": "Tesla", "rank": 13, "timestamp": "2025-03-26T12:00:00Z"},
        {"id": 14, "keyword": "Tesla", "rank": 14, "timestamp": "2025-03-26T12:00:00Z"},
        {"id": 15, "keyword": "Tesla", "rank": 15, "timestamp": "2025-03-26T12:00:00Z"},
        {"id": 16, "keyword": "Tesla", "rank": 16, "timestamp": "2025-03-26T12:00:00Z"},
    ]
    return keywords

@router.get("/tickers", response_model=List[trending_schemas.TrendingTicker])
def get_trending_tickers(db: Session = Depends(get_db)):
    # Mock data for initial implementation
    tickers = [
        {"id": 1, "symbol": "DJI", "name": "Dow Jones", "last_price": 42803.72, "change": 222.64, "change_percent": 0.52},
        {"id": 2, "symbol": "SPX", "name": "S&P 500", "last_price": 5770.20, "change": 31.68, "change_percent": 0.55},
        {"id": 3, "symbol": "COMP", "name": "Nasdaq", "last_price": 18195.22, "change": 126.97, "change_percent": 0.70},
        {"id": 4, "symbol": "RUT", "name": "Small Cap 2000", "last_price": 2074.10, "change": 7.55, "change_percent": 0.37},
        {"id": 5, "symbol": "VIX", "name": "S&P 500 VIX", "last_price": 23.37, "change": -1.50, "change_percent": -6.03},
        {"id": 6, "symbol": "FTSE", "name": "S&P/TSX", "last_price": 24756.76, "change": 174.72, "change_percent": 0.71},
        {"id": 7, "symbol": "BVP", "name": "Bovespa", "last_price": 125.035, "change": 1.677, "change_percent": 1.36},
        {"id": 8, "symbol": "MXX", "name": "S&P/BMV IPC", "last_price": 52839.63, "change": 23.20, "change_percent": 0.04},
        {"id": 9, "symbol": "GDOW", "name": "MSCI World", "last_price": 3739.62, "change": -0.75, "change_percent": -0.02},
        {"id": 10, "symbol": "DAX", "name": "DAX", "last_price": 23008.94, "change": -10.54, "change_percent": -1.20},
    ]
    return tickers