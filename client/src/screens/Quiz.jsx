import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useQuizQuestions } from '../hooks/useQuiz.js'
import useAppStore from '../store/useAppStore.js'
import { interpretCustomAnswer } from '../api/quizApi.js'
import FloatingPaths from '../components/layout/FloatingPaths.jsx'
import Icon from '../components/ui/Icon.jsx'

export default function Quiz() {
  const navigate = useNavigate()
  const { data, isLoading } = useQuizQuestions()
  const questions = data?.quiz || []
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedId, setSelectedId] = useState(null)
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customAnswerText, setCustomAnswerText] = useState('')
  const [customAnswerLoading, setCustomAnswerLoading] = useState(false)
  
  const setAnswer = useAppStore(s => s.setAnswer)
  const completeQuiz = useAppStore(s => s.completeQuiz)
  const quizAnswers = useAppStore(s => s.quizAnswers)
  const skippedQuestions = useAppStore(s => s.skippedQuestions)
  const skipQuestion = useAppStore(s => s.skipQuestion)
  const customAnswers = useAppStore(s => s.customAnswers)
  const recordCustomAnswer = useAppStore(s => s.recordCustomAnswer)
  const quizCompleted = useAppStore(s => s.quizCompleted)

  // Redirect if already completed
  useEffect(() => {
    if (quizCompleted && questions.length > 0) {
      navigate('/paths')
    }
  }, [quizCompleted, navigate, questions.length])

  // Restore state if returning
  useEffect(() => {
    if (questions.length > 0) {
      const answeredIds = new Set([
        ...Object.entries(quizAnswers)
          .filter(([, value]) => value !== null && value !== undefined)
          .map(([id]) => String(id)),
        ...Object.entries(customAnswers)
          .filter(([, value]) => value !== null && value !== undefined)
          .map(([id]) => String(id)),
        ...skippedQuestions.map((id) => String(id)),
      ])
      const answeredCount = answeredIds.size
      if (answeredCount > 0 && answeredCount < questions.length) {
        setCurrentIndex(answeredCount)
      }
    }
  }, [questions.length, quizAnswers, customAnswers, skippedQuestions])

  useEffect(() => {
    setShowCustomInput(false)
    setCustomAnswerText('')
  }, [currentIndex])

  const goToNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedId(null)
    } else {
      completeQuiz()
      navigate('/results')
    }
  }

  const handleSkip = () => {
    const currentQ = questions[currentIndex]
    skipQuestion(currentQ.id)
    goToNextQuestion()
  }

  const handleCustomAnswerSubmit = async () => {
    if (customAnswerText.trim().length < 10) return
    setCustomAnswerLoading(true)
    const currentQ = questions[currentIndex]

    try {
      const result = await interpretCustomAnswer(
        currentQ.id,
        currentQ.question,
        customAnswerText
      )

      // Ensure standard answer is cleared for this question
      setAnswer(currentQ.id.toString(), null)

      recordCustomAnswer(currentQ.id, {
        text: customAnswerText,
        tags: result.tags,
        interpretation: result.interpretation
      })

      toast.success(`Got it — "${result.interpretation}"`, { duration: 2500 })

      setTimeout(() => {
        goToNextQuestion()
        setShowCustomInput(false)
        setCustomAnswerText('')
        setCustomAnswerLoading(false)
      }, 600)

    } catch (err) {
      toast.error(err.message || 'Could not read your answer. Please try again or skip.')
      setCustomAnswerLoading(false)
    }
  }

  useEffect(() => {
    if (selectedId !== null) {
      const currentQ = questions[currentIndex]
      
      const timer = setTimeout(() => {
        // Clear custom answer if it exists
        recordCustomAnswer(currentQ.id, null)
        setAnswer(currentQ.id.toString(), selectedId)
        goToNextQuestion()
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [selectedId, currentIndex, questions, setAnswer, completeQuiz, navigate, recordCustomAnswer])

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
             {questions.map((quest, i) => {
                const isSkipped = skippedQuestions.includes(quest.id)
                const isAnswered = quizAnswers[quest.id.toString()] || customAnswers[quest.id.toString()]
                
                return (
                  <div 
                    key={i} 
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-500 flex items-center justify-center text-[8px] font-bold ${
                       isSkipped 
                        ? 'bg-ink-10 border border-ink-20 text-ink-30'
                        : isAnswered 
                          ? 'bg-ink' 
                          : i === currentIndex 
                            ? 'bg-accent w-4 shadow-[0_0_10px_rgba(232,87,42,0.3)]' 
                            : 'bg-ink-10'
                    }`} 
                  >
                    {isSkipped && '×'}
                  </div>
                )
             })}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 p-4 md:p-8 md:pl-16 flex flex-col z-10 relative">
         <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="max-w-5xl w-full mx-auto"
            >
               <div className="mb-4 md:mb-6 mt-2">
                  <div className="w-10 h-10 rounded-2xl bg-accent/5 flex items-center justify-center mb-3 border border-accent/10 shadow-sm">
                    <Icon name={q.icon} size={24} className="text-accent" />
                  </div>
                  <h2 className="font-serif text-2xl md:text-4xl text-ink leading-[1.1] tracking-tight mb-2">
                    {q.question}
                  </h2>
                  {q.subtext && (
                    <p className="text-ink-60 italic text-sm leading-relaxed border-l-2 border-accent/20 pl-4 max-w-xl">
                      {q.subtext}
                    </p>
                  )}
               </div>

               <div className="flex flex-col lg:flex-row gap-6 items-start">
                  {/* Options Grid */}
                  <div className="flex-[2] w-full grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-3">
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

                  {/* Sidebar Actions */}
                  <div className="flex-1 w-full lg:max-w-[300px] space-y-10 lg:pt-2">
                    {/* Skip Section */}
                    {q.skippable && (
                      <div className="bg-surface/50 p-6 rounded-2xl border border-ink-5 space-y-3">
                        <button
                          onClick={handleSkip}
                          className="text-sm font-bold text-ink-40 hover:text-accent transition-colors
                                     underline underline-offset-4 decoration-ink-10 block uppercase tracking-widest"
                        >
                          Not Sure
                        </button>
                        <p className="text-[11px] text-ink-30 font-sans italic leading-relaxed">
                          "It's alright to be unsure about certain things in life — you will figure it out soon."
                        </p>
                      </div>
                    )}

                    {/* Custom Answer Section */}
                    <div className="space-y-4">
                      {!showCustomInput ? (
                        <div className="group cursor-pointer" onClick={() => setShowCustomInput(true)}>
                          <p className="text-[10px] text-ink-30 uppercase tracking-[0.2em] mb-2 font-black">
                            Alternative
                          </p>
                          <button
                            className="text-sm text-ink-60 group-hover:text-ink underline underline-offset-8
                                       decoration-ink-10 group-hover:decoration-accent transition-all font-medium flex items-center gap-2"
                          >
                            Describe in your own words <Icon name="edit" size={14} />
                          </button>
                        </div>
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="w-full space-y-4 bg-white p-5 rounded-2xl border border-accent/20 shadow-xl shadow-accent/5"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-accent">Your Answer</span>
                            <span className="text-[10px] text-ink-30 font-mono">{customAnswerText.length}/300</span>
                          </div>
                          <textarea
                            autoFocus
                            value={customAnswerText}
                            onChange={(e) => setCustomAnswerText(e.target.value)}
                            placeholder={`Tell us what fits better...`}
                            maxLength={300}
                            rows={4}
                            className="w-full bg-surface border border-ink-10 rounded-xl px-4 py-3
                                       text-sm text-ink placeholder-ink-20 resize-none
                                       focus:outline-none focus:border-accent transition-colors
                                       font-sans leading-relaxed"
                          />
                          <div className="flex items-center gap-3">
                            <button
                              onClick={handleCustomAnswerSubmit}
                              disabled={customAnswerText.trim().length < 10 || customAnswerLoading}
                              className="flex-1 text-xs font-black bg-ink text-paper py-3 rounded-xl
                                         hover:bg-accent disabled:opacity-20 disabled:cursor-not-allowed
                                         transition-all uppercase tracking-[0.2em] shadow-lg shadow-ink/10"
                            >
                              {customAnswerLoading ? 'Reading...' : 'Confirm'}
                            </button>
                            <button
                              onClick={() => { setShowCustomInput(false); setCustomAnswerText('') }}
                              className="px-4 py-3 text-[10px] font-bold text-ink-40 hover:text-ink transition-colors uppercase tracking-widest"
                            >
                              Cancel
                            </button>
                          </div>
                          {customAnswerLoading && (
                            <p className="text-[10px] text-accent italic animate-pulse text-center">
                              Seeker is interpreting your signals...
                            </p>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
               </div>
            </motion.div>
         </AnimatePresence>

         {/* Mobile progress dots */}
         <div className="md:hidden flex justify-center gap-2 mt-auto py-8">
            {questions.map((quest, i) => {
               const isSkipped = skippedQuestions.includes(quest.id)
               const isAnswered = quizAnswers[quest.id.toString()] || customAnswers[quest.id.toString()]

               return (
                 <div 
                   key={i} 
                   className={`shrink-0 w-1 h-1 rounded-full transition-all duration-500 flex items-center justify-center text-[6px] font-bold ${
                      isSkipped
                        ? 'bg-ink-10 border border-ink-20 text-ink-30'
                        : isAnswered ? 'bg-ink/40' : i === currentIndex ? 'bg-accent w-3' : 'bg-ink-10'
                   }`} 
                 >
                   {isSkipped && '×'}
                 </div>
               )
            })}
         </div>
      </div>
    </div>
  )
}
