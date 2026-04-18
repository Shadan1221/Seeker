"""
Registry of all trusted data sources for the Seeker pipeline.
Each entry defines what to scrape, how to scrape it, how often to refresh,
and which career_ids the data applies to.
"""

DATA_SOURCES = [
    {
        "name": "NIRF Rankings 2024",
        "url": "https://www.nirfindia.org/Rankings/2024/EngineeringRanking.html",
        "data_type": "colleges",
        "scraper": "nirf_scraper",
        "refresh_interval_days": 365,
        "careers": ["software-engineer", "data-scientist", "cybersecurity",
                    "research-scientist", "game-developer", "architect", "pilot"]
    },
    {
        "name": "NIRF Medical Rankings 2024",
        "url": "https://www.nirfindia.org/Rankings/2024/MedicalRanking.html",
        "data_type": "colleges",
        "scraper": "nirf_scraper",
        "refresh_interval_days": 365,
        "careers": ["doctor", "psychologist", "pharmacist"]
    },
    {
        "name": "NIRF Law Rankings 2024",
        "url": "https://www.nirfindia.org/Rankings/2024/LawRanking.html",
        "data_type": "colleges",
        "scraper": "nirf_scraper",
        "refresh_interval_days": 365,
        "careers": ["lawyer"]
    },
    {
        "name": "NIRF Management Rankings 2024",
        "url": "https://www.nirfindia.org/Rankings/2024/ManagementRanking.html",
        "data_type": "colleges",
        "scraper": "nirf_scraper",
        "refresh_interval_days": 365,
        "careers": ["ca-finance", "entrepreneur", "management-consultant", "product-manager"]
    },
    {
        "name": "NTA JEE Main",
        "url": "https://jeemain.nta.ac.in/",
        "data_type": "exams",
        "scraper": "nta_scraper",
        "refresh_interval_days": 30,
        "careers": ["software-engineer", "data-scientist", "architect", "pilot"]
    },
    {
        "name": "NTA NEET UG",
        "url": "https://neet.nta.nic.in/",
        "data_type": "exams",
        "scraper": "nta_scraper",
        "refresh_interval_days": 30,
        "careers": ["doctor", "pharmacist"]
    },
    {
        "name": "AmbitionBox India Salaries",
        "url": "https://www.ambitionbox.com/salaries",
        "data_type": "salary",
        "scraper": "salary_scraper",
        "refresh_interval_days": 90,
        "careers": ["software-engineer", "data-scientist", "product-manager",
                    "cybersecurity", "graphic-designer", "content-creator"]
    },
]

# Tiered refresh strategy
REFRESH_INTERVALS = {
    "exam_dates": 30,        # days — changes every admission cycle
    "salary": 90,            # quarterly — labour market shifts
    "college_rankings": 365, # annually — NIRF releases once a year
    "cutoff_scores": 365,    # annually — after each admission season
    "job_demand": 90,        # quarterly — hiring trends
}
