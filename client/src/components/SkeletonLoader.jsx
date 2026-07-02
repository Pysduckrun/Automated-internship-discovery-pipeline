import React from 'react';

export default function SkeletonLoader() {
  const cards = Array.from({ length: 6 });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <span className="w-3 h-3 rounded-full bg-indigo-500 animate-ping" />
          <p className="text-sm sm:text-base font-semibold text-slate-300">
            Scanning LinkedIn & Indeed live feeds...
          </p>
        </div>
        <div className="w-28 h-6 rounded-md skeleton-shimmer" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((_, index) => (
          <div
            key={index}
            className="glass-panel p-6 rounded-2xl border border-slate-800/80 flex flex-col justify-between h-64"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl skeleton-shimmer" />
                <div className="w-24 h-6 rounded-full skeleton-shimmer" />
              </div>
              <div className="w-3/4 h-6 rounded-lg skeleton-shimmer mb-2.5" />
              <div className="w-1/2 h-4 rounded-md skeleton-shimmer mb-4" />
              
              <div className="flex gap-2 mb-4">
                <div className="w-16 h-5 rounded-full skeleton-shimmer" />
                <div className="w-20 h-5 rounded-full skeleton-shimmer" />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
              <div className="w-20 h-4 rounded skeleton-shimmer" />
              <div className="w-28 h-9 rounded-xl skeleton-shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
