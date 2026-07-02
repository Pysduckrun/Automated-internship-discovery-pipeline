import React from 'react';

export default function Navbar({ cacheStatus, onClearCache }) {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              InternPulse
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Aggregator 2.0
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {cacheStatus && (
            <div className="flex items-center space-x-2 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs">
              <span className="text-slate-400">Cache:</span>
              <span className={`font-semibold ${cacheStatus === 'HIT' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {cacheStatus}
              </span>
              {cacheStatus === 'HIT' && (
                <button
                  onClick={onClearCache}
                  title="Force bypass cache"
                  className="ml-1.5 text-slate-400 hover:text-white transition-colors underline text-[11px]"
                >
                  Refresh
                </button>
              )}
            </div>
          )}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition border border-slate-700 flex items-center gap-1.5"
          >
            <span>Platform Sources</span>
          </a>
        </div>
      </div>
    </header>
  );
}
