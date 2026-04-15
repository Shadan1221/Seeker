import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SageAvatar from './SageAvatar'

export default function TourDialog({
  title,
  body,
  buttonLabel,
  onButtonClick,
  onDismiss,
  showDismiss = false,
  position = 'bottom-center',
  targetSelector = null,
  visible = false,
}) {
  const [nearPos, setNearPos] = useState(null)

  const computeNearPosition = useCallback(() => {
    if (position !== 'near-element' || !targetSelector) return
    const el = document.querySelector(`[data-tour="${targetSelector}"]`)
    if (!el) return
    const r = el.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight

    const dialogWidth = 320
    const dialogHeight = 280
    const gap = 12

    let top, left

    if (r.bottom + gap + dialogHeight < vh) {
      top = r.bottom + gap
    } else if (r.top - gap - dialogHeight > 0) {
      top = r.top - gap - dialogHeight
    } else {
      top = Math.max(16, vh - dialogHeight - 32)
    }

    left = r.left + r.width / 2 - dialogWidth / 2
    left = Math.max(16, Math.min(left, vw - dialogWidth - 16))

    setNearPos({ top, left })
  }, [position, targetSelector])

  useEffect(() => {
    if (position === 'near-element') {
      computeNearPosition()
      window.addEventListener('resize', computeNearPosition)
      window.addEventListener('scroll', computeNearPosition, true)
      return () => {
        window.removeEventListener('resize', computeNearPosition)
        window.removeEventListener('scroll', computeNearPosition, true)
      }
    }
  }, [position, computeNearPosition])

  // For near-element, use absolute top/left
  if (position === 'near-element') {
    return (
      <AnimatePresence>
        {visible && nearPos && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: nearPos.top,
              left: nearPos.left,
              zIndex: 9999,
              maxWidth: 320,
              width: '90vw',
            }}
            className="bg-paper border border-ink-10 rounded-2xl shadow-xl"
          >
            <DialogContent
              title={title}
              body={body}
              buttonLabel={buttonLabel}
              onButtonClick={onButtonClick}
              onDismiss={onDismiss}
              showDismiss={showDismiss}
            />
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  // For bottom-right / bottom-left, use fixed position directly
  if (position === 'bottom-right' || position === 'bottom-left') {
    const side = position === 'bottom-right' ? { right: 32 } : { left: 32 }
    return (
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              bottom: 32,
              ...side,
              zIndex: 9999,
              maxWidth: 320,
              width: '90vw',
            }}
            className="bg-paper border border-ink-10 rounded-2xl shadow-xl"
          >
            <DialogContent
              title={title}
              body={body}
              buttonLabel={buttonLabel}
              onButtonClick={onButtonClick}
              onDismiss={onDismiss}
              showDismiss={showDismiss}
            />
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  // Default: bottom-center — use a full-width flex wrapper to avoid transform conflicts
  return (
    <AnimatePresence>
      {visible && (
        <div
          style={{
            position: 'fixed',
            bottom: 32,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              maxWidth: 320,
              width: '90vw',
              pointerEvents: 'auto',
            }}
            className="bg-paper border border-ink-10 rounded-2xl shadow-xl"
          >
            <DialogContent
              title={title}
              body={body}
              buttonLabel={buttonLabel}
              onButtonClick={onButtonClick}
              onDismiss={onDismiss}
              showDismiss={showDismiss}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function DialogContent({ title, body, buttonLabel, onButtonClick, onDismiss, showDismiss }) {
  return (
    <div className="p-6">
      {/* Header with Sage avatar + title */}
      <div className="flex items-start gap-3 mb-3">
        <SageAvatar size={32} />
        <h3
          className="font-serif text-xl text-ink leading-snug pt-0.5"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          {title}
        </h3>
      </div>

      {/* Body */}
      <p
        className="text-ink-60 leading-relaxed mb-5"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
        }}
      >
        {body}
      </p>

      {/* Button */}
      <button
        onClick={onButtonClick}
        className="w-full bg-ink text-paper font-bold text-xs tracking-widest uppercase rounded-xl flex items-center justify-center transition-colors hover:bg-ink-60"
        style={{ height: 44 }}
      >
        {buttonLabel}
      </button>

      {/* Skip tour link */}
      {showDismiss && (
        <button
          onClick={onDismiss}
          className="w-full text-center mt-3 text-ink-30 hover:text-ink-60 transition-colors"
          style={{ fontSize: 11 }}
        >
          Skip tour
        </button>
      )}
    </div>
  )
}
