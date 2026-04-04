import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function TourSpotlight({ targetSelector, active = false }) {
  const [rect, setRect] = useState(null)

  const updateRect = useCallback(() => {
    if (!targetSelector) { setRect(null); return }
    const el = document.querySelector(`[data-tour="${targetSelector}"]`)
    if (!el) { setRect(null); return }
    const r = el.getBoundingClientRect()
    setRect({
      top: r.top,
      left: r.left,
      width: r.width,
      height: r.height,
      borderRadius: window.getComputedStyle(el).borderRadius || '0px',
    })
  }, [targetSelector])

  useEffect(() => {
    if (!active || !targetSelector) { setRect(null); return }

    updateRect()

    // Re-measure on scroll and resize
    const handleUpdate = () => updateRect()
    window.addEventListener('resize', handleUpdate)
    window.addEventListener('scroll', handleUpdate, true)

    // ResizeObserver on the target element
    const el = document.querySelector(`[data-tour="${targetSelector}"]`)
    let observer
    if (el) {
      observer = new ResizeObserver(handleUpdate)
      observer.observe(el)
    }

    // Poll briefly in case element repositions post-animation
    const pollInterval = setInterval(handleUpdate, 500)
    const pollTimeout = setTimeout(() => clearInterval(pollInterval), 5000)

    return () => {
      window.removeEventListener('resize', handleUpdate)
      window.removeEventListener('scroll', handleUpdate, true)
      observer?.disconnect()
      clearInterval(pollInterval)
      clearTimeout(pollTimeout)
    }
  }, [active, targetSelector, updateRect])

  return (
    <AnimatePresence>
      {active && rect && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            top: rect.top - 6,
            left: rect.left - 6,
            width: rect.width + 12,
            height: rect.height + 12,
            borderRadius: rect.borderRadius,
            pointerEvents: 'none',
            zIndex: 9998,
          }}
        >
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 'inherit',
              outline: '2px solid #E8572A',
              outlineOffset: '0px',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
