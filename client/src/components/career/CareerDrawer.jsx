import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import Icon from '../ui/Icon.jsx'
import useAppStore from '../../store/useAppStore.js'
import { useNavigate } from 'react-router-dom'
import { QUIZ } from '../../data/quiz.js'
import { useChat } from '../../hooks/useChat.js'
import React, { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const buildQuizContext = (career, store) => {
  const { quizCompleted, quizAnswers, customAnswers, skippedQuestions, careerScores } = store
  if (!quizCompleted && Object.keys(quizAnswers).length === 0) return null

  const answeredCount = Object.keys(quizAnswers).length + Object.keys(customAnswers).length
  const skippedCount = skippedQuestions.length
  const totalQuestions = 12

  const tagFreq = {}
  Object.entries(quizAnswers).forEach(([qId, optionLabel]) => {
    const question = QUIZ.find(q => q.id === parseInt(qId))
    if (!question) return
    const option = question.options.find(o => o.label === optionLabel)
    if (!option) return
    option.tags.forEach(tag => {
      tagFreq[tag] = (tagFreq[tag] || 0) + 1
    })
  })
  Object.values(customAnswers).forEach(ca => {
    if (!ca) return
    (ca.tags || []).forEach(tag => {
      tagFreq[tag] = (tagFreq[tag] || 0) + 1
    })
  })

  const topSignals = Object.entries(tagFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag]) => tag)

  const careerScore = careerScores?.find(s => s.id === career.id)?.percentage
  const matchDescription = careerScore
    ? `${careerScore}% match based on their answers`
    : 'not yet scored against their answers'

  const customAnswerSummaries = Object.entries(customAnswers)
    .filter(([_, ca]) => ca !== null)
    .map(([qId, ca]) => {
      const question = QUIZ.find(q => q.id === parseInt(qId))
      return {
        question: question?.question || `Question ${qId}`,
        text: ca.text
      }
    })

  return {
    completed: quizCompleted,
    answeredCount,
    skippedCount,
    totalQuestions,
    topSignals,
    matchDescription,
    customAnswers: customAnswerSummaries
  }
}

function DrawerChat({ career }) {
  const [text, setText] = useState('')
  const { sendMessage } = useChat()
  const messagesEndRef = useRef(null)
  const store = useAppStore()
  const chatMessages = useAppStore(s => s.chatMessages)
  const chatLoading = useAppStore(s => s.chatLoading)
  const clearChat = useAppStore(s => s.clearChat)
  const setContextCareer = useAppStore(s => s.setContextCareer)
  const authLoading = useAppStore(s => s.authLoading)

  // Refresh chat and context when career node changes
  useEffect(() => {
    // Wait for auth to finish loading before setting context
    // This ensures quizAnswers are loaded from Supabase first
    if (authLoading) return
    clearChat()
    if (career) {
      setContextCareer(career)
    }
  }, [career?.id, authLoading, clearChat, setContextCareer])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages, chatLoading])

  const onSubmit = (e) => {
    e.preventDefault()
    if (!text.trim() || chatLoading) return
    // Read fresh store state at send time, not from stale closure
    const freshStore = useAppStore.getState()
    const quizContext = buildQuizContext(career, freshStore)
    sendMessage(text, quizContext)
    setText('')
  }

  return (
    <div className="flex flex-col h-[500px] bg-surface/30 rounded-[32px] border border-ink-5 overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {chatMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
            <Icon name="chat_bubble" size={40} className="mb-4" />
            <p className="text-sm font-bold uppercase tracking-widest">Start a conversation</p>
            <p className="text-xs max-w-[200px] mt-2">Ask about entry requirements, daily life, or salary in India.</p>
          </div>
        ) : (
          chatMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' ? 'bg-ink text-paper' : 'bg-white border border-ink-10 text-ink'
              }`}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))
        )}
        {chatLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-ink-10 px-4 py-3 rounded-2xl">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-ink-20 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-ink-20 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-ink-20 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={onSubmit} className="p-4 bg-white border-t border-ink-10 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Ask about ${career.title}...`}
          className="flex-1 bg-surface border border-ink-10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
        />
        <button
          disabled={!text.trim() || chatLoading}
          className="w-10 h-10 bg-ink text-paper rounded-xl flex items-center justify-center hover:bg-accent disabled:opacity-30 disabled:bg-ink-30 transition-colors"
        >
          <Icon name="arrow_upward" size={20} />
        </button>
      </form>
    </div>
  )
}

