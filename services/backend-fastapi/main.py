from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import os


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Autonomous DevOps Platform API"}


@app.get("/health")
def health():
    return {"status": "healthy", "service": "backend-fastapi"}


def get_db_connection():
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
    )
    return conn


@app.get("/db-check")
def db_check():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT 1")
    result = cur.fetchone()
    conn.close()
    return {"database_connection": "successful"}
