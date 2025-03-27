# backend/app/schemas/trending.py
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel

class TrendingKeywordBase(BaseModel):
    keyword: str
    rank: int

class TrendingKeyword(TrendingKeywordBase):
    id: int
    timestamp: datetime
    
    class Config:
        from_attributes = True

class TrendingTickerBase(BaseModel):
    symbol: str
    name: str
    last_price: float
    change: float
    change_percent: float

class TrendingTicker(TrendingTickerBase):
    id: int
    
    class Config:
        from_attributes = True