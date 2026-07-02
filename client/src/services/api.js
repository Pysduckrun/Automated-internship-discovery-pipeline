// API Client interacting with our FastAPI server endpoints
const API_BASE_URL = "http://localhost:5000/api";

export async function fetchInternships({ keywords = "", location = "", platform = "all", forceRefresh = false }) {
  try {
    const params = new URLSearchParams({
      keywords,
      location,
      platform,
      force_refresh: forceRefresh
    });

    const response = await fetch(`${API_BASE_URL}/jobs?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Server returned HTTP status ${response.status}`);
    }

    const cacheHeader = response.headers.get("X-Cache") || "MISS";
    const data = await response.json();
    return {
      ...data,
      cacheStatus: cacheHeader
    };
  } catch (error) {
    console.error("API Fetch error:", error);
    throw error;
  }
}

export async function clearServerCache() {
  try {
    const response = await fetch(`${API_BASE_URL}/cache`, { method: "DELETE" });
    return await response.json();
  } catch (error) {
    console.error("Clear cache error:", error);
    return { success: false };
  }
}
