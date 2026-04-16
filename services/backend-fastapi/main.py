from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import os
import logging

app = FastAPI()

# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Logging
logging.basicConfig(level=logging.INFO)


# 🔹 Root
@app.get("/")
def root():
    return {"message": "Autonomous DevOps Platform API"}


# 🔹 Version (fixed duplicate)
@app.get("/api/version")
def version():
    return {"version": "v3"}


# 🔹 DB Connection
def get_db_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
    )


# 🔥 HEALTH CHECK (PRODUCTION READY)
@app.get("/health")
def health():
    try:
        conn = get_db_connection()
        conn.close()
        return {"status": "ok", "service": "backend-fastapi"}
    except Exception as e:
        logging.error(f"Health check failed: {e}")
        raise HTTPException(status_code=500, detail="Service unhealthy")


# 🔹 DB CHECK (for UI)
@app.get("/db-check")
def db_check():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT 1")
        cur.fetchone()
        conn.close()
        return {"database_connection": "successful"}
    except Exception as e:
        logging.error(f"DB check failed: {e}")
        raise HTTPException(status_code=500, detail="Database connection failed")