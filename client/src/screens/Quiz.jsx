import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useQuizQuestions } from '../hooks/useQuiz.js'
import useAppStore from '../store/useAppStore.js'
import FloatingPaths from '../components/layout/FloatingPaths.jsx'
import Icon from '../components/ui/Icon.jsx'

export default function Quiz() {
  const navigate = useNavigate()
  const { data, isLoading } = useQuizQuestions()
  const questions = data?.quiz || []
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedId, setSelectedId] = useState(null)
  
  const setAnswer = useAppStore(s => s.setAnswer)
  const completeQuiz = useAppStore(s => s.completeQuiz)
  const quizAnswers = useAppStore(s => s.quizAnswers)

  // Restore state if returning
  useEffect(() => {
    if (questions.length > 0) {
      const answeredKeys = Object.keys(quizAnswers)
      if (answeredKeys.length > 0 && answeredKeys.length < questions.length) {
        setCurrentIndex(answeredKeys.length)
      }
    }
  }, [questions.length, quizAnswers])

  useEffect(() => {
    if (selectedId !== null) {
      const currentQ = questions[currentIndex]
      
      const timer = setTimeout(() => {
        setAnswer(currentQ.id.toString(), selectedId)
        
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(prev => prev + 1)
          setSelectedId(null)
        } else {
          completeQuiz()
          navigate('/results')
        }
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [selectedId, currentIndex, questions, setAnswer, completeQuiz, navigate])

  if (isLoading || questions.length === 0) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <span className="font-serif text-2xl text-ink-30 animate-pulse">Loading paths...</span>
      </div>
    )
  }

  const q = questions[currentIndex]
  const progressFormat = String(currentIndex + 1).padStart(2, '0')

  return (
    <div className="min-h-screen bg-paper flex flex-col md:flex-row overflow-hidden font-sans relative">
      {/* Visual Depth - Subtle Color Wash */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-gradient-to-tr from-accent via-transparent to-blue-500" />
      
      <FloatingPaths />
      
      {/* LEFT PANEL */}
      <div className="w-full md:w-[40%] p-8 md:p-16 flex flex-col justify-between z-10">
        <div>
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
             <div className="font-serif text-[120px] leading-none text-ink-10 -ml-2 tracking-tighter select-none relative">
               {progressFormat}
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: '100%' }}
                 transition={{ duration: 1, delay: 0.5 }}
                 className="absolute bottom-4 left-0 h-1 bg-accent/20"
               />
             </div>
             <div className="text-sm font-medium tracking-widest text-ink-30 uppercase ml-2">
               of {questions.length}
             </div>
          </motion.div>
          
          <motion.div
             key={`dim-${currentIndex}`}
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-xs font-bold tracking-[0.2em] text-accent uppercase flex items-center gap-2"
          >
             <div className="w-8 h-px bg-accent" />
             {q.dimension.replace('_', ' ')}
          </motion.div>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="text-sm font-medium text-ink-60 hover:text-ink transition-colors w-fit flex items-center gap-2 group"
        >
           <Icon name="arrow_back" size={16} className="group-hover:-translate-x-1 transition-transform" /> End Discovery
        </button>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-[60%] p-8 md:p-16 md:pl-0 flex flex-col justify-center z-10 h-screen overflow-y-auto custom-scrollbar">
         <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="max-w-2xl"
            >
               <div className="mb-12">
                  <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center mb-6">
                    <Icon name={q.icon} size={32} className="text-accent" />
                  </div>
                  <h2 className="font-serif text-display-md text-ink leading-tight mb-4 text-balance">
                    {q.question}
                  </h2>
                  {q.subtext && (
                    <p className="text-ink-60 italic text-lg leading-relaxed border-l-2 border-accent/10 pl-4">
                      {q.subtext}
                    </p>
                  )}
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((opt) => {
                     const isSelected = selectedId === opt.label
                     
                     return (
                       <button
                         key={opt.label}
                         onClick={() => setSelectedId(opt.label)}
                         className={`text-left p-6 border rounded-none transition-all duration-300 group flex items-start gap-4 relative overflow-hidden ${
                           isSelected 
                             ? 'border-accent bg-accent/[0.03] ring-1 ring-accent/20' 
                             : 'border-ink-10 bg-paper hover:bg-surface hover:border-ink hover:shadow-lg hover:shadow-accent/5'
                         }`}
                       >
                          {/* Selected Glow */}
                          {isSelected && (
                            <motion.div 
                              layoutId="opt-glow"
                              className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none"
                            />
                          )}

                          <div className={`shrink-0 w-10 h-10 flex items-center justify-center border font-mono text-sm transition-all duration-300 ${
                            isSelected 
                              ? 'bg-accent text-white border-accent shadow-md shadow-accent/20' 
                              : 'border-ink-10 text-ink-30 group-hover:bg-ink group-hover:text-paper group-hover:border-ink'
                          }`}>
                             {opt.label}
                          </div>
                          <div className="relative z-10">
                             <h3 className={`font-medium mb-1 text-base leading-snug transition-colors ${isSelected ? 'text-accent' : 'text-ink'}`}>
                               {opt.title}
                             </h3>
                             <p className={`text-sm leading-relaxed transition-colors ${isSelected ? 'text-ink-60' : 'text-ink-60'}`}>
                               {opt.description}
                             </p>
                          </div>
                       </button>
                     )
                  })}
               </div>
            </motion.div>
         </AnimatePresence>
      </div>

      {/* Progress Dots Bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20 bg-paper/80 backdrop-blur-md px-6 py-3 rounded-full border border-ink-10 shadow-sm">
         {questions.map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                 i < currentIndex ? 'bg-ink scale-75' : i === currentIndex ? 'bg-accent scale-150 shadow-[0_0_10px_rgba(232,87,42,0.5)]' : 'bg-ink-10'
              }`} 
            />
         ))}
      </div>
    </div>
  )
}
