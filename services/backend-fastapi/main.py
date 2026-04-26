from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import os
import logging

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging
logging.basicConfig(level=logging.INFO)


def get_db_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
    )


# Root
@app.get("/")
def root():
    return {"message": "Autonomous DevOps Platform API"}


# Version
@app.get("/api/version")
def version():
    return {"version": "v5"}


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "backend-fastapi"}


# # Health Check
# @app.get("/health")
# def health():
#     conn = None
#     try:
#         conn = get_db_connection()
#         return {"status": "ok", "service": "backend-fastapi"}
#     except Exception as e:
#         logging.error(f"Health check failed: {e}")
#         raise HTTPException(status_code=500, detail="Service unhealthy")
#     finally:
#         if conn:
#             conn.close()


# DB Check (for UI)
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
