import React, { useState } from 'react';

export default function HeroSearch({ onSearch, loading }) {
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');
  const [platform, setPlatform] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ keywords, location, platform });
  };

  const handleQuickFilter = (kw, loc) => {
    setKeywords(kw);
    setLocation(loc);
    onSearch({ keywords: kw, location: loc, platform });
  };

  return (
    <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-500/10 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-medium text-indigo-300 mb-6 shadow-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Live Scraping & Smart TTL Caching Enabled
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
          Discover Your Next <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Dream Internship
          </span>
        </h1>
        
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Aggregating top opportunities from <strong className="text-slate-200 font-semibold">LinkedIn</strong> and <strong className="text-slate-200 font-semibold">Indeed</strong> into a unified, lightning-fast dashboard.
        </p>

        {/* Floating Glass Search Box */}
        <form onSubmit={handleSubmit} className="glass-panel p-2 sm:p-3 rounded-2xl shadow-2xl shadow-black/60 border border-slate-700/60 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-2.5">
            {/* Keywords Input */}
            <div className="flex-1 relative flex items-center bg-slate-900/90 rounded-xl border border-slate-800 focus-within:border-indigo-500 transition-all">
              <span className="pl-3.5 text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Job Title/Keywords (e.g. Software Engineering)"
                className="w-full bg-transparent py-3.5 px-3 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            {/* Location Input */}
            <div className="md:w-64 relative flex items-center bg-slate-900/90 rounded-xl border border-slate-800 focus-within:border-indigo-500 transition-all">
              <span className="pl-3.5 text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location (e.g. Remote, CA)"
                className="w-full bg-transparent py-3.5 px-3 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            {/* Platform Filter Selector */}
            <div className="md:w-36 bg-slate-900/90 rounded-xl border border-slate-800 px-3 py-1 flex items-center">
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                aria-label="Filter platform source"
                className="w-full bg-transparent text-sm text-slate-300 focus:outline-none cursor-pointer py-2"
              >
                <option value="all" className="bg-slate-900 text-white">All Sources</option>
                <option value="linkedin" className="bg-slate-900 text-white">LinkedIn</option>
                <option value="indeed" className="bg-slate-900 text-white">Indeed</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-indigo-500/25 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base whitespace-nowrap"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Scraping...</span>
                </>
              ) : (
                <>
                  <span>Explore Jobs</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick Filter Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
          <span className="font-medium">Trending Searches:</span>
          <button
            onClick={() => handleQuickFilter('Software Engineer', 'Remote')}
            className="px-3 py-1 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 transition"
          >
            Software Engineer (Remote)
          </button>
          <button
            onClick={() => handleQuickFilter('Frontend React', 'San Francisco')}
            className="px-3 py-1 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 transition"
          >
            Frontend React (SF)
          </button>
          <button
            onClick={() => handleQuickFilter('Data Science', 'New York')}
            className="px-3 py-1 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 transition"
          >
            Data Science (NYC)
          </button>
          <button
            onClick={() => handleQuickFilter('AI Research', 'Hybrid')}
            className="px-3 py-1 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 transition"
          >
            AI & Machine Learning
          </button>
        </div>
      </div>
    </section>
  );
}
