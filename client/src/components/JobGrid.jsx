import React from 'react';
import JobCard from './JobCard';

export default function JobGrid({ jobs, totalCount }) {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="glass-panel max-w-md mx-auto p-8 rounded-2xl border border-slate-800">
          <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center mx-auto mb-4 text-slate-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No Internships Found</h3>
          <p className="text-sm text-slate-400 mb-6">
            We couldn't find any opportunities matching your exact criteria. Try broadening your keywords or clearing location filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Active Opportunities
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Displaying <span className="text-indigo-400 font-semibold">{jobs.length}</span> verified postings aggregated across platforms
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}
