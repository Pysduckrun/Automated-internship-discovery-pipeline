import React from 'react';

export default function JobCard({ job }) {
  const isLinkedIn = job.platform?.toLowerCase() === 'linkedin';

  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between group h-full border border-slate-800/80 relative overflow-hidden">
      {/* Subtle top accent gradient line */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${isLinkedIn ? 'bg-linkedin' : 'bg-indigo-500'} opacity-80 group-hover:opacity-100 transition`} />

      <div>
        {/* Card Header: Company Logo + Platform Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={job.logo || "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&auto=format&fit=crop&q=80"}
              alt={job.company}
              className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow-sm bg-slate-900"
            />
            <div>
              <h3 className="font-bold text-slate-200 text-sm tracking-wide">
                {job.company}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {job.location}
              </p>
            </div>
          </div>

          {/* Platform Badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm ${
              isLinkedIn
                ? 'bg-[#0a66c2]/20 text-[#38bdf8] border border-[#0a66c2]/40'
                : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
            }`}
          >
            {isLinkedIn ? (
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
            )}
            <span>{job.platform}</span>
          </span>
        </div>

        {/* Job Title */}
        <h2 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-2 mb-3">
          {job.title}
        </h2>

        {/* Skill Tags */}
        {job.tags && job.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {job.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-slate-900/80 text-slate-300 text-[11px] font-medium border border-slate-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between mt-auto">
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {job.postedAt || "Recently posted"}
        </span>

        <a
          href={job.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-indigo-600 text-white font-medium text-xs sm:text-sm shadow-md transition duration-200 group/btn border border-slate-700 hover:border-indigo-500"
        >
          <span>Apply Now</span>
          <svg className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}
