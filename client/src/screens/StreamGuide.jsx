import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import SeekerNav from '../components/layout/SeekerNav.jsx'
import FloatingPaths from '../components/layout/FloatingPaths.jsx'
import Icon from '../components/ui/Icon.jsx'
import SeekerButton from '../components/ui/SeekerButton.jsx'

const myths = [
  "The most dangerous thing you can believe: that your stream decides your entire future.",
  "Myth: Science students can do anything. Reality: So can Humanities students.",
  "Your Class 10 marks do not measure your potential. They measure your obedience."
]

const streamsData = [
  {
    id: "science-pcm",
    title: "Science (PCM)",
    color: "#2563EB",
    tags: ["Physics", "Chemistry", "Maths", "Computer Science"],
    desc: "For those drawn to logic, systems, building things, and understanding how the physical world works.",
    myth: "You have to become an engineer.",
    reality: "PCM opens doors to architecture, aviation, data science, defense, finance, and pure research.",
    exams: "JEE Main, BITSAT, NDA, NATA",
    colleges: "IITs, NITs, BITS, SPA",
  },
  {
    id: "science-pcb",
    title: "Science (PCB)",
    color: "#16A34A",
    tags: ["Physics", "Chemistry", "Biology", "Psychology"],
    desc: "For those interested in living systems, human health, medicine, and the natural environment.",
    myth: "If you don't clear NEET, your career is over.",
    reality: "PCB leads to clinical psychology, biotechnology, pharma, genetics, and environmental science.",
    exams: "NEET UG, ICAR AIEEA",
    colleges: "AIIMS, CMC, IISER",
  },
  {
    id: "commerce",
    title: "Commerce",
    color: "#D97706",
    tags: ["Accountancy", "Business Studies", "Economics", "Maths"],
    desc: "For those who want to understand value, markets, organizations, and how the economy functions.",
    myth: "It's just for becoming a CA or doing a B.Com.",
    reality: "Commerce is the gateway to investment banking, management consulting, entrepreneurship, and corporate law.",
    exams: "CA Foundation, CLAT, IPMAT",
    colleges: "SRCC, IIM Indore (IPM), NLU",
  },
  {
    id: "humanities",
    title: "Arts / Humanities",
    color: "#E8572A",
    tags: ["History", "Pol Science", "Psychology", "Sociology", "Literature"],
    desc: "For those who want to study human society, culture, governance, media, and expression.",
    myth: "It's for students who couldn't get into Science or Commerce.",
    reality: "Arts students dominate civil services, journalism, law, design, policy, and creative industries.",
    exams: "CUET, TISS BAT, NID DAT",
    colleges: "St. Stephen's, TISS, NID, Ashoka",
  },
  {
    id: "vocational",
    title: "Vocational & Applied",
    color: "#9333EA",
    tags: ["Design", "Mass Media", "IT", "Hospitality"],
    desc: "Skill-based learning focused on specific industries rather than purely academic theory.",
    myth: "These aren't 'real' subjects.",
    reality: "These paths often lead to faster employment in high-growth modern sectors like UI/UX and digital media.",
    exams: "NIFT, NCHMCT",
    colleges: "NIFT, IHMs",
  }
]

