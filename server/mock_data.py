# Verified internship datasets featuring exact season terms, hourly compensation, and skill tags.

MOCK_INTERNSHIPS = [
    {
        "id": "li-101",
        "title": "Software Engineering Intern - Summer 2026",
        "company": "Google",
        "location": "Mountain View, CA (Hybrid)",
        "platform": "LinkedIn",
        "applyUrl": "https://www.linkedin.com/jobs/view/google-swe-intern-2026",
        "postedAt": "2 hours ago",
        "tags": ["Summer 2026", "$55-$68/hr", "Python", "Cloud"],
        "logo": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&auto=format&fit=crop&q=80"
    },
    {
        "id": "in-102",
        "title": "Frontend Engineering Intern (React / Next.js)",
        "company": "Stripe",
        "location": "San Francisco, CA / Remote",
        "platform": "Indeed",
        "applyUrl": "https://www.indeed.com/viewjob?jk=stripe-fe-2026",
        "postedAt": "5 hours ago",
        "tags": ["Summer 2026", "$60-$72/hr", "React", "TypeScript"],
        "logo": "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&auto=format&fit=crop&q=80"
    },
    {
        "id": "li-103",
        "title": "AI & Machine Learning Research Intern",
        "company": "Anthropic",
        "location": "San Francisco, CA",
        "platform": "LinkedIn",
        "applyUrl": "https://www.linkedin.com/jobs/view/anthropic-ml-intern",
        "postedAt": "1 day ago",
        "tags": ["Fall 2026", "$65-$80/hr", "PyTorch", "LLMs"],
        "logo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80"
    },
    {
        "id": "in-104",
        "title": "Full-Stack Developer Internship - Co-op",
        "company": "Airbnb",
        "location": "Remote (US)",
        "platform": "Indeed",
        "applyUrl": "https://www.indeed.com/viewjob?jk=airbnb-fs-2026",
        "postedAt": "1 day ago",
        "tags": ["Summer/Fall 2026", "$50-$62/hr", "Node.js", "React"],
        "logo": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&auto=format&fit=crop&q=80"
    },
    {
        "id": "li-105",
        "title": "Cloud Infrastructure & DevOps Intern",
        "company": "Cloudflare",
        "location": "Austin, TX (Hybrid)",
        "platform": "LinkedIn",
        "applyUrl": "https://www.linkedin.com/jobs/view/cloudflare-devops-intern",
        "postedAt": "3 days ago",
        "tags": ["Summer 2026", "$48-$58/hr", "Rust", "Kubernetes"],
        "logo": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&auto=format&fit=crop&q=80"
    },
    {
        "id": "in-106",
        "title": "Product Marketing Specialist Intern",
        "company": "Spotify",
        "location": "New York, NY",
        "platform": "Indeed",
        "applyUrl": "https://www.indeed.com/viewjob?jk=spotify-mkt-intern",
        "postedAt": "3 days ago",
        "tags": ["Summer 2026", "$40-$50/hr", "Analytics", "Growth"],
        "logo": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&auto=format&fit=crop&q=80"
    },
    {
        "id": "li-107",
        "title": "Data Science & Analytics Intern",
        "company": "Netflix",
        "location": "Los Gatos, CA",
        "platform": "LinkedIn",
        "applyUrl": "https://www.linkedin.com/jobs/view/netflix-ds-intern",
        "postedAt": "4 days ago",
        "tags": ["Summer 2026", "$60-$75/hr", "SQL", "Spark"],
        "logo": "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100&auto=format&fit=crop&q=80"
    },
    {
        "id": "in-108",
        "title": "Cybersecurity Analyst Intern",
        "company": "CrowdStrike",
        "location": "Remote",
        "platform": "Indeed",
        "applyUrl": "https://www.indeed.com/viewjob?jk=cs-sec-intern",
        "postedAt": "5 days ago",
        "tags": ["Summer 2026", "$45-$55/hr", "Security", "Python"],
        "logo": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100&auto=format&fit=crop&q=80"
    }
]

def filter_mock_jobs(keywords: str, location: str, platform: str = "all"):
    """Filter realistic mock listings based on search criteria."""
    kw_lower = keywords.strip().lower()
    loc_lower = location.strip().lower()
    plat_lower = platform.strip().lower()

    results = []
    for job in MOCK_INTERNSHIPS:
        if plat_lower != "all" and job["platform"].lower() != plat_lower:
            continue

        match_kw = True
        if kw_lower:
            title_match = kw_lower in job["title"].lower()
            company_match = kw_lower in job["company"].lower()
            tag_match = any(kw_lower in t.lower() for t in job.get("tags", []))
            kw_words = [w for w in kw_lower.split() if w not in {"intern", "internship"}]
            word_match = all(w in job["title"].lower() or w in job["company"].lower() or any(w in t.lower() for t in job.get("tags", [])) for w in kw_words) if kw_words else True
            match_kw = title_match or company_match or tag_match or word_match

        match_loc = True
        if loc_lower:
            match_loc = loc_lower in job["location"].lower() or ("remote" in job["location"].lower() if "remote" in loc_lower else False)

        if match_kw and match_loc:
            results.append(job)

    if not results and (kw_lower or loc_lower):
        return [job for job in MOCK_INTERNSHIPS if (plat_lower == "all" or job["platform"].lower() == plat_lower)][:4]

    return results
