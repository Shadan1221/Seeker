import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import useAppStore from '../../store/useAppStore.js'
import { useAuth } from '../../hooks/useAuth.js'
import Icon from '../ui/Icon'

export default function SeekerNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const [visible, setVisible] = useState(true)
  const { scrollY } = useScroll()
  const lastY = useRef(0)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const { user, profile, signOut } = useAuth()
  const bookmarkedCareers = useAppStore(s => s.bookmarkedCareers)
  const quizCompleted = useAppStore(s => s.quizCompleted)
  const setBookmarksOpen = useAppStore(s => s.setBookmarksOpen)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastY.current
    if (latest > previous && latest > 150) {
      setVisible(false)
      setUserDropdownOpen(false)
    } else {
      setVisible(true)
    }
    lastY.current = latest
  })

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isActive = (path) => location.pathname === path

  const handleSignOut = async () => {
    await signOut()
    setUserDropdownOpen(false)
    navigate('/')
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 py-4 bg-paper/90 backdrop-blur-md border-b border-ink/5"
        >
          {/* Logo mark */}
          <button
            onClick={() => navigate(user ? '/welcome' : '/')}
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
            
            {profile?.institution_type === 'school' && ['Class 10', 'Class 11', 'Class 12'].some(c => profile.school_class?.includes(c)) && (
              <button
                onClick={() => navigate('/streams')}
                className={`text-sm font-medium tracking-wide hover-underline ${isActive('/streams') ? 'text-accent' : 'text-ink-60'}`}
              >
                Streams
              </button>
            )}

            <button
              data-tour="ask-seeker-nav"
              onClick={() => navigate('/chat')}
              className={`text-sm font-medium tracking-wide hover-underline ${isActive('/chat') ? 'text-accent' : 'text-ink-60'}`}
            >
              Ask Seeker
            </button>

            <button
              data-tour="feedback-nav"
              onClick={() => navigate('/feedback')}
              className={`text-sm font-medium tracking-wide hover-underline ${isActive('/feedback') ? 'text-accent' : 'text-ink-60'}`}
            >
              Feedback
            </button>
            
            <button
              onClick={() => setBookmarksOpen(true)}
              className="relative flex items-center gap-1.5 text-sm text-ink-60 hover:text-accent transition-colors"
            >
              <Icon name="bookmark" className="!text-[18px]" />
              {bookmarkedCareers?.length > 0 && (
                <span className="text-xs font-mono bg-accent text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {bookmarkedCareers.length}
                </span>
              )}
            </button>

            {/* Auth Section */}
            <div className="relative isolate" ref={dropdownRef}>
              {user ? (
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold text-xs uppercase hover:bg-accent/20 transition-all"
                >
                  {profile?.username?.charAt(0) || user.email?.charAt(0) || '?'}
                </button>
              ) : (
                <button
                  onClick={() => navigate('/auth')}
                  className="flex items-center gap-2 text-sm font-medium text-ink-60 hover:text-accent transition-colors"
                >
                  <Icon name="person" className="!text-lg" />
                  Sign In
                </button>
              )}

              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-48 bg-paper border border-ink-10 shadow-xl z-[999]"
                  >
                    <div className="px-4 py-3 border-b border-ink-10">
                      <p className="text-xs font-black tracking-widest uppercase text-ink-30 mb-0.5">Account</p>
                      <p className="text-sm font-bold truncate text-ink">{profile?.username || user.email}</p>
                    </div>
                    
                    <div className="py-1">
                      <button
                        onClick={() => { navigate('/welcome'); setUserDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-ink-60 hover:bg-surface hover:text-ink transition-colors flex items-center gap-2"
                      >
                        <Icon name="account_circle" className="!text-lg" />
                        Profile
                      </button>
                      <button
                        onClick={() => { navigate('/feedback'); setUserDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-ink-60 hover:bg-surface hover:text-ink transition-colors flex items-center gap-2"
                      >
                        <Icon name="rate_review" className="!text-lg" />
                        Feedback
                      </button>
                    </div>

                    <div className="border-t border-ink-10 py-1">
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2.5 text-sm text-accent hover:bg-accent/5 transition-colors flex items-center gap-2"
                      >
                        <Icon name="logout" className="!text-lg" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
