from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Optional
from datetime import date
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.services.macro_service import MacroService
from app.schemas.macro import EconomicIndicators, MacroAnalysis, MacroNews, MacroDates

router = APIRouter(tags=["macro"])
macro_service = MacroService()


@router.get("/dates", response_model=MacroDates)
async def get_available_dates():
    """Get available dates for macro analysis"""
    return macro_service.get_available_dates()


@router.get("/indicators", response_model=EconomicIndicators)
async def get_economic_indicators(month: Optional[str] = None, db: Session = Depends(get_db)):
    """Get economic indicators for the specified month"""
    return macro_service.get_economic_indicators(month)


@router.get("/analysis", response_model=MacroAnalysis)
async def get_daily_analysis(date: Optional[str] = None):
    """Get daily macro analysis for the specified date"""
    return macro_service.get_daily_analysis(date)


@router.get("/news", response_model=MacroNews)
async def get_macro_news(date: Optional[str] = None, db: Session = Depends(get_db)):
    """Get macro-related news for the specified date"""
    return macro_service.get_macro_news(date)