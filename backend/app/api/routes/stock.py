# backend/app/api/routes/stock.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.database import get_db
from app.db import models
from app.schemas import stock as stock_schemas

router = APIRouter()

@router.get("/", response_model=List[stock_schemas.Stock])
def get_stocks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    # Mock data for initial implementation
    stocks = [
        {
            "id": 1,
            "symbol": "TSLA",
            "name": "Tesla, Inc.",
            "current_price": 361.41,
            "market_cap": 47968.36
        }
    ]
    return stocks

@router.get("/{symbol}", response_model=stock_schemas.StockDetail)
def get_stock_by_symbol(symbol: str, db: Session = Depends(get_db)):
    # Mock data for initial implementation
    if symbol.upper() == "TSLA":
        return {
            "id": 1,
            "symbol": "TSLA",
            "name": "Tesla, Inc.",
            "current_price": 361.41,
            "market_cap": 47968.36,
            "business_overview": "Tesla, Inc. designs, develops, manufactures, and sells electric vehicles, energy generation and storage systems.",
            "market_position": "Tesla is a leading manufacturer of electric vehicles with a significant market share in the premium EV segment.",
            "operating_results": "Tesla has shown consistent growth in vehicle deliveries and revenue over the past several quarters.",
            "risk_assessment": "Key risks include competition in the EV market, supply chain disruptions, and regulatory challenges."
        }
    raise HTTPException(status_code=404, detail=f"Stock with symbol {symbol} not found")