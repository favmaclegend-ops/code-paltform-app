#!/usr/bin/env python3
"""
Backend startup script for CodePlatform
"""

import uvicorn
from create_db import create_tables

if __name__ == "__main__":
    # Create database tables if they don't exist
    create_tables()
    
    # Start the FastAPI server
    print("Starting CodePlatform API server...")
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        reload_dirs=["./"],
        log_level="info"
    )
