# backend/app/schemas/macro.py
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel

class MacroIndicatorBase(BaseModel):
    name: str
    value: float
    previous_value: float
    change: float
    change_percent: float

class MacroIndicator(MacroIndicatorBase):
    id: int
    timestamp: datetime
    
    class Config:
        from_attributes = True

class MacroAnalysisBase(BaseModel):
    positive_factors: str
    risk_factors: str
    mixed_signals: str
    date: str

class MacroAnalysis(MacroAnalysisBase):
    id: int
    
    class Config:
        from_attributes = True