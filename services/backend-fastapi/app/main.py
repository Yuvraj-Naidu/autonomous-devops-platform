from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import os
import logging

from app.routes.ai import router as ai_router

# Logging
logging.basicConfig(level=logging.INFO)

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
    )


# Root route
@app.get("/")
def root():
    return {"message": "Autonomous DevOps Platform API"}


# Health check — must match K8s liveness/readiness probe path
@app.get("/api/health")
def health():
    return {"status": "ok", "service": "backend-fastapi"}


# Version endpoint
@app.get("/api/version")
def version():
    return {
        "version": os.getenv("APP_VERSION", "unknown"),
        "description": "Production-Ready DevOps Platform",
    }


# DB Check (for UI dashboard)
@app.get("/api/db-check")
def db_check():
    conn = None
    cur = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT 1")
        cur.fetchone()
        return {"database_connection": "successful"}
    except Exception as e:
        logging.error(f"DB check failed: {e}")
        raise HTTPException(status_code=500, detail="Database connection failed")
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()


# AI routes — prefix ensures routes are served under /api/*
app.include_router(ai_router, prefix="/api")
