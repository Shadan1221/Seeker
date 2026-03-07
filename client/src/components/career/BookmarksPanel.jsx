import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useAppStore from '../../store/useAppStore.js'
import { useCareers } from '../../hooks/useCareers.js'
import Icon from '../ui/Icon.jsx'

export default function BookmarksPanel() {
  const bookmarksOpen = useAppStore(s => s.bookmarksOpen)
  const setBookmarksOpen = useAppStore(s => s.setBookmarksOpen)
  const bookmarkedIds = useAppStore(s => s.bookmarkedCareers)
  const toggleBookmark = useAppStore(s => s.toggleBookmark)
  const setSelectedCareer = useAppStore(s => s.setSelectedCareer)
  const compareIds = useAppStore(s => s.compareIds)
  const setCompareIds = useAppStore(s => s.setCompareIds)
  
  const { data } = useCareers()
  const careers = data?.careers || []

  const bookmarkedCareers = useMemo(() => {
    return careers.filter(c => bookmarkedIds.includes(c.id))
  }, [careers, bookmarkedIds])

  const onToggleCompare = (id) => {
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter(i => i !== id))
    } else if (compareIds.length < 2) {
      setCompareIds([...compareIds, id])
    }
  }

  const handleOpenCareer = (career) => {
    setSelectedCareer(career)
    setBookmarksOpen(false)
  }

  return (
    <AnimatePresence>
      {bookmarksOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setBookmarksOpen(false)}
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-[100]"
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-full max-w-sm bg-paper border-l border-ink-10 z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-ink-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <Icon name="bookmark" size={18} />
                </div>
                <h3 className="font-serif text-xl text-ink">Bookmarks</h3>
              </div>
              <button 
                onClick={() => setBookmarksOpen(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-ink-40 hover:text-ink hover:bg-ink-5 transition-all"
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {bookmarkedCareers.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-ink-30 text-sm italic font-serif">No bookmarked paths yet.</p>
                </div>
              ) : (
                bookmarkedCareers.map((c) => (
                  <div key={c.id} className="group p-4 bg-white border border-ink-5 rounded-none hover:border-ink-20 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <button 
                        onClick={() => handleOpenCareer(c)}
                        className="text-left group-hover:text-accent transition-colors"
                      >
                        <h4 className="font-bold text-sm uppercase tracking-wider mb-1">{c.title}</h4>
                        <p className="text-[10px] text-ink-40 font-mono">{c.cluster}</p>
                      </button>
                      <button 
                        onClick={() => toggleBookmark(c.id)}
                        className="text-ink-20 hover:text-accent transition-colors"
                      >
                        <Icon name="bookmark_remove" size={18} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-ink-5">
                      <label className="flex items-center gap-2 cursor-pointer group/label">
                        <div className={`w-4 h-4 border flex items-center justify-center transition-all ${
                          compareIds.includes(c.id) ? 'bg-accent border-accent' : 'border-ink-20 group-hover/label:border-ink'
                        }`}>
                          {compareIds.includes(c.id) && <Icon name="check" size={12} className="text-white" />}
                        </div>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={compareIds.includes(c.id)}
                          onChange={() => onToggleCompare(c.id)}
                        />
                        <span className="text-[10px] font-bold text-ink-40 tracking-widest uppercase">Compare</span>
                      </label>
                      
                      <button 
                        onClick={() => handleOpenCareer(c)}
                        className="text-[10px] font-black text-accent tracking-[0.2em] uppercase flex items-center gap-1 group/btn"
                      >
                        Details <Icon name="arrow_forward" size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {bookmarkedCareers.length >= 2 && (
              <div className="p-6 border-t border-ink-10 bg-white">
                <button
                  disabled={compareIds.length !== 2}
                  onClick={() => setBookmarksOpen(false)}
                  className="w-full bg-ink text-paper py-4 text-xs font-bold tracking-[0.3em] uppercase disabled:opacity-20 hover:bg-accent transition-all flex items-center justify-center gap-3"
                >
                  Compare Careers {compareIds.length > 0 && `(${compareIds.length}/2)`}
                </button>
                {compareIds.length < 2 && (
                  <p className="text-[9px] text-center mt-3 text-ink-30 font-medium uppercase tracking-widest">Select 2 careers to compare</p>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
