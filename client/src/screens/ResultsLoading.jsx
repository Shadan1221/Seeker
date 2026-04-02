import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useAppStore from '../store/useAppStore.js'
import { useScoreQuiz } from '../hooks/useQuiz.js'
import FloatingPaths from '../components/layout/FloatingPaths.jsx'

export default function ResultsLoading() {
  const navigate = useNavigate()
  const quizCompleted = useAppStore(s => s.quizCompleted)
  const quizAnswers = useAppStore(s => s.quizAnswers)
  const customAnswers = useAppStore(s => s.customAnswers)
  const { mutate: scoreQuiz } = useScoreQuiz()
  const hasTriggered = useRef(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Show content with a tiny delay to prevent flash
    const t = setTimeout(() => setShowContent(true), 100)
    
    // Safety redirect if someone lands here by accident with NO answers
    const hasAnswers = Object.keys(quizAnswers).length > 0 || Object.keys(customAnswers).length > 0
    if (!hasAnswers && !quizCompleted) {
      navigate('/quiz')
      return
    }

    if (hasTriggered.current) return
    hasTriggered.current = true

    // 1. Trigger the backend scoring immediately
    console.log('[ResultsLoading] Scoring started...')
    scoreQuiz({ answers: quizAnswers, customAnswers })

    // 2. Wait for the animation to play fully before moving to paths
    const timer = setTimeout(() => {
      console.log('[ResultsLoading] Navigating to /paths')
      navigate('/paths')
    }, 4800) // Slightly longer to be safe

    return () => {
      clearTimeout(t)
      clearTimeout(timer)
    }
  }, [navigate, quizCompleted, quizAnswers, customAnswers, scoreQuiz])

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        pathLength: { duration: 3.2, ease: 'easeInOut' },
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

  if (!showContent) return <div className="min-h-screen bg-paper" />

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-paper text-ink overflow-hidden font-sans relative z-[200]">
      <FloatingPaths position={1} />
      
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        <div className="relative mb-12">
          <svg width="200" height="300" viewBox="0 -30 100 150" fill="none">
             <motion.path
               d="M 50 110 Q 10 85 50 70 T 50 35 T 50 5"
               stroke="#E8572A"
               strokeWidth="2.5"
               variants={pathVariants}
               initial="hidden"
               animate="visible"
               strokeLinecap="round"
               strokeLinejoin="round"
             />

             <motion.g
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 3.0, duration: 0.5, type: "spring" }}
             >
               <line x1="50" y1="5" x2="50" y2="-10" stroke="#0D0D0D" strokeWidth="1.5" />
               <motion.path 
                 d="M 50 -10 L 65 -15 L 50 -20 Z" 
                 fill="#E8572A"
                 initial={{ scaleX: 0 }}
                 animate={{ scaleX: 1 }}
                 transition={{ delay: 3.3, duration: 0.3 }}
               />
             </motion.g>
          </svg>
        </div>

        <div className="text-center space-y-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] font-black tracking-[0.4em] text-ink-30 uppercase">Processing Journey</motion.div>
          
          <h2 className="font-serif text-4xl text-ink tracking-tight">
            Mapping your paths...
          </h2>

          <div className="pt-4 space-y-4">
             <motion.div custom={1.2} variants={textVariants} initial="hidden" animate="visible" className="flex items-center justify-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-ink-10" />
               <p className="text-sm text-ink-60 font-medium">Synthesizing discovery inputs</p>
             </motion.div>
             <motion.div custom={2.4} variants={textVariants} initial="hidden" animate="visible" className="flex items-center justify-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-ink-10" />
               <p className="text-sm text-ink-60 font-medium">Calculating cosmic alignments</p>
             </motion.div>
             <motion.div custom={3.6} variants={textVariants} initial="hidden" animate="visible" className="flex items-center justify-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-accent" />
               <p className="text-sm font-bold text-accent tracking-wide uppercase">Discovery Complete</p>
             </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
