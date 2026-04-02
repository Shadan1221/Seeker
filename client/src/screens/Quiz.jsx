import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { QUIZ } from '../data/quiz'
import useAppStore from '../store/useAppStore'
import SeekerButton from '../components/ui/SeekerButton'
import Icon from '../components/ui/Icon'
import FloatingPaths from '../components/layout/FloatingPaths'
import { useQuizQuestions } from '../hooks/useQuiz'

export default function Quiz() {
  const navigate = useNavigate()
  const { data: quizData, isLoading } = useQuizQuestions()
  const questions = quizData?.quiz || QUIZ

  const quizAnswers = useAppStore(s => s.quizAnswers)
  const customAnswers = useAppStore(s => s.customAnswers)
  const skippedQuestions = useAppStore(s => s.skippedQuestions)
  const setAnswer = useAppStore(s => s.setAnswer)
  const skipQuestion = useAppStore(s => s.skipQuestion)
  const completeQuiz = useAppStore(s => s.completeQuiz)
  const recordCustomAnswer = useAppStore(s => s.recordCustomAnswer)
  const quizCompleted = useAppStore(s => s.quizCompleted)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedId, setSelectedId] = useState(null)
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customText, setCustomText] = useState('')

  // Restore state if returning
  useEffect(() => {
    if (questions.length > 0 && !quizCompleted) {
      const answeredIds = new Set([
        ...Object.entries(quizAnswers).filter(([, value]) => value !== null && value !== undefined).map(([id]) => String(id)),
        ...Object.entries(customAnswers).filter(([, value]) => value !== null && value !== undefined).map(([id]) => String(id)),
        ...skippedQuestions.map((id) => String(id)),
      ])
      const answeredCount = answeredIds.size
      if (answeredCount > 0 && answeredCount < questions.length) {
        setCurrentIndex(answeredCount)
      }
    }
  }, [questions.length, quizAnswers, customAnswers, skippedQuestions, quizCompleted])

  const handleOptionSelect = (optionId) => {
    setSelectedId(optionId)
    const currentQ = questions[currentIndex]

    setTimeout(() => {
      setAnswer(currentQ.id.toString(), optionId)
      goToNextQuestion()
    }, 500)
  }

  const handleSkip = () => {
    const currentQ = questions[currentIndex]
    skipQuestion(currentQ.id.toString())
    goToNextQuestion()
  }

  const handleCustomSubmit = () => {
    if (!customText.trim()) return
    const currentQ = questions[currentIndex]
    recordCustomAnswer(currentQ.id.toString(), { text: customText })
    setCustomText('')
    setShowCustomInput(false)
    goToNextQuestion()
  }

  const goToNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedId(null)
    } else {
      completeQuiz()
      navigate('/results')
    }
  }

  if (isLoading || questions.length === 0) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <span className="font-serif text-2xl text-ink-30 animate-pulse">Loading discovery...</span>
      </div>
    )
  }

  const q = questions[currentIndex]

  return (
    <div className="min-h-screen bg-paper text-ink font-sans selection:bg-accent-20 overflow-hidden relative">
      <FloatingPaths position={currentIndex % 2 === 0 ? 1 : -1} />
      
      {/* SIDEBAR NAVIGATION */}
      <div className="fixed top-0 left-0 h-full w-80 p-12 z-50 hidden lg:flex flex-col justify-between border-r border-ink-5">
        <div>
          <div className="flex items-center gap-2 mb-12 cursor-pointer" onClick={() => navigate('/welcome')}>
            <h1 className="font-serif text-3xl">Seeker</h1>
            <div className="w-2 h-2 rounded-full bg-accent" />
          </div>
          
          <nav className="space-y-8">
            <div>
              <p className="text-[10px] font-black tracking-[0.3em] text-ink-20 uppercase mb-4">Current Session</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-sm font-bold">Self Discovery</span>
                </div>
                <div className="flex items-center gap-3 opacity-30">
                  <div className="w-1.5 h-1.5 rounded-full bg-ink" />
                  <span className="text-sm font-bold">Path Mapping</span>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-surface rounded-2xl border border-ink-5">
            <p className="text-[10px] font-black tracking-widest text-ink-30 uppercase mb-2">Question</p>
            <p className="font-serif text-3xl">{currentIndex + 1} <span className="text-lg opacity-20">/ {questions.length}</span></p>
          </div>
          <button onClick={() => navigate('/welcome')} className="text-[10px] font-black tracking-widest uppercase text-ink-30 hover:text-accent transition-colors">Exit Discovery</button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="lg:pl-80 min-h-screen flex flex-col">
        <div className="flex-1 max-w-4xl w-full mx-auto px-8 pt-32 pb-20 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-16"
            >
              <div className="space-y-6">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-3 px-3 py-1 bg-accent/5 border border-accent/10 rounded-full">
                  <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                  <span className="text-[10px] font-black tracking-[0.2em] text-accent uppercase">Phase {currentIndex < 4 ? 'I' : currentIndex < 8 ? 'II' : 'III'}</span>
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-serif tracking-tight leading-[1.1] text-ink">
                  {q.question}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {q.options.map((opt, i) => (
                  <button
                    key={opt.id}
                    onClick={() => handleOptionSelect(opt.id)}
                    className={`group relative p-8 text-left border transition-all duration-500 hover:z-10 ${
                      selectedId === opt.id 
                        ? 'border-accent bg-accent/5 scale-[1.02] shadow-2xl shadow-accent/10' 
                        : 'border-ink-10 bg-white/40 hover:border-ink-30 hover:bg-white/60'
                    }`}
                  >
                    <div className="flex items-start gap-6">
                      <span className={`text-[10px] font-black tracking-widest mt-1.5 transition-colors ${selectedId === opt.id ? 'text-accent' : 'text-ink-20'}`}>0{i + 1}</span>
                      <span className="text-xl md:text-2xl font-medium tracking-tight leading-snug">{opt.label}</span>
                    </div>
                    {selectedId === opt.id && (
                      <motion.div layoutId="active-bg" className="absolute inset-0 border-2 border-accent pointer-events-none" />
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-12 border-t border-ink-5 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-12">
                   {!showCustomInput ? (
                        <div className="group cursor-pointer" onClick={() => setShowCustomInput(true)}>
                          <p className="text-[10px] text-ink-30 uppercase tracking-[0.2em] mb-2 font-black group-hover:text-accent transition-colors">Describe in your own words</p>
                          <div className="flex items-center gap-3">
                            <Icon name="edit_note" size={20} className="text-ink-20 group-hover:text-accent transition-colors" />
                            <span className="text-xs font-bold tracking-widest uppercase text-ink-40 group-hover:text-ink transition-colors">Custom Answer</span>
                          </div>
                        </div>
                   ) : (
                     <div className="w-full max-w-md space-y-4">
                        <textarea 
                          value={customText} 
                          onChange={(e) => setCustomText(e.target.value)}
                          placeholder="Describe your preference..."
                          className="w-full bg-white/80 border border-ink-10 p-4 text-lg focus:border-accent outline-none min-h-[100px]"
                          autoFocus
                        />
                        <div className="flex gap-4">
                          <SeekerButton onClick={handleCustomSubmit} className="flex-1 py-3 text-xs">Confirm</SeekerButton>
                          <button onClick={() => setShowCustomInput(false)} className="px-6 text-[10px] font-black tracking-widest uppercase hover:text-accent transition-colors">Cancel</button>
                        </div>
                     </div>
                   )}

                   {!showCustomInput && (
                     <div className="group cursor-pointer" onClick={handleSkip}>
                        <p className="text-[10px] text-ink-30 uppercase tracking-[0.2em] mb-2 font-black group-hover:text-accent transition-colors">Not sure about this one?</p>
                        <div className="flex items-center gap-3">
                          <Icon name="fast_forward" size={20} className="text-ink-20 group-hover:text-accent transition-colors" />
                          <span className="text-xs font-bold tracking-widest uppercase text-ink-40 group-hover:text-ink transition-colors">Skip Question</span>
                        </div>
                     </div>
                   )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM PROGRESS */}
        <div className="h-24 px-12 border-t border-ink-5 flex items-center justify-center bg-white/20 backdrop-blur-sm">
           <div className="flex gap-3">
            {questions.map((_, i) => {
               const isAnswered = i < currentIndex
               const isSkipped = skippedQuestions.includes(questions[i]?.id.toString())
               return (
                 <div 
                   key={i} 
                   className={`h-1.5 rounded-full transition-all duration-500 ${
                     isAnswered ? 'bg-ink w-6' : i === currentIndex ? 'bg-accent w-12' : 'bg-ink-10 w-1.5'
                   }`} 
                 >
                   {isSkipped && <div className="w-full h-full bg-accent/20 rounded-full" />}
                 </div>
               )
            })}
           </div>
        </div>
      </div>
    </div>
  )
}
