import { useEffect, useState, useRef, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useAppStore from '../../store/useAppStore'
import TourDialog from './TourDialog'
import TourSpotlight from './TourSpotlight'
import SageAvatar from './SageAvatar'

// All 7 tour step definitions
const TOUR_STEPS = [
  {
    id: 0,
    screen: '/welcome',
    target: 'start-discovery',
    position: 'bottom-center',
    title: 'Your paths are waiting.',
    body: "Every path on Seeker is shaped by who you are — not your marks, not your family's expectations. The quiz takes about 4 minutes and it will never ask you which subject you like.\n\nPress Start Discovery below to begin.",
    button: "Let's go →",
    showDismiss: false,
  },
  {
    id: 1,
    screen: '/quiz',
    target: 'quiz-question',
    position: 'bottom-right',
    title: 'Answer honestly.',
    body: 'There are no right answers here. Seeker uses your responses to build a personalised map of careers that actually fit you. Skipping questions is fine — just be genuine on the ones you answer.',
    button: 'Got it',
    showDismiss: false,
  },
  {
    id: 2,
    screen: '/paths',
    target: 'zoom-controls',
    position: 'bottom-center',
    title: 'This is your map.',
    body: 'Every node is a career path shaped around your quiz answers. The percentage on each node is your match score. Use the + and − buttons to zoom in, or scroll to explore. Your strongest matches glow brightest.',
    button: 'Start exploring',
    showDismiss: true,
  },
  {
    id: 3,
    screen: '/paths',
    target: 'path-map-area',
    position: 'bottom-right',
    title: 'Every node has a story.',
    body: "Click on any career that catches your eye. You'll find the full education roadmap, real salary ranges for India, the honest challenges, and much more. Start with your top matches.",
    button: "I'll explore",
    showDismiss: true,
  },
  {
    id: 4,
    screen: '/paths',
    target: 'ask-seeker-nav',
    position: 'near-element',
    title: 'Still have questions?',
    body: "Ask Seeker is an AI counsellor built specifically for Indian students. It knows your quiz results, understands JEE, NEET, UPSC, and can talk through the real trade-offs of any career you're considering. No generic answers — it knows who you are.",
    button: 'Talk to Ask Seeker',
    showDismiss: true,
  },
  {
    id: 5,
    screen: '/paths',
    target: 'compare-button',
    position: 'near-element',
    title: 'Torn between two paths?',
    body: 'Select any two careers and Seeker will compare them side by side — salary at every stage, difficulty, work-life balance, and an AI-written breakdown of who each path is actually built for. It might make the choice clearer than you expect.',
    button: 'Try a comparison',
    showDismiss: true,
  },
  {
    id: 6,
    screen: null,
    target: 'feedback-nav',
    position: 'near-element',
    title: 'One last thing.',
    body: 'Seeker is being shaped by the people who use it. If something helped you, confused you, or is missing — your feedback goes directly to the people building this. It takes two minutes and it genuinely matters.',
    button: 'Share my thoughts',
    showDismiss: true,
  },
]

export default function TourManager() {
  const location = useLocation()
  const navigate = useNavigate()
  const pathname = location.pathname

  // Zustand state
  const tourStep = useAppStore(s => s.tourStep)
  const isNewUser = useAppStore(s => s.isNewUser)
  const tourDismissed = useAppStore(s => s.tourDismissed)
  const quizCompleted = useAppStore(s => s.quizCompleted)
  const pathsExploredCount = useAppStore(s => s.pathsExploredCount)
  const chatMessagesSent = useAppStore(s => s.chatMessagesSent)
  const compareUsed = useAppStore(s => s.compareUsed)
  const selectedCareer = useAppStore(s => s.selectedCareer)

  // Dialog visibility (controlled with delays)
  const [dialogVisible, setDialogVisible] = useState(false)
  // Toast for completion
  const [showToast, setShowToast] = useState(false)
  // Whether step 1 "Got it" was clicked (dialog dismissed)
  const [step1Dismissed, setStep1Dismissed] = useState(false)
  // Whether step 3 "I'll explore" was clicked
  const [step3Dismissed, setStep3Dismissed] = useState(false)

  // Feedback page timer ref
  const feedbackTimerRef = useRef(null)

  // Current step definition
  const currentStepDef = typeof tourStep === 'number' ? TOUR_STEPS[tourStep] : null

  // Should the tour render at all?
  const tourActive =
    tourStep !== null &&
    tourStep !== 'complete' &&
    !tourDismissed &&
    isNewUser &&
    typeof tourStep === 'number'

  // ─── Show dialog: poll for the target element before showing ───
  useEffect(() => {
    setDialogVisible(false)

    if (!tourActive || !currentStepDef) return

    // Step-specific visibility conditions
    if (tourStep === 0 && pathname !== '/welcome') return
    if (tourStep === 1 && pathname !== '/quiz') return
    if (tourStep === 1 && step1Dismissed) return
    if (tourStep === 2 && (pathname !== '/paths' || !quizCompleted)) return
    if (tourStep === 3 && step3Dismissed) return
    if (tourStep === 3 && pathname !== '/paths') return
    if (tourStep === 4 && pathsExploredCount < 2) return
    if (tourStep === 5 && chatMessagesSent < 1) return
    if (tourStep === 5 && pathname !== '/paths') return
    if (tourStep === 6 && !compareUsed) return

    // Poll for the target element to exist in DOM before showing the dialog.
    // This handles loading screens, animations, and any delays.
    const target = currentStepDef.target
    let attempts = 0
    const maxAttempts = 30 // ~6 seconds max

    const poll = setInterval(() => {
      attempts++
      const el = target ? document.querySelector(`[data-tour="${target}"]`) : null

      // Show dialog when target is found OR after max attempts (show anyway)
      if (el || !target || attempts >= maxAttempts) {
        clearInterval(poll)
        setDialogVisible(true)
      }
    }, 200)

    return () => clearInterval(poll)
  }, [tourStep, tourActive, currentStepDef, pathname, quizCompleted, pathsExploredCount, chatMessagesSent, compareUsed, step1Dismissed, step3Dismissed])

  // ─── Auto-advance from step 1 to 2 when quiz completes ───
  useEffect(() => {
    if (tourStep === 1 && quizCompleted && step1Dismissed) {
      useAppStore.getState().setTourStep(2)
      setStep1Dismissed(false)
    }
  }, [tourStep, quizCompleted, step1Dismissed])

  // ─── Auto-advance: step 3 → 4 when pathsExploredCount >= 2 ───
  useEffect(() => {
    if (tourStep === 3 && step3Dismissed && pathsExploredCount >= 2) {
      const timer = setTimeout(() => {
        useAppStore.getState().setTourStep(4)
        setStep3Dismissed(false)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [tourStep, pathsExploredCount, step3Dismissed])

  // ─── Auto-advance: step 4 → 5 when chatMessagesSent >= 1 ───
  useEffect(() => {
    if (tourStep === 4 && chatMessagesSent >= 1) {
      setDialogVisible(false)
      useAppStore.getState().setTourStep(5)
    }
  }, [tourStep, chatMessagesSent])

  // ─── Auto-advance: step 5 → 6 when compareUsed ───
  useEffect(() => {
    if (tourStep === 5 && compareUsed) {
      setDialogVisible(false)
      const timer = setTimeout(() => {
        useAppStore.getState().setTourStep(6)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [tourStep, compareUsed])

  // ─── Feedback page 30-second fallback ───
  useEffect(() => {
    if (tourStep === 6 && pathname === '/feedback') {
      feedbackTimerRef.current = setTimeout(() => {
        if (useAppStore.getState().tourStep === 6) {
          useAppStore.getState().completeTour()
        }
      }, 30000)
      return () => {
        if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current)
      }
    }
  }, [tourStep, pathname])

  // ─── Tour completion toast ───
  useEffect(() => {
    if (tourStep === 'complete') {
      setShowToast(true)
      const timer = setTimeout(() => {
        setShowToast(false)
        useAppStore.getState().setIsNewUser(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [tourStep])

  // ─── Step 0: auto-advance when user navigates to /quiz ───
  useEffect(() => {
    if (tourStep === 0 && pathname === '/quiz') {
      useAppStore.getState().setTourStep(1)
    }
  }, [tourStep, pathname])

  // ─── Button click handlers ───
  const handleButtonClick = useCallback(() => {
    if (!currentStepDef) return

    switch (tourStep) {
      case 0:
        // Dismiss dialog, user clicks "Start Discovery" themselves
        setDialogVisible(false)
        break

      case 1:
        // Dismiss the quiz reminder dialog
        setDialogVisible(false)
        setStep1Dismissed(true)
        break

      case 2:
        // Advance to step 3
        setDialogVisible(false)
        useAppStore.getState().setTourStep(3)
        break

      case 3:
        // Dismiss dialog, wait for pathsExploredCount >= 2
        setDialogVisible(false)
        setStep3Dismissed(true)
        break

      case 4: {
        // Navigate to chat
        setDialogVisible(false)
        const career = useAppStore.getState().selectedCareer
        if (career) {
          useAppStore.getState().setDrawerTab('Chat')
        } else {
          navigate('/chat')
        }
        break
      }

      case 5:
        // Enter compare mode
        setDialogVisible(false)
        useAppStore.getState().enterCompareMode()
        break

      case 6:
        // Navigate to feedback
        setDialogVisible(false)
        navigate('/feedback')
        break

      default:
        break
    }
  }, [tourStep, currentStepDef, navigate])

  const handleDismiss = useCallback(() => {
    setDialogVisible(false)
    useAppStore.getState().dismissTour()
  }, [])

  // Determine spotlight target — for step 4, check if drawer is open
  const getSpotlightTarget = () => {
    if (!currentStepDef) return null
    if (tourStep === 4 && selectedCareer) {
      return 'drawer-chat-tab'
    }
    return currentStepDef.target
  }

  // Determine dialog target for near-element positioning
  const getDialogTarget = () => {
    if (!currentStepDef) return null
    if (tourStep === 4 && selectedCareer) {
      return 'drawer-chat-tab'
    }
    return currentStepDef.target
  }

  // Don't render anything if tour is not applicable
  if (!tourActive && tourStep !== 'complete') return null

  return (
    <>
      {/* Active tour step */}
      {tourActive && currentStepDef && (
        <>
          <TourSpotlight
            targetSelector={getSpotlightTarget()}
            active={dialogVisible}
          />
          <TourDialog
            title={currentStepDef.title}
            body={currentStepDef.body}
            buttonLabel={currentStepDef.button}
            onButtonClick={handleButtonClick}
            onDismiss={handleDismiss}
            showDismiss={currentStepDef.showDismiss}
            position={
              tourStep === 4 && selectedCareer
                ? 'near-element'
                : currentStepDef.position
            }
            targetSelector={getDialogTarget()}
            visible={dialogVisible}
          />
        </>
      )}

      {/* Completion toast */}
      <AnimatePresence>
        {showToast && (
          <div className="fixed bottom-8 left-0 right-0 flex justify-center z-[9999] pointer-events-none">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex items-center gap-3 bg-ink text-paper px-6 py-3.5 rounded-2xl shadow-2xl pointer-events-auto"
            >
              <SageAvatar size={24} />
              <span className="text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                You know your way around. Good luck on your path.
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
