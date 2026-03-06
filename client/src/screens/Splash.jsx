import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import FloatingPaths from '../components/layout/FloatingPaths.jsx'
import SeekerNav from '../components/layout/SeekerNav.jsx'
import Icon from '../components/ui/Icon.jsx'

const quotes = [
  { text: "The best way to predict the future is to create it.", author: "Abraham Lincoln" },
  { text: "Your career is your business. It's time for you to manage it as a CEO.", author: "Dorit Ellis" },
  { text: "Every path you haven't taken is still yours to explore.", author: "Seeker" },
  { text: "Find a job you enjoy, and you will never have to work a day in your life.", author: "Confucius" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" }
]

export default function Splash() {
  const navigate = useNavigate()
  const [quoteIndex, setQuoteIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const title = "Seeker"
  const words = title.split(" ")

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-paper font-sans selection:bg-accent-20">
      {/* Background Paths with lower z-index */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <SeekerNav />

      {/* Main Content with explicit z-index to be above background */}
      <main className="relative z-20 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-5xl mx-auto"
        >
          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[10px] font-black tracking-[0.4em] text-ink-30 uppercase mb-6"
          >
            A Journey of a Thousand Paths
          </motion.p>

          {/* Headline - "Seeker" with premium gradient */}
          <h1 className="text-7xl sm:text-8xl md:text-[10rem] font-serif mb-12 tracking-tighter leading-none pointer-events-none">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.05,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block text-ink"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: 'spring' }}
              className="inline-block w-6 h-6 bg-accent rounded-full ml-4 shadow-[0_0_30px_rgba(232,87,42,0.6)]"
            />
          </h1>

          {/* Motivational Quotes Slideshow */}
          <div className="h-24 mb-16 flex flex-col items-center justify-center pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={quoteIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="max-w-2xl"
              >
                <p className="text-xl md:text-2xl text-ink-60 font-serif italic mb-2 leading-relaxed">
                  "{quotes[quoteIndex].text}"
                </p>
                <p className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase">
                  — {quotes[quoteIndex].author}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Improved Button - High Visibility & Premium Style */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 relative z-30">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="group relative bg-ink p-[1px] rounded-2xl overflow-hidden shadow-2xl hover:shadow-accent/20 transition-all duration-500"
            >
              <button
                onClick={() => navigate('/quiz')}
                className="relative rounded-[1.1rem] px-10 py-5 text-lg font-bold tracking-widest uppercase
                bg-ink text-paper hover:bg-ink-60 transition-all duration-300 flex items-center gap-4"
              >
                <span className="opacity-90 group-hover:opacity-100">
                  Start Discovery
                </span>
                <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">
                  <Icon name="arrow_forward" size={20} />
                </span>
              </button>
            </motion.div>

            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 }}
              onClick={() => navigate('/streams')}
              className="text-[11px] font-black tracking-[0.3em] text-ink-30 uppercase hover:text-accent transition-colors flex items-center gap-3 group"
            >
              Stream Guide 
              <div className="w-8 h-[1px] bg-ink-10 group-hover:bg-accent group-hover:w-12 transition-all" />
            </motion.button>
          </div>
        </motion.div>
      </main>

      {/* Footer Branding */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20 pointer-events-none"
      >
        <div className="flex gap-1">
          {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent/20" />)}
        </div>
        <span className="text-[9px] font-black tracking-[0.5em] text-ink-10 uppercase">
          Precision Career Guidance • India 2026
        </span>
        <div className="flex gap-1">
          {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent/20" />)}
        </div>
      </motion.div>
    </div>
  )
}
