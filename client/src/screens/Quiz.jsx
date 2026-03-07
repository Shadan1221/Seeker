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
    <div className="h-screen bg-paper flex flex-col md:flex-row overflow-hidden font-sans relative">
      {/* Visual Depth - Subtle Color Wash */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-gradient-to-tr from-accent via-transparent to-blue-500" />
      
      <FloatingPaths />
      
      {/* LEFT PANEL */}
      <div className="w-full md:w-[35%] p-6 md:p-12 flex flex-col justify-between z-10 border-r border-ink-5">
        <div className="flex flex-col h-full justify-between">
          <div>
            <button 
              onClick={() => navigate('/')}
              className="text-xs font-bold tracking-[0.2em] text-ink-30 hover:text-accent transition-colors flex items-center gap-2 group mb-12 uppercase"
            >
               <Icon name="arrow_back" size={14} className="group-hover:-translate-x-1 transition-transform" /> Exit Discovery
            </button>

            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
               <div className="font-serif text-[100px] md:text-[140px] leading-none text-ink-20 -ml-2 tracking-tighter select-none relative">
                 {progressFormat}
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: '100%' }}
                   transition={{ duration: 1, delay: 0.5 }}
                   className="absolute bottom-4 left-0 h-1 bg-accent/30"
                 />
               </div>
               <div className="text-xs font-black tracking-[0.4em] text-ink-30 uppercase ml-2">
                 of {questions.length} Questions
               </div>
            </motion.div>
            
            <motion.div
               key={`dim-${currentIndex}`}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="text-[10px] font-black tracking-[0.3em] text-accent uppercase flex items-center gap-3"
            >
               <div className="w-6 h-px bg-accent" />
               {q.dimension.replace('_', ' ')}
            </motion.div>
          </div>

          {/* Repositioned Progress Dots inside Left Panel */}
          <div className="hidden md:flex flex-wrap gap-2 py-4">
             {questions.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                     i < currentIndex ? 'bg-ink/40' : i === currentIndex ? 'bg-accent w-4 shadow-[0_0_10px_rgba(232,87,42,0.3)]' : 'bg-ink-10'
                  }`} 
                />
             ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 p-6 md:p-12 md:pl-16 flex flex-col justify-center z-10 relative overflow-hidden">
         <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="max-w-3xl w-full mx-auto"
            >
               <div className="mb-8 md:mb-10">
                  <div className="w-10 h-10 rounded-xl bg-accent/5 flex items-center justify-center mb-4 border border-accent/10">
                    <Icon name={q.icon} size={24} className="text-accent" />
                  </div>
                  <h2 className="font-serif text-3xl md:text-5xl text-ink leading-[1.1] tracking-tight mb-4">
                    {q.question}
                  </h2>
                  {q.subtext && (
                    <p className="text-ink-60 italic text-base leading-relaxed border-l-2 border-accent/20 pl-4 max-w-xl">
                      {q.subtext}
                    </p>
                  )}
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {q.options.map((opt) => {
                     const isSelected = selectedId === opt.label
                     
                     return (
                       <button
                         key={opt.label}
                         onClick={() => setSelectedId(opt.label)}
                         className={`text-left p-4 md:p-5 border transition-all duration-300 group flex items-start gap-4 relative overflow-hidden ${
                           isSelected 
                             ? 'border-accent bg-accent/[0.02] ring-1 ring-accent/10' 
                             : 'border-ink-10 bg-white/50 hover:bg-white hover:border-ink/20 hover:shadow-xl hover:shadow-accent/5'
                         }`}
                       >
                          {/* Selection indicator line */}
                          {isSelected && (
                            <motion.div 
                              layoutId="opt-line"
                              className="absolute left-0 top-0 bottom-0 w-1 bg-accent"
                            />
                          )}

                          <div className={`shrink-0 w-8 h-8 flex items-center justify-center border font-mono text-xs transition-all duration-300 ${
                            isSelected 
                              ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20' 
                              : 'border-ink-10 text-ink-30 group-hover:bg-ink group-hover:text-paper group-hover:border-ink'
                          }`}>
                             {opt.label}
                          </div>
                          <div className="relative z-10 pr-2">
                             <h3 className={`font-bold mb-0.5 text-sm md:text-base leading-snug transition-colors ${isSelected ? 'text-accent' : 'text-ink'}`}>
                               {opt.title}
                             </h3>
                             <p className="text-xs md:text-sm text-ink-60 leading-relaxed line-clamp-2 md:line-clamp-none">
                               {opt.description}
                             </p>
                          </div>
                       </button>
                     )
                  })}
               </div>
            </motion.div>
         </AnimatePresence>

         {/* Mobile progress dots */}
         <div className="md:hidden flex justify-center gap-2 mt-8 py-2 overflow-x-auto no-scrollbar">
            {questions.map((_, i) => (
               <div 
                 key={i} 
                 className={`shrink-0 w-1 h-1 rounded-full transition-all duration-500 ${
                    i < currentIndex ? 'bg-ink/40' : i === currentIndex ? 'bg-accent w-3' : 'bg-ink-10'
                 }`} 
               />
            ))}
         </div>
      </div>
    </div>
  )
}
