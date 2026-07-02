import time
from typing import Any, Optional, Dict

class TTLCache:
    """
    In-memory thread-safe TTL cache.
    Stores query results for a specified duration (default: 3600 seconds / 1 hour)
    to prevent redundant web scraping.
    """
    def __init__(self, default_ttl: int = 3600):
        self.default_ttl = default_ttl
        self._store: Dict[str, Dict[str, Any]] = {}

    def _normalize_key(self, keywords: str, location: str, platform: str = "all") -> str:
        """Create a consistent lowercase cache key."""
        return f"{keywords.strip().lower()}|{location.strip().lower()}|{platform.strip().lower()}"

    def get(self, keywords: str, location: str, platform: str = "all") -> Optional[Any]:
        """Retrieve cached data if present and not expired."""
        key = self._normalize_key(keywords, location, platform)
        entry = self._store.get(key)
        if not entry:
            return None
        
        # Check if entry has expired
        if time.time() > entry["expires_at"]:
            del self._store[key]
            return None
            
        return entry["data"]

    def set(self, keywords: str, location: str, data: Any, platform: str = "all", ttl: Optional[int] = None) -> None:
        """Store data in cache with expiration timestamp."""
        key = self._normalize_key(keywords, location, platform)
        expires_in = ttl if ttl is not None else self.default_ttl
        self._store[key] = {
            "data": data,
            "expires_at": time.time() + expires_in,
            "created_at": time.time()
        }

    def clear(self) -> None:
        """Clear all cache entries."""
        self._store.clear()

# Global singleton cache instance (1 hour TTL)
job_cache = TTLCache(default_ttl=3600)
