from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.ai import router as ai_router

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Root route
@app.get("/")
def root():
    return {"message": "KubeMedic API Running"}


# AI routes
app.include_router(ai_router)  # version v29
