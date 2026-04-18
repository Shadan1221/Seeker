import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Only apply cursor: none on desktop/mouse devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (!isTouch) {
      document.body.style.cursor = 'none'
    }

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let dotX = 0, dotY = 0
    let ringX  = 0, ringY  = 0
    let raf

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      dotX = mouseX
      dotY = mouseY
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`
      
      ringX = lerp(ringX, mouseX, 0.35)
      ringY = lerp(ringY, mouseY, 0.35)
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      
      raf = requestAnimationFrame(animate)
    }

    const onPointerOver = (e) => {
      if (e.target.closest('a, button, input, textarea, [data-cursor]')) {
        ring.classList.add('hovering')
      } else {
        ring.classList.remove('hovering')
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('pointerover', onPointerOver, { passive: true })

    animate()
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('pointerover', onPointerOver)
      cancelAnimationFrame(raf)
      if (!isTouch) {
        document.body.style.cursor = ''
      }
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <>
      {/* Restored default accent color (orange) and removed mix-blend-difference */}
      <div 
        ref={dotRef}  
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent rounded-full pointer-events-none z-[9999]"
        style={{ willChange: 'transform' }}
        aria-hidden="true" 
      />
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-accent rounded-full pointer-events-none z-[9998]"
        style={{ 
          willChange: 'transform',
          marginLeft: '-13px',
          marginTop: '-13px'
        }}
        aria-hidden="true" 
      />
    </>
  )
}
