import { Navigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import useAppStore from '../../store/useAppStore'

export function ProtectedRoute({ children }) {
  const { user, profile, authLoading, setAuthLoading } = useAppStore()
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
          className="fixed inset-0 bg-paper z-[100] flex items-center justify-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="font-serif text-3xl tracking-widest text-ink"
          >
            SEEKER
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

  return children
}
