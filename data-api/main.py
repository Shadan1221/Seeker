from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import colleges, exams, salaries, careers
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Seeker Data API",
    description="Internal career intelligence microservice",
    docs_url=None,   # Disable docs in production
    redoc_url=None,
)

# Only allow requests from the Node.js backend — not from browsers directly
ALLOWED_ORIGINS = [
    "http://localhost:5000",
    "https://seeker-k9jg.onrender.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["GET"],
    allow_headers=["X-Internal-Key"],
)

app.include_router(colleges.router, prefix="/colleges")
app.include_router(exams.router, prefix="/exams")
app.include_router(salaries.router, prefix="/salaries")
app.include_router(careers.router, prefix="/careers")


@app.get("/health")
def health():
    return {"status": "ok"}
