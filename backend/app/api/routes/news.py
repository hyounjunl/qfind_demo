# backend/app/api/routes/news.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.database import get_db
from app.schemas import news as news_schemas

router = APIRouter()

@router.get("/trending", response_model=List[news_schemas.News])
def get_trending_news(db: Session = Depends(get_db)):
    # Mock data for initial implementation
    news_items = [
        {"id": 1, "title": "Header", "subheading": "Subhead before 3hours", "published_time": "3hours", "tag": "Tag"},
        {"id": 2, "title": "Header", "subheading": "Subhead before 3hours", "published_time": "3hours", "tag": "Tag"},
        {"id": 3, "title": "Header", "subheading": "Subhead before 3hours", "published_time": "3hours", "tag": "Tag"},
        {"id": 4, "title": "Header", "subheading": "Subhead before 3hours", "published_time": "3hours", "tag": "Tag"},
        {"id": 5, "title": "Header", "subheading": "Subhead before 3hours", "published_time": "3hours", "tag": "Tag"},
        {"id": 6, "title": "Header", "subheading": "Subhead before 3hours", "published_time": "3hours", "tag": "Tag"},
        {"id": 7, "title": "Header", "subheading": "Subhead before 3hours", "published_time": "3hours", "tag": "Tag"},
        {"id": 8, "title": "Header", "subheading": "Subhead before 3hours", "published_time": "3hours", "tag": "Tag"},
        {"id": 9, "title": "Header", "subheading": "Subhead before 3hours", "published_time": "3hours", "tag": "Tag"},
        {"id": 10, "title": "Header", "subheading": "Subhead before 3hours", "published_time": "3hours", "tag": "Tag"},
    ]
    return news_items