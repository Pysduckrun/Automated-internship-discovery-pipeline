import os
from pathlib import Path
from fastapi import FastAPI, Query, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from cache_service import job_cache
from scrapers import aggregate_jobs

app = FastAPI(
    title="Internship Aggregator API",
    description="Aggregates internship postings from LinkedIn and Indeed with in-memory TTL caching and scraping resilience.",
    version="1.0.0"
)

# Enable CORS for frontend clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok", "service": "internship-aggregator-backend"}

@app.get("/api/jobs")
async def get_jobs(
    response: Response,
    keywords: str = Query("", description="Job title or keywords (e.g. Software Engineering Internship)"),
    location: str = Query("", description="Location (e.g. New York, San Francisco, Remote)"),
    platform: str = Query("all", description="Filter platform: 'all', 'linkedin', or 'indeed'"),
    force_refresh: bool = Query(False, description="Set to true to bypass cache and force scrape")
):
    """
    Search internship opportunities from LinkedIn and Indeed.
    Utilizes 1-hour in-memory TTL cache to prevent redundant scraping.
    """
    # Check cache first unless forced refresh
    if not force_refresh:
        cached_result = job_cache.get(keywords, location, platform)
        if cached_result is not None:
            response.headers["X-Cache"] = "HIT"
            return {
                "success": True,
                "cached": True,
                "data": cached_result
            }

    # Fetch fresh aggregated data
    response.headers["X-Cache"] = "MISS"
    try:
        aggregated_data = await aggregate_jobs(keywords, location, platform, use_live=True)
        # Store in cache for 1 hour (3600 seconds)
        job_cache.set(keywords, location, aggregated_data, platform, ttl=3600)
        
        return {
            "success": True,
            "cached": False,
            "data": aggregated_data
        }
    except Exception as str_err:
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "error": "Failed to scrape job boards. Please try again or check scraper configuration.",
                "details": str(str_err)
            }
        )

@app.delete("/api/cache")
async def clear_cache():
    """Clear all stored search results in the cache."""
    job_cache.clear()
    return {"success": True, "message": "In-memory cache cleared."}

# Mount client frontend static files if available
CLIENT_DIR = Path(__file__).resolve().parent.parent / "client"
if CLIENT_DIR.exists():
    # Serve index.html on root route
    @app.get("/")
    async def serve_index():
        index_file = CLIENT_DIR / "index.html"
        if index_file.exists():
            return FileResponse(index_file)
        return {"message": "API Server running. Access frontend at index.html"}
    
    app.mount("/static", StaticFiles(directory=str(CLIENT_DIR)), name="static")

if __name__ == "__main__":
    import uvicorn
    print("Starting Internship Aggregator Backend on http://localhost:5000")
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)
