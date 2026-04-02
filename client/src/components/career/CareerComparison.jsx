import Meter from '../ui/Meter.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '../ui/Icon.jsx'

export default function CareerComparison({ careers, onClose }) {
  if (!careers || careers.length !== 2) return null

  return (
    <div className='fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-10'>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-ink/60 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className='relative w-full max-w-5xl bg-paper border border-ink-10 rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]'
      >
        <div className='p-8 border-b border-ink-5 flex justify-between items-center bg-surface/50'>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
              <Icon name="compare_arrows" size={24} />
            </div>
            <h3 className='font-serif text-3xl text-ink'>Path Comparison</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-full flex items-center justify-center text-ink-40 hover:text-ink hover:bg-ink-5 transition-all"
          >
            <Icon name="close" size={24} />
          </button>
        </div>

        <div className='flex-1 overflow-y-auto p-8 sm:p-12 pb-24 custom-scrollbar'>
          <div className='grid md:grid-cols-2 gap-12 relative'>
            {/* VS Divider */}
            <div className="hidden md:flex absolute left-1/2 top-0 bottom-0 w-px bg-ink-5 items-center justify-center -translate-x-1/2">
               <div className="bg-paper border border-ink-5 px-3 py-1 rounded-full text-[10px] font-black text-ink-20 tracking-widest uppercase">VS</div>
            </div>

            {careers.map((c, idx) => (
              <div key={c.id} className='space-y-8'>
                <div className="flex items-center gap-5">
                   <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-paper shadow-lg" style={{ backgroundColor: c.accent || '#E8572A' }}>
                      <Icon name={c.icon} size={32} />
                   </div>
                   <div>
                      <h4 className='font-serif text-3xl text-ink mb-1'>{c.title}</h4>
                      <p className='text-xs font-bold text-accent tracking-widest uppercase'>{c.cluster}</p>
                   </div>
                </div>

                <p className='text-ink-60 italic text-lg leading-relaxed border-l-3 border-accent/10 pl-5'>
                  "{c.tagline}"
                </p>

                <div className='space-y-6 bg-surface/50 p-8 rounded-[32px] border border-ink-5'>
                  <h5 className="text-[10px] font-black text-ink-30 tracking-[0.2em] uppercase mb-2">Market Metrics</h5>
                  <div className="space-y-5">
                    <MetricComparison label='Market Demand' value={c.demand} color={c.accent} />
                    <MetricComparison label='Work-Life Balance' value={c.workLife} color={c.accent} />
                    <MetricComparison label='Creative Scope' value={c.creativity} color={c.accent} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="p-5 bg-paper border border-ink-10 rounded-2xl">
                      <span className="text-[9px] font-black text-ink-30 uppercase tracking-widest block mb-2">Fresher Salary</span>
                      <span className="text-xl font-serif text-ink">{c.salary?.fresher || 'N/A'}</span>
                   </div>
                   <div className="p-5 bg-paper border border-ink-10 rounded-2xl">
                      <span className="text-[9px] font-black text-ink-30 uppercase tracking-widest block mb-2">Senior Salary</span>
                      <span className="text-xl font-serif text-ink">{c.salary?.senior || 'N/A'}</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sticky bottom-0 p-8 border-t border-ink-10 bg-surface/95 backdrop-blur-sm flex justify-center">
           <button 
             onClick={onClose}
             className="px-10 py-4 bg-ink text-paper rounded-xl font-bold tracking-[0.3em] uppercase hover:bg-accent transition-all shadow-xl shadow-ink/10"
           >
             Close Comparison
           </button>
        </div>
      </motion.div>
    </div>
  )
}

function MetricComparison({ label, value, color }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.1em] text-ink-60">
        <span>{label}</span>
        <span className="font-mono" style={{ color }}>{value}/5</span>
      </div>
      <div className="flex gap-1.5 h-1.5">
        {[1,2,3,4,5].map(i => (
          <div 
            key={i} 
            className={`flex-1 rounded-full ${i <= value ? '' : 'bg-ink-10'}`} 
            style={{ backgroundColor: i <= value ? color : undefined }} 
          />
        ))}
      </div>
    </div>
  )
}