export default function CareerDrawer({ career }) {
  const dragControls = useDragControls()
  const navigate = useNavigate()
  const clearSelectedCareer = useAppStore(s => s.clearSelectedCareer)
  const toggleBookmark = useAppStore(s => s.toggleBookmark)
  const bookmarkedCareers = useAppStore(s => s.bookmarkedCareers)
  const activeTab = useAppStore(s => s.drawerTab)
  const setDrawerTab = useAppStore(s => s.setDrawerTab)

  if (!career) return null

  const isBookmarked = bookmarkedCareers.includes(career.id)

  const tabs = ['Overview', 'Education', 'Career Path', 'In India', 'Hurdles', 'Subjects', 'Chat']

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      drag="y"
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.6}
      onDragEnd={(e, info) => {
        if (info.offset.y > 150 || info.velocity.y > 500) {
          clearSelectedCareer()
        }
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 35 }}
      className="fixed bottom-0 left-0 right-0 h-[85vh] bg-paper z-[100] border-t border-ink-10 rounded-t-[40px] shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
    >
      {/* Visual Header Background */}
      <div 
        className="absolute top-0 left-0 right-0 h-40 opacity-5 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, ${career.accent}, transparent)` }}
      />

      {/* Drag handle */}
      <div 
        onPointerDown={(e) => dragControls.start(e)}
        className="w-full flex justify-center py-5 cursor-grab active:cursor-grabbing relative z-20"
      >
        <div className="w-16 h-1.5 rounded-full bg-ink-10 hover:bg-ink-20 transition-colors" />
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden px-8 md:px-12 pb-24 relative z-10">
        
        {/* LEFT COLUMN */}
        <div className="w-full md:w-[35%] pr-8 md:border-r border-ink-10 overflow-y-auto custom-scrollbar">
          <div className="flex items-center gap-5 mb-6">
             <motion.div 
               initial={{ scale: 0.8, rotate: -10 }}
               animate={{ scale: 1, rotate: 0 }}
               className="w-16 h-16 rounded-2xl flex items-center justify-center text-paper shadow-xl" 
               style={{ backgroundColor: career.accent }}
             >
                <Icon name={career.icon} size={32} />
             </motion.div>
             <div>
                <span className="text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: career.accent }}>
                  {career.category}
                </span>
             </div>
          </div>
          
          <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight mb-3 tracking-tight">{career.title}</h2>
          <p className="font-sans text-xl text-ink-60 italic mb-10 leading-relaxed border-l-4 border-accent/10 pl-5">
            "{career.tagline}"
          </p>

          <div className="bg-surface/50 p-6 rounded-3xl border border-ink-10 mb-10">
            <h3 className="text-xs font-bold tracking-widest text-ink-30 uppercase mb-5">Key Competencies</h3>
            <div className="space-y-5">
              <MetricRow label="Market Demand" value={career.demand} color={career.accent} />
              <MetricRow label="Work-Life Balance" value={career.workLife} color={career.accent} />
              <MetricRow label="Creative Scope" value={career.creativity} color={career.accent} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
             <div className="p-4 bg-surface rounded-2xl border border-ink-5">
                <span className="text-[9px] font-bold text-ink-30 uppercase block mb-1">Min. Stream</span>
                <span className="text-xs font-bold text-ink">{career.stream}</span>
             </div>
             <div className="p-4 bg-surface rounded-2xl border border-ink-5">
                <span className="text-[9px] font-bold text-ink-30 uppercase block mb-1">Typical Entry</span>
                <span className="text-xs font-bold text-ink">{career.entry_age}</span>
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full md:w-[65%] md:pl-12 flex flex-col h-full mt-8 md:mt-0">
           <div className="flex gap-8 border-b border-ink-10 mb-8 overflow-x-auto custom-scrollbar no-scrollbar">
              {tabs.map(t => (
                <button 
                  key={t}
                  onClick={() => setDrawerTab(t)}
                  className={`pb-4 text-sm font-bold tracking-widest uppercase relative whitespace-nowrap transition-colors ${activeTab === t ? 'text-ink' : 'text-ink-30 hover:text-ink-60'}`}
                >
                  {t}
                  {activeTab === t && (
                    <motion.div 
                      layoutId="tab-underline" 
                      className="absolute bottom-[-1px] left-0 right-0 h-1 rounded-full" 
                      style={{ backgroundColor: career.accent }}
                    />
                  )}
                </button>
              ))}
           </div>

           <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
              <AnimatePresence mode="wait">
                 <motion.div
                   key={activeTab}
                   initial={{ opacity: 0, x: 10 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -10 }}
                   transition={{ duration: 0.3, ease: "easeOut" }}
                 >
                    {activeTab === 'Overview' && <TabOverview career={career} />}
                    {activeTab === 'Education' && <TabEducation career={career} />}
                    {activeTab === 'Career Path' && <TabPath career={career} />}
                    {activeTab === 'In India' && <TabIndia career={career} />}
                    {activeTab === 'Hurdles' && <TabHurdles career={career} />}
                    {activeTab === 'Subjects' && <TabSubjects career={career} />}
                    {activeTab === 'Chat' && <DrawerChat career={career} />}
                 </motion.div>
              </AnimatePresence>
           </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-paper/90 backdrop-blur-xl border-t border-ink-10 px-8 py-6 flex justify-between items-center z-50">
         <button 
           onClick={() => clearSelectedCareer()} 
           className="group text-sm font-bold tracking-widest uppercase text-ink-60 hover:text-ink flex items-center gap-3 transition-colors"
         >
            <div className="w-8 h-8 rounded-full border border-ink-10 flex items-center justify-center group-hover:border-ink transition-colors">
               <Icon name="arrow_back" size={18} />
            </div>
            Back to Map
         </button>
         
         <div className="flex items-center gap-4">
            <button
              onClick={() => {
                const { enterCompareMode, toggleCompareSelection } = useAppStore.getState()
                enterCompareMode()
                toggleCompareSelection(career.id)
                clearSelectedCareer()
              }}
              className="flex items-center gap-2 text-sm text-ink-60 hover:text-ink border border-ink-10
                         px-4 py-2.5 rounded-xl hover:border-ink-30 transition-all font-bold tracking-widest uppercase"
            >
              <Icon name="compare_arrows" size={16} />
              Compare
            </button>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleBookmark(career.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-full border font-bold text-xs tracking-widest uppercase transition-all ${
                isBookmarked 
                  ? 'border-accent text-accent bg-accent-10' 
                  : 'border-ink-10 text-ink hover:bg-surface'
              }`}
            >
               <Icon name="bookmark" filled={isBookmarked} size={18} />
               {isBookmarked ? 'Saved' : 'Save Path'}
            </motion.button>
         </div>
      </div>
    </motion.div>
  )
}

function MetricRow({ label, value, color }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.1em] text-ink-60">
        <span>{label}</span>
        <span style={{ color }}>{value}/5</span>
      </div>
      <div className="flex gap-1.5 h-1.5">
        {[1,2,3,4,5].map(i => (
          <motion.div 
            key={i} 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className={`flex-1 rounded-full origin-left ${i <= value ? '' : 'bg-ink-10'}`} 
            style={{ backgroundColor: i <= value ? color : undefined }} 
          />
        ))}
      </div>
    </div>
  )
}

function TabOverview({ career }) {
  return (
    <div className="space-y-10 pb-10">
      <div>
        <h3 className="text-xs font-bold tracking-[0.2em] text-accent uppercase mb-5 flex items-center gap-3">
          <div className="w-6 h-[1px] bg-accent" />
          Primary Roles
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {career.jobs.map(j => (
            <div key={j} className="flex items-center gap-3 p-4 bg-surface rounded-2xl border border-ink-5 hover:border-accent/20 transition-colors">
               <div className="w-2 h-2 rounded-full bg-accent/30" />
               <span className="text-sm font-medium text-ink">{j}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-8 bg-surface rounded-[32px] border border-ink-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full translate-x-10 translate-y-[-10px] blur-2xl" />
        <h3 className="text-xs font-bold tracking-[0.2em] text-ink-30 uppercase mb-4">Professional Reality</h3>
        <p className="text-base text-ink leading-relaxed font-medium">
          As a {career.title}, your day-to-day usually involves a <strong>{career.work_schedule}</strong> setup. 
          The work is primarily <strong>{career.work_location}</strong>. 
          <span className="block mt-4 text-ink-60 font-normal">{career.scope}</span>
        </p>
      </div>

      {career.celebs && (
        <div>
          <h3 className="text-xs font-bold tracking-[0.2em] text-ink-30 uppercase mb-5">Inspirational Figures</h3>
          <div className="flex flex-wrap gap-3">
            {career.celebs.map(c => (
              <span key={c} className="text-xs font-bold tracking-tight px-5 py-2.5 bg-paper border border-ink-10 rounded-full text-ink shadow-sm">
                {c}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function TabEducation({ career }) {
  const ed = career.education
  return (
    <div className="space-y-10 pb-10">
      <div className="relative border-l-2 border-ink-5 ml-4 pl-10 py-2 space-y-12">
        <div className="relative">
           <div className="absolute -left-[51px] top-0 w-10 h-10 bg-paper border-2 border-ink-10 rounded-2xl flex items-center justify-center text-ink-30 shadow-sm">
              <span className="text-xs font-black">10</span>
           </div>
           <span className="text-[10px] font-black tracking-[0.2em] text-accent uppercase block mb-2">Class 10 Milestone</span>
           <div className="font-serif text-2xl text-ink">Choose {career.stream} Stream</div>
        </div>
        
        <div className="relative">
           <div className="absolute -left-[51px] top-0 w-10 h-10 bg-paper border-2 border-ink-10 rounded-2xl flex items-center justify-center text-ink-30 shadow-sm">
              <Icon name="edit_note" size={20} />
           </div>
           <span className="text-[10px] font-black tracking-[0.2em] text-ink-30 uppercase block mb-3">Entrance Gates</span>
           <div className="flex flex-wrap gap-2.5">
             {ed.entrance_exams.map(e => (
               <span key={e} className="text-xs font-bold px-4 py-2 bg-surface border border-ink-10 rounded-xl text-ink">{e}</span>
             ))}
           </div>
        </div>

        <div className="relative">
           <div className="absolute -left-[51px] top-0 w-10 h-10 bg-ink rounded-2xl flex items-center justify-center text-paper shadow-xl" style={{ backgroundColor: career.accent }}>
              <Icon name="school" size={20} />
           </div>
           <span className="text-[10px] font-black tracking-[0.2em] text-ink-30 uppercase block mb-2">Professional Degree ({ed.duration})</span>
           <div className="font-serif text-2xl text-ink">{ed.degrees[0]}</div>
           {ed.degrees.length > 1 && (
             <div className="text-sm font-medium text-ink-60 mt-2 bg-surface/50 p-3 rounded-lg border border-ink-5">
               Alternative paths: {ed.degrees.slice(1).join(', ')}
             </div>
           )}
        </div>

        {ed.licensing && (
          <div className="relative">
            <div className="absolute -left-[51px] top-0 w-10 h-10 bg-paper border-2 border-accent/30 rounded-2xl flex items-center justify-center text-accent shadow-sm">
               <Icon name="verified" size={20} />
            </div>
            <span className="text-[10px] font-black tracking-[0.2em] text-accent uppercase block mb-2">Mandatory Licensing</span>
            <div className="text-base font-bold text-ink">{ed.licensing}</div>
          </div>
        )}
      </div>

      <div className="pt-8 border-t border-ink-10">
        <h3 className="text-xs font-bold tracking-[0.2em] text-ink-30 uppercase mb-5">Curriculum Focus</h3>
        <div className="flex flex-wrap gap-2.5">
          {ed.key_subjects.map(s => (
            <span key={s} className="text-xs font-bold px-4 py-2 bg-surface rounded-full text-ink border border-ink-5">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function TabPath({ career }) {
  return (
    <div className="space-y-10 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 bg-surface rounded-[24px] border border-ink-5">
           <div className="text-[10px] font-black text-ink-30 uppercase tracking-[0.1em] mb-2">Fresher</div>
           <div className="font-serif text-2xl text-ink">{career.salary.fresher}</div>
        </div>
        <div className="p-6 bg-surface rounded-[24px] border border-ink-5">
           <div className="text-[10px] font-black text-ink-30 uppercase tracking-[0.1em] mb-2">Mid-Level</div>
           <div className="font-serif text-2xl text-ink">{career.salary.mid}</div>
        </div>
        <div className="p-6 rounded-[24px] border shadow-lg" style={{ backgroundColor: `${career.accent}08`, borderColor: `${career.accent}30` }}>
           <div className="text-[10px] font-black uppercase tracking-[0.1em] mb-2" style={{ color: career.accent }}>Senior</div>
           <div className="font-serif text-2xl text-ink">{career.salary.senior}</div>
        </div>
      </div>
      <p className="text-xs text-ink-60 italic leading-relaxed bg-paper p-4 rounded-xl border border-ink-10">
        <Icon name="info" size={14} className="inline mr-2 align-middle text-accent" />
        {career.salary.note}
      </p>

      <div>
        <h3 className="text-xs font-bold tracking-[0.2em] text-ink-30 uppercase mb-6 flex items-center gap-3">
           <div className="w-6 h-[1px] bg-ink-30" />
           Career Progression
        </h3>
        <div className="flex flex-col gap-3">
          {career.progression.map((p, i) => (
             <div key={p} className="flex items-center gap-5">
               <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border border-ink-10 text-ink-30">
                 {i + 1}
               </div>
               <div className={`flex-1 p-4 rounded-2xl border transition-all ${i === 0 ? 'bg-surface border-ink-10' : 'bg-paper border-ink-5 opacity-60'}`}>
                 <span className="text-sm font-bold text-ink">{p}</span>
               </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TabIndia({ career }) {
  return (
    <div className="space-y-8 pb-10">
       <div className="p-8 bg-ink text-paper rounded-[32px] shadow-2xl relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/20 rounded-full translate-x-10 translate-y-10 blur-3xl" />
          <div className="flex items-center gap-4 mb-6">
             <div className="px-4 py-1.5 rounded-full bg-accent text-white text-[10px] font-black tracking-[0.2em] uppercase shadow-lg shadow-accent/30">
               {career.india_demand} Demand
             </div>
          </div>
          <h3 className="font-serif text-3xl mb-4">The Indian Context</h3>
          <p className="text-paper/80 leading-relaxed text-lg">
            {career.india_size}
          </p>
       </div>
       
       {career.govt_exams && career.govt_exams.length > 0 && (
         <div className="p-6 border border-ink-10 rounded-[32px]">
            <h3 className="text-xs font-bold tracking-[0.2em] text-ink-30 uppercase mb-5 flex items-center gap-3">
               <Icon name="account_balance" size={18} className="text-accent" />
               Govt / PSU Pathways
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {career.govt_exams.map(e => (
                <div key={e} className="px-5 py-3 bg-surface rounded-xl text-sm font-bold text-ink border border-ink-5">
                  {e}
                </div>
              ))}
            </div>
         </div>
       )}

       <div>
          <h3 className="text-xs font-bold tracking-[0.2em] text-ink-30 uppercase mb-5">Key Employing Sectors</h3>
          <div className="flex flex-wrap gap-2.5">
            {career.sectors.map(s => (
              <span key={s} className="text-xs font-bold px-5 py-2.5 bg-surface border border-ink-5 rounded-full text-ink hover:border-accent/20 transition-colors">
                {s}
              </span>
            ))}
          </div>
       </div>
    </div>
  )
}

function TabHurdles({ career }) {
  if (!career.hurdles) return null;
  
  const difficultyClasses = {
    'Extreme': 'bg-red-50 text-red-700 border border-red-200',
    'Very Hard': 'bg-orange-50 text-orange-700 border border-orange-200',
    'Hard': 'bg-amber-50 text-amber-700 border border-amber-200',
    'Moderate': 'bg-green-50 text-green-700 border border-green-200'
  };

  const severityClasses = {
    'Critical': 'bg-red-100 text-red-700',
    'High': 'bg-amber-100 text-amber-700',
    'Medium': 'bg-surface-dark/10 text-ink-60'
  };

  return (
    <div className="pb-10">
      <p className="font-serif italic text-[13px] text-accent mb-2">
        "These are real challenges — not reasons to avoid this path. Knowing them in advance is the advantage."
      </p>
      
      <div className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-4 ${difficultyClasses[career.hurdles.overall_difficulty] || ''}`}>
        {career.hurdles.overall_difficulty}
      </div>

      <p className="font-sans text-[15px] text-ink-60 italic mb-6">
        {career.hurdles.overall_note}
      </p>

      <div className="space-y-3">
        {career.hurdles.items.map((item, i) => (
          <div key={i} className="bg-surface rounded-xl p-4">
            <div className="flex justify-between items-start">
              <h4 className="font-sans font-semibold text-[15px] text-ink">{item.title}</h4>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter ${severityClasses[item.severity] || ''}`}>
                {item.severity}
              </span>
            </div>
            <p className="font-sans text-[14px] text-ink-60 leading-relaxed mt-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabSubjects({ career }) {
  if (!career.subjects) return null;

  const relevanceClasses = {
    'Core': 'bg-ink text-paper',
    'Important': 'bg-surface-dark/20 text-ink',
    'Helpful': 'bg-surface text-ink-60 border border-ink-10'
  };

  const renderDifficultyBar = (difficulty) => {
    let filled = 0;
    let color = 'bg-ink-10';
    if (difficulty === 'Moderate') { filled = 2; color = 'bg-green-400'; }
    else if (difficulty === 'Hard') { filled = 3; color = 'bg-amber-400'; }
    else if (difficulty === 'Very Hard') { filled = 4; color = 'bg-accent'; }

    return (
      <div className="mt-2 flex gap-1 items-center">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= filled ? color : 'bg-ink-10'}`} />
        ))}
        <span className="text-[11px] text-ink-60 ml-2 whitespace-nowrap">{difficulty}</span>
      </div>
    );
  };

  return (
    <div className="pb-10">
      <p className="font-sans text-[14px] text-ink-60 mb-5">
        "Subjects that matter for this path — and how demanding each one is."
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {career.subjects.map((subject, i) => (
          <div key={i} className="bg-surface rounded-xl p-4 flex flex-col">
            <div className="flex items-center justify-between">
              <h4 className="font-sans font-semibold text-[14px] text-ink">{subject.name}</h4>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tight ${relevanceClasses[subject.relevance] || ''}`}>
                {subject.relevance}
              </span>
            </div>
            {renderDifficultyBar(subject.difficulty)}
            <p className="font-sans text-[12px] text-ink-60 leading-relaxed mt-2">
              {subject.why}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
