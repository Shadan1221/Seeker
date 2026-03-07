import { useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import useAppStore from '../../store/useAppStore.js'

export default function SeekerNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const [visible, setVisible] = useState(true)
  const { scrollY } = useScroll()
  const lastY = useRef(0)

  const bookmarkedCareers = useAppStore(s => s.bookmarkedCareers)
  const quizCompleted = useAppStore(s => s.quizCompleted)
  const setBookmarksOpen = useAppStore(s => s.setBookmarksOpen)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastY.current
    if (latest > previous && latest > 150) {
      setVisible(false)
    } else {
      setVisible(true)
    }
    lastY.current = latest
  })

  const isActive = (path) => location.pathname === path

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 mix-blend-multiply"
        >
          {/* Logo mark */}
          <button
            onClick={() => navigate('/')}
            className="font-serif text-xl text-ink tracking-tight hover-underline"
          >
            Seeker
          </button>

          {/* Right nav items */}
          <div className="flex items-center gap-8">
            {quizCompleted && (
              <button
                onClick={() => navigate('/paths')}
                className={`text-sm font-medium tracking-wide hover-underline ${isActive('/paths') ? 'text-accent' : 'text-ink-60'}`}
              >
                My Paths
              </button>
            )}
            <button
              onClick={() => navigate('/quiz')}
              className={`text-sm font-medium tracking-wide hover-underline ${isActive('/quiz') ? 'text-accent' : 'text-ink-60'}`}
            >
              Discovery
            </button>
            <button
              onClick={() => navigate('/chat')}
              className="relative text-sm font-medium tracking-wide hover-underline text-ink-60"
            >
              Ask Seeker
            </button>
            
            {/* Always show bookmarks button for better discovery */}
            <button
              onClick={() => setBookmarksOpen(true)}
              className="relative flex items-center gap-1.5 text-sm text-ink-60 hover:text-accent transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">bookmark</span>
              {bookmarkedCareers?.length > 0 && (
                <span className="text-xs font-mono bg-accent text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {bookmarkedCareers.length}
                </span>
              )}
            </button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