export default function StreamGuide() {
  const navigate = useNavigate()
  const [openId, setOpenId] = useState(null)
  const [mythIndex, setMythIndex] = useState(0)

  // Rotate myths every 4s
  useState(() => {
    const timer = setInterval(() => {
      setMythIndex(prev => (prev + 1) % myths.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-paper font-sans flex flex-col relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-gradient-to-br from-accent via-transparent to-blue-500" />
      
      <FloatingPaths position={1} />
      <SeekerNav />

      <main className="flex-1 flex flex-col pt-32 pb-32 max-w-4xl mx-auto w-full px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-16">
           <motion.div 
             initial={{ opacity: 0, x: -10 }}
             animate={{ opacity: 1, x: 0 }}
             className="flex items-center gap-3 mb-6"
           >
              <div className="w-10 h-px bg-accent" />
              <div className="text-[10px] font-black tracking-[0.2em] text-ink-30 uppercase">Class 9–10 Milestone</div>
           </motion.div>
           <h1 className="font-serif text-5xl md:text-7xl text-ink leading-tight mb-8 tracking-tighter">Which stream is <br/><span className="text-accent">right for you?</span></h1>
           <p className="text-xl text-ink-60 leading-relaxed max-w-2xl text-balance font-medium">
             This choice is an invitation, not a final destination. Every stream opens more doors than it closes.
           </p>
        </div>

        {/* Myth Banner */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-ink text-paper p-8 md:p-12 rounded-[40px] mb-20 overflow-hidden relative shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full translate-x-20 translate-y-[-20px] blur-3xl" />
          <div className="text-[10px] font-black tracking-widest text-accent uppercase mb-6 flex items-center gap-2">
             <Icon name="info" size={14} /> Perspective
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={mythIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-serif text-2xl md:text-4xl leading-tight tracking-tight relative z-10"
            >
              {myths[mythIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Stream Cards */}
        <div className="space-y-10 mb-20">
          {streamsData.map((stream, idx) => {
            const isOpen = openId === stream.id

            return (
              <motion.div 
                key={stream.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`border rounded-[32px] overflow-hidden transition-all duration-500 shadow-sm hover:shadow-xl ${isOpen ? 'border-ink bg-paper' : 'border-ink-10 bg-surface/50 hover:bg-surface hover:border-ink-20'}`}
              >
                <button 
                  onClick={() => setOpenId(isOpen ? null : stream.id)}
                  className="w-full text-left p-8 md:p-10 flex items-start justify-between group"
                >
                   <div className="flex-1">
                     <div className="flex items-center gap-4 mb-4">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stream.color }} />
                        <h2 className={`font-serif text-3xl md:text-4xl text-ink transition-all duration-300 ${isOpen ? 'scale-105 origin-left' : 'group-hover:text-accent'}`}>
                          {stream.title}
                        </h2>
                     </div>
                     <div className="flex flex-wrap gap-2 mb-6">
                       {stream.tags.map(tag => (
                         <span key={tag} className="text-[9px] font-black tracking-wider uppercase px-3 py-1.5 bg-paper border border-ink-10 rounded-full text-ink-60">
                           {tag}
                         </span>
                       ))}
                     </div>
                     <p className={`text-lg transition-colors duration-300 ${isOpen ? 'text-ink font-medium' : 'text-ink-60'}`}>
                       {stream.desc}
                     </p>
                   </div>
                   <div className={`shrink-0 w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${isOpen ? 'rotate-180 bg-ink text-paper border-ink shadow-lg' : 'border-ink-10 text-ink group-hover:border-ink'}`}>
                     <Icon name="keyboard_arrow_down" size={24} />
                   </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-ink-10 bg-surface/30"
                    >
                      <div className="p-8 md:p-12 space-y-10">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 bg-paper rounded-[24px] border border-ink-5 shadow-inner">
                               <div className="text-[10px] font-black tracking-[0.2em] text-accent uppercase mb-4">Traditional Myth</div>
                               <p className="font-serif italic text-xl text-ink-60 leading-tight">"{stream.myth}"</p>
                            </div>
                            <div className="p-8 bg-paper rounded-[24px] border border-ink-5 shadow-inner">
                               <div className="text-[10px] font-black tracking-[0.2em] text-ink uppercase mb-4">Modern Reality</div>
                               <p className="text-base text-ink leading-relaxed font-medium">{stream.reality}</p>
                            </div>
                         </div>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4 border-t border-ink-10">
                            <div>
                              <div className="text-[10px] font-black tracking-[0.2em] text-ink-30 uppercase mb-4">Key Entrance Gates</div>
                              <div className="flex flex-wrap gap-2">
                                {stream.exams.split(', ').map(e => (
                                  <span key={e} className="px-4 py-2 bg-ink text-paper text-xs font-bold rounded-lg shadow-md">{e}</span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div className="text-[10px] font-black tracking-[0.2em] text-ink-30 uppercase mb-4">Premier Institutions</div>
                              <p className="text-lg font-serif text-ink tracking-tight">{stream.colleges}</p>
                            </div>
                         </div>

                         <div className="pt-6 flex justify-end">
                            <SeekerButton 
                              variant="ghost" 
                              onClick={() => navigate('/paths')}
                              icon="arrow_forward"
                              className="text-accent"
                            >
                              Explore careers in this stream
                            </SeekerButton>
                         </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-20 px-8 bg-surface rounded-[48px] border border-ink-5 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-accent/5 to-transparent pointer-events-none" />
           <h3 className="font-serif text-4xl text-ink mb-8 tracking-tight">Ready to find your <br/><span className="text-accent italic">specific destination?</span></h3>
           <SeekerButton variant="accent" onClick={() => navigate('/quiz')} icon="arrow_forward" className="shadow-2xl shadow-accent/20">
              Begin Path Discovery
           </SeekerButton>
        </div>

      </main>
    </div>
  )
}
