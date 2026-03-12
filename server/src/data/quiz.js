export const QUIZ = [
  {
    id: 1,
    skippable: true,
    icon: "self_improvement",
    question: "When you have a completely free Saturday with no obligations — what do you gravitate towards?",
    subtext: "Not what you think you should do. What you actually end up doing.",
    dimension: "activity_preference",
    options: [
      { label: "A", title: "Making or building something tangible", description: "Cooking, crafting, fixing things, building a side project, gardening.", tags: ["craft", "engineering", "architecture", "culinary", "design"] },
      { label: "B", title: "Reading, writing, or researching deeply", description: "Getting lost in a book, writing something, falling down a rabbit hole online.", tags: ["law", "journalism", "research", "content", "humanities"] },
      { label: "C", title: "Connecting — calling people, meeting up, being around others", description: "Your energy comes from people, conversation, being social.", tags: ["social", "healthcare", "counselling", "education", "events"] },
      { label: "D", title: "Solving a problem or puzzle that's been bothering you", description: "Debugging, strategising, figuring something out systematically.", tags: ["tech", "data-science", "finance", "research", "engineering"] },
      { label: "E", title: "Creating something expressive — art, music, video, writing", description: "You need an outlet for ideas that don't fit into logic.", tags: ["creative", "design", "film", "music", "content", "arts"] },
      { label: "F", title: "Moving — sport, exercise, being physical or outdoors", description: "Stillness doesn't suit you. You think better when your body is engaged.", tags: ["sports", "aviation", "physical", "outdoors"] },
    ]
  },
  {
    id: 2,
    skippable: true,
    icon: "emoji_objects",
    question: "A close friend has a serious problem. What do you find yourself doing?",
    subtext: "Notice your instinct — not what you wish you did.",
    dimension: "interpersonal_style",
    options: [
      { label: "A", title: "Listening carefully and making them feel understood first", description: "You know the solution isn't the point yet. Being heard matters more.", tags: ["counselling", "social", "healthcare", "education"] },
      { label: "B", title: "Researching and bringing back information or options", description: "You feel most helpful when you have something concrete to offer.", tags: ["research", "law", "data-science", "finance"] },
      { label: "C", title: "Making them laugh or lifting the mood somehow", description: "You defuse heaviness naturally and intuitively.", tags: ["content", "performance", "film", "creative"] },
      { label: "D", title: "Helping them think through it step by step logically", description: "You trust structure. A clear framework helps.", tags: ["tech", "engineering", "management", "finance"] },
      { label: "E", title: "Taking action on their behalf — calling someone, organising things", description: "You'd rather do something than talk about doing something.", tags: ["management", "entrepreneurship", "government", "events"] },
      { label: "F", title: "Offering a creative reframe — a new way of seeing the situation", description: "You often see angles others miss entirely.", tags: ["design", "arts", "psychology", "journalism"] },
    ]
  },
  {
    id: 3,
    skippable: false,
    icon: "monitor_heart",
    question: "Which kind of achievement feels most satisfying to you personally?",
    subtext: "Not what sounds impressive. What actually gives you that quiet 'yes' feeling.",
    dimension: "core_motivation",
    options: [
      { label: "A", title: "Building something that still exists and works years later", description: "Legacy, permanence, something that outlasts the moment.", tags: ["engineering", "architecture", "tech", "entrepreneurship"] },
      { label: "B", title: "Helping someone through a genuinely hard time", description: "The direct, personal impact of being there for someone.", tags: ["healthcare", "counselling", "social", "education"] },
      { label: "C", title: "Being recognised as excellent in your field", description: "Mastery and reputation matter deeply to you.", tags: ["sports", "performance", "research", "law", "arts"] },
      { label: "D", title: "Creating something that moves people emotionally", description: "Art, story, music, design — the kind of thing that stays with someone.", tags: ["film", "creative", "design", "music", "content", "arts"] },
      { label: "E", title: "Figuring out a complex problem that had no obvious answer", description: "The intellectual satisfaction of cracking something hard.", tags: ["research", "data-science", "tech", "finance"] },
      { label: "F", title: "Organising something successfully — an event, a team, a goal", description: "Execution and coordination energise you.", tags: ["management", "entrepreneurship", "events", "government"] },
    ]
  },
  {
    id: 4,
    skippable: true,
    icon: "location_on",
    question: "You're most in your element when you're...",
    subtext: "Choose the environment where time genuinely disappears for you.",
    dimension: "environment_fit",
    options: [
      { label: "A", title: "Alone, deep in focused work with a clear goal", description: "No interruptions. Just you and the problem.", tags: ["research", "tech", "data-science", "design", "writing"] },
      { label: "B", title: "In a small team collaborating toward something together", description: "The energy of shared momentum — not too many people, not alone.", tags: ["tech", "creative", "film", "entrepreneurship"] },
      { label: "C", title: "In front of people — presenting, teaching, performing, leading", description: "You come alive when there's an audience or a group to address.", tags: ["law", "education", "performance", "content", "sports"] },
      { label: "D", title: "Out in the field — meeting people, visiting places, never static", description: "A desk is a punishment. You need movement and variety.", tags: ["journalism", "aviation", "social", "government", "events"] },
      { label: "E", title: "In structured systems — meetings, processes, frameworks", description: "You operate best when there are clear roles and defined pathways.", tags: ["finance", "management", "government", "engineering"] },
      { label: "F", title: "In a creative studio or workshop environment", description: "The physical space of making things — messy, tactile, expressive.", tags: ["design", "arts", "architecture", "culinary", "fashion"] },
    ]
  },
  {
    id: 5,
    skippable: false,
    icon: "trending_up",
    question: "In ten years, what kind of life would feel genuinely successful to you?",
    subtext: "Strip away what impresses others. What does YOUR definition look like?",
    dimension: "life_values",
    options: [
      { label: "A", title: "Financial security — real comfort, no money stress, options", description: "Stability and the freedom that comes from it.", tags: ["finance", "tech", "engineering", "management", "law"] },
      { label: "B", title: "Deep expertise — being the person people come to for something", description: "Known for something specific and exceptional.", tags: ["research", "law", "healthcare", "data-science", "sports"] },
      { label: "C", title: "Creative output — a body of work you are proud of", description: "Things you made, wrote, designed, built — a catalogue.", tags: ["creative", "design", "film", "content", "arts", "architecture"] },
      { label: "D", title: "Visible impact — you can point to real change you caused", description: "In society, in someone's life, in a community.", tags: ["social", "government", "education", "healthcare", "journalism"] },
      { label: "E", title: "Autonomy — no boss, no fixed hours, your own terms", description: "Independence above everything else.", tags: ["entrepreneurship", "content", "sports", "creative", "aviation"] },
      { label: "F", title: "Meaningful relationships — the people around your work matter", description: "Colleagues, clients, community — human connection at the centre.", tags: ["counselling", "education", "social", "management", "events"] },
    ]
  },
  {
    id: 6,
    skippable: true,
    icon: "psychology_alt",
    question: "How do you prefer to learn something completely new?",
    subtext: "Think about the last time you actually learned something well.",
    dimension: "learning_style",
    options: [
      { label: "A", title: "Read, research, understand the theory deeply first", description: "You need the conceptual foundation before you can act.", tags: ["research", "law", "humanities", "finance", "data-science"] },
      { label: "B", title: "Jump in and learn from failures in real time", description: "Doing beats theorising. You iterate your way to competence.", tags: ["entrepreneurship", "tech", "sports", "creative", "culinary"] },
      { label: "C", title: "Watch someone skilled do it, then imitate and refine", description: "Observation and modelling work better than abstract instruction.", tags: ["design", "film", "arts", "performance", "medicine"] },
      { label: "D", title: "Take a structured course or programme with clear milestones", description: "You prefer organised learning with measurable progress.", tags: ["engineering", "management", "finance", "government", "aviation"] },
      { label: "E", title: "Discuss it with others — your understanding deepens through conversation", description: "Teaching and talking clarify your thinking.", tags: ["education", "counselling", "social", "law"] },
      { label: "F", title: "Find your own system — you figure out the method that works for you", description: "Personalised, self-directed, and idiosyncratic.", tags: ["research", "tech", "arts", "data-science"] },
    ]
  },
  {
    id: 7,
    skippable: false,
    icon: "balance",
    question: "When a decision involves real uncertainty — no guaranteed outcome — what do you do?",
    subtext: "This question is about your genuine default, not what you aspire to.",
    dimension: "risk_relationship",
    options: [
      { label: "A", title: "Research until I can significantly reduce the uncertainty", description: "Risk is acceptable only after it's been mapped out as much as possible.", tags: ["finance", "research", "law", "engineering", "data-science"] },
      { label: "B", title: "Go with my gut — I trust my instincts on things like this", description: "Analysis paralysis is worse than a wrong bet.", tags: ["entrepreneurship", "sports", "content", "creative"] },
      { label: "C", title: "Talk to people who've done it — lived experience matters most", description: "Frameworks are less useful than someone who has actually been there.", tags: ["social", "education", "counselling", "management"] },
      { label: "D", title: "Look for the option with the clearest, most proven pathway", description: "You'd rather progress slowly on solid ground than quickly on sand.", tags: ["government", "healthcare", "engineering", "aviation", "finance"] },
      { label: "E", title: "Embrace it — uncertainty means opportunity and I find it energising", description: "You perform better when the outcome isn't guaranteed.", tags: ["entrepreneurship", "sports", "arts", "creative", "journalism"] },
      { label: "F", title: "Make a reversible move first — test before committing fully", description: "Small experiments. Keep options open.", tags: ["tech", "design", "data-science", "research"] },
    ]
  },
  {
    id: 8,
    skippable: true,
    icon: "groups",
    question: "In a team working on something important, what role do you naturally end up in?",
    subtext: "Not the role you were assigned. The one you gravitate toward.",
    dimension: "team_role",
    options: [
      { label: "A", title: "The one who takes charge and sets direction", description: "Decisions get made when you're around. Leadership is instinctive.", tags: ["management", "entrepreneurship", "government", "law"] },
      { label: "B", title: "The specialist — deep competence in one domain the team needs", description: "You don't need to run things. You need to be the best at your part.", tags: ["research", "tech", "design", "law", "healthcare", "data-science"] },
      { label: "C", title: "The connector — keeping people aligned and morale high", description: "You sense when dynamics are off and fix them before they break.", tags: ["social", "counselling", "education", "management", "events"] },
      { label: "D", title: "The creative — generating ideas others hadn't thought of", description: "You're less interested in execution, more in possibility.", tags: ["design", "creative", "film", "content", "arts"] },
      { label: "E", title: "The executor — the one who actually gets things done", description: "Meetings and discussions are fine but you prefer to be doing.", tags: ["engineering", "management", "entrepreneurship", "aviation"] },
      { label: "F", title: "The critic — asking the uncomfortable questions that improve the outcome", description: "You see problems clearly and feel responsible for naming them.", tags: ["law", "journalism", "research", "finance"] },
    ]
  },
  {
    id: 9,
    icon: "public",
    skippable: false,
    question: "What kind of problem would you most want to spend your life working on?",
    subtext: "Scale and domain — not necessarily your exact role in it.",
    dimension: "impact_orientation",
    options: [
      { label: "A", title: "Human health and wellbeing — illness, mental health, longevity", description: "The body and mind as territories to understand and heal.", tags: ["healthcare", "medicine", "counselling", "research", "pharma"] },
      { label: "B", title: "How people learn and develop throughout their lives", description: "Education, capability, growth as lifelong pursuits.", tags: ["education", "social", "counselling", "content", "humanities"] },
      { label: "C", title: "How systems work — economies, cities, governments, institutions", description: "The complex machinery that organizes society.", tags: ["finance", "government", "law", "management", "journalism"] },
      { label: "D", title: "Technology and what it makes possible", description: "Software, hardware, AI, infrastructure — the levers of the future.", tags: ["tech", "data-science", "engineering", "research"] },
      { label: "E", title: "Culture and expression — what stories we tell, what beauty we make", description: "Art, media, design as ways of understanding the world.", tags: ["film", "arts", "design", "creative", "content", "journalism"] },
      { label: "F", title: "Commerce and value creation — building things that sustain themselves", description: "The dynamics of business, markets, and making ideas viable.", tags: ["entrepreneurship", "management", "finance", "marketing"] },
    ]
  },
  {
    id: 10,
    icon: "school",
    skippable: false,
    question: "Honestly — which of these felt most like your territory in school?",
    subtext: "Not your best marks. The subjects you were actually curious about.",
    dimension: "subject_affinity",
    options: [
      { label: "A", title: "Maths, Physics, or Computer Science", description: "Logic, systems, proofs, and patterns.", tags: ["tech", "engineering", "data-science", "aviation", "finance", "research"] },
      { label: "B", title: "Biology, Chemistry, or Environmental Science", description: "Living systems, molecules, ecosystems.", tags: ["healthcare", "medicine", "research", "pharma", "environment"] },
      { label: "C", title: "History, Civics, Political Science, or Geography", description: "Why the world is how it is and who shaped it.", tags: ["law", "government", "journalism", "humanities", "social"] },
      { label: "D", title: "Economics, Business Studies, or Accountancy", description: "How value is created, measured, and moved.", tags: ["finance", "management", "entrepreneurship", "law"] },
      { label: "E", title: "Literature, Language, Linguistics, or Communication", description: "Words as tools — for persuasion, expression, and meaning.", tags: ["law", "content", "journalism", "humanities", "education", "creative"] },
      { label: "F", title: "Fine Arts, Music, Physical Education, or Vocational subjects", description: "Learning that lived in your hands and body, not just your mind.", tags: ["arts", "sports", "design", "film", "culinary", "performance", "fashion"] },
    ]
  },
  {
    id: 11,
    skippable: true,
    icon: "nightlife",
    question: "When a project is finally done and successful — what's the part that mattered most to you?",
    subtext: "The thing you'd want people to say, or that you'd think about quietly.",
    dimension: "recognition_type",
    options: [
      { label: "A", title: "How well-made it is — the craft and quality", description: "You care about the standard, not the reception.", tags: ["design", "engineering", "research", "arts", "architecture"] },
      { label: "B", title: "How many people it reached and affected", description: "Scale of impact is what makes something meaningful.", tags: ["content", "journalism", "tech", "entrepreneurship", "government"] },
      { label: "C", title: "What you personally learned or grew through doing it", description: "The project as a vehicle for your own development.", tags: ["research", "education", "creative", "sports", "counselling"] },
      { label: "D", title: "That it came together — the coordination, the execution", description: "Process matters. When a complex thing runs smoothly, that's beauty.", tags: ["management", "events", "aviation", "engineering"] },
      { label: "E", title: "The team and relationships built through it", description: "Who you worked with matters as much as what you made.", tags: ["social", "education", "counselling", "management"] },
      { label: "F", title: "That it was yours — your vision, your voice, your name on it", description: "Authorship and ownership give the work meaning.", tags: ["entrepreneurship", "creative", "arts", "journalism", "film"] },
    ]
  },
  {
    id: 12,
    icon: "explore",
    skippable: false,
    question: "Which of these sentences describes something you've actually felt, even once?",
    subtext: "The one that has a small recognition in it — not the one you wish were true.",
    dimension: "identity_signal",
    options: [
      { label: "A", title: "I fixed something and felt a quiet pride that it worked", description: "Technical or practical problem-solving.", tags: ["engineering", "tech", "architecture", "craft", "aviation"] },
      { label: "B", title: "I said something that made someone feel genuinely understood", description: "Empathy as a skill, not just a trait.", tags: ["counselling", "social", "healthcare", "education"] },
      { label: "C", title: "I wrote or said something and thought — yes, that's exactly it", description: "Getting the words right matters deeply.", tags: ["law", "journalism", "content", "humanities", "creative"] },
      { label: "D", title: "I made something and felt it was genuinely beautiful", description: "Aesthetic satisfaction — visual, auditory, physical.", tags: ["design", "arts", "architecture", "film", "fashion"] },
      { label: "E", title: "I understood a system more deeply than most people around me", description: "Analytical insight — seeing the structure others miss.", tags: ["research", "data-science", "finance", "tech", "law"] },
      { label: "F", title: "I got something done that others said couldn't be done", description: "Execution under pressure. Delivery as identity.", tags: ["sports", "entrepreneurship", "management", "government"] },
    ]
  },
]
