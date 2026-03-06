import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAppStore from '../store/useAppStore.js'

export default function ResultsLoading() {
  const navigate = useNavigate()
  const quizCompleted = useAppStore(s => s.quizCompleted)

  useEffect(() => {
    // If user somehow gets here without finishing, send them back
    if (!quizCompleted) {
      const timer = setTimeout(() => {
        if (!useAppStore.getState().quizCompleted) {
          navigate('/quiz')
        }
      }, 500)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      navigate('/paths')
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [navigate, quizCompleted])

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        pathLength: { duration: 2.5, ease: 'easeInOut' },
        opacity: { duration: 0.5 }
      }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom, duration: 0.8, ease: 'easeOut' }
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-paper text-ink overflow-hidden font-sans relative">
      {/* Background visual interest */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-gradient-to-b from-accent to-transparent" />
      
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="mb-12">
           <motion.path
             d="M 100 200 C 100 150, 150 100, 100 50 C 50 0, 100 0, 100 0"
             stroke="#E8572A"
             strokeWidth="4"
             variants={pathVariants}
             initial="hidden"
             animate="visible"
             strokeLinecap="round"
           />
           <motion.circle 
             cx="100" cy="0" r="6" fill="#E8572A" 
             initial={{ scale: 0 }} 
             animate={{ scale: 1 }} 
             transition={{ delay: 2.5, type: 'spring' }} 
           />
        </svg>

        <div className="text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[10px] font-black tracking-[0.4em] text-ink-30 uppercase"
          >
            Processing Journey
          </motion.div>
          
          <h2 className="font-serif text-4xl text-ink tracking-tight">
            Mapping your paths...
          </h2>

          <div className="pt-4 space-y-4">
             <motion.div custom={1.0} variants={textVariants} initial="hidden" animate="visible" className="flex items-center justify-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-ink-10" />
               <p className="text-sm text-ink-60 font-medium">Synthesizing discovery inputs</p>
             </motion.div>
             <motion.div custom={1.8} variants={textVariants} initial="hidden" animate="visible" className="flex items-center justify-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-ink-10" />
               <p className="text-sm text-ink-60 font-medium">Calculating cosmic alignments</p>
             </motion.div>
             <motion.div custom={2.6} variants={textVariants} initial="hidden" animate="visible" className="flex items-center justify-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-accent" />
               <p className="text-sm font-bold text-accent tracking-wide uppercase">Discovery Complete</p>
             </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
