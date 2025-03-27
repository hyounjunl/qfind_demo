# backend/app/schemas/news.py
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel

class NewsBase(BaseModel):
    title: str
    subheading: str
    published_time: str  # "3hours ago" format
    tag: str

class News(NewsBase):
    id: int
    
    class Config:
        from_attributes = True