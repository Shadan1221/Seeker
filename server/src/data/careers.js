export const CAREERS = [
  // ── TECHNOLOGY & DATA cluster ───────────────────────────────────────────
  {
    id: "software-engineer",
    title: "Software Engineer",
    icon: "code",
    shortTitle: "Soft. Eng",
    category: "Technology & Data",
    cluster: "Technology & Data",
    accent: "#2563EB",
    tagline: "Building the digital infrastructure of the modern world.",
    stream: "Science PCM",
    education: {
      level: "UG Degree",
      duration: "4 years",
      degrees: ["B.Tech Computer Science", "BCA + MCA", "B.Sc CS"],
      key_subjects: ["Data Structures", "Algorithms", "DBMS", "Operating Systems", "Computer Networks"],
      entrance_exams: ["JEE Main", "JEE Advanced", "BITSAT", "VITEEE", "COMEDK"],
      licensing: null,
    },
    jobs: ["Software Developer", "Backend Engineer", "Full Stack Engineer", "DevOps Engineer", "Engineering Manager"],
    progression: ["Junior Dev", "Mid Dev", "Senior Dev", "Tech Lead", "Engineering Manager / CTO"],
    entry_age: "21–23 years typically",
    work_schedule: "Office / WFH hybrid, 9–7 typical",
    work_location: "Office or remote",
    sectors: ["IT Services (TCS/Infosys/Wipro)", "Product Startups", "Fintech", "Edtech", "FAANG/MNCs"],
    employment_type: ["Private sector", "Freelance", "Self-employed"],
    india_demand: "Very High",
    india_size: "India is the world's second largest developer market with ~5.8 million developers. 1.4 million new tech jobs expected by 2026.",
    govt_exams: null,
    salary: {
      fresher: "Rs. 6–15 LPA",
      mid: "Rs. 20–50 LPA",
      senior: "Rs. 60L–2Cr",
      note: "FAANG companies pay Rs. 50L–2Cr+ for senior roles.",
    },
    workLife: 3,
    demand: 5,
    creativity: 3,
    scope: "Global mobility is very high. Continuous learning is mandatory.",
    related: ["data-scientist", "product-manager", "cybersecurity"],
    certifications: ["AWS Solutions Architect", "Google Cloud Professional", "Meta React Developer", "CKA (Kubernetes)"],
    celebs: ["Sundar Pichai (CEO Google)", "Satya Nadella (CEO Microsoft)", "Sridhar Vembu (Founder Zoho, IIT Madras dropout)"],
    hurdles: {
      overall_difficulty: "Moderate",
      overall_note: "Accessible with the right preparation, but staying relevant requires constant learning throughout your career.",
      items: [
        {
          title: "JEE / Entrance Exam Competition",
          severity: "High",
          description: "Getting into a top college (IIT/NIT/BITS) is intensely competitive. However, private colleges and direct-entry paths through BCA or B.Sc CS also lead to strong careers — the exam is a hurdle for prestige, not for entry."
        },
        {
          title: "Rapid Technology Change",
          severity: "Critical",
          description: "The tools and frameworks in demand shift every few years. Engineers who stop learning after college plateau quickly. Continuous self-education is non-negotiable."
        },
        {
          title: "High Performance Bar at MNCs",
          severity: "High",
          description: "Getting into FAANG-tier companies requires mastery of Data Structures and Algorithms — a skill that must be specifically trained, beyond regular college curriculum."
        },
        {
          title: "Saturation at the Entry Level",
          severity: "Medium",
          description: "India produces lakhs of CS graduates annually. The entry-level market is crowded — differentiation through projects, open source, or internships is essential."
        }
      ]
    },
    subjects: [
      {
        name: "Data Structures & Algorithms",
        relevance: "Core",
        difficulty: "Very Hard",
        why: "The foundation of all software engineering interviews and system design — mastery is non-negotiable for top companies."
      },
      {
        name: "Computer Networks",
        relevance: "Core",
        difficulty: "Hard",
        why: "Understanding how data moves across the internet is essential for backend and system-level work."
      },
      {
        name: "Database Management Systems (DBMS)",
        relevance: "Core",
        difficulty: "Hard",
        why: "Almost every application stores data — knowing SQL, indexing, and query optimisation is a daily requirement."
      },
      {
        name: "Operating Systems",
        relevance: "Core",
        difficulty: "Hard",
        why: "Concepts like memory management, process scheduling, and concurrency underlie all software development."
      },
      {
        name: "Mathematics (Discrete Maths / Linear Algebra)",
        relevance: "Important",
        difficulty: "Hard",
        why: "Logic, proofs, and linear algebra become critical when working on ML systems or compiler design."
      },
      {
        name: "Object-Oriented Programming",
        relevance: "Core",
        difficulty: "Moderate",
        why: "The primary paradigm used in most industry codebases — understanding design patterns is essential."
      }
    ],
    tags: ["tech", "engineering", "data-science"],
    ring: 1,
    angle: 0,
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    icon: "model_training",
    shortTitle: "Data Sci",
    category: "Technology & Data",
    cluster: "Technology & Data",
    accent: "#2563EB",
    tagline: "Extracting meaning and predictive power from vast amounts of information.",
    stream: "Science PCM",
    education: {
      level: "PG Degree",
      duration: "4–6 years",
      degrees: ["B.Tech CSE + ML specialisation", "M.Sc Statistics", "M.Tech AI"],
      key_subjects: ["Linear Algebra", "Statistics", "ML Algorithms", "Python", "SQL", "Data Visualisation"],
      entrance_exams: ["JEE Main", "GATE (CS/Statistics)", "GRE for MS abroad"],
      licensing: null,
    },
    jobs: ["Data Scientist", "ML Engineer", "AI Research Scientist", "Data Analyst", "Business Intelligence Lead"],
    progression: ["Data Analyst", "Data Scientist", "Senior DS", "Principal DS", "Head of AI"],
    entry_age: "23–25 years typically",
    work_schedule: "Project-based flexible",
    work_location: "Office / WFH hybrid",
    sectors: ["Tech / AI", "Banking & Finance", "Healthcare", "E-commerce"],
    employment_type: ["Private sector", "Consulting"],
    india_demand: "Very High",
    india_size: "India's AI market projected at $17B by 2027. Every major bank, e-commerce, and healthcare company is hiring AI/ML roles.",
    govt_exams: null,
    salary: {
      fresher: "Rs. 8–20 LPA",
      mid: "Rs. 25–70 LPA",
      senior: "Rs. 80L–3Cr",
      note: "AI/ML engineers are among the highest-paid in India; specialised skills command 3–5x premium.",
    },
    workLife: 3,
    demand: 5,
    creativity: 4,
    scope: "At the forefront of the AI revolution, extremely high global demand.",
    related: ["software-engineer", "research-scientist", "product-manager"],
    certifications: ["Google Data Analytics", "IBM Data Science Professional", "TensorFlow Developer", "Databricks Certified"],
    celebs: ["Andrew Ng", "Yann LeCun"],
    hurdles: {
      overall_difficulty: "Hard",
      overall_note: "Requires strength in both mathematics and programming simultaneously — a combination most students develop only at the postgraduate level.",
      items: [
        {
          title: "Strong Mathematical Foundation Required",
          severity: "Critical",
          description: "Without a solid grip on Linear Algebra, Probability, and Calculus, understanding ML algorithms remains superficial. Many aspirants learn tools like Python and sklearn without understanding what they are doing."
        },
        {
          title: "Postgraduate Qualification Expected",
          severity: "High",
          description: "Most data scientist roles at serious companies expect M.Sc or M.Tech level qualification. B.Tech graduates enter as analysts and must upskill significantly to reach data science roles."
        },
        {
          title: "Portfolio Over Degree",
          severity: "High",
          description: "Real project work — Kaggle competitions, published notebooks, internships — matters more than credentials. Building a credible portfolio takes one to two years of active effort beyond coursework."
        },
        {
          title: "Domain Knowledge Gap",
          severity: "Medium",
          description: "Data science is applied — you need to understand finance, healthcare, or logistics alongside the ML. Pure technical skill without domain context limits impact and career growth."
        }
      ]
    },
    subjects: [
      {
        name: "Linear Algebra",
        relevance: "Core",
        difficulty: "Very Hard",
        why: "Neural networks, PCA, and almost every ML algorithm is expressed in matrix operations — without this, you cannot understand what your models are doing."
      },
      {
        name: "Probability & Statistics",
        relevance: "Core",
        difficulty: "Very Hard",
        why: "Hypothesis testing, Bayesian inference, and model evaluation are entirely grounded in statistical thinking."
      },
      {
        name: "Calculus (Multivariable)",
        relevance: "Core",
        difficulty: "Hard",
        why: "Gradient descent — the mechanism that trains neural networks — is pure calculus."
      },
      {
        name: "Python Programming",
        relevance: "Core",
        difficulty: "Moderate",
        why: "The universal language of data science — pandas, numpy, scikit-learn, PyTorch all require strong Python."
      },
      {
        name: "SQL & Database Querying",
        relevance: "Core",
        difficulty: "Moderate",
        why: "Real-world data lives in databases — every data scientist spends significant time writing and optimising queries."
      },
      {
        name: "Machine Learning Theory",
        relevance: "Core",
        difficulty: "Very Hard",
        why: "Understanding bias-variance tradeoff, regularisation, ensemble methods, and evaluation metrics at a conceptual level separates analysts from data scientists."
      }
    ],
    tags: ["tech", "data-science", "research"],
    ring: 1,
    angle: 20,
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Expert",
    icon: "security",
    shortTitle: "Cybersec",
    category: "Technology & Data",
    cluster: "Technology & Data",
    accent: "#2563EB",
    tagline: "Protecting digital assets, networks, and data from malicious actors.",
    stream: "Science PCM",
    education: {
      level: "UG Degree + Certs",
      duration: "4 years",
      degrees: ["B.Tech CSE", "B.Sc Cybersecurity", "PG Diploma Ethical Hacking"],
      key_subjects: ["Network Security", "Cryptography", "Ethical Hacking", "Forensics", "Risk Management"],
      entrance_exams: ["JEE Main", "GATE"],
      licensing: null,
    },
    jobs: ["Ethical Hacker / Pen Tester", "Security Analyst", "Incident Response Analyst", "Security Architect", "CISO"],
    progression: ["SOC Analyst", "Security Engineer", "Sr. Security Engineer", "Security Architect", "CISO"],
    entry_age: "21–24 years typically",
    work_schedule: "Shift-based (for SOC) or Office hours",
    work_location: "Office / WFH hybrid",
    sectors: ["Banking & Finance", "Government / Defense", "Tech / Cloud", "Consulting (Big 4)"],
    employment_type: ["Private sector", "Government", "Consulting"],
    india_demand: "Very High",
    india_size: "India had 1.8M unfilled cybersecurity roles in 2023. CERT-In mandates driving demand in every regulated sector.",
    govt_exams: ["IB (Intelligence Bureau)", "NTRO", "CBI technical roles"],
    salary: {
      fresher: "Rs. 5–12 LPA",
      mid: "Rs. 18–45 LPA",
      senior: "Rs. 60L–1.5Cr",
      note: "High premium for specialized certifications and zero-day threat experience.",
    },
    workLife: 2,
    demand: 5,
    creativity: 3,
    scope: "Critical function for all modern enterprises, recession-proof.",
    related: ["software-engineer", "data-scientist", "product-manager"],
    certifications: ["CEH", "OSCP", "CISSP", "CompTIA Security+"],
    celebs: ["Kevin Mitnick"],
    hurdles: {
      overall_difficulty: "Hard",
      overall_note: "Requires both deep technical knowledge and a constantly updated threat landscape awareness — the field never stops changing.",
      items: [
        {
          title: "Broad Technical Prerequisites",
          severity: "Critical",
          description: "You must first understand networking, operating systems, and programming deeply before specialising in security. Skipping foundational knowledge leads to superficial security skills."
        },
        {
          title: "Certification Treadmill",
          severity: "High",
          description: "Meaningful certifications like OSCP are genuinely hard — the exam is a 24-hour practical hacking challenge. CEH is widely held but increasingly considered insufficient by serious employers."
        },
        {
          title: "Legal and Ethical Boundary Management",
          severity: "High",
          description: "Ethical hackers operate in a narrow legal space. Understanding what is authorised is as important as technical skill — overstepping has criminal consequences."
        },
        {
          title: "Constant Threat Evolution",
          severity: "Medium",
          description: "Attack techniques and malware evolve continuously. Security professionals who stop learning are actively dangerous — their outdated knowledge creates blind spots."
        }
      ]
    },
    subjects: [
      {
        name: "Networking & TCP/IP Protocols",
        relevance: "Core",
        difficulty: "Hard",
        why: "Almost all cyberattacks exploit network-level vulnerabilities — packet analysis, firewalls, and VPNs are daily tools."
      },
      {
        name: "Operating System Internals (Linux/Windows)",
        relevance: "Core",
        difficulty: "Hard",
        why: "Exploits often target OS-level weaknesses — kernel permissions, file systems, and process isolation must be understood deeply."
      },
      {
        name: "Cryptography",
        relevance: "Core",
        difficulty: "Very Hard",
        why: "SSL/TLS, hashing, and public key infrastructure — all security systems rest on cryptographic principles."
      },
      {
        name: "Programming (Python / C / Assembly)",
        relevance: "Core",
        difficulty: "Hard",
        why: "Writing exploit scripts, reverse engineering binaries, and automating security scans all require coding ability."
      },
      {
        name: "Web Application Security",
        relevance: "Important",
        difficulty: "Hard",
        why: "SQL injection, XSS, CSRF, and OWASP Top 10 vulnerabilities are the most common real-world attack surfaces."
      },
      {
        name: "Reverse Engineering / Malware Analysis",
        relevance: "Important",
        difficulty: "Very Hard",
        why: "Advanced roles require understanding how malicious code works at the binary level."
      }
    ],
    tags: ["tech", "engineering", "research"],
    ring: 2,
    angle: 10,
  },
  {
    id: "product-manager",
    title: "Product Manager",
    icon: "dashboard",
    shortTitle: "Prod. Mgr",
    category: "Technology & Data",
    cluster: "Technology & Data",
    accent: "#2563EB",
    tagline: "The intersection of business, technology, and user experience.",
    stream: "Any Stream",
    education: {
      level: "PG Degree",
      duration: "4–6 years",
      degrees: ["B.Tech/BBA + MBA (IIM preferred)", "Product Management bootcamp"],
      key_subjects: ["Product Strategy", "User Research", "Agile Methodologies", "Data Analytics", "UI/UX Principles"],
      entrance_exams: ["CAT", "GMAT"],
      licensing: null,
    },
    jobs: ["Product Manager", "Associate PM", "Senior PM", "Group PM", "VP of Product"],
    progression: ["APM", "PM", "Senior PM", "Group PM", "Director of Product", "CPO"],
    entry_age: "23–26 years typically",
    work_schedule: "Project-based flexible, high meeting volume",
    work_location: "Office / WFH hybrid",
    sectors: ["Product Startups", "E-commerce", "Fintech", "Consumer Tech"],
    employment_type: ["Private sector"],
    india_demand: "Very High",
    india_size: "India has 50,000+ PM roles; growing at 25% YoY with startup ecosystem.",
    govt_exams: null,
    salary: {
      fresher: "Rs. 15–30 LPA",
      mid: "Rs. 35–80 LPA",
      senior: "Rs. 1–3Cr+",
      note: "Post-MBA salaries at top firms are exceptionally high.",
    },
    workLife: 2,
    demand: 5,
    creativity: 4,
    scope: "The CEO of the product; high influence and pathway to company leadership.",
    related: ["software-engineer", "entrepreneur", "data-scientist"],
    certifications: ["CSPO", "Pragmatic Institute Certified"],
    celebs: ["Brian Chesky"],
    hurdles: {
      overall_difficulty: "Hard",
      overall_note: "A role with no direct entry path — it requires accumulating cross-functional credibility before being trusted with product decisions.",
      items: [
        {
          title: "No Direct Entry Route from College",
          severity: "Critical",
          description: "There is no PM degree. Most PMs enter through software engineering, business analysis, or an MBA. Getting a PM role directly from campus is rare — it typically requires several years of adjacent experience first."
        },
        {
          title: "MBA Premium Is Real",
          severity: "High",
          description: "Top PM roles at major tech companies disproportionately hire IIM or ISB MBAs or IIT engineers. Without one of these backgrounds, breaking into product at a top-tier company takes significantly longer."
        },
        {
          title: "Ambiguity Is the Job",
          severity: "High",
          description: "PMs operate without authority — they must influence engineers, designers, and leadership without direct control. Students who thrive on clear instructions find this role consistently frustrating."
        },
        {
          title: "Requires T-Shaped Knowledge",
          severity: "Medium",
          description: "A PM must understand technology well enough to talk to engineers, data well enough to interpret metrics, and design well enough to review UX — breadth plus one area of depth is the requirement."
        }
      ]
    },
    subjects: [
      {
        name: "Product Analytics & SQL",
        relevance: "Core",
        difficulty: "Hard",
        why: "PMs make decisions from data — funnel analysis, cohort studies, and A/B test interpretation require SQL and analytical thinking."
      },
      {
        name: "UX Research & Design Principles",
        relevance: "Core",
        difficulty: "Moderate",
        why: "PMs define what gets built — understanding user needs and translating them into specs requires UX literacy."
      },
      {
        name: "Business Strategy & Frameworks",
        relevance: "Core",
        difficulty: "Moderate",
        why: "Unit economics, pricing strategy, and competitive analysis — the product must make business sense, not just user sense."
      },
      {
        name: "Software Development Basics",
        relevance: "Important",
        difficulty: "Moderate",
        why: "PMs who cannot read a basic API spec or understand technical constraints lose credibility with engineering teams."
      },
      {
        name: "Communication & Writing",
        relevance: "Core",
        difficulty: "Moderate",
        why: "Product Requirements Documents, stakeholder updates, and roadmap presentations live or die on clarity of writing."
      }
    ],
    tags: ["tech", "management", "entrepreneurship", "business"],
    ring: 2,
    angle: 340,
  },

  // ── SCIENCE & HEALTH cluster ────────────────────────────────────────────
  {
    id: "doctor",
    title: "Doctor",
    icon: "stethoscope",
    shortTitle: "Doctor",
    category: "Science & Health",
    cluster: "Science & Health",
    accent: "#16A34A",
    tagline: "Diagnosing, treating, and preventing illness to preserve human life.",
    stream: "Science PCB",
    education: {
      level: "Doctorate",
      duration: "5.5 years (MBBS) + 3 years (MD/MS)",
      degrees: ["MBBS", "MD", "MS", "BDS (Dental)", "BAMS (Ayurveda)"],
      key_subjects: ["Anatomy", "Physiology", "Pathology", "Pharmacology", "Medicine", "Surgery"],
      entrance_exams: ["NEET UG", "NEET PG", "FMGE"],
      licensing: "MCI/NMC registration mandatory",
    },
    jobs: ["General Physician", "Surgeon", "Cardiologist", "Psychiatrist", "Dermatologist"],
    progression: ["Intern", "Junior Resident", "Senior Resident", "Consultant", "Senior Consultant / Professor"],
    entry_age: "23–24 for MBBS, 27–28 for specialist",
    work_schedule: "Shift-based for residents; clinic hours for consultants",
    work_location: "Hospital / Clinic",
    sectors: ["Government hospitals", "Private hospitals (Apollo/Fortis/Max)", "Clinics", "Medical colleges"],
    employment_type: ["Government", "Private sector", "Self-employed"],
    india_demand: "Very High",
    india_size: "India has 1.3 doctors per 1,000 people — WHO standard is 1 per 1,000. Massive shortage drives demand. Telemedicine market growing 30% YoY.",
    govt_exams: ["UPSC CMS", "State PSC Medical Officer exams", "AIIMS Faculty positions"],
    salary: {
      fresher: "Rs. 7–15 LPA",
      mid: "Rs. 20–60 LPA",
      senior: "Rs. 1–10Cr",
      note: "Senior specialists with private practices can earn exceptionally high incomes.",
    },
    workLife: 1,
    demand: 5,
    creativity: 2,
    scope: "Lifelong learning required. Immense societal respect and impact.",
    related: ["psychologist", "research-scientist", "pharmacist"],
    certifications: ["DNB", "MRCP", "MRCS", "USMLE (for USA)"],
    celebs: ["Dr. Devi Shetty", "Dr. Trehan"],
    hurdles: {
      overall_difficulty: "Extreme",
      overall_note: "One of the longest, most demanding educational pathways in any profession — requires sustained excellence over a decade before independent practice.",
      items: [
        {
          title: "NEET Competition Is Brutal",
          severity: "Critical",
          description: "Roughly twenty lakh students appear for approximately one lakh government MBBS seats annually. Top government medical colleges require scores above 650 out of 720. Private MBBS costs Rs. 50 lakh to one crore total — accessible only to a narrow financial bracket."
        },
        {
          title: "Minimum Five and a Half Years Before Practice",
          severity: "Critical",
          description: "MBBS takes four and a half years plus one year compulsory internship. Specialisation via MD or MS adds three more years. Most doctors are in their late twenties before earning a proper salary."
        },
        {
          title: "Residency Is Gruelling",
          severity: "High",
          description: "Junior resident doctors in government hospitals regularly work thirty-six hour shifts. Sleep deprivation, emotional weight of patient outcomes, and low stipends during residency are documented challenges across India."
        },
        {
          title: "NEET PG for Specialisation Is Harder",
          severity: "High",
          description: "Getting into a desirable MD or MS specialisation such as Surgery, Dermatology, or Radiology requires NEET PG scores in the top one to five percent. Many doctors spend one to three years attempting this after MBBS."
        },
        {
          title: "Emotional and Psychological Weight",
          severity: "High",
          description: "Physician burnout, patient deaths, and medico-legal pressure are constant realities. Emotional resilience is not optional — it is a professional survival skill."
        }
      ]
    },
    subjects: [
      {
        name: "Biology (Human Physiology & Anatomy)",
        relevance: "Core",
        difficulty: "Very Hard",
        why: "The entire foundation of medicine — you must know every system, organ, and mechanism of the human body."
      },
      {
        name: "Biochemistry",
        relevance: "Core",
        difficulty: "Very Hard",
        why: "Metabolic pathways, enzyme kinetics, and molecular biology underlie pharmacology and disease mechanisms."
      },
      {
        name: "Pathology",
        relevance: "Core",
        difficulty: "Hard",
        why: "Understanding disease at the cellular and tissue level is how diagnoses are made and confirmed."
      },
      {
        name: "Pharmacology",
        relevance: "Core",
        difficulty: "Very Hard",
        why: "Prescribing the right drug at the right dose with awareness of interactions is a core clinical competency."
      },
      {
        name: "Chemistry (Organic & Inorganic)",
        relevance: "Core",
        difficulty: "Hard",
        why: "Drug mechanisms, molecular biology, and biochemistry all require strong chemistry foundations from Class 11 and 12."
      },
      {
        name: "Clinical Medicine (Internal Medicine)",
        relevance: "Core",
        difficulty: "Very Hard",
        why: "Integrating symptoms, tests, and diagnoses into treatment plans is the actual work of a physician."
      }
    ],
    tags: ["healthcare", "bio", "research"],
    ring: 1,
    angle: 45,
  },
  {
    id: "psychologist",
    title: "Psychologist",
    icon: "psychology",
    shortTitle: "Psychol.",
    category: "Science & Health",
    cluster: "Science & Health",
    accent: "#16A34A",
    tagline: "Understanding human behaviour and helping minds heal.",
    stream: "Arts or Science PCB",
    education: {
      level: "PG Degree",
      duration: "5–7 years",
      degrees: ["BA/BSc Psychology", "MA/MSc Clinical Psychology", "MPhil Clinical Psychology", "PhD"],
      key_subjects: ["Abnormal Psychology", "Psychotherapy", "Cognitive Behavioural Therapy", "Research Methods", "Assessment"],
      entrance_exams: ["CUET", "NIMHANS", "TISS", "DU entrance"],
      licensing: "RCI (Rehabilitation Council of India) registration required",
    },
    jobs: ["Clinical Psychologist", "School Counsellor", "Corporate EAP Counsellor", "Psychotherapist", "Research Psychologist"],
    progression: ["Trainee Counsellor", "Counsellor", "Senior Psychologist", "Lead Psychologist", "Consultant / Professor"],
    entry_age: "24–26 years typically",
    work_schedule: "Clinic hours, often includes weekends",
    work_location: "Hospital / Clinic / WFH (Telehealth)",
    sectors: ["Healthcare", "Education", "Corporate HR", "Private Practice"],
    employment_type: ["Private sector", "Self-employed", "NGO"],
    india_demand: "High",
    india_size: "India has 0.07 psychiatrists per 100,000 people. 75% of mental health conditions go untreated. Massive shortage.",
    govt_exams: null,
    salary: {
      fresher: "Rs. 3–8 LPA",
      mid: "Rs. 10–25 LPA",
      senior: "Rs. 25–60 LPA",
      note: "Private practice earnings scale significantly with reputation.",
    },
    workLife: 4,
    demand: 4,
    creativity: 3,
    scope: "Growing awareness is rapidly expanding the market for mental health services.",
    related: ["social-worker", "doctor", "teacher-educator"],
    certifications: ["CBT Practitioner", "Trauma-Informed Care"],
    celebs: ["Esther Perel", "Dr. Alok Kanojia"],
    hurdles: {
      overall_difficulty: "Moderate",
      overall_note: "Accessible educational pathway but emotionally demanding work — the real difficulty is sustaining professional empathy without burnout.",
      items: [
        {
          title: "Long Academic Pathway for Clinical Practice",
          severity: "High",
          description: "Practising as a clinical psychologist requires BA plus MA plus MPhil Clinical Psychology plus RCI registration — a minimum of seven years of study. Without MPhil, you are limited to counselling roles, not clinical diagnosis."
        },
        {
          title: "Low Starting Salaries",
          severity: "High",
          description: "Entry-level counselling roles in India pay Rs. 3 to 5 LPA. Building a viable private practice takes several years. The financial return is slow compared to the length of education."
        },
        {
          title: "Vicarious Trauma",
          severity: "High",
          description: "Regularly working with trauma, depression, suicidality, and abuse affects practitioners deeply. Professional supervision and personal therapy are standard practice globally — less so in India, which increases burnout risk."
        },
        {
          title: "Limited Public Awareness",
          severity: "Medium",
          description: "Mental health stigma in India means many clients arrive late-stage or in crisis. Educating families alongside treating patients is an unpaid dimension of the work."
        }
      ]
    },
    subjects: [
      {
        name: "Abnormal Psychology",
        relevance: "Core",
        difficulty: "Hard",
        why: "Classification, symptoms, and treatment of psychological disorders is the clinical foundation of the field."
      },
      {
        name: "Research Methods & Statistics",
        relevance: "Core",
        difficulty: "Hard",
        why: "Psychological practice must be evidence-based — reading and conducting research is a professional requirement, not an academic exercise."
      },
      {
        name: "Cognitive Behavioural Therapy (CBT) Theory",
        relevance: "Core",
        difficulty: "Hard",
        why: "CBT is the most evidence-backed therapy approach globally — understanding its mechanisms is required for most clinical roles."
      },
      {
        name: "Developmental Psychology",
        relevance: "Important",
        difficulty: "Moderate",
        why: "Understanding how humans develop across the lifespan informs assessment and treatment planning across all age groups."
      },
      {
        name: "Neuropsychology / Biological Bases of Behaviour",
        relevance: "Important",
        difficulty: "Hard",
        why: "Brain-behaviour relationships are foundational for clinical assessment and understanding how mental illness manifests physically."
      }
    ],
    tags: ["counselling", "social", "healthcare", "research"],
    ring: 2,
    angle: 55,
  },
  {
    id: "research-scientist",
    title: "Research Scientist",
    icon: "science",
    shortTitle: "Scientist",
    category: "Science & Health",
    cluster: "Science & Health",
    accent: "#16A34A",
    tagline: "Expanding the boundaries of human knowledge through rigorous experimentation.",
    stream: "Science PCM or PCB",
    education: {
      level: "Doctorate",
      duration: "5–10 years",
      degrees: ["B.Tech Engineering", "B.Sc Physics/Chemistry/Biology", "M.Tech", "M.Sc", "PhD"],
      key_subjects: ["Research Methodology", "Advanced Mathematics", "Quantum Mechanics / Molecular Biology", "Data Analysis"],
      entrance_exams: ["GATE", "JEST", "JAM", "CSIR NET", "ISRO Centralised Recruitment Board"],
      licensing: null,
    },
    jobs: ["ISRO Scientist", "DRDO Research Engineer", "CSIR Senior Scientist", "IIT/IISc Faculty", "BARC Nuclear Scientist"],
    progression: ["Junior Research Fellow", "Senior Research Fellow", "Scientist B", "Scientist C", "Scientist F (Director Grade)"],
    entry_age: "26–30 years typically (post-PhD)",
    work_schedule: "Lab hours, flexible but often demanding",
    work_location: "Laboratory / University",
    sectors: ["Government R&D (ISRO/DRDO)", "Academia (IITs/IISc)", "Pharmaceuticals", "Deep Tech Startups"],
    employment_type: ["Government", "Private sector", "Academia"],
    india_demand: "Moderate",
    india_size: "India's R&D spend is 0.7% of GDP. ISRO's commercial launch programme and DRDO modernisation are creating major opportunities.",
    govt_exams: ["GATE", "JEST", "ISRO ICRB", "DRDO CEPTAM", "DAE (BARC/NPCIL)"],
    salary: {
      fresher: "Rs. 8–14 LPA",
      mid: "Rs. 18–35 LPA",
      senior: "Rs. 35–75 LPA",
      note: "Government roles offer high job security, pension, and prestige despite moderate base salaries.",
    },
    workLife: 3,
    demand: 3,
    creativity: 5,
    scope: "Critical for national development; opportunities for international collaboration.",
    related: ["data-scientist", "doctor", "software-engineer"],
    certifications: [],
    celebs: ["Dr. A.P.J. Abdul Kalam", "K. Sivan"],
    hurdles: {
      overall_difficulty: "Very Hard",
      overall_note: "Requires exceptional academic performance sustained over a decade and the psychological resilience to work in uncertainty for years without visible results.",
      items: [
        {
          title: "Decade-Long Academic Pathway",
          severity: "Critical",
          description: "B.Tech plus M.Tech or M.Sc plus PhD takes nine to eleven years minimum. You are in your early thirties before reaching an independent research position. This requires extremely long-term conviction."
        },
        {
          title: "GATE / JEST / CSIR NET Scores Must Be Top-Tier",
          severity: "Critical",
          description: "ISRO, DRDO, BARC, and IIT research positions require GATE scores in the top one to two percent. JEST for TIFR and IISc is even more selective. The filter is merciless."
        },
        {
          title: "PhD Attrition and Mental Health",
          severity: "High",
          description: "A significant proportion of PhD students experience anxiety and depression due to isolation, supervisor dynamics, and years of failed experiments before results. This is a globally documented phenomenon."
        },
        {
          title: "Low Industry Salary Relative to Effort",
          severity: "High",
          description: "Government research salaries are respectable but not comparable to private tech for the same years of education. The compensation is in prestige, job security, and mission — not maximum earnings."
        },
        {
          title: "Publish or Perish",
          severity: "Medium",
          description: "Academic research career progression depends on publications in peer-reviewed journals. Producing novel, publishable research consistently is a skill beyond intelligence — it requires tenacity and creativity."
        }
      ]
    },
    subjects: [
      {
        name: "Advanced Mathematics (Real Analysis, PDEs)",
        relevance: "Core",
        difficulty: "Very Hard",
        why: "Most fundamental research — in physics, engineering, or computational sciences — is expressed in advanced mathematics."
      },
      {
        name: "Physics / Chemistry / Biology (field-specific)",
        relevance: "Core",
        difficulty: "Very Hard",
        why: "Depth in the core science domain is irreplaceable — generalist knowledge is insufficient at research level."
      },
      {
        name: "Scientific Writing",
        relevance: "Core",
        difficulty: "Hard",
        why: "Research that cannot be clearly written up cannot be published — and unpublished research does not exist professionally."
      },
      {
        name: "Research Methodology & Experimental Design",
        relevance: "Core",
        difficulty: "Hard",
        why: "Designing experiments that yield valid, reproducible results is a distinct skill separate from domain knowledge."
      },
      {
        name: "Programming (Python / MATLAB / R)",
        relevance: "Important",
        difficulty: "Hard",
        why: "Data simulation, analysis, and visualisation in modern research universally requires computational tools."
      }
    ],
    tags: ["research", "engineering", "tech", "bio"],
    ring: 2,
    angle: 35,
  },
  {
    id: "pharmacist",
    title: "Pharmacist",
    icon: "medication",
    shortTitle: "Pharmacist",
    category: "Science & Health",
    cluster: "Science & Health",
    accent: "#16A34A",
    tagline: "The crucial link between medical science and patient care.",
    stream: "Science PCB",
    education: {
      level: "UG/PG Degree",
      duration: "4–6 years",
      degrees: ["D.Pharm", "B.Pharm", "M.Pharm", "Pharm.D", "PhD"],
      key_subjects: ["Pharmaceutics", "Pharmacology", "Medicinal Chemistry", "Pharmacognosy", "Clinical Pharmacy"],
      entrance_exams: ["GPAT", "NIPER JEE"],
      licensing: "State Pharmacy Council registration mandatory",
    },
    jobs: ["Hospital Pharmacist", "Retail Pharmacist", "Drug Regulatory Affairs Manager", "Clinical Research Associate", "Pharmaceutical Sales Representative"],
    progression: ["Trainee Pharmacist", "Pharmacist", "Senior Pharmacist", "Pharmacy Manager", "Director of Pharmacy"],
    entry_age: "22–24 years typically",
    work_schedule: "Shift-based (Retail/Hospital) or Office hours (Corporate)",
    work_location: "Hospital / Retail Pharmacy / Corporate Office",
    sectors: ["Pharmaceuticals", "Healthcare/Hospitals", "Retail", "Research Organizations (CROs)"],
    employment_type: ["Private sector", "Self-employed"],
    india_demand: "High",
    india_size: "India is the 'pharmacy of the world' (supplies 20% of global generics). Sector employs 3 million people.",
    govt_exams: ["Drug Inspector exams", "Government Hospital Pharmacist exams"],
    salary: {
      fresher: "Rs. 3–8 LPA",
      mid: "Rs. 10–25 LPA",
      senior: "Rs. 25–60 LPA",
      note: "Regulatory affairs and clinical research roles offer higher corporate salaries.",
    },
    workLife: 4,
    demand: 4,
    creativity: 2,
    scope: "Stable profession with growing opportunities in clinical research and pharmacovigilance.",
    related: ["doctor", "research-scientist", "data-scientist"],
    certifications: ["Clinical Research Certification", "Pharmacovigilance Certification"],
    celebs: ["Dilip Shanghvi (Sun Pharma)"],
    hurdles: {
      overall_difficulty: "Moderate",
      overall_note: "Accessible qualification with reliable employment — the main difficulty is differentiation above retail pharmacy into higher-value clinical and regulatory roles.",
      items: [
        {
          title: "GPAT for Postgraduate Admission Is Competitive",
          severity: "High",
          description: "The Graduate Pharmacy Aptitude Test for M.Pharm and NIPER admissions is competitive for top institutions. NIPER is the premier institution for pharmaceutical education in India and selection is very competitive."
        },
        {
          title: "Retail Pharmacy Has a Salary Ceiling",
          severity: "High",
          description: "The majority of pharmacists work in retail — hospitals and chemists — where salary growth plateaus unless transitioning to regulatory, clinical research, or pharmaceutical company roles."
        },
        {
          title: "Drug Knowledge Must Stay Current",
          severity: "High",
          description: "New drugs, new generic equivalents, and revised dosing guidelines are published continuously. A pharmacist whose knowledge stagnates creates patient safety risks."
        },
        {
          title: "Clinical Pharmacy Is Underrecognised in India",
          severity: "Medium",
          description: "In Western healthcare systems, clinical pharmacists are integrated members of medical teams. In India, this role is still developing — the full scope of pharmacy practice is not yet utilised."
        }
      ]
    },
    subjects: [
      {
        name: "Pharmaceutical Chemistry (Organic Synthesis)",
        relevance: "Core",
        difficulty: "Very Hard",
        why: "Understanding drug structures, synthesis routes, and structure-activity relationships is the scientific foundation of pharmacy."
      },
      {
        name: "Pharmacology & Pharmacokinetics",
        relevance: "Core",
        difficulty: "Very Hard",
        why: "How drugs work, how they are absorbed and eliminated, and how they interact — this knowledge is what separates pharmacists from dispensers."
      },
      {
        name: "Pharmaceutical Analysis",
        relevance: "Core",
        difficulty: "Hard",
        why: "Quality control — testing drug purity, potency, and stability — is the primary function of industrial pharmacy and regulatory work."
      },
      {
        name: "Clinical Pharmacy & Therapeutics",
        relevance: "Core",
        difficulty: "Hard",
        why: "Matching the right drug to the right patient, checking interactions, and counselling on usage — this is the patient-facing dimension of pharmacy practice."
      },
      {
        name: "Drug Regulatory Affairs",
        relevance: "Important",
        difficulty: "Hard",
        why: "CDSCO regulations, FDA submissions, and pharmacovigilance are the entry points to the high-paying regulatory and clinical research tracks."
      }
    ],
    tags: ["healthcare", "bio", "research", "science"],
    ring: 3,
    angle: 60,
  },

  // ── BUSINESS & LAW cluster ──────────────────────────────────────────────
  {
    id: "lawyer",
    title: "Lawyer",
    icon: "gavel",
    shortTitle: "Lawyer",
    category: "Business & Law",
    cluster: "Business & Law",
    accent: "#D97706",
    tagline: "Navigating the complex systems of rules that govern society and business.",
    stream: "Any Stream",
    education: {
      level: "UG Degree",
      duration: "5 years (Integrated) or 3 years (Post-Grad)",
      degrees: ["BA LLB", "BBA LLB", "BCom LLB", "B.Sc LLB", "LLM"],
      key_subjects: ["Constitutional Law", "Contract Law", "Criminal Law", "Property Law", "Jurisprudence", "Civil Procedure"],
      entrance_exams: ["CLAT", "AILET", "LSAT India"],
      licensing: "Bar Council of India enrolment mandatory (AIBE)",
    },
    jobs: ["Litigation Advocate", "Corporate Lawyer", "Legal Counsel (In-house)", "Judicial Service (Judge)", "Law Professor"],
    progression: ["Junior Associate", "Associate", "Senior Associate", "Partner", "Senior Partner / Equity Partner"],
    entry_age: "23–25 years typically",
    work_schedule: "Long, unpredictable hours (especially litigation and corporate)",
    work_location: "Court / Law Firm Office / Corporate Office",
    sectors: ["Law Firms", "Corporate Legal Departments", "Independent Litigation", "Judiciary"],
    employment_type: ["Private sector", "Self-employed", "Government"],
    india_demand: "High",
    india_size: "India has ~1.7 million enrolled advocates. Corporate legal, arbitration, and IP sectors are growing fastest.",
    govt_exams: ["Judicial Service exams (state-level)", "UPSC for IRS / IPS"],
    salary: {
      fresher: "Rs. 4–15 LPA",
      mid: "Rs. 20–60 LPA",
      senior: "Rs. 1Cr+",
      note: "Top NLU to top law firm track can reach Rs. 2Cr+ at partner level. Litigation is slow to build but lucrative later.",
    },
    workLife: 1,
    demand: 4,
    creativity: 3,
    scope: "Essential for business operations; increasing demand for specialized tech and IP law.",
    related: ["ias-officer", "journalist", "management-consultant"],
    certifications: [],
    celebs: ["Harish Salve", "Zia Mody"],
    hurdles: {
      overall_difficulty: "Hard",
      overall_note: "Intellectually demanding with a slow, competitive climb — the gap between law school and a thriving practice is wider than most students expect.",
      items: [
        {
          title: "CLAT for NLU Seats Is Intensely Competitive",
          severity: "High",
          description: "There are roughly three thousand NLU seats for lakhs of CLAT applicants. Non-NLU law schools vary enormously in quality — the institution's reputation significantly shapes your first five years."
        },
        {
          title: "First Five Years Are Financially Hard",
          severity: "Critical",
          description: "Most lawyers earn very little in their first few years — litigation practice builds slowly. Junior associates at top law firms earn better but the hours are punishing — seventy to eighty hour weeks are standard."
        },
        {
          title: "AIBE Must Be Cleared",
          severity: "High",
          description: "The All India Bar Examination is mandatory for any LLB graduate to practise as an advocate. Failure means you cannot appear in court until you pass."
        },
        {
          title: "Extremely Hierarchical Profession",
          severity: "High",
          description: "The legal profession is one of the most seniority-driven in India. Junior lawyers routinely spend years on largely administrative work before getting meaningful client exposure."
        },
        {
          title: "Reading Load Is Relentless",
          severity: "Medium",
          description: "Keeping up with case law, legislative amendments, and legal commentary is a continuous professional requirement. Unlike many careers, law demands constant reading throughout your working life."
        }
      ]
    },
    subjects: [
      {
        name: "Constitutional Law",
        relevance: "Core",
        difficulty: "Hard",
        why: "The foundation of all Indian law — every legal argument traces back to constitutional provisions and Supreme Court interpretation."
      },
      {
        name: "Contract Law",
        relevance: "Core",
        difficulty: "Hard",
        why: "Corporate legal practice, dispute resolution, and everyday transactions all rest on contract law — it is the most universally applied area."
      },
      {
        name: "Criminal Law & Procedure",
        relevance: "Core",
        difficulty: "Hard",
        why: "The IPC, CrPC, and evidence law govern criminal litigation — one of the most common areas of legal practice in India."
      },
      {
        name: "Legal Reasoning & Argumentation",
        relevance: "Core",
        difficulty: "Hard",
        why: "The ability to construct and dismantle legal arguments is the primary skill of a lawyer — it is trained, not innate."
      },
      {
        name: "Taxation Law",
        relevance: "Important",
        difficulty: "Very Hard",
        why: "Tax law is one of the highest-earning legal specialisations in India — direct and indirect tax are both complex and constantly amended."
      },
      {
        name: "Legal Writing & Drafting",
        relevance: "Core",
        difficulty: "Hard",
        why: "Petitions, contracts, legal opinions, and briefs must be written with precision — vague language in legal documents creates liability."
      }
    ],
    tags: ["law", "humanities", "government", "management"],
    ring: 1,
    angle: 120,
  },
  {
    id: "ca-finance",
    title: "Chartered Accountant",
    icon: "monitoring",
    shortTitle: "CA/Finance",
    category: "Business & Law",
    cluster: "Business & Law",
    accent: "#D97706",
    tagline: "The architects of financial integrity and corporate strategy.",
    stream: "Commerce",
    education: {
      level: "Certification / PG Degree",
      duration: "5+ years",
      degrees: ["B.Com + CA", "MBA Finance (IIM)", "B.Com + CFA"],
      key_subjects: ["Financial Accounting", "Cost Accounting", "Taxation", "Auditing", "Financial Management", "Strategic Management"],
      entrance_exams: ["CA Foundation/Inter/Final", "CFA", "CPA"],
      licensing: "ICAI membership mandatory to use 'CA' designation",
    },
    jobs: ["Chartered Accountant", "Investment Banker", "CFO", "Financial Analyst", "Tax Consultant"],
    progression: ["Article Assistant", "Audit Associate", "Senior Associate", "Manager", "Partner / CFO"],
    entry_age: "23–25 years typically",
    work_schedule: "Office hours, intense during audit/tax seasons",
    work_location: "Office / Client sites",
    sectors: ["Accounting Firms (Big 4)", "Banking & Finance", "Corporate Finance", "Consulting"],
    employment_type: ["Private sector", "Self-employed"],
    india_demand: "Very High",
    india_size: "India has ~3.7 lakh CAs for a Rs. 300 lakh crore economy — massive shortage. GST era accelerating demand.",
    govt_exams: ["RBI/SEBI Grade B", "PSU Finance roles"],
    salary: {
      fresher: "Rs. 7–18 LPA",
      mid: "Rs. 20–60 LPA",
      senior: "Rs. 1–5Cr",
      note: "Investment Banking at top tier firms can pay Rs. 70L–2Cr for mid-level roles.",
    },
    workLife: 2,
    demand: 5,
    creativity: 2,
    scope: "The backbone of the formal economy; guaranteed demand.",
    related: ["entrepreneur", "lawyer", "management-consultant"],
    certifications: ["CS", "CMA", "FRM"],
    celebs: ["Kumar Mangalam Birla", "Rakesh Jhunjhunwala"],
    hurdles: {
      overall_difficulty: "Very Hard",
      overall_note: "The CA exam has one of the lowest pass rates of any professional qualification in the world — the difficulty is by institutional design.",
      items: [
        {
          title: "CA Final Pass Rate Is Approximately Ten to Fifteen Percent",
          severity: "Critical",
          description: "ICAI's CA Final exam is internationally recognised as one of the hardest professional examinations. Most candidates attempt it multiple times. The average time to complete CA is four and a half to five years from Foundation."
        },
        {
          title: "Articleship Is Both Training and Attrition",
          severity: "High",
          description: "The mandatory three-year articleship under a practising CA involves long hours, often low stipend, and highly variable quality depending on the firm. It is simultaneously the most valuable learning period and the most commonly cited reason people leave the CA track."
        },
        {
          title: "Investment Banking Entry Is Highly Selective",
          severity: "High",
          description: "The IB route at top firms requires either a top IIM MBA or exceptional CA results plus relevant internships. Breaking in without this combination is uncommon."
        },
        {
          title: "Constant Regulatory Change",
          severity: "Medium",
          description: "GST, IBC, Companies Act amendments, and SEBI regulations change regularly. A CA who stops updating their technical knowledge rapidly becomes less valuable."
        }
      ]
    },
    subjects: [
      {
        name: "Financial Accounting & Reporting (Ind AS / IFRS)",
        relevance: "Core",
        difficulty: "Very Hard",
        why: "Correct financial reporting is the CA's core professional responsibility — Ind AS standards are complex and regularly updated."
      },
      {
        name: "Taxation (Direct & Indirect)",
        relevance: "Core",
        difficulty: "Very Hard",
        why: "Income Tax Act, GST, and international taxation are the most tested areas in CA exams and the most commercially valued skills."
      },
      {
        name: "Auditing & Assurance",
        relevance: "Core",
        difficulty: "Hard",
        why: "Understanding audit evidence, risk assessment, and reporting standards is foundational to CA practice."
      },
      {
        name: "Corporate & Business Law",
        relevance: "Core",
        difficulty: "Hard",
        why: "Companies Act, SEBI regulations, and insolvency law govern the businesses CAs work with."
      },
      {
        name: "Financial Management & Strategic FM",
        relevance: "Core",
        difficulty: "Hard",
        why: "Capital budgeting, working capital management, and derivatives are tested at CA Final and directly relevant to CFO-track roles."
      },
      {
        name: "Economics for Finance",
        relevance: "Important",
        difficulty: "Moderate",
        why: "Macroeconomic indicators, monetary policy, and market dynamics inform financial decision-making at every level."
      }
    ],
    tags: ["finance", "business", "management", "law"],
    ring: 1,
    angle: 140,
  },
  {
    id: "entrepreneur",
    title: "Entrepreneur",
    icon: "rocket_launch",
    shortTitle: "Founder",
    category: "Business & Law",
    cluster: "Business & Law",
    accent: "#D97706",
    tagline: "Creating value by building systems, products, and companies from scratch.",
    stream: "Any Stream",
    education: {
      level: "Varied",
      duration: "Ongoing",
      degrees: ["Any + MBA (adds credibility)", "None mandatory"],
      key_subjects: ["Strategy", "Marketing", "Finance", "Leadership", "Product Development"],
      entrance_exams: [],
      licensing: null,
    },
    jobs: ["Founder/CEO", "Co-founder", "Startup Advisor", "Venture Capitalist", "Business Development Lead"],
    progression: ["Idea Stage", "Early-stage", "Growth Stage", "Scale-up", "Exit (IPO/Acquisition)"],
    entry_age: "Any age",
    work_schedule: "24/7 mindset, highly unstructured",
    work_location: "Everywhere",
    sectors: ["Tech Startups", "D2C Brands", "Services", "Venture Capital"],
    employment_type: ["Self-employed"],
    india_demand: "Very High",
    india_size: "India is the 3rd largest startup ecosystem globally with 112,000+ startups. 111 unicorns as of 2024.",
    govt_exams: null,
    salary: {
      fresher: "Rs. 0–8 LPA (founder salary)",
      mid: "Variable (equity rich, cash poor)",
      senior: "Crores (upon successful exit)",
      note: "Highest risk, highest reward. Compensation is tied entirely to business success.",
    },
    workLife: 1,
    demand: 5,
    creativity: 5,
    scope: "Limitless upside, but extreme failure rate. Drives the modern economy.",
    related: ["product-manager", "ca-finance", "management-consultant"],
    certifications: [],
    celebs: ["Nithin Kamath", "Falguni Nayar", "Bhavish Aggarwal"],
    hurdles: {
      overall_difficulty: "Extreme",
      overall_note: "The highest-risk path with no floor — failure is statistically normal, not exceptional, and most first ventures do not succeed.",
      items: [
        {
          title: "Most Startups Fail",
          severity: "Critical",
          description: "This is not a discouragement — it is a design constraint. Entrepreneurs who understand and plan for failure cycles outlast those who don't. Resilience to failure is the primary skill."
        },
        {
          title: "Family and Financial Pressure in India",
          severity: "Critical",
          description: "Starting a business in India often means forgoing a salary during a period when family expects financial contribution. Managing this pressure while building is a real and underestimated challenge."
        },
        {
          title: "Fundraising Is a Full-Time Skill",
          severity: "High",
          description: "Getting angel or VC funding in India requires network access, a compelling narrative, and often IIT or IIM credentials as a credibility signal — none of which come naturally to first-generation founders."
        },
        {
          title: "No Stable Income for Years",
          severity: "High",
          description: "Most founders pay themselves little or nothing for the first one to three years. Financial planning and personal frugality during this period are critical and often underestimated."
        },
        {
          title: "Requires Competence Across All Domains",
          severity: "High",
          description: "A founder must understand product, finance, people management, legal, and sales — often simultaneously. Functional gaps in knowledge create critical vulnerabilities in early-stage companies."
        }
      ]
    },
    subjects: [
      {
        name: "Business Finance & Accounting Basics",
        relevance: "Core",
        difficulty: "Moderate",
        why: "Understanding your own P&L, burn rate, and unit economics is survival knowledge — not optional finance."
      },
      {
        name: "Sales & Marketing Fundamentals",
        relevance: "Core",
        difficulty: "Moderate",
        why: "Every founder is selling — the idea to investors, the product to customers, the vision to employees. Marketing is the founder's first job."
      },
      {
        name: "Product & UX Thinking",
        relevance: "Core",
        difficulty: "Moderate",
        why: "Building something people actually want requires user research, rapid iteration, and honest feedback — skills that must be deliberately developed."
      },
      {
        name: "Legal Basics (Company Registration, Contracts, IP)",
        relevance: "Important",
        difficulty: "Moderate",
        why: "Not understanding a term sheet, an employment contract, or IP ownership has destroyed early-stage companies."
      },
      {
        name: "Leadership & Team Psychology",
        relevance: "Core",
        difficulty: "Hard",
        why: "The transition from solo founder to manager of people is where most founders first struggle seriously."
      }
    ],
    tags: ["entrepreneurship", "tech", "creative", "business", "management"],
    ring: 1,
    angle: 160,
  },
  {
    id: "management-consultant",
    title: "Management Consultant",
    icon: "business_center",
    shortTitle: "Consultant",
    category: "Business & Law",
    cluster: "Business & Law",
    accent: "#D97706",
    tagline: "Solving complex strategic problems for the world's largest organizations.",
    stream: "Any Stream",
    education: {
      level: "PG Degree",
      duration: "4-6 years",
      degrees: ["B.Tech + MBA (IIM A/B/C/L/K)", "Economics/Commerce + MBA"],
      key_subjects: ["Corporate Strategy", "Operations", "Financial Modeling", "Organizational Behavior"],
      entrance_exams: ["CAT", "GMAT"],
      licensing: null,
    },
    jobs: ["Business Analyst", "Associate Consultant", "Consultant", "Engagement Manager", "Partner"],
    progression: ["BA", "Consultant", "Senior Consultant", "Manager", "Principal", "Partner / Director"],
    entry_age: "23–26 years typically",
    work_schedule: "Extremely long hours, frequent travel",
    work_location: "Client sites / Office",
    sectors: ["Management Consulting (MBB)", "Big 4 Consulting", "Boutique Strategy Firms"],
    employment_type: ["Private sector"],
    india_demand: "Very High",
    india_size: "McKinsey, BCG, Bain, Deloitte, KPMG all have large India operations. Indian consulting market growing at 12% YoY.",
    govt_exams: null,
    salary: {
      fresher: "Rs. 20–40 LPA",
      mid: "Rs. 50L–1.5Cr",
      senior: "Rs. 2–5Cr+",
      note: "Top-tier MBB firms offer premium compensation and rapid career acceleration.",
    },
    workLife: 1,
    demand: 4,
    creativity: 3,
    scope: "Excellent training ground for future CEOs and founders.",
    related: ["ca-finance", "entrepreneur", "product-manager"],
    certifications: [],
    celebs: ["Indra Nooyi", "Sundar Pichai (former McKinsey)"],
    hurdles: {
      overall_difficulty: "Very Hard",
      overall_note: "Requires exceptional credentials, performance under pressure, and the ability to produce polished, high-stakes work on very short timelines.",
      items: [
        {
          title: "Top Firm Hiring Is Extremely Selective",
          severity: "Critical",
          description: "Top consulting firms hire from a narrow band of institutions — primarily IIM A, B, C, ISB, and top IITs. The selection process involves multiple rounds of case interviews, which require months of dedicated preparation in a specific format."
        },
        {
          title: "Case Interview Preparation Is a Sub-Skill",
          severity: "High",
          description: "The case interview — solving a business problem live with the interviewer — is unlike any academic exam. Candidates typically practise many cases with peers over months. Without specific preparation, performance is poor regardless of intelligence."
        },
        {
          title: "Up-or-Out Culture",
          severity: "High",
          description: "Consulting firms operate an explicit up-or-out model — you either get promoted on schedule or are asked to leave. The performance pressure is constant and visible within the firm."
        },
        {
          title: "Travel and Hours Are Unsustainable for Many",
          severity: "High",
          description: "Consultants routinely fly out Monday morning and return Friday evening for months at a time. Those who prioritise location stability find the consulting lifestyle incompatible with their values."
        }
      ]
    },
    subjects: [
      {
        name: "Business Case Frameworks (Profitability, Market Entry, M&A)",
        relevance: "Core",
        difficulty: "Hard",
        why: "Structuring ambiguous business problems into coherent analytical frameworks is the primary consulting skill — it is trained specifically for interviews and practised daily on the job."
      },
      {
        name: "Financial Modelling & Excel",
        relevance: "Core",
        difficulty: "Hard",
        why: "Consultants build financial models constantly — revenue projections, cost analyses, and business cases require advanced Excel and financial statement literacy."
      },
      {
        name: "Slide Writing & Presentation (Pyramid Principle)",
        relevance: "Core",
        difficulty: "Hard",
        why: "Structured communication is an industry standard — consultants are evaluated as much on their ability to communicate findings as to produce them."
      },
      {
        name: "Industry Research & Data Analysis",
        relevance: "Core",
        difficulty: "Hard",
        why: "Rapidly building knowledge of an unfamiliar industry through structured research is a daily consulting requirement."
      },
      {
        name: "Statistics & Data Interpretation",
        relevance: "Important",
        difficulty: "Hard",
        why: "Interpreting survey data, market research, and operational data to support recommendations requires statistical literacy."
      }
    ],
    tags: ["management", "business", "finance", "tech"],
    ring: 3,
    angle: 110,
  },

  // ── CREATIVE & EXPRESSION cluster ───────────────────────────────────────
  {
    id: "graphic-designer",
    title: "Designer",
    icon: "palette",
    shortTitle: "Designer",
    category: "Creative & Expression",
    cluster: "Creative & Expression",
    accent: "#9333EA",
    tagline: "Translating ideas, usability, and brand identity into visual form.",
    stream: "Any Stream",
    education: {
      level: "UG Degree",
      duration: "3–4 years",
      degrees: ["BDes", "B.Sc Visual Communication", "B.Tech Design (IITs)"],
      key_subjects: ["Design Thinking", "Typography", "Interaction Design", "Visual Communication", "User Research"],
      entrance_exams: ["NID DAT", "NIFT", "UCEED"],
      licensing: null,
    },
    jobs: ["UI/UX Designer", "Graphic Designer", "Product Designer", "Design Lead", "Creative Director"],
    progression: ["Junior Designer", "Designer", "Senior Designer", "Lead Designer", "Design Director / Head of Design"],
    entry_age: "21–23 years typically",
    work_schedule: "Office / WFH hybrid, deadline-driven",
    work_location: "Office / Studio / Remote",
    sectors: ["Tech / Startups", "Advertising / Agencies", "Media / Publishing", "Corporate Marketing"],
    employment_type: ["Private sector", "Freelance"],
    india_demand: "Very High",
    india_size: "India's design industry is growing at 18% YoY. Every startup and tech company needs dedicated design teams.",
    govt_exams: null,
    salary: {
      fresher: "Rs. 5–14 LPA",
      mid: "Rs. 18–45 LPA",
      senior: "Rs. 60L–1.5Cr",
      note: "UI/UX and Product Design roles command significant premiums over traditional graphic design.",
    },
    workLife: 3,
    demand: 5,
    creativity: 5,
    scope: "Critical capability in the digital economy. Strong freelance potential.",
    related: ["film-director", "content-creator", "architect"],
    certifications: ["Google UX Design", "Human-Computer Interaction (HCI) certs"],
    celebs: ["Jony Ive", "Rahul Vohra"],
    hurdles: {
      overall_difficulty: "Moderate",
      overall_note: "Accessible to enter but highly competitive at the top — the gap between competent and exceptional designers is visible and commercially significant.",
      items: [
        {
          title: "NID / NIFT Entrance Is Highly Creative and Competitive",
          severity: "High",
          description: "NID's Design Aptitude Test and NIFT's entrance examine creative thinking, spatial ability, and general awareness — skills that cannot be crammed in weeks. Students begin preparing one to two years in advance."
        },
        {
          title: "Portfolio Is Everything",
          severity: "Critical",
          description: "No employer hires a designer based on marks or degree alone. Your portfolio of real work — personal projects, freelance, competitions — is your actual credential. Building it takes time and initiative beyond coursework."
        },
        {
          title: "Software Proficiency Expected Immediately",
          severity: "High",
          description: "Adobe Creative Suite, Figma, and motion design tools are expected at entry level. College teaches principles — specific tool mastery is self-learned."
        },
        {
          title: "Subjectivity of Feedback",
          severity: "Medium",
          description: "Designers receive strong negative feedback on subjective grounds regularly — from clients, stakeholders, and peers. Separating personal attachment from professional iteration is a real skill that takes years to develop."
        }
      ]
    },
    subjects: [
      {
        name: "Typography & Type Design",
        relevance: "Core",
        difficulty: "Hard",
        why: "Typography is the foundation of all visual communication — poor typographic choices immediately signal amateur work."
      },
      {
        name: "Colour Theory",
        relevance: "Core",
        difficulty: "Moderate",
        why: "Understanding how colours interact, create emotion, and convey meaning is a foundational design competency."
      },
      {
        name: "Visual Hierarchy & Composition",
        relevance: "Core",
        difficulty: "Hard",
        why: "Guiding a viewer's eye through designed information is the primary function of visual design."
      },
      {
        name: "UX Research Methods",
        relevance: "Important",
        difficulty: "Hard",
        why: "UI/UX designers who cannot conduct user interviews or interpret usability tests are limited to aesthetic work — the highest-value roles require both."
      },
      {
        name: "Design History & Theory",
        relevance: "Important",
        difficulty: "Moderate",
        why: "Understanding historical design movements gives designers a vocabulary and reference framework that elevates their work."
      },
      {
        name: "Motion Design Fundamentals",
        relevance: "Helpful",
        difficulty: "Hard",
        why: "UI animation and motion graphics are increasingly expected — designers who can animate have a significant edge."
      }
    ],
    tags: ["design", "creative", "arts", "tech"],
    ring: 2,
    angle: 200,
  },
  {
    id: "film-director",
    title: "Filmmaker",
    icon: "movie",
    shortTitle: "Filmmaker",
    category: "Creative & Expression",
    cluster: "Creative & Expression",
    accent: "#9333EA",
    tagline: "Telling stories that move culture through the medium of cinema and video.",
    stream: "Any Stream",
    education: {
      level: "Diploma / Degree",
      duration: "3–4 years",
      degrees: ["Direction / Screenplay Writing (FTII)", "BA Film Studies", "Mass Communication"],
      key_subjects: ["Screenplay Writing", "Direction", "Cinematography", "Editing", "Sound Design"],
      entrance_exams: ["FTII Entrance", "SRFTI Entrance", "Whistling Woods"],
      licensing: null,
    },
    jobs: ["Director", "Screenwriter", "Cinematographer", "Film Editor", "Casting Director"],
    progression: ["Assistant Director (AD)", "Second AD", "First AD", "Associate Director", "Director"],
    entry_age: "22–26 years typically",
    work_schedule: "Intense project-based sprints, erratic hours",
    work_location: "Sets / Studios / Edit Rooms",
    sectors: ["Film Industry (Bollywood/Regional)", "OTT Platforms (Netflix/Prime)", "Advertising", "Digital Media"],
    employment_type: ["Freelance", "Self-employed", "Contract"],
    india_demand: "High",
    india_size: "India produces 1,800–2,000 films annually. OTT explosion has tripled content demand.",
    govt_exams: null,
    salary: {
      fresher: "Rs. 2–6 LPA",
      mid: "Rs. 15–50 LPA",
      senior: "Rs. 1Cr+",
      note: "Highly skewed distribution; established directors earn crores per project, beginners earn very little.",
    },
    workLife: 1,
    demand: 3,
    creativity: 5,
    scope: "High risk, high reward. A pure passion-driven career path.",
    related: ["content-creator", "journalist", "graphic-designer"],
    certifications: [],
    celebs: ["Satyajit Ray", "Zoya Akhtar", "S.S. Rajamouli"],
    hurdles: {
      overall_difficulty: "Very Hard",
      overall_note: "One of the most competitive creative fields — the financial barrier, network dependency, and time to recognition are all substantial.",
      items: [
        {
          title: "FTII Entrance Is Among India's Most Competitive Creative Exams",
          severity: "High",
          description: "The Film and Television Institute of India has fewer than thirty direction seats per batch. The written test, portfolio, and interview process selects for both craft knowledge and original thinking."
        },
        {
          title: "Extremely Long Road to Directing a Feature",
          severity: "Critical",
          description: "Most directors spend five to ten years as assistant directors before getting their first independent project. The assistant director hierarchy is rigidly structured and progression is slow."
        },
        {
          title: "Financial Reality of Independent Film",
          severity: "Critical",
          description: "Independent films in India rarely recover their costs. Most directors supplement income through advertising, web series, or corporate films during their career-building years."
        },
        {
          title: "Network Is Non-Optional",
          severity: "High",
          description: "The Indian film industry runs on relationships. Talent alone does not create access to budgets, producers, or distribution. Film school alumni networks are genuinely career-determining."
        },
        {
          title: "Digital Has Democratised Entry But Increased Competition",
          severity: "Medium",
          description: "YouTube and OTT have lowered the barrier to making films — but they have also made the attention economy far more crowded. Standing out requires both quality and strategic distribution thinking."
        }
      ]
    },
    subjects: [
      {
        name: "Screenplay Writing",
        relevance: "Core",
        difficulty: "Very Hard",
        why: "A director who cannot construct a screenplay cannot articulate what they want to make — writing is thinking made visible in cinema."
      },
      {
        name: "Film History & Theory",
        relevance: "Core",
        difficulty: "Hard",
        why: "Understanding the visual grammar of cinema — montage, continuity, and the works of master filmmakers — is how directors develop a personal language."
      },
      {
        name: "Cinematography Basics",
        relevance: "Core",
        difficulty: "Hard",
        why: "Directors must communicate precise visual intentions to cinematographers — understanding lenses, lighting, and composition is necessary for this."
      },
      {
        name: "Editing Theory (Montage & Structure)",
        relevance: "Core",
        difficulty: "Hard",
        why: "Films are ultimately made in the editing room — understanding temporal pacing and structural storytelling is a directorial skill."
      },
      {
        name: "Sound Design & Music",
        relevance: "Important",
        difficulty: "Moderate",
        why: "A significant portion of a film's emotional impact is sound — directors who ignore this dimension produce technically competent but emotionally flat work."
      }
    ],
    tags: ["film", "creative", "arts", "content"],
    ring: 2,
    angle: 215,
  },
  {
    id: "content-creator",
    title: "Content Creator",
    icon: "play_circle",
    shortTitle: "Creator",
    category: "Creative & Expression",
    cluster: "Creative & Expression",
    accent: "#9333EA",
    tagline: "Building digital communities and media empires around niche interests.",
    stream: "Any Stream",
    education: {
      level: "Portfolio-based",
      duration: "Ongoing",
      degrees: ["No formal degree required", "Mass Communication BA optional"],
      key_subjects: ["Video Editing", "Copywriting", "Audience Analytics", "Brand Strategy", "Community Management"],
      entrance_exams: [],
      licensing: null,
    },
    jobs: ["YouTuber", "Podcaster", "Social Media Strategist", "Brand Content Lead", "Newsletter Writer"],
    progression: ["Creator (0–10K)", "Mid-tier Creator", "Established Creator", "Brand Partnership Revenue", "Agency / Media Company"],
    entry_age: "Any age",
    work_schedule: "Self-managed, often requires constant online presence",
    work_location: "Home Studio / On-location",
    sectors: ["Digital Media", "Entertainment", "Education", "Lifestyle"],
    employment_type: ["Self-employed", "Freelance"],
    india_demand: "Very High",
    india_size: "India has 550M+ social media users. Creator economy valued at $600M in India, growing at 25% YoY.",
    govt_exams: null,
    salary: {
      fresher: "Rs. 2–8 LPA",
      mid: "Rs. 15–40 LPA",
      senior: "Rs. 1Cr+",
      note: "Earnings come from AdSense, brand deals, and proprietary products. Extreme income inequality.",
    },
    workLife: 2,
    demand: 5,
    creativity: 5,
    scope: "The modern media landscape. Requires immense consistency and adaptability.",
    related: ["journalist", "film-director", "graphic-designer"],
    certifications: ["YouTube Creator Academy", "Meta Blueprint"],
    celebs: ["Bhuvan Bam (BB Ki Vines)", "Ranveer Allahbadia", "Prajakta Koli"],
    hurdles: {
      overall_difficulty: "Moderate",
      overall_note: "Low barrier to entry, extremely high barrier to sustainable income — the gap between making content and making a living from it is larger than it appears.",
      items: [
        {
          title: "Monetisation Takes Much Longer Than It Looks",
          severity: "Critical",
          description: "Most creators who appear to be overnight successes had years of low-visibility content before their inflection point. YouTube AdSense revenue at modest subscriber counts is typically not a liveable salary."
        },
        {
          title: "Algorithm Dependency",
          severity: "High",
          description: "Platform algorithm changes can halve a creator's reach overnight. Building a platform-independent audience through email lists or communities is a professional necessity."
        },
        {
          title: "Content Consistency Demands",
          severity: "High",
          description: "The platforms reward frequency. Producing high-quality content consistently across years — while managing creative fatigue, criticism, and low-visibility periods — is a genuine endurance challenge."
        },
        {
          title: "Burnout and Public Criticism",
          severity: "High",
          description: "Public-facing work invites public criticism. Creator burnout is documented and widespread — the combination of constant output demands and social comparison creates a specific psychological strain."
        }
      ]
    },
    subjects: [
      {
        name: "Video Production & Editing",
        relevance: "Core",
        difficulty: "Moderate",
        why: "Camera operation, audio recording, and editing software are practical skills that directly determine content quality."
      },
      {
        name: "Storytelling & Narrative Structure",
        relevance: "Core",
        difficulty: "Hard",
        why: "The creators with sustainable audiences are not the ones with the best cameras — they are the ones who understand how to hold attention and build narrative."
      },
      {
        name: "SEO & Platform Algorithms",
        relevance: "Important",
        difficulty: "Moderate",
        why: "Understanding how content is discovered — search optimisation, thumbnail design, posting strategy — is the distribution layer that determines reach."
      },
      {
        name: "Personal Brand & Community Building",
        relevance: "Core",
        difficulty: "Hard",
        why: "The creator's identity, consistency of voice, and community engagement are what convert viewers to subscribers to loyal fans."
      },
      {
        name: "Basic Copywriting",
        relevance: "Important",
        difficulty: "Moderate",
        why: "Titles, descriptions, hooks, and captions are the highest-leverage writing in content creation — a weak title kills a strong video."
      }
    ],
    tags: ["content", "creative", "journalism", "performance"],
    ring: 2,
    angle: 230,
  },
  {
    id: "fashion-designer",
    title: "Fashion Designer",
    icon: "checkroom",
    shortTitle: "Fashion",
    category: "Creative & Expression",
    cluster: "Creative & Expression",
    accent: "#9333EA",
    tagline: "Defining culture and personal expression through apparel and textiles.",
    stream: "Any Stream",
    education: {
      level: "UG Degree",
      duration: "4 years",
      degrees: ["BDes Fashion Design (NIFT/NID)", "B.Sc Apparel Design", "Diploma Fashion Merchandising"],
      key_subjects: ["Pattern Making", "Textile Science", "Garment Construction", "Fashion Illustration", "Merchandising"],
      entrance_exams: ["NIFT Entrance", "NID DAT", "Pearl Academy"],
      licensing: null,
    },
    jobs: ["Fashion Designer", "Textile Designer", "Costume Designer", "Fashion Stylist", "Merchandiser"],
    progression: ["Design Assistant", "Junior Designer", "Senior Designer", "Design Head", "Creative Director"],
    entry_age: "21–24 years typically",
    work_schedule: "Studio hours, intense around collections/shows",
    work_location: "Studio / Factory / Retail",
    sectors: ["Apparel Brands", "Haute Couture", "Textile Manufacturing", "Film/TV Production"],
    employment_type: ["Private sector", "Self-employed", "Freelance"],
    india_demand: "Moderate",
    india_size: "India's fashion industry is Rs. 8 lakh crore; 3rd largest producer globally. Sustainable fashion growing strongly.",
    govt_exams: null,
    salary: {
      fresher: "Rs. 3–8 LPA",
      mid: "Rs. 12–30 LPA",
      senior: "Rs. 40L–1Cr+",
      note: "Success often requires launching an independent label, which is capital intensive.",
    },
    workLife: 3,
    demand: 3,
    creativity: 5,
    scope: "Highly competitive, but deep roots in Indian textile heritage offer global opportunities.",
    related: ["graphic-designer", "architect", "film-director"],
    certifications: [],
    celebs: ["Sabyasachi Mukherjee", "Masaba Gupta", "Anita Dongre"],
    hurdles: {
      overall_difficulty: "Hard",
      overall_note: "Highly competitive industry where talent must be combined with relentless networking and business acumen to build a sustainable career.",
      items: [
        {
          title: "NIFT Entrance Is Both Creative and Analytical",
          severity: "High",
          description: "NIFT tests Creative Ability, General Ability, and a hands-on Situation Test simultaneously. The Situation Test — where you must make something within a time limit — is unlike any other entrance exam in India."
        },
        {
          title: "Low Early-Career Pay",
          severity: "High",
          description: "Fashion design assistants earn low salaries in most cities. The fashion industry is structured to keep design assistants underpaid for years on the promise of exposure and experience."
        },
        {
          title: "Industry Network Is Career-Critical",
          severity: "High",
          description: "The Indian fashion industry is small, interconnected, and relationship-driven. NIFT's alumni network in Mumbai and Delhi is the industry's primary hiring channel."
        },
        {
          title: "Physical and Creative Demands Are Simultaneous",
          severity: "Medium",
          description: "During production and collection launches, very long workdays are standard. The combination of creative depletion and physical exhaustion is a common reason talented designers leave the industry."
        }
      ]
    },
    subjects: [
      {
        name: "Textile Science & Fabric Technology",
        relevance: "Core",
        difficulty: "Hard",
        why: "Understanding fabric behaviour, weaves, dyeing, and finishing is the technical foundation — a designer who doesn't know materials is limited to aesthetics only."
      },
      {
        name: "Fashion Illustration & Technical Drawing",
        relevance: "Core",
        difficulty: "Hard",
        why: "Communicating designs precisely to pattern cutters and manufacturers requires accurate technical illustration."
      },
      {
        name: "Pattern Making & Garment Construction",
        relevance: "Core",
        difficulty: "Very Hard",
        why: "Translating a design sketch into a wearable garment is a distinct technical skill — it requires spatial reasoning and material knowledge simultaneously."
      },
      {
        name: "Fashion History & Theory",
        relevance: "Important",
        difficulty: "Moderate",
        why: "All great designers know the history of what came before — evolution of silhouettes and cultural context of garments inform every design decision."
      },
      {
        name: "Retail Merchandising & Buying",
        relevance: "Important",
        difficulty: "Moderate",
        why: "Designers who understand commercial viability — pricing, market positioning, sell-through rates — survive better than purely aesthetically driven designers."
      }
    ],
    tags: ["design", "fashion", "creative", "arts"],
    ring: 3,
    angle: 220,
  },

  // ── PEOPLE & SOCIETY cluster ────────────────────────────────────────────
  {
    id: "ias-officer",
    title: "Civil Servant",
    icon: "account_balance",
    shortTitle: "IAS/IPS",
    category: "People & Society",
    cluster: "People & Society",
    accent: "#E8572A",
    tagline: "Administering the nation and implementing policy at the highest levels.",
    stream: "Any Stream",
    education: {
      level: "UG Degree (minimum)",
      duration: "3–4 years",
      degrees: ["Any graduation"],
      key_subjects: ["Indian History", "Geography", "Polity", "Economy", "Current Affairs", "Ethics"],
      entrance_exams: ["UPSC Civil Services"],
      licensing: null,
    },
    jobs: ["District Collector (IAS)", "Superintendent of Police (IPS)", "Foreign Service Officer (IFS)", "Income Tax Commissioner (IRS)"],
    progression: ["Probationer", "SDM / ASP", "DM / SP", "Commissioner", "Secretary", "Chief Secretary / DGP"],
    entry_age: "24–28 years typically",
    work_schedule: "24/7 responsibility, highly demanding",
    work_location: "Government Offices / Field",
    sectors: ["Government Administration", "Law Enforcement", "Diplomacy"],
    employment_type: ["Government"],
    india_demand: "N/A (Fixed vacancies)",
    india_size: "~5,000 IAS officers run a country of 1.4B people. Extraordinary reach and authority. 0.1% selection rate.",
    govt_exams: ["UPSC CSE", "State PSC"],
    salary: {
      fresher: "Rs. 12–15 LPA (CTC equivalent)",
      mid: "Rs. 20–25 LPA",
      senior: "Rs. 30L+",
      note: "Base pay is modest (starts Rs. 56k/month) but perks (housing, transport, pension, power) are unmatched.",
    },
    workLife: 1,
    demand: 5,
    creativity: 2,
    scope: "The ultimate public service role in India. Unparalleled impact.",
    related: ["lawyer", "journalist", "social-worker"],
    certifications: [],
    celebs: ["Kiran Bedi", "S. Jaishankar"],
    hurdles: {
      overall_difficulty: "Extreme",
      overall_note: "The hardest competitive examination in India by selection ratio — requires two to five years of dedicated full-time preparation for most candidates.",
      items: [
        {
          title: "Selection Rate Is Approximately 0.1 Percent",
          severity: "Critical",
          description: "Over ten lakh applicants compete for approximately one thousand positions across all services annually. Most serious candidates attempt the exam three to six times. The preparation itself is a years-long undertaking."
        },
        {
          title: "Opportunity Cost of Preparation",
          severity: "Critical",
          description: "UPSC preparation typically requires one to three years of full-time study after graduation. This means forgoing income and career experience during peak career-building years. The decision to prepare is itself a major life choice."
        },
        {
          title: "Mains Is a Different Skill from Prelims",
          severity: "High",
          description: "Prelims and Mains demand entirely different preparation strategies. Candidates who clear Prelims often fail Mains because they do not shift their study approach from MCQ to analytical essay writing."
        },
        {
          title: "Posting Uncertainty",
          severity: "Medium",
          description: "IAS officers have limited choice over their posting cadre and location. An officer allocated a particular state cadre serves there for life — geographic flexibility is not a feature of this career."
        },
        {
          title: "Political Pressures in Service",
          severity: "High",
          description: "IAS officers frequently navigate pressure from elected officials to act against their professional judgment. Transfers as punishment for honest administration are a documented reality."
        }
      ]
    },
    subjects: [
      {
        name: "Indian History (Ancient, Medieval, Modern)",
        relevance: "Core",
        difficulty: "Hard",
        why: "History forms a major component of both Prelims GS and Mains GS Paper 1 — depth of understanding, not memorisation, is what Mains demands."
      },
      {
        name: "Indian Polity & Governance",
        relevance: "Core",
        difficulty: "Hard",
        why: "Constitutional provisions, parliamentary procedures, and governance structures are tested extensively in both stages."
      },
      {
        name: "Economics (Indian Economy + Basic Macro)",
        relevance: "Core",
        difficulty: "Hard",
        why: "Economic Survey, Union Budget, and sectoral policy understanding is tested in GS Paper 3 and increasingly in Essays."
      },
      {
        name: "Essay Writing",
        relevance: "Core",
        difficulty: "Very Hard",
        why: "The UPSC Essay paper carries heavy weight — the difference between selection and rejection for many borderline candidates. Structured analytical writing must be specifically practised."
      },
      {
        name: "Current Affairs (12–18 month horizon)",
        relevance: "Core",
        difficulty: "Hard",
        why: "UPSC questions are increasingly current-affairs integrated — static knowledge alone is insufficient."
      },
      {
        name: "Ethics, Integrity & Aptitude (GS Paper 4)",
        relevance: "Core",
        difficulty: "Hard",
        why: "The Ethics paper has no fixed syllabus and tests application — most candidates underestimate it until it costs them marks."
      }
    ],
    tags: ["government", "law", "humanities", "management"],
    ring: 1,
    angle: 100,
  },
  {
    id: "journalist",
    title: "Journalist",
    icon: "newspaper",
    shortTitle: "Journalist",
    category: "People & Society",
    cluster: "People & Society",
    accent: "#E8572A",
    tagline: "Investigating facts and telling the stories that inform a democracy.",
    stream: "Arts or Any Stream",
    education: {
      level: "UG/PG Degree",
      duration: "3–5 years",
      degrees: ["BA Journalism", "BJMC", "MA Mass Communication (IIMC/XIC)", "PG Diploma Digital Journalism"],
      key_subjects: ["Reporting", "Editing", "Media Law and Ethics", "Digital Journalism", "Data Journalism"],
      entrance_exams: ["IIMC entrance", "XIC Mumbai entrance", "ACJ Chennai"],
      licensing: null,
    },
    jobs: ["Reporter/Correspondent", "News Anchor", "Investigative Journalist", "Editor", "Data Journalist"],
    progression: ["Trainee Reporter", "Reporter", "Senior Reporter", "Assistant Editor", "Editor / Bureau Chief"],
    entry_age: "21–24 years typically",
    work_schedule: "News cycle hours, unpredictable, fast-paced",
    work_location: "Newsroom / Field",
    sectors: ["Print Media", "Broadcast Media", "Digital News Platforms", "News Agencies"],
    employment_type: ["Private sector", "Freelance"],
    india_demand: "Moderate",
    india_size: "India has 100,000+ registered newspapers, 900+ TV channels. Digital news ecosystem is growing rapidly.",
    govt_exams: ["Prasar Bharati recruitment"],
    salary: {
      fresher: "Rs. 3–8 LPA",
      mid: "Rs. 12–30 LPA",
      senior: "Rs. 40–80 LPA",
      note: "Television anchors and top editors command significantly higher salaries than print reporters.",
    },
    workLife: 2,
    demand: 3,
    creativity: 4,
    scope: "Transforming industry shifting heavily towards digital and independent creator models.",
    related: ["lawyer", "content-creator", "ias-officer"],
    certifications: [],
    celebs: ["Ravish Kumar", "Faye D'Souza", "P. Zainath"],
    hurdles: {
      overall_difficulty: "Hard",
      overall_note: "Financially challenging, increasingly precarious, but intellectually one of the most demanding careers — requires both writing excellence and subject expertise.",
      items: [
        {
          title: "Declining Traditional Media Employment",
          severity: "Critical",
          description: "Indian print media has contracted significantly — many newspapers have reduced staff or closed editions. The stable journalism job of previous generations is much harder to find. Digital journalism, podcasting, and newsletters are the growth areas."
        },
        {
          title: "Low Entry-Level Salaries",
          severity: "High",
          description: "Trainee reporter salaries at regional outlets start very low. Even at national English publications, early-career journalists face significant financial pressure, which causes many talented journalists to leave for PR or content marketing."
        },
        {
          title: "Speed vs. Accuracy Tension",
          severity: "High",
          description: "Digital journalism demands immediate publication — but errors in published journalism damage credibility permanently. Managing this tension is a daily professional and ethical challenge."
        },
        {
          title: "Investigative Work Carries Real Risks",
          severity: "High",
          description: "Investigative journalists covering politics, corruption, or crime in India face professional retaliation, legal threats including defamation and sedition cases, and in extreme cases physical risk. This is documented, not hypothetical."
        }
      ]
    },
    subjects: [
      {
        name: "Reporting & News Writing",
        relevance: "Core",
        difficulty: "Hard",
        why: "The inverted pyramid structure, source verification, and clear factual prose are the primary crafts — everything else builds on this."
      },
      {
        name: "Media Law & Ethics (Defamation, RTI, Press Freedom)",
        relevance: "Core",
        difficulty: "Hard",
        why: "Journalists who don't understand defamation law, the RTI Act, and contempt of court operate in professional and legal danger."
      },
      {
        name: "Data Journalism (Spreadsheets, Basic Visualisation)",
        relevance: "Important",
        difficulty: "Moderate",
        why: "The most impactful modern journalism is data-driven — the ability to analyse government data and visualise it clearly is a major differentiator."
      },
      {
        name: "Political Science & Public Policy",
        relevance: "Core",
        difficulty: "Hard",
        why: "Reporting on government, elections, and policy without foundational knowledge of how these systems work produces superficial journalism."
      },
      {
        name: "Shorthand / Fast Note-Taking",
        relevance: "Important",
        difficulty: "Moderate",
        why: "Interview accuracy depends on capturing what was said precisely — shorthand or equivalent speed-writing is a practical professional skill."
      }
    ],
    tags: ["journalism", "content", "law", "humanities"],
    ring: 2,
    angle: 170,
  },
  {
    id: "social-worker",
    title: "Social Worker",
    icon: "volunteer_activism",
    shortTitle: "Social Wkr.",
    category: "People & Society",
    cluster: "People & Society",
    accent: "#E8572A",
    tagline: "Driving systemic change and supporting vulnerable communities on the ground.",
    stream: "Arts (preferred)",
    education: {
      level: "PG Degree",
      duration: "3–5 years",
      degrees: ["BSW", "MSW (Social Work)", "MA Development Studies", "MBA Social Entrepreneurship"],
      key_subjects: ["Community Development", "Social Policy", "Gender Studies", "Research Methods", "Social Welfare Law"],
      entrance_exams: ["TISS entrance", "JNU entrance"],
      licensing: null,
    },
    jobs: ["Community Development Officer", "NGO Programme Manager", "CSR Manager", "Policy Analyst", "Social Entrepreneur"],
    progression: ["Field Worker", "Programme Officer", "Project Manager", "Programme Director", "Executive Director / CSR Head"],
    entry_age: "23–25 years typically",
    work_schedule: "Field-heavy, requires empathy and resilience",
    work_location: "Field / Office",
    sectors: ["NGOs / Non-Profits", "Corporate CSR", "International Agencies (UN/WHO)", "Government Projects"],
    employment_type: ["NGO", "Private sector", "Government"],
    india_demand: "High",
    india_size: "India has 31 lakh registered NGOs. CSR mandate (Companies Act 2013) has created permanent corporate funding.",
    govt_exams: ["State Women and Child Development exams"],
    salary: {
      fresher: "Rs. 3–7 LPA",
      mid: "Rs. 7–15 LPA",
      senior: "Rs. 20–50 LPA",
      note: "Corporate CSR roles and UN positions pay significantly higher than grassroots NGOs.",
    },
    workLife: 3,
    demand: 4,
    creativity: 3,
    scope: "High emotional reward; essential for bridging inequality gaps.",
    related: ["psychologist", "ias-officer", "journalist"],
    certifications: [],
    celebs: ["Kailash Satyarthi", "Medha Patkar"],
    hurdles: {
      overall_difficulty: "Moderate",
      overall_note: "Emotionally demanding work with structural career constraints — the difficulty is less intellectual and more about sustaining motivation against systemic slowness.",
      items: [
        {
          title: "TISS Entrance Is Disproportionately Selective",
          severity: "High",
          description: "TISS Mumbai has one of the most rigorous social science entrance examinations in India. The written test and interview evaluate social awareness, reading, and analytical ability — not rote knowledge."
        },
        {
          title: "Financial Compensation Does Not Match Effort",
          severity: "High",
          description: "NGO salaries remain chronically low despite the sector's scale. Even skilled social workers with top-institution MSW degrees find salary progression slow compared to corporate peers."
        },
        {
          title: "Systemic Slowness Creates Burnout",
          severity: "High",
          description: "Social change moves slowly and is rarely attributable to individual effort. Practitioners who require visible, measurable impact to feel fulfilled find the work emotionally unsustainable."
        },
        {
          title: "Secondary Trauma",
          severity: "High",
          description: "Working with communities affected by poverty, abuse, disaster, or displacement creates secondary traumatic stress. Professional supervision and self-care practices are necessary for long-term practitioners."
        }
      ]
    },
    subjects: [
      {
        name: "Community Development Theory & Practice",
        relevance: "Core",
        difficulty: "Hard",
        why: "Understanding participatory development, community mobilisation, and sustainable intervention design is the professional core of social work."
      },
      {
        name: "Social Research Methods",
        relevance: "Core",
        difficulty: "Hard",
        why: "Needs assessments, programme evaluations, and impact measurement require structured research methodology."
      },
      {
        name: "Social Policy & Welfare Law",
        relevance: "Core",
        difficulty: "Hard",
        why: "Social workers must navigate rights-based frameworks, government schemes, and welfare legislation to advocate effectively for communities."
      },
      {
        name: "Gender Studies & Intersectionality",
        relevance: "Important",
        difficulty: "Moderate",
        why: "Most social issues — poverty, education, health — are gendered. Understanding intersectional identity is essential for non-harmful practice."
      },
      {
        name: "Counselling Skills & Active Listening",
        relevance: "Core",
        difficulty: "Hard",
        why: "Direct client work requires genuine listening competence — not sympathy, but structured, ethical supportive practice."
      }
    ],
    tags: ["social", "counselling", "government", "humanities"],
    ring: 3,
    angle: 170,
  },
  {
    id: "teacher-educator",
    title: "Teacher / Educator",
    icon: "school",
    shortTitle: "Educator",
    category: "People & Society",
    cluster: "People & Society",
    accent: "#E8572A",
    tagline: "Shaping the minds and capabilities of the next generation.",
    stream: "Any Stream",
    education: {
      level: "UG Degree + B.Ed / PG",
      duration: "3–5 years",
      degrees: ["BA/BSc/BCom + B.Ed", "MA/M.Sc + B.Ed", "PhD for HE teaching"],
      key_subjects: ["Pedagogy", "Child Psychology", "Curriculum Development", "Subject Specialisation"],
      entrance_exams: ["CTET", "State TET", "UGC NET"],
      licensing: "B.Ed + TET mandatory for schools; NET/PhD for colleges",
    },
    jobs: ["School Teacher", "College Lecturer", "Special Educator", "Curriculum Designer", "Edtech Content Creator"],
    progression: ["Teacher", "Senior Teacher", "Head of Department", "Vice-Principal", "Principal", "Education Director"],
    entry_age: "23–25 years typically",
    work_schedule: "School hours (academic year cycles)",
    work_location: "School / College / WFH (Edtech)",
    sectors: ["Public Schools", "Private Schools", "Universities", "Edtech Startups"],
    employment_type: ["Government", "Private sector", "Freelance"],
    india_demand: "High",
    india_size: "India has 15 lakh+ schools and 1.5 crore+ teachers. Edtech sector has created lakhs of new teaching roles.",
    govt_exams: ["CTET", "DSSSB", "KVS", "NVS"],
    salary: {
      fresher: "Rs. 3–8 LPA",
      mid: "Rs. 8–15 LPA",
      senior: "Rs. 15–30 LPA",
      note: "Top Edtech instructors and premium international school principals can earn significantly more.",
    },
    workLife: 4,
    demand: 5,
    creativity: 4,
    scope: "Stable, high societal value. Edtech is providing new avenues for scale.",
    related: ["psychologist", "social-worker", "content-creator"],
    certifications: ["Special Education Needs (SEN)"],
    celebs: ["Alakh Pandey (PhysicsWallah)", "Byju Raveendran"],
    hurdles: {
      overall_difficulty: "Moderate",
      overall_note: "Accessible to enter but genuinely demanding to do well — the gap between a mediocre and a great teacher is enormous and not addressed by most training.",
      items: [
        {
          title: "CTET / State TET Is Now Mandatory and Competitive",
          severity: "High",
          description: "The Central Teacher Eligibility Test and State TET exams are required for government school positions. Pass rates in many states are under fifteen percent — the exam is harder than most candidates expect."
        },
        {
          title: "Government Job Competition Is Intense",
          severity: "High",
          description: "KVS, NVS, and state government teacher posts attract lakhs of applicants for limited vacancies. Candidates often wait years after qualifying before a vacancy opens."
        },
        {
          title: "Private School Pay Disparity",
          severity: "High",
          description: "Private school salaries vary enormously — premium schools in metropolitan cities pay well, but many smaller private schools pay low salaries with no job security."
        },
        {
          title: "Classroom Management Is a Distinct Skill",
          severity: "Medium",
          description: "Managing a full class across a full day is physically and emotionally demanding. B.Ed training helps conceptually but practical classroom management is largely learned on the job."
        }
      ]
    },
    subjects: [
      {
        name: "Pedagogy & Teaching Methods",
        relevance: "Core",
        difficulty: "Hard",
        why: "Understanding how people learn — not just what to teach — separates effective teachers from knowledgeable ones."
      },
      {
        name: "Child Development & Educational Psychology",
        relevance: "Core",
        difficulty: "Hard",
        why: "Different age groups need different approaches — foundational frameworks of learning theory are essential for any educator."
      },
      {
        name: "Subject Matter Expertise",
        relevance: "Core",
        difficulty: "Hard",
        why: "A teacher who has shallow knowledge of their subject cannot respond effectively to good students or handle questions beyond the textbook."
      },
      {
        name: "Assessment & Evaluation Design",
        relevance: "Important",
        difficulty: "Moderate",
        why: "Creating fair, diagnostic assessments and interpreting them to inform teaching is a skill beyond following a marks scheme."
      },
      {
        name: "Inclusive Education",
        relevance: "Important",
        difficulty: "Hard",
        why: "Teaching students with learning disabilities, diverse language backgrounds, and socioeconomic differences is now a standard professional requirement."
      }
    ],
    tags: ["education", "social", "counselling", "humanities"],
    ring: 3,
    angle: 150,
  },

  // ── PHYSICAL & OUTDOORS cluster ─────────────────────────────────────────
  {
    id: "pilot",
    title: "Commercial Pilot",
    icon: "flight",
    shortTitle: "Pilot",
    category: "Physical & Outdoors",
    cluster: "Physical & Outdoors",
    accent: "#0891B2",
    tagline: "Mastering complex machinery to safely navigate the skies.",
    stream: "Science PCM (mandatory)",
    education: {
      level: "Licence / Diploma",
      duration: "18–24 months",
      degrees: ["Commercial Pilot Licence (CPL)"],
      key_subjects: ["Air Navigation", "Aviation Meteorology", "Aircraft Technical General", "Aviation Law"],
      entrance_exams: ["DGCA theory exams", "AFCAT for Air Force"],
      licensing: "CPL from DGCA is mandatory",
    },
    jobs: ["Commercial Airline Pilot", "Captain", "Charter Pilot", "Cargo Pilot", "Flying Instructor"],
    progression: ["First Officer", "Senior First Officer", "Captain (short-haul)", "Senior Captain", "Training Captain"],
    entry_age: "21–25 years typically",
    work_schedule: "Rostered shifts, highly regulated rest periods",
    work_location: "Flight Deck / Airports",
    sectors: ["Commercial Airlines", "Cargo Aviation", "Charter Services", "Defense"],
    employment_type: ["Private sector", "Government"],
    india_demand: "Very High",
    india_size: "India's aviation sector growing at 10% YoY. IndiGo/Air India ordering 1000+ aircraft. DGCA projects need for 10,000+ new pilots by 2030.",
    govt_exams: ["AFCAT (for IAF)"],
    salary: {
      fresher: "Rs. 12–18 LPA",
      mid: "Rs. 35–70 LPA",
      senior: "Rs. 80L–1.5Cr",
      note: "Training cost is Rs. 50–80 lakh — highest upfront cost of any profession.",
    },
    workLife: 2,
    demand: 5,
    creativity: 1,
    scope: "Global mobility. Strict medical and regulatory requirements.",
    related: ["research-scientist", "sports-athlete", "software-engineer"],
    certifications: ["ATPL", "Type Ratings (A320/B737)"],
    celebs: ["Captain Zoya Agarwal", "J.R.D. Tata"],
    hurdles: {
      overall_difficulty: "Very Hard",
      overall_note: "Combines the highest upfront financial cost of any profession with demanding medical, regulatory, and performance standards.",
      items: [
        {
          title: "Training Costs Are Among the Highest of Any Profession",
          severity: "Critical",
          description: "Commercial Pilot Licence training in India costs between Rs. 50 lakh and Rs. 80 lakh depending on the flying school. Most families cannot self-fund this — education loans carry high interest rates with no certainty of airline employment after completion."
        },
        {
          title: "DGCA Class 1 Medical Is Mandatory and Can End Careers",
          severity: "Critical",
          description: "Pilots must pass a rigorous DGCA Class 1 medical examination every six to twelve months. Certain conditions — including colour blindness, hypertension, or corrected vision beyond limits — permanently disqualify candidates. Medical disqualification mid-career ends flying completely."
        },
        {
          title: "Type Rating Is an Additional Cost",
          severity: "High",
          description: "After CPL, airlines require aircraft-specific Type Rating — a further significant training cost. Many airlines bond pilots for three to five years to recover this investment."
        },
        {
          title: "Lifestyle Constraints",
          severity: "High",
          description: "Irregular sleep schedules, time zone changes, being away from home for many days per month, and mandatory rest periods between duties are permanent features of the job — not a transition phase."
        },
        {
          title: "Global Aviation Cycles Create Employment Volatility",
          severity: "High",
          description: "The aviation industry is the first sector to contract in a recession or health crisis. Pilots were furloughed or laid off in enormous numbers globally during recent downturns — career security is tied to macro events outside individual control."
        }
      ]
    },
    subjects: [
      {
        name: "Physics (Mechanics, Fluid Dynamics, Thermodynamics)",
        relevance: "Core",
        difficulty: "Hard",
        why: "Aerodynamics, engine principles, and flight mechanics are all physics — understanding the science behind what you are operating is required for DGCA theory exams."
      },
      {
        name: "Air Navigation",
        relevance: "Core",
        difficulty: "Very Hard",
        why: "Navigation is a DGCA theory paper and a daily practical skill — dead reckoning, radio navigation, GPS, and instrument approaches must all be mastered."
      },
      {
        name: "Meteorology",
        relevance: "Core",
        difficulty: "Hard",
        why: "Weather is the primary operational risk in aviation — understanding METARs, TAFs, frontal systems, and icing conditions is life-critical."
      },
      {
        name: "Air Regulations (DGCA / ICAO)",
        relevance: "Core",
        difficulty: "Hard",
        why: "Aviation law, airspace structure, and operational regulations are tested in DGCA exams and govern every flight decision."
      },
      {
        name: "Mathematics (Trigonometry, Vectors)",
        relevance: "Important",
        difficulty: "Hard",
        why: "Navigation calculations, fuel planning, and performance calculations are mathematical — mental arithmetic speed is tested in practical flying."
      }
    ],
    tags: ["aviation", "engineering", "physical", "outdoors"],
    ring: 2,
    angle: 300,
  },
  {
    id: "architect",
    title: "Architect",
    icon: "architecture",
    shortTitle: "Architect",
    category: "Physical & Outdoors",
    cluster: "Physical & Outdoors",
    accent: "#0891B2",
    tagline: "Designing the physical spaces where humanity lives, works, and gathers.",
    stream: "Science PCM",
    education: {
      level: "UG Degree",
      duration: "5 years",
      degrees: ["B.Arch", "M.Arch"],
      key_subjects: ["Architectural Design", "Building Construction", "Structural Engineering", "History of Architecture", "Urban Planning"],
      entrance_exams: ["NATA", "JEE Main Paper 2 (Architecture)"],
      licensing: "CoA (Council of Architecture) registration mandatory",
    },
    jobs: ["Architect", "Urban Designer", "Interior Architect", "Landscape Architect", "Conservation Architect"],
    progression: ["Trainee Architect", "Architect", "Project Architect", "Associate Architect", "Principal / Founding Partner"],
    entry_age: "23–25 years typically",
    work_schedule: "Studio hours + Field site visits, deadline intensive",
    work_location: "Design Studio / Construction Sites",
    sectors: ["Architecture Firms", "Real Estate Developers", "Urban Planning Authorities", "Interior Design"],
    employment_type: ["Private sector", "Self-employed", "Government"],
    india_demand: "High",
    india_size: "India's construction sector is the 2nd largest employer. Smart Cities Mission driving enormous project pipeline.",
    govt_exams: ["CPWD / PWD / Town Planning exams"],
    salary: {
      fresher: "Rs. 4–9 LPA",
      mid: "Rs. 15–40 LPA",
      senior: "Rs. 50L–2Cr+",
      note: "Independent practice holds the highest earning potential but requires years to build reputation.",
    },
    workLife: 2,
    demand: 4,
    creativity: 5,
    scope: "Tangible legacy. Increasing focus on sustainable and green building.",
    related: ["graphic-designer", "research-scientist", "fashion-designer"],
    certifications: ["LEED AP", "IGBC Accredited Professional"],
    celebs: ["B.V. Doshi", "Charles Correa"],
    hurdles: {
      overall_difficulty: "Hard",
      overall_note: "A five-year degree followed by a slow-building career — architecture rewards patience and accumulation, not quick climbs.",
      items: [
        {
          title: "NATA Is a Unique Aptitude Test With No Conventional Preparation",
          severity: "High",
          description: "The National Aptitude Test for Architecture tests spatial reasoning, drawing ability, and aesthetic sensitivity — skills that cannot be crammed from textbooks. Students who have not drawn regularly since school are at a significant disadvantage."
        },
        {
          title: "Five-Year Degree Is Intensive",
          severity: "High",
          description: "B.Arch studio work involves overnight deadlines, model-making, and continuous project cycles. The workload is consistently reported as higher than most other programmes of the same length."
        },
        {
          title: "CoA Registration Plus Experience Before Independent Practice",
          severity: "High",
          description: "After a five-year degree, architects must register with the Council of Architecture and typically work for several years under a senior architect before credibly practising independently."
        },
        {
          title: "Income in Early Career Is Low Relative to Education Length",
          severity: "High",
          description: "Entry-level architects earn modest salaries after five years of demanding education. The financial return accelerates only once an architect establishes an independent practice or reaches senior project architect roles."
        }
      ]
    },
    subjects: [
      {
        name: "Structural Engineering Basics",
        relevance: "Core",
        difficulty: "Very Hard",
        why: "Architects who cannot understand structural loads, span tables, and material behaviour produce buildings that engineers must substantially redesign."
      },
      {
        name: "Architectural Design & Studio Practice",
        relevance: "Core",
        difficulty: "Very Hard",
        why: "The design studio is where architectural thinking is developed — spatial composition, section drawing, and programme resolution are trained here over five years."
      },
      {
        name: "Building Materials & Construction Technology",
        relevance: "Core",
        difficulty: "Hard",
        why: "Specifying correct materials and understanding how buildings are actually constructed is the practical competency that separates paper architects from buildable ones."
      },
      {
        name: "Environmental Design & Sustainability",
        relevance: "Important",
        difficulty: "Hard",
        why: "Passive cooling, daylighting, and thermal comfort are now required competencies — sustainable design is not optional in contemporary practice."
      },
      {
        name: "History & Theory of Architecture",
        relevance: "Core",
        difficulty: "Moderate",
        why: "The visual and intellectual vocabulary of architecture informs every design decision — from Vitruvius to contemporary theory."
      },
      {
        name: "AutoCAD / BIM (Revit)",
        relevance: "Core",
        difficulty: "Moderate",
        why: "Technical drawing software is the universal production tool — competence is assumed at entry level."
      }
    ],
    tags: ["architecture", "design", "engineering", "creative", "arts"],
    ring: 2,
    angle: 270,
  },
  {
    id: "sports-athlete",
    title: "Professional Athlete / Sports",
    icon: "sports_cricket",
    shortTitle: "Athlete",
    category: "Physical & Outdoors",
    cluster: "Physical & Outdoors",
    accent: "#0891B2",
    tagline: "Pushing the limits of physical capability and human performance.",
    stream: "Any Stream",
    education: {
      level: "Performance-based",
      duration: "Lifelong",
      degrees: ["Formal degree not required", "BPEd/BSc Sports Science for management"],
      key_subjects: ["Biomechanics", "Nutrition", "Sports Psychology", "Athletic Training"],
      entrance_exams: ["SAI trials", "State association trials"],
      licensing: "NOC from national federation",
    },
    jobs: ["Professional Cricketer / Athlete", "Sports Coach", "Sports Physiotherapist", "Sports Commentator", "Sports Manager"],
    progression: ["State Level", "National Level", "International Level", "Coaching/Management", "Broadcasting"],
    entry_age: "16–20 years typically",
    work_schedule: "Intense physical training, travel-heavy",
    work_location: "Training Facilities / Stadiums / Global",
    sectors: ["Professional Leagues (IPL/ISL)", "National Federations", "Sports Academies", "Sports Broadcasting"],
    employment_type: ["Contract", "Freelance", "Government (Sports Quota)"],
    india_demand: "Growing rapidly",
    india_size: "Cricket is a Rs. 15,000 crore industry. Olympic sports growing with TOPS funding. Franchise leagues expanding.",
    govt_exams: ["Railways/Defense/PSU sports quota recruitment"],
    salary: {
      fresher: "Rs. 3–15 LPA (State/Club)",
      mid: "Rs. 20L–18Cr (IPL/Franchise)",
      senior: "Rs. 1–7Cr/year (National retainers)",
      note: "Extreme winner-take-all dynamics. Commercial endorsements multiply earnings for top tier.",
    },
    workLife: 1,
    demand: 2,
    creativity: 3,
    scope: "Short career span necessitates transitioning to coaching, management, or business post-retirement.",
    related: ["pilot", "social-worker", "journalist"],
    certifications: ["NIS Coaching Diploma", "CSCS"],
    celebs: ["Virat Kohli", "Neeraj Chopra", "P.V. Sindhu"],
    hurdles: {
      overall_difficulty: "Extreme",
      overall_note: "Success is determined by a combination of talent, timing, funding, and factors outside individual control — the career window is narrow and unforgiving.",
      items: [
        {
          title: "Career Window Is Extremely Short",
          severity: "Critical",
          description: "Most sports careers peak between ages eighteen and thirty. A career-ending injury early means starting a second career with limited formal qualifications. Planning a post-playing career from the beginning is a professional necessity."
        },
        {
          title: "Outside Cricket, Funding Is Severely Limited",
          severity: "Critical",
          description: "India's sports funding is overwhelmingly concentrated in cricket. Other sports receive TOPS support for elite athletes — but the transition from state-level to national-level is a funding cliff edge."
        },
        {
          title: "Selection Politics in Indian Sports",
          severity: "High",
          description: "Selection at state and national levels is not purely meritocratic in all sports. Geographical bias, coach relationships, and institutional politics are documented factors — requiring athletes to perform significantly above the bar to be undeniable."
        },
        {
          title: "Physical and Psychological Pressure",
          severity: "High",
          description: "High-performance sport creates chronic physical stress and significant psychological pressure — performance anxiety, injury management, and identity challenges on non-selection are widespread among serious athletes."
        }
      ]
    },
    subjects: [
      {
        name: "Sports Science & Exercise Physiology",
        relevance: "Core",
        difficulty: "Hard",
        why: "Understanding your own body — energy systems, recovery, and conditioning principles — allows athletes to train smarter, not just harder."
      },
      {
        name: "Nutrition & Sports Diet",
        relevance: "Core",
        difficulty: "Moderate",
        why: "Performance at elite level is significantly determined by nutrition — macro and micronutrient management, hydration, and timing are professional skills."
      },
      {
        name: "Sport-Specific Technical Skills",
        relevance: "Core",
        difficulty: "Very Hard",
        why: "Technical mastery of your sport is the primary competency and requires thousands of hours to develop — there is no shortcut."
      },
      {
        name: "Sports Psychology",
        relevance: "Important",
        difficulty: "Hard",
        why: "Mental skills — visualisation, focus under pressure, resilience after failure — differentiate athletes of similar physical ability at elite level."
      },
      {
        name: "Sports Management & Career Planning",
        relevance: "Helpful",
        difficulty: "Moderate",
        why: "Athletes who understand coaching, sports administration, commentating, or agency work have structured post-playing career options rather than falling off a professional cliff."
      }
    ],
    tags: ["sports", "physical", "performance", "outdoors"],
    ring: 3,
    angle: 300,
  },
  {
    id: "game-developer",
    title: "Game Developer",
    icon: "sports_esports",
    shortTitle: "Game Dev",
    category: "Technology & Data",
    cluster: "Technology & Data",
    accent: "#2563EB",
    tagline: "Engineering interactive digital worlds and entertainment experiences.",
    stream: "Science PCM or Any Stream",
    education: {
      level: "UG Degree",
      duration: "3–4 years",
      degrees: ["B.Tech Game Technology", "BDes Game Design", "BA Interactive Media"],
      key_subjects: ["C++ / C#", "Game Physics", "3D Modeling", "Level Design", "Unreal/Unity Engines"],
      entrance_exams: ["JEE Main", "NID / Srishti"],
      licensing: null,
    },
    jobs: ["Game Developer", "Game Designer", "Level Designer", "VR/AR Developer", "Esports Manager"],
    progression: ["Junior Dev", "Game Developer", "Senior Dev", "Lead Developer", "Creative Director"],
    entry_age: "21–24 years typically",
    work_schedule: "Office/WFH, extreme crunch periods before releases",
    work_location: "Office / Remote",
    sectors: ["Gaming Studios", "Esports Companies", "VR/AR Tech", "Mobile Gaming (Real Money)"],
    employment_type: ["Private sector", "Freelance", "Indie Studio"],
    india_demand: "Emerging to High",
    india_size: "India's gaming industry crossed Rs. 25,000 crore in 2023 — 100% growth in 4 years.",
    govt_exams: null,
    salary: {
      fresher: "Rs. 5–12 LPA",
      mid: "Rs. 18–40 LPA",
      senior: "Rs. 50L–1Cr+",
      note: "Global remote work is common. Real Money Gaming (RMG) sector pays highest in India.",
    },
    workLife: 2,
    demand: 4,
    creativity: 5,
    scope: "Fast-growing sector merging storytelling, art, and cutting-edge tech.",
    related: ["software-engineer", "film-director", "graphic-designer"],
    certifications: ["Unity Certified", "Unreal Engine Authorized"],
    celebs: ["Gabe Newell", "Hideo Kojima"],
    hurdles: {
      overall_difficulty: "Hard",
      overall_note: "Technically demanding with a young Indian industry — the opportunity is large but the infrastructure for career development is thinner than global markets.",
      items: [
        {
          title: "Crunch Culture Is Industry-Wide",
          severity: "High",
          description: "Game development is globally notorious for crunch — extended periods of very long weeks before a game release. This is an industry-structural problem, not company-specific, and contributes to significant burnout rates."
        },
        {
          title: "Indian Gaming Industry Still Maturing",
          severity: "High",
          description: "India's large gaming companies are primarily mobile and casual — AAA game development is largely absent. Serious developers often need to target international markets or studios."
        },
        {
          title: "Portfolio Must Be Playable",
          severity: "Critical",
          description: "Unlike a designer who shows images, a game developer must show working games. Completing and shipping small games — even simple ones — is the only credible portfolio in this industry."
        },
        {
          title: "Multi-Discipline Requirement",
          severity: "Medium",
          description: "A game developer must understand programming, basic art principles, physics, audio, and UX simultaneously. The breadth required to make even a simple game is higher than most software development disciplines."
        }
      ]
    },
    subjects: [
      {
        name: "Game Engine (Unity / Unreal)",
        relevance: "Core",
        difficulty: "Hard",
        why: "Unity and Unreal are the industry standard tools — deep engine knowledge is the primary technical skill employers evaluate."
      },
      {
        name: "Linear Algebra & 3D Mathematics",
        relevance: "Core",
        difficulty: "Very Hard",
        why: "Rotation matrices, quaternions, and coordinate transformations are the mathematics of 3D space — misunderstanding them causes fundamental rendering and physics errors."
      },
      {
        name: "Physics & Game Physics Engines",
        relevance: "Core",
        difficulty: "Hard",
        why: "Collision detection, rigid body dynamics, and physics simulations are core game mechanics — understanding both the physics and the implementation is required."
      },
      {
        name: "Programming (C# / C++ / Python)",
        relevance: "Core",
        difficulty: "Hard",
        why: "Game logic, AI behaviours, and performance optimisation require strong programming — games are among the most performance-sensitive software applications."
      },
      {
        name: "Shader Programming (GLSL / HLSL)",
        relevance: "Important",
        difficulty: "Very Hard",
        why: "Visual quality in games is largely determined by shader code — graphics programmers who understand shaders are among the most sought-after in the industry."
      }
    ],
    tags: ["tech", "creative", "design", "engineering"],
    ring: 3,
    angle: 330,
  },
  {
    id: "chef-culinary",
    title: "Chef / Culinary Arts",
    icon: "restaurant",
    shortTitle: "Chef",
    category: "Physical & Outdoors",
    cluster: "Physical & Outdoors",
    accent: "#0891B2",
    tagline: "Mastering the chemistry of flavor and the art of hospitality.",
    stream: "Any Stream",
    education: {
      level: "Diploma / UG Degree",
      duration: "3 years",
      degrees: ["BHM (Bachelor of Hotel Management)", "BSc Culinary Arts", "Diploma Culinary Arts"],
      key_subjects: ["Classical Cuisine", "Patisserie", "Kitchen Management", "Food Science", "Nutrition"],
      entrance_exams: ["NCHMCT JEE"],
      licensing: "FSSAI compliance for establishments",
    },
    jobs: ["Sous Chef", "Executive Chef", "Pastry Chef", "Food Stylist", "Restaurant Owner"],
    progression: ["Commis Chef", "Demi Chef", "Chef de Partie", "Sous Chef", "Head Chef", "Executive Chef"],
    entry_age: "21–23 years typically",
    work_schedule: "Long hours, late nights, weekends, physically demanding",
    work_location: "Commercial Kitchens",
    sectors: ["Fine Dining / Hotels", "Cloud Kitchens", "Cruise Lines", "Food Media"],
    employment_type: ["Private sector", "Self-employed"],
    india_demand: "High",
    india_size: "India's food service industry is Rs. 5.99 lakh crore. Hotel and restaurant sector has 7.5 million employees.",
    govt_exams: ["ITDC Recruitment"],
    salary: {
      fresher: "Rs. 2–6 LPA",
      mid: "Rs. 10–25 LPA",
      senior: "Rs. 30–80 LPA",
      note: "Executive Chefs at 5-star properties or successful restaurateurs earn significantly more.",
    },
    workLife: 1,
    demand: 4,
    creativity: 5,
    scope: "High pressure, requires passion. Great opportunities for entrepreneurship (cloud kitchens).",
    related: ["fashion-designer", "content-creator", "entrepreneur"],
    certifications: ["WSET (Wine/Spirits)", "Food Safety Certs"],
    celebs: ["Vikas Khanna", "Ranveer Brar", "Sanjeev Kapoor"],
    hurdles: {
      overall_difficulty: "Moderate",
      overall_note: "Physically demanding with slow financial progression — the real difficulty is surviving the early career grind long enough to reach creative roles.",
      items: [
        {
          title: "NCHMCT JEE for IHM Is Competitive But Accessible",
          severity: "Medium",
          description: "The Joint Entrance Exam for India's Institutes of Hotel Management is competitive for top institutions but far less brutal than engineering or medical entrances — consistent preparation over a few months is typically sufficient."
        },
        {
          title: "Early Career Is Physically Gruelling",
          severity: "Critical",
          description: "Commis chefs in professional kitchens work very long shifts, often six days a week, in high-heat and high-pressure environments. Physical stamina, stress tolerance, and the ability to follow strict hierarchy are prerequisites — not optional."
        },
        {
          title: "Low Entry Salaries",
          severity: "High",
          description: "Starting chef salaries in India are low. The financial return significantly improves only after several years of experience, specialisation, or moving to premium hotel properties."
        },
        {
          title: "Creative Authority Comes Late",
          severity: "High",
          description: "Junior chefs execute others' menus for years. The hierarchy of professional kitchens means creative input — your own dishes, your own sections — comes after years of execution work."
        }
      ]
    },
    subjects: [
      {
        name: "Classical & Contemporary Cooking Techniques",
        relevance: "Core",
        difficulty: "Hard",
        why: "The French culinary technique foundation — stocks, sauces, knife skills, heat management — underlies all professional cooking regardless of cuisine type."
      },
      {
        name: "Food Science & Chemistry",
        relevance: "Important",
        difficulty: "Hard",
        why: "Understanding why heat changes protein structure, why emulsification works, and how fermentation functions allows chefs to innovate rather than just replicate recipes."
      },
      {
        name: "Nutrition & Food Safety (HACCP)",
        relevance: "Core",
        difficulty: "Moderate",
        why: "HACCP is the mandatory food safety framework — a chef who produces unsafe food creates serious professional and legal liability."
      },
      {
        name: "Pastry & Baking Science",
        relevance: "Important",
        difficulty: "Very Hard",
        why: "Pastry is the most technically precise culinary discipline — measurements, temperatures, and timing must be exact in ways that savoury cooking does not require."
      },
      {
        name: "Menu Planning & Cost Control",
        relevance: "Important",
        difficulty: "Moderate",
        why: "A chef who cannot control food cost — the ratio of ingredient cost to selling price — cannot run a viable kitchen regardless of culinary ability."
      }
    ],
    tags: ["culinary", "craft", "creative", "management"],
    ring: 3,
    angle: 250,
  }
]