# InternPulse | LinkedIn & Indeed Internship Aggregator

A stunning full-stack web application that aggregates verified internship opportunities from **LinkedIn** and **Indeed**. Built with a **FastAPI** backend featuring deep scraping & 1-hour in-memory TTL caching, paired with a glassmorphism **React + Tailwind CSS** frontend.

---

## 📁 Repository Structure

```text
automated_internship/
├── .gitignore                  # Prevents uploading temp files (__pycache__, node_modules, .env)
├── README.md                   # Project documentation
├── client/                     # Frontend UI (React + Vite + Tailwind CSS)
│   ├── index.html              # Standalone SPA & Vite entry point
│   ├── package.json            # Frontend dependencies
│   ├── tailwind.config.js      # Custom theme, animations & brand tokens
│   ├── postcss.config.js
│   └── src/
│       ├── App.jsx             # Main dashboard & state management
│       ├── index.css           # Vanilla CSS & glassmorphism utilities
│       ├── main.jsx
│       ├── components/         # UI Components (HeroSearch, JobCard, JobGrid, Navbar, SkeletonLoader, ErrorBanner)
│       └── services/
│           └── api.js          # API client connecting to backend
└── server/                     # Backend API (Python FastAPI)
    ├── requirements.txt        # Backend dependencies (fastapi, uvicorn, httpx, beautifulsoup4)
    ├── main.py                 # FastAPI server & static file host
    ├── cache_service.py        # 1-hour thread-safe in-memory TTL cache engine
    ├── scrapers.py             # Deep LinkedIn (f_JT=I enforcement) & Indeed scraping layer
    └── mock_data.py            # High-fidelity verified internship fallback datasets
```

---

## ✨ Key Features

1. **Strict Internship Verification**: Automatically enforces LinkedIn's `f_JT=I` parameter and applies deep regex filtering (`is_genuine_internship`) to exclude full-time/senior roles.
2. **Lightning-Fast TTL Caching**: Searches are cached in memory for **1 hour (3600s)**, serving repeated requests in `<5ms` with real-time cache header tracking (`X-Cache: HIT / MISS`).
3. **High-Resilience Fallback Engine**: If live scraping is rate-limited or blocked, the server smoothly blends verified sample internship data without downtime.
4. **Rich UI/UX**: Features animated shimmer loading skeletons, direct application links, platform badges, and compensation brackets (`$50-$65/hr`).

---

## 🚀 Quick Start (Local Setup)

### Prerequisites
- Python 3.10+ installed

### 1. Install Backend Dependencies
Open your terminal inside the `server/` folder:
```bash
cd server
python -m pip install -r requirements.txt
```

### 2. Launch the Application
Run the backend server:
```bash
python main.py
```

Then open your web browser and navigate to:
👉 **http://localhost:5000**
