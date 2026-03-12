import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAppStore from '../store/useAppStore.js'
import { useScoreQuiz } from '../hooks/useQuiz.js'
import FloatingPaths from '../components/layout/FloatingPaths.jsx'

export default function ResultsLoading() {
  const navigate = useNavigate()
  const quizCompleted = useAppStore(s => s.quizCompleted)
  const quizAnswers = useAppStore(s => s.quizAnswers)
  const customAnswers = useAppStore(s => s.customAnswers)
  const { mutate: scoreQuiz } = useScoreQuiz()

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

    // Trigger backend scoring
    scoreQuiz({ answers: quizAnswers, customAnswers })

    const timer = setTimeout(() => {
      navigate('/paths')
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [navigate, quizCompleted, quizAnswers, customAnswers, scoreQuiz])

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
      <FloatingPaths position={1} />
      {/* Background visual interest */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-gradient-to-b from-accent to-transparent" />
      
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        
        <div className="relative mb-12">
          <svg width="200" height="300" viewBox="0 -30 100 150" fill="none">
             {/* Curvy Mountain Path */}
             <motion.path
               d="M 50 110 Q 10 85 50 70 T 50 35 T 50 5"
               stroke="#E8572A"
               strokeWidth="2"
               variants={pathVariants}
               initial="hidden"
               animate="visible"
               strokeLinecap="round"
               strokeLinejoin="round"
             />

             {/* Flag Pole and Banner */}
             <motion.g
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 2.2, duration: 0.5, type: "spring" }}
             >
               <line x1="50" y1="5" x2="50" y2="-10" stroke="#0D0D0D" strokeWidth="1.5" />
               <motion.path 
                 d="M 50 -10 L 65 -15 L 50 -20 Z" 
                 fill="#E8572A"
                 initial={{ scaleX: 0 }}
                 animate={{ scaleX: 1 }}
                 transition={{ delay: 2.5, duration: 0.3 }}
               />
             </motion.g>

             {/* Hurdle markers at the 'valleys' */}
             {[
               { x: 30, y: 85, delay: 0.8 },
               { x: 70, y: 45, delay: 1.6 }
             ].map((h, i) => (
               <motion.circle
                 key={i}
                 cx={h.x} cy={h.y} r="1.5"
                 fill="#0D0D0D"
                 initial={{ scale: 0, opacity: 0 }}
                 animate={{ scale: 1, opacity: 0.3 }}
                 transition={{ delay: h.delay }}
               />
             ))}
          </svg>
        </div>

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
