# backend/run.py
import uvicorn
from app.services.init_service import init_db, get_or_create_default_data

if __name__ == "__main__":
    # Initialize the database
    init_db()
    # Add default data
    get_or_create_default_data()
    # Run the FastAPI app
    uvicorn.run("app.main:app", host="0.0.0.0", port=8889, reload=True)