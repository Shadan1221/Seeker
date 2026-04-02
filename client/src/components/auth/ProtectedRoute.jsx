import { Navigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import useAppStore from '../../store/useAppStore'

export function ProtectedRoute({ children, requireQuiz = false }) {
  const user = useAppStore(s => s.user)
  const profile = useAppStore(s => s.profile)
  const authLoading = useAppStore(s => s.authLoading)
  const setAuthLoading = useAppStore(s => s.setAuthLoading)
  const quizCompleted = useAppStore(s => s.quizCompleted)
  const location = useLocation()

  useEffect(() => {
    if (!authLoading) return

    const timer = setTimeout(() => {
      // Failsafe so the UI never gets stuck in an infinite loading state.
      setAuthLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [authLoading, setAuthLoading])

  if (authLoading) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-paper z-[100] flex flex-col items-center justify-center gap-6"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="font-serif text-5xl tracking-[0.2em] text-ink"
          >
            SEEKER
          </motion.div>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-px bg-accent/30 relative"
          >
             <motion.div 
               animate={{ x: [0, 200, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute top-0 left-0 h-full w-12 bg-accent shadow-[0_0_15px_rgba(232,87,42,0.5)]"
             />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  if (user && !profile) {
    return <Navigate to="/?mode=signup&step=2" replace />
  }

  if (requireQuiz && !quizCompleted) {
    return <Navigate to="/quiz" replace />
  }

  return children
}
