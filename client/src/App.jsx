import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSearch from './components/HeroSearch';
import SkeletonLoader from './components/SkeletonLoader';
import JobGrid from './components/JobGrid';
import ErrorBanner from './components/ErrorBanner';
import { fetchInternships, clearServerCache } from './services/api';

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cacheStatus, setCacheStatus] = useState(null);
  const [lastQuery, setLastQuery] = useState({ keywords: '', location: '', platform: 'all' });

  const executeSearch = async ({ keywords = '', location = '', platform = 'all', forceRefresh = false }) => {
    setLoading(true);
    setError(null);
    setLastQuery({ keywords, location, platform });

    try {
      const response = await fetchInternships({ keywords, location, platform, forceRefresh });
      if (response.success) {
        setJobs(response.data.jobs || []);
        setCacheStatus(response.cacheStatus || (response.cached ? 'HIT' : 'MISS'));
      } else {
        throw new Error(response.error || "Failed to retrieve job listings.");
      }
    } catch (err) {
      setError("Unable to scrape live job boards right now. Displaying cached or fallback listings.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearCache = async () => {
    await clearServerCache();
    executeSearch({ ...lastQuery, forceRefresh: true });
  };

  useEffect(() => {
    // Initial default search
    executeSearch({ keywords: '', location: '', platform: 'all' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100">
      <Navbar cacheStatus={cacheStatus} onClearCache={handleClearCache} />
      
      <main className="flex-1">
        <HeroSearch onSearch={executeSearch} loading={loading} />

        <ErrorBanner message={error} onRetry={() => executeSearch({ ...lastQuery, forceRefresh: true })} />

        {loading ? (
          <SkeletonLoader />
        ) : (
          <JobGrid jobs={jobs} totalCount={jobs.length} />
        )}
      </main>

      <footer className="border-t border-slate-800/80 py-8 px-4 text-center text-xs text-slate-500 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 InternPulse Aggregator. Built with React, Tailwind CSS & FastAPI.</p>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              TTL Caching Active
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
