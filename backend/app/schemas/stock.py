# backend/app/schemas/stock.py
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel

class StockBase(BaseModel):
    symbol: str
    name: str
    
class StockCreate(StockBase):
    business_overview: Optional[str] = None
    market_position: Optional[str] = None
    operating_results: Optional[str] = None
    risk_assessment: Optional[str] = None

class Stock(StockBase):
    id: int
    current_price: float
    market_cap: float
    
    class Config:
        from_attributes = True

class StockDetail(Stock):
    business_overview: str
    market_position: str
    operating_results: str
    risk_assessment: str
    
    class Config:
        from_attributes = True

class StockPriceBase(BaseModel):
    price: float
    volume: int
    timestamp: datetime
    
class StockPrice(StockPriceBase):
    id: int
    stock_id: int
    
    class Config:
        from_attributes = True