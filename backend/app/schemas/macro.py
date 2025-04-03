from typing import List, Optional
from pydantic import BaseModel
from datetime import date


class EconomicIndicator(BaseModel):
    value: float
    change: float
    previous: float
    forecast: float
    description: str


class EconomicIndicators(BaseModel):
    month: str
    indicators: dict[str, EconomicIndicator]


class MacroAnalysis(BaseModel):
    date: date
    positiveFactors: List[str]
    riskFactors: List[str]
    mixedSignals: List[str]


class MacroNewsItem(BaseModel):
    id: int
    title: str
    date: str  # e.g., "3hours ago"
    tag: str
    url: str
    body: str
    kor_title: Optional[str] = None  # Korean title
    kor_body: Optional[str] = None   # Korean body


class MacroNews(BaseModel):
    date: date
    news: List[MacroNewsItem]


class MacroDates(BaseModel):
    dates: List[str]
    months: List[str]