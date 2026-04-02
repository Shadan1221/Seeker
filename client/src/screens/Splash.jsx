import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import FloatingPaths from '../components/layout/FloatingPaths.jsx'
import SeekerNav from '../components/layout/SeekerNav.jsx'
import Icon from '../components/ui/Icon.jsx'
import { useAuth } from '../hooks/useAuth.js'
import useAppStore from '../store/useAppStore'

const quotes = [
  { text: "The best way to predict the future is to create it.", author: "Abraham Lincoln" },
  { text: "Your career is your business. It's time for you to manage it as a CEO.", author: "Dorit Ellis" },
  { text: "Every path you haven't taken is still yours to explore.", author: "Seeker" },
  { text: "Find a job you enjoy, and you will never have to work a day in your life.", author: "Confucius" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" }
]

export default function Splash() {
  const navigate = useNavigate()
  const { profile } = useAuth()
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8
      
      scrollContainerRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      })
    }
  }

  const title = "Seeker"
  const words = title.split(" ")

  const features = [
    { tag: "THE PATH MAP", title: "SEE YOUR OPTIONS AS PATHS, NOT A LIST", desc: "Interactive map of branching roads. You see every career as a destination you can walk toward — not a sorted spreadsheet.", icon: "map", variant: "light" },
    { tag: "ZERO BIAS QUIZ", title: "ZERO LEADING QUESTIONS", desc: "We ask about your Saturdays and risk, not Maths vs Bio. The scoring is invisible and completely bias-free.", icon: "psychology", variant: "dark" },
    { tag: "STREAM GUIDE", title: "WE LOOKED UP THE DATA", desc: "Stereotype busting for every stream. PCM, PCB, Arts — we show the families the actual scope, not the myths.", icon: "menu_book", variant: "light" },
    { tag: "ROADMAPS", title: "EXACTLY WHAT TO DO AFTER CLASS 10", desc: "Not just 'consider law.' We show entrance exams, degree duration, and salary stages for every single path.", icon: "route", variant: "dark" },
    { tag: "AI COUNSELLOR", title: "BUILT FOR INDIAN REALITIES", desc: "Ask Seeker understands family pressure, regional salary gaps, and Indian entrance exam ecosystems.", icon: "smart_toy", variant: "light" },
    { tag: "IMMERSIVE UI", title: "THE PATHS ARE ALWAYS THERE", desc: "The branching lines run on every screen. They're a metaphor made visible — reminding you that other routes still exist.", icon: "auto_awesome", variant: "light" },
    { tag: "EQUALITY", title: "NO CAREER HIERARCHY", desc: "Every cluster is colored and positioned equally. A civil servant and a chef start from the same structural node.", icon: "balance", variant: "dark" }
  ]

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        pathLength: { duration: 2, ease: 'easeInOut' },
        opacity: { duration: 0.5 }
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-paper text-ink overflow-hidden font-sans relative">
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-gradient-to-b from-accent to-transparent" />
        
        <div className="relative z-10 w-full max-w-md flex flex-col items-center">
          <div className="relative mb-8">
            <svg width="120" height="180" viewBox="0 -25 100 165" fill="none">
               <motion.path
                 d="M 50 130 Q 10 100 50 85 T 50 40 T 50 10"
                 stroke="#E8572A" strokeWidth="2.5" variants={pathVariants}
                 initial="hidden" animate="visible" strokeLinecap="round" strokeLinejoin="round"
               />
               <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2, duration: 0.5, type: "spring" }}>
                 <line x1="50" y1="10" x2="50" y2="-5" stroke="#0D0D0D" strokeWidth="1.5" />
                 <motion.path d="M 50 -5 L 65 -10 L 50 -15 Z" fill="#E8572A" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 2.5, duration: 0.3 }} />
               </motion.g>
               {[ { x: 30, y: 100, delay: 0.6 }, { x: 70, y: 55, delay: 1.4 }].map((h, i) => (
                 <motion.circle key={i} cx={h.x} cy={h.y} r="2" fill="#0D0D0D" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.3 }} transition={{ delay: h.delay }} />
               ))}
            </svg>
          </div>
          <div className="text-center space-y-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-[10px] font-black tracking-[0.4em] text-ink-30 uppercase">Initializing Seeker</motion.div>
            <h2 className="font-serif text-3xl text-ink tracking-tight overflow-hidden">
              <motion.span initial={{ y: 40 }} animate={{ y: 0 }} transition={{ delay: 0.8, duration: 0.8, ease: "circOut" }} className="inline-block">Finding your paths...</motion.span>
            </h2>
            <div className="pt-2">
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="flex items-center justify-center gap-3">
                 <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                 <p className="text-[10px] font-bold text-ink-30 tracking-[0.2em] uppercase">Aligning Core Modules</p>
               </motion.div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen w-full bg-paper font-sans selection:bg-accent-20 scroll-smooth overflow-x-hidden"
    >
      {/* FIXED BACKGROUND: Stays behind content throughout scroll */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <SeekerNav />

      {/* Personalized Greeting */}
      <AnimatePresence>
        {profile && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed top-24 left-8 z-30"
          >
            <div className="bg-paper/80 backdrop-blur-md border border-ink-10 px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] font-black tracking-widest uppercase text-ink-60">
                Welcome back, {profile.username}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center z-10 pt-20 bg-transparent">
        <main className="container mx-auto px-4 md:px-6 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-5xl mx-auto">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }} className="text-[10px] font-black tracking-[0.4em] text-ink-30 uppercase mb-6">A Journey of a Thousand Paths</motion.p>
            <h1 className="text-7xl sm:text-8xl md:text-[10rem] font-serif mb-12 tracking-tighter leading-none pointer-events-none">
              {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                  {word.split("").map((letter, letterIndex) => (
                    <motion.span key={`${wordIndex}-${letterIndex}`} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: wordIndex * 0.05 + letterIndex * 0.03, duration: 0.4, ease: "easeOut" }} className="inline-block text-ink">{letter}</motion.span>
                  ))}
                </span>
              ))}
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }} className="inline-block w-6 h-6 bg-accent rounded-full ml-4 shadow-[0_0_30px_rgba(232,87,42,0.6)]" />
            </h1>
            <div className="h-24 mb-16 flex flex-col items-center justify-center pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div key={quoteIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.8, ease: "circOut" }} className="max-w-2xl">
                  <p className="text-xl md:text-2xl text-ink-60 font-serif italic mb-2 leading-relaxed">"{quotes[quoteIndex].text}"</p>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase">— {quotes[quoteIndex].author}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 relative z-30">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} className="group relative bg-ink p-[1px] rounded-2xl overflow-hidden shadow-2xl hover:shadow-accent/20 transition-all duration-500">
                <button onClick={() => navigate('/quiz')} className="relative rounded-[1.1rem] px-10 py-5 text-lg font-bold tracking-widest uppercase bg-ink text-paper hover:bg-ink-60 transition-all duration-300 flex items-center gap-4">
                  <span className="opacity-90 group-hover:opacity-100">Start Discovery</span>
                  <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300"><Icon name="arrow_forward" size={20} /></span>
                </button>
              </motion.div>
              <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7 }} onClick={() => navigate('/streams')} className="text-[11px] font-black tracking-[0.3em] text-ink-30 uppercase hover:text-accent transition-colors flex items-center gap-3 group">
                Stream Guide <div className="w-8 h-[1px] bg-ink-10 group-hover:bg-accent group-hover:w-12 transition-all" />
              </motion.button>
            </div>
          </motion.div>
        </main>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-ink-20"><Icon name="expand_more" size={32} /></motion.div>
      </section>

      {/* Features Section - Horizontal Row with Controls */}
      <section className="relative py-32 bg-transparent z-20 overflow-hidden">
        <div className="container mx-auto px-6 mb-16">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="max-w-2xl">
              <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-[11px] font-black tracking-[0.5em] text-accent uppercase mb-4 block">Features & Innovation</motion.span>
              <h2 className="text-5xl md:text-7xl font-serif text-ink leading-[0.9] tracking-tighter">What We Offer</h2>
            </div>
            
            {/* Carousel Controls */}
            <div className="flex gap-4">
              <button onClick={() => scroll('left')} className="w-14 h-14 rounded-full border border-ink-10 flex items-center justify-center text-ink hover:border-accent hover:text-accent transition-all group active:scale-95">
                <Icon name="arrow_back" size={24} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <button onClick={() => scroll('right')} className="w-14 h-14 rounded-full border border-ink-10 flex items-center justify-center text-ink hover:border-accent hover:text-accent transition-all group active:scale-95">
                <Icon name="arrow_forward" size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto px-[5vw] pb-12 no-scrollbar snap-x snap-mandatory"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {features.map((feature, idx) => (
            <FeatureCard 
              key={idx}
              tag={feature.tag}
              title={feature.title}
              desc={feature.desc}
              icon={feature.icon}
              variant={feature.variant}
            />
          ))}
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="relative py-20 border-t border-ink-5 bg-paper/80 backdrop-blur-md z-20">
        <div className="container mx-auto px-6 flex flex-col items-center gap-12">
          <div className="flex items-center gap-6">
            <div className="flex gap-1">{[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent/20" />)}</div>
            <span className="text-[9px] font-black tracking-[0.5em] text-ink-10 uppercase">Precision Career Guidance • India 2026</span>
            <div className="flex gap-1">{[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent/20" />)}</div>
          </div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-12 h-12 rounded-full border border-ink-10 flex items-center justify-center text-ink-40 hover:text-accent hover:border-accent transition-all"><Icon name="arrow_upward" size={20} /></button>
        </div>
      </footer>
    </motion.div>
  )
}

function FeatureCard({ tag, title, desc, icon, variant = "light" }) {
  const isDark = variant === "dark"
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`shrink-0 w-[320px] sm:w-[400px] h-[500px] snap-center group relative p-10 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl 
        ${isDark ? 'bg-ink text-paper' : 'bg-surface text-ink border border-ink-5 shadow-sm'}`}
    >
      <div className={`absolute -right-8 -top-8 opacity-[0.03] transition-transform duration-700 group-hover:scale-125 group-hover:rotate-12 ${isDark ? 'text-paper' : 'text-ink'}`}>
        <Icon name={icon} size={240} />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex justify-between items-start mb-12">
          <div className="flex items-center gap-3">
            <div className={`w-1.5 h-1.5 rounded-full bg-accent`} />
            <span className={`text-[10px] font-mono tracking-widest uppercase opacity-60`}>{tag}</span>
          </div>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-colors ${isDark ? 'border-paper/10 bg-paper/5 text-paper' : 'border-ink/10 bg-ink/5 text-ink'}`}>
            <Icon name={icon} size={20} />
          </div>
        </div>

        <h3 className="text-3xl md:text-4xl font-serif tracking-tighter leading-[0.95] mb-6 group-hover:text-accent transition-colors">{title}</h3>
        <div className={`w-10 h-[1px] mb-8 transition-all duration-500 group-hover:w-20 ${isDark ? 'bg-paper/20' : 'bg-ink/20'}`} />
        <p className={`text-sm md:text-base font-serif italic leading-relaxed opacity-60 max-w-sm mb-12`}>{desc}</p>

        <div className="mt-auto flex justify-between items-end">
          <span className="text-[10px] font-black tracking-widest opacity-20 group-hover:opacity-40 transition-opacity uppercase">// INNOVATION</span>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-accent group-hover:text-white ${isDark ? 'bg-paper/10 text-paper' : 'bg-ink text-paper'}`}>
            <Icon name="arrow_outward" size={18} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
