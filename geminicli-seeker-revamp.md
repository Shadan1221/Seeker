# GEMINI CLI — SEEKER
## Complete UI Revamp Prompt

---

## MANDATE

You are performing a complete visual and experiential revamp of this career exploration app, now called **Seeker**. The existing codebase has a working full-stack React + Node.js + Express backend with OpenRouter AI integration. You are NOT touching the backend, data layer, API routes, or Zustand store logic. You are rebuilding every single frontend screen from scratch with a new design system, new visual language, improved quiz questions, and a completely new career exploration interface to replace the galaxy map.

Read the existing code first:

```bash
ls -la client/src/screens/
ls -la client/src/components/
cat client/src/screens/Splash.jsx
cat client/src/screens/Quiz.jsx
cat client/src/screens/Galaxy.jsx
cat client/src/screens/Chat.jsx
```

Understand what currently exists, then execute every instruction in this prompt. Do not preserve any visual decisions from the old code — colours, fonts, layouts, and component styles are all being replaced. Only preserve routing logic, API call patterns, and Zustand store usage.

---

## DESIGN BRIEF — WHAT "SEEKER" MUST FEEL LIKE

**The concept:** Seeker is a career exploration tool for Indian students aged 14–24. The core emotional promise is: *"Every path you haven't taken is still yours to explore."* The image of a person standing at a crossroads — paths branching outward in multiple directions — is the visual metaphor for the entire product.

**Design inspiration — dulcedo.com:**
Study this site's aesthetic carefully. Key qualities to extract:
- Monochromatic editorial feel — nearly black-and-white with rare intentional colour
- Typography-first hierarchy — headlines do the heavy lifting
- Extreme whitespace and breathing room — nothing crowds anything
- Large, bold gestures rather than decorative detail
- Hover states that feel tactile and physical (slight scale, underline draw, image reveal)
- Navigation that disappears rather than dominates
- A sense that every pixel is deliberate

**What Seeker is NOT:**
- Not a space theme
- Not glassmorphic cards with violet gradients
- Not particle effects or ambient orbs
- Not dark cosmic backgrounds
- Not busy, dense, or over-animated

**What Seeker IS:**
- Clean, almost literary feel — like a well-designed annual report meets an editorial magazine
- Confident negative space — white or very near-white backgrounds, deep near-black text
- One single accent colour: `#E8572A` (a warm, confident burnt orange — the colour of a signpost, a direction, forward motion)
- Two fonts only: `DM Serif Display` for headlines (editorial, humanist serif), `DM Sans` for all UI (clean, geometric sans-serif, same family — harmonious)
- Animated SVG path lines in the background of EVERY screen — the branching roads motif

---

## STEP 1 — DESIGN TOKENS

### `client/tailwind.config.js` — full replacement

```js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Core palette — almost entirely monochrome
        ink:        "#0D0D0D",       // Near-black — primary text
        "ink-60":   "rgba(13,13,13,0.6)",
        "ink-30":   "rgba(13,13,13,0.3)",
        "ink-10":   "rgba(13,13,13,0.1)",
        paper:      "#F8F6F1",       // Warm off-white — primary background
        "paper-80": "rgba(248,246,241,0.8)",
        accent:     "#E8572A",       // Burnt orange — the ONLY colour used for CTAs, active states, highlights
        "accent-10":"rgba(232,87,42,0.1)",
        "accent-20":"rgba(232,87,42,0.2)",
        surface:    "#EFEFEC",       // Subtle surface for cards
        "surface-dark": "#1A1A1A",  // Dark surface for inverted sections
        muted:      "#9B9B95",       // Secondary text
      },
      fontFamily: {
        serif:  ["DM Serif Display", "Georgia", "serif"],
        sans:   ["DM Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Display scale — editorial
        "display-xl": ["clamp(3.5rem, 8vw, 7rem)",   { lineHeight: "1.0", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "display-sm": ["clamp(1.25rem, 2vw, 1.75rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      animation: {
        "path-draw":    "pathDraw 3s ease-out forwards",
        "fade-up":      "fadeUp 0.6s ease-out forwards",
        "fade-in":      "fadeIn 0.4s ease-out forwards",
        "cursor-blink": "cursorBlink 1s step-end infinite",
        "underline-in": "underlineIn 0.3s ease-out forwards",
      },
      keyframes: {
        fadeUp:       { "0%": { opacity: "0", transform: "translateY(24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeIn:       { "0%": { opacity: "0" },  "100%": { opacity: "1" } },
        cursorBlink:  { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0" } },
        underlineIn:  { "0%": { transform: "scaleX(0)" }, "100%": { transform: "scaleX(1)" } },
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
}
```

### `client/src/index.css` — full replacement

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* ── Base ──────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  font-family: "DM Sans", system-ui, sans-serif;
  background-color: #F8F6F1;
  color: #0D0D0D;
  -webkit-font-smoothing: antialiased;
  cursor: none; /* custom cursor active on desktop */
}

/* ── Custom cursor ─────────────────────────────────────── */
.cursor-dot {
  width: 8px; height: 8px;
  background: #0D0D0D;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.15s ease, background 0.2s ease;
  transform: translate(-50%, -50%);
}
.cursor-ring {
  width: 36px; height: 36px;
  border: 1px solid rgba(13,13,13,0.3);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9998;
  transition: transform 0.08s linear, width 0.2s ease, height 0.2s ease, border-color 0.2s ease;
  transform: translate(-50%, -50%);
}
.cursor-ring.hovering {
  width: 56px; height: 56px;
  border-color: #E8572A;
  mix-blend-mode: multiply;
}

/* ── Typography utilities ──────────────────────────────── */
.font-serif { font-family: "DM Serif Display", Georgia, serif; }

.text-balance { text-wrap: balance; }

/* ── Path lines SVG ────────────────────────────────────── */
.paths-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

/* ── Hover underline draw effect ───────────────────────── */
.hover-underline {
  position: relative;
  display: inline-block;
}
.hover-underline::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 100%; height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.hover-underline:hover::after { transform: scaleX(1); }

/* ── Scrollbar ──────────────────────────────────────────── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #F8F6F1; }
::-webkit-scrollbar-thumb { background: #D4D4CE; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #9B9B95; }

/* ── Material Symbols ───────────────────────────────────── */
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
  user-select: none;
  line-height: 1;
}

/* ── Path map lines ─────────────────────────────────────── */
.path-node { cursor: pointer; }
.path-node:hover .node-circle { stroke: #E8572A; fill: rgba(232,87,42,0.08); }
.path-node:hover .node-label { fill: #E8572A; }

/* ── Selection ──────────────────────────────────────────── */
::selection { background: rgba(232,87,42,0.15); color: #0D0D0D; }
```

---

## STEP 2 — UNIVERSAL COMPONENTS

### `client/src/components/layout/FloatingPaths.jsx`

This is the animated SVG path background adapted from the provided component. It runs on EVERY screen.

```jsx
import { motion } from 'framer-motion'

/**
 * FloatingPaths — animated branching road lines
 * Used as a fixed background layer on every screen.
 * Evokes the "paths not yet taken" metaphor at the heart of Seeker.
 *
 * position: 1 (left-leaning paths) or -1 (right-leaning paths)
 * opacity: override the base opacity (default 1)
 * color: stroke colour (default '#0D0D0D')
 */
function PathSet({ position, color = '#0D0D0D', baseOpacity = 0.06 }) {
  const paths = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    strokeWidth: 0.4 + i * 0.025,
    opacity: baseOpacity + i * 0.004,
    duration: 18 + i * 1.2,
    delay: i * 0.3,
  }))

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 696 316"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      {paths.map((path) => (
        <motion.path
          key={path.id}
          d={path.d}
          stroke={color}
          strokeWidth={path.strokeWidth}
          strokeOpacity={path.opacity}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: [0, path.opacity, path.opacity * 0.6, path.opacity],
            pathOffset: [0, 0.5, 1],
          }}
          transition={{
            pathLength: { duration: path.duration, ease: 'linear', repeat: Infinity },
            opacity: { duration: path.duration, ease: 'linear', repeat: Infinity },
            pathOffset: { duration: path.duration, ease: 'linear', repeat: Infinity },
            delay: path.delay,
          }}
        />
      ))}
    </svg>
  )
}

/**
 * Usage in any screen:
 * <FloatingPaths />          — default (paper background screens)
 * <FloatingPaths inverted />  — for dark sections (uses white strokes)
 */
export default function FloatingPaths({ inverted = false }) {
  const color = inverted ? '#F8F6F1' : '#0D0D0D'
  const baseOpacity = inverted ? 0.08 : 0.05

  return (
    <div className="paths-container">
      <PathSet position={1}  color={color} baseOpacity={baseOpacity} />
      <PathSet position={-1} color={color} baseOpacity={baseOpacity * 0.7} />
    </div>
  )
}
```

### `client/src/components/layout/CustomCursor.jsx`

```jsx
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0
    let raf

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top  = `${mouseY}px`
    }

    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.12)
      ringY = lerp(ringY, mouseY, 0.12)
      ring.style.left = `${ringX}px`
      ring.style.top  = `${ringY}px`
      raf = requestAnimationFrame(animate)
    }

    const onEnter = () => ring.classList.add('hovering')
    const onLeave = () => ring.classList.remove('hovering')

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    animate()
    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Only show on non-touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
```

### `client/src/components/layout/SeekerNav.jsx`

Minimal top navigation used on all screens. Inspired by dulcedo.com — disappears when scrolling down, reappears on scroll up.

```jsx
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import useAppStore from '../../store/useAppStore.js'

export default function SeekerNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const [visible, setVisible] = useState(true)
  const [lastY, setLastY] = useState(0)
  const bookmarkedCareers = useAppStore(s => s.bookmarkedCareers)
  const quizCompleted = useAppStore(s => s.quizCompleted)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setVisible(y < lastY || y < 60)
      setLastY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

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
              Quiz
            </button>
            <button
              onClick={() => navigate('/chat')}
              className="relative text-sm font-medium tracking-wide hover-underline text-ink-60"
            >
              Ask Seeker
            </button>
            {bookmarkedCareers.length > 0 && (
              <button
                onClick={() => navigate('/saved')}
                className="relative flex items-center gap-1.5 text-sm text-ink-60"
              >
                <span className="material-symbols-outlined text-[18px]">bookmark</span>
                <span className="text-xs font-mono bg-accent text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {bookmarkedCareers.length}
                </span>
              </button>
            )}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
```

### `client/src/components/ui/Icon.jsx`

```jsx
export default function Icon({ name, size = 22, filled = false, className = '' }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 300, 'GRAD' 0, 'opsz' ${size}`,
        lineHeight: 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  )
}
```

### `client/src/components/ui/SeekerButton.jsx`

```jsx
import { motion } from 'framer-motion'

/**
 * variants: 'primary' | 'outline' | 'ghost' | 'accent'
 */
export default function SeekerButton({
  children, onClick, variant = 'primary', disabled = false,
  className = '', icon, iconPosition = 'right', type = 'button'
}) {
  const base = "inline-flex items-center gap-3 font-sans font-medium tracking-wide transition-all duration-200 rounded-none select-none"

  const variants = {
    primary: "bg-ink text-paper px-8 py-4 text-sm hover:bg-ink-60 active:scale-[0.98]",
    outline:  "border border-ink text-ink px-8 py-4 text-sm hover:bg-ink hover:text-paper active:scale-[0.98]",
    ghost:    "text-ink text-sm px-0 py-2 hover-underline",
    accent:   "bg-accent text-white px-8 py-4 text-sm hover:bg-[#D44E25] active:scale-[0.98] shadow-[0_4px_20px_rgba(232,87,42,0.3)]",
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={`${base} ${variants[variant]} ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-none'} ${className}`}
    >
      {icon && iconPosition === 'left' && <Icon name={icon} size={18} />}
      {children}
      {icon && iconPosition === 'right' && <Icon name={icon} size={18} />}
    </motion.button>
  )
}
```

---

## STEP 3 — REVISED QUIZ SYSTEM

### Why the old quiz needs replacing

The old quiz was biased toward technology and engineering careers through loaded answer options. The new quiz follows validated career assessment principles — specifically Holland's RIASEC model, work values research (Super 1970, Brown 2002), and the Strong Interest Inventory framework — applied to the Indian context.

### `server/src/data/quiz.js` — complete replacement

12 questions. Each question approaches career aptitude from a completely different angle, ensuring comprehensive coverage with no stream bias. Questions avoid mentioning subjects directly until Q10 (which asks about subjects as one of many inputs, not as a determiner).

```js
export const QUIZ = [
  {
    id: 1,
    icon: "self_improvement",
    question: "When you have a completely free Saturday with no obligations — what do you gravitate towards?",
    subtext: "Not what you think you should do. What you actually end up doing.",
    dimension: "activity_preference",
    options: [
      { label: "A", title: "Making or building something tangible", description: "Cooking, crafting, fixing things, building a side project, gardening.", tags: ["craft", "engineering", "architecture", "culinary", "design"] },
      { label: "B", title: "Reading, writing, or researching deeply", description: "Getting lost in a book, writing something, falling down a rabbit hole online.", tags: ["law", "journalism", "research", "content", "humanities"] },
      { label: "C", title: "Connecting — calling people, meeting up, being around others", description: "Your energy comes from people, conversation, being social.", tags: ["social", "healthcare", "counselling", "education", "events"] },
      { label: "D", title: "Solving a problem or puzzle that's been bothering you", description: "Debugging, strategising, figuring something out systematically.", tags: ["tech", "data-science", "finance", "research", "engineering"] },
      { label: "E", title: "Creating something expressive — art, music, video, writing", description: "You need an outlet for ideas that don't fit into logic.", tags: ["creative", "design", "film", "music", "content", "arts"] },
      { label: "F", title: "Moving — sport, exercise, being physical or outdoors", description: "Stillness doesn't suit you. You think better when your body is engaged.", tags: ["sports", "aviation", "physical", "outdoors"] },
    ]
  },
  {
    id: 2,
    icon: "emoji_objects",
    question: "A close friend has a serious problem. What do you find yourself doing?",
    subtext: "Notice your instinct — not what you wish you did.",
    dimension: "interpersonal_style",
    options: [
      { label: "A", title: "Listening carefully and making them feel understood first", description: "You know the solution isn't the point yet. Being heard matters more.", tags: ["counselling", "social", "healthcare", "education"] },
      { label: "B", title: "Researching and bringing back information or options", description: "You feel most helpful when you have something concrete to offer.", tags: ["research", "law", "data-science", "finance"] },
      { label: "C", title: "Making them laugh or lifting the mood somehow", description: "You defuse heaviness naturally and intuitively.", tags: ["content", "performance", "film", "creative"] },
      { label: "D", title: "Helping them think through it step by step logically", description: "You trust structure. A clear framework helps.", tags: ["tech", "engineering", "management", "finance"] },
      { label: "E", title: "Taking action on their behalf — calling someone, organising things", description: "You'd rather do something than talk about doing something.", tags: ["management", "entrepreneurship", "government", "events"] },
      { label: "F", title: "Offering a creative reframe — a new way of seeing the situation", description: "You often see angles others miss entirely.", tags: ["design", "arts", "psychology", "journalism"] },
    ]
  },
  {
    id: 3,
    icon: "monitor_heart",
    question: "Which kind of achievement feels most satisfying to you personally?",
    subtext: "Not what sounds impressive. What actually gives you that quiet 'yes' feeling.",
    dimension: "core_motivation",
    options: [
      { label: "A", title: "Building something that still exists and works years later", description: "Legacy, permanence, something that outlasts the moment.", tags: ["engineering", "architecture", "tech", "entrepreneurship"] },
      { label: "B", title: "Helping someone through a genuinely hard time", description: "The direct, personal impact of being there for someone.", tags: ["healthcare", "counselling", "social", "education"] },
      { label: "C", title: "Being recognised as excellent in your field", description: "Mastery and reputation matter deeply to you.", tags: ["sports", "performance", "research", "law", "arts"] },
      { label: "D", title: "Creating something that moves people emotionally", description: "Art, story, music, design — the kind of thing that stays with someone.", tags: ["film", "creative", "design", "music", "content", "arts"] },
      { label: "E", title: "Figuring out a complex problem that had no obvious answer", description: "The intellectual satisfaction of cracking something hard.", tags: ["research", "data-science", "tech", "finance"] },
      { label: "F", title: "Organising something successfully — an event, a team, a goal", description: "Execution and coordination energise you.", tags: ["management", "entrepreneurship", "events", "government"] },
    ]
  },
  {
    id: 4,
    icon: "location_on",
    question: "You're most in your element when you're...",
    subtext: "Choose the environment where time genuinely disappears for you.",
    dimension: "environment_fit",
    options: [
      { label: "A", title: "Alone, deep in focused work with a clear goal", description: "No interruptions. Just you and the problem.", tags: ["research", "tech", "data-science", "design", "writing"] },
      { label: "B", title: "In a small team collaborating toward something together", description: "The energy of shared momentum — not too many people, not alone.", tags: ["tech", "creative", "film", "entrepreneurship"] },
      { label: "C", title: "In front of people — presenting, teaching, performing, leading", description: "You come alive when there's an audience or a group to address.", tags: ["law", "education", "performance", "content", "sports"] },
      { label: "D", title: "Out in the field — meeting people, visiting places, never static", description: "A desk is a punishment. You need movement and variety.", tags: ["journalism", "aviation", "social", "government", "events"] },
      { label: "E", title: "In structured systems — meetings, processes, frameworks", description: "You operate best when there are clear roles and defined pathways.", tags: ["finance", "management", "government", "engineering"] },
      { label: "F", title: "In a creative studio or workshop environment", description: "The physical space of making things — messy, tactile, expressive.", tags: ["design", "arts", "architecture", "culinary", "fashion"] },
    ]
  },
  {
    id: 5,
    icon: "trending_up",
    question: "In ten years, what kind of life would feel genuinely successful to you?",
    subtext: "Strip away what impresses others. What does YOUR definition look like?",
    dimension: "life_values",
    options: [
      { label: "A", title: "Financial security — real comfort, no money stress, options", description: "Stability and the freedom that comes from it.", tags: ["finance", "tech", "engineering", "management", "law"] },
      { label: "B", title: "Deep expertise — being the person people come to for something", description: "Known for something specific and exceptional.", tags: ["research", "law", "healthcare", "data-science", "sports"] },
      { label: "C", title: "Creative output — a body of work you are proud of", description: "Things you made, wrote, designed, built — a catalogue.", tags: ["creative", "design", "film", "content", "arts", "architecture"] },
      { label: "D", title: "Visible impact — you can point to real change you caused", description: "In society, in someone's life, in a community.", tags: ["social", "government", "education", "healthcare", "journalism"] },
      { label: "E", title: "Autonomy — no boss, no fixed hours, your own terms", description: "Independence above everything else.", tags: ["entrepreneurship", "content", "sports", "creative", "aviation"] },
      { label: "F", title: "Meaningful relationships — the people around your work matter", description: "Colleagues, clients, community — human connection at the centre.", tags: ["counselling", "education", "social", "management", "events"] },
    ]
  },
  {
    id: 6,
    icon: "psychology_alt",
    question: "How do you prefer to learn something completely new?",
    subtext: "Think about the last time you actually learned something well.",
    dimension: "learning_style",
    options: [
      { label: "A", title: "Read, research, understand the theory deeply first", description: "You need the conceptual foundation before you can act.", tags: ["research", "law", "humanities", "finance", "data-science"] },
      { label: "B", title: "Jump in and learn from failures in real time", description: "Doing beats theorising. You iterate your way to competence.", tags: ["entrepreneurship", "tech", "sports", "creative", "culinary"] },
      { label: "C", title: "Watch someone skilled do it, then imitate and refine", description: "Observation and modelling work better than abstract instruction.", tags: ["design", "film", "arts", "performance", "medicine"] },
      { label: "D", title: "Take a structured course or programme with clear milestones", description: "You prefer organised learning with measurable progress.", tags: ["engineering", "management", "finance", "government", "aviation"] },
      { label: "E", title: "Discuss it with others — your understanding deepens through conversation", description: "Teaching and talking clarify your thinking.", tags: ["education", "counselling", "social", "law"] },
      { label: "F", title: "Find your own system — you figure out the method that works for you", description: "Personalised, self-directed, and idiosyncratic.", tags: ["research", "tech", "arts", "data-science"] },
    ]
  },
  {
    id: 7,
    icon: "balance",
    question: "When a decision involves real uncertainty — no guaranteed outcome — what do you do?",
    subtext: "This question is about your genuine default, not what you aspire to.",
    dimension: "risk_relationship",
    options: [
      { label: "A", title: "Research until I can significantly reduce the uncertainty", description: "Risk is acceptable only after it's been mapped out as much as possible.", tags: ["finance", "research", "law", "engineering", "data-science"] },
      { label: "B", title: "Go with my gut — I trust my instincts on things like this", description: "Analysis paralysis is worse than a wrong bet.", tags: ["entrepreneurship", "sports", "content", "creative"] },
      { label: "C", title: "Talk to people who've done it — lived experience matters most", description: "Frameworks are less useful than someone who has actually been there.", tags: ["social", "education", "counselling", "management"] },
      { label: "D", title: "Look for the option with the clearest, most proven pathway", description: "You'd rather progress slowly on solid ground than quickly on sand.", tags: ["government", "healthcare", "engineering", "aviation", "finance"] },
      { label: "E", title: "Embrace it — uncertainty means opportunity and I find it energising", description: "You perform better when the outcome isn't guaranteed.", tags: ["entrepreneurship", "sports", "arts", "creative", "journalism"] },
      { label: "F", title: "Make a reversible move first — test before committing fully", description: "Small experiments. Keep options open.", tags: ["tech", "design", "data-science", "research"] },
    ]
  },
  {
    id: 8,
    icon: "groups",
    question: "In a team working on something important, what role do you naturally end up in?",
    subtext: "Not the role you were assigned. The one you gravitate toward.",
    dimension: "team_role",
    options: [
      { label: "A", title: "The one who takes charge and sets direction", description: "Decisions get made when you're around. Leadership is instinctive.", tags: ["management", "entrepreneurship", "government", "law"] },
      { label: "B", title: "The specialist — deep competence in one domain the team needs", description: "You don't need to run things. You need to be the best at your part.", tags: ["research", "tech", "design", "law", "healthcare", "data-science"] },
      { label: "C", title: "The connector — keeping people aligned and morale high", description: "You sense when dynamics are off and fix them before they break.", tags: ["social", "counselling", "education", "management", "events"] },
      { label: "D", title: "The creative — generating ideas others hadn't thought of", description: "You're less interested in execution, more in possibility.", tags: ["design", "creative", "film", "content", "arts"] },
      { label: "E", title: "The executor — the one who actually gets things done", description: "Meetings and discussions are fine but you prefer to be doing.", tags: ["engineering", "management", "entrepreneurship", "aviation"] },
      { label: "F", title: "The critic — asking the uncomfortable questions that improve the outcome", description: "You see problems clearly and feel responsible for naming them.", tags: ["law", "journalism", "research", "finance"] },
    ]
  },
  {
    id: 9,
    icon: "public",
    question: "What kind of problem would you most want to spend your life working on?",
    subtext: "Scale and domain — not necessarily your exact role in it.",
    dimension: "impact_orientation",
    options: [
      { label: "A", title: "Human health and wellbeing — illness, mental health, longevity", description: "The body and mind as territories to understand and heal.", tags: ["healthcare", "medicine", "counselling", "research", "pharma"] },
      { label: "B", title: "How people learn and develop throughout their lives", description: "Education, capability, growth as lifelong pursuits.", tags: ["education", "social", "counselling", "content", "humanities"] },
      { label: "C", title: "How systems work — economies, cities, governments, institutions", description: "The complex machinery that organises society.", tags: ["finance", "government", "law", "management", "journalism"] },
      { label: "D", title: "Technology and what it makes possible", description: "Software, hardware, AI, infrastructure — the levers of the future.", tags: ["tech", "data-science", "engineering", "research"] },
      { label: "E", title: "Culture and expression — what stories we tell, what beauty we make", description: "Art, media, design as ways of understanding the world.", tags: ["film", "arts", "design", "creative", "content", "journalism"] },
      { label: "F", title: "Commerce and value creation — building things that sustain themselves", description: "The dynamics of business, markets, and making ideas viable.", tags: ["entrepreneurship", "management", "finance", "marketing"] },
    ]
  },
  {
    id: 10,
    icon: "school",
    question: "Honestly — which of these felt most like your territory in school?",
    subtext: "Not your best marks. The subjects you were actually curious about.",
    dimension: "subject_affinity",
    options: [
      { label: "A", title: "Maths, Physics, or Computer Science", description: "Logic, systems, proofs, and patterns.", tags: ["tech", "engineering", "data-science", "aviation", "finance", "research"] },
      { label: "B", title: "Biology, Chemistry, or Environmental Science", description: "Living systems, molecules, ecosystems.", tags: ["healthcare", "medicine", "research", "pharma", "environment"] },
      { label: "C", title: "History, Civics, Political Science, or Geography", description: "Why the world is how it is and who shaped it.", tags: ["law", "government", "journalism", "humanities", "social"] },
      { label: "D", title: "Economics, Business Studies, or Accountancy", description: "How value is created, measured, and moved.", tags: ["finance", "management", "entrepreneurship", "law"] },
      { label: "E", title: "Literature, Language, Linguistics, or Communication", description: "Words as tools — for persuasion, expression, and meaning.", tags: ["law", "content", "journalism", "humanities", "education", "creative"] },
      { label: "F", title: "Fine Arts, Music, Physical Education, or Vocational subjects", description: "Learning that lived in your hands and body, not just your mind.", tags: ["arts", "sports", "design", "film", "culinary", "performance", "fashion"] },
    ]
  },
  {
    id: 11,
    icon: "nightlife",
    question: "When a project is finally done and successful — what's the part that mattered most to you?",
    subtext: "The thing you'd want people to say, or that you'd think about quietly.",
    dimension: "recognition_type",
    options: [
      { label: "A", title: "How well-made it is — the craft and quality", description: "You care about the standard, not the reception.", tags: ["design", "engineering", "research", "arts", "architecture"] },
      { label: "B", title: "How many people it reached and affected", description: "Scale of impact is what makes something meaningful.", tags: ["content", "journalism", "tech", "entrepreneurship", "government"] },
      { label: "C", title: "What you personally learned or grew through doing it", description: "The project as a vehicle for your own development.", tags: ["research", "education", "creative", "sports", "counselling"] },
      { label: "D", title: "That it came together — the coordination, the execution", description: "Process matters. When a complex thing runs smoothly, that's beauty.", tags: ["management", "events", "aviation", "engineering"] },
      { label: "E", title: "The team and relationships built through it", description: "Who you worked with matters as much as what you made.", tags: ["social", "education", "counselling", "management"] },
      { label: "F", title: "That it was yours — your vision, your voice, your name on it", description: "Authorship and ownership give the work meaning.", tags: ["entrepreneurship", "creative", "arts", "journalism", "film"] },
    ]
  },
  {
    id: 12,
    icon: "explore",
    question: "Which of these sentences describes something you've actually felt, even once?",
    subtext: "The one that has a small recognition in it — not the one you wish were true.",
    dimension: "identity_signal",
    options: [
      { label: "A", title: "I fixed something and felt a quiet pride that it worked", description: "Technical or practical problem-solving.", tags: ["engineering", "tech", "architecture", "craft", "aviation"] },
      { label: "B", title: "I said something that made someone feel genuinely understood", description: "Empathy as a skill, not just a trait.", tags: ["counselling", "social", "healthcare", "education"] },
      { label: "C", title: "I wrote or said something and thought — yes, that's exactly it", description: "Getting the words right matters deeply.", tags: ["law", "journalism", "content", "humanities", "creative"] },
      { label: "D", title: "I made something and felt it was genuinely beautiful", description: "Aesthetic satisfaction — visual, auditory, physical.", tags: ["design", "arts", "architecture", "film", "fashion"] },
      { label: "E", title: "I understood a system more deeply than most people around me", description: "Analytical insight — seeing the structure others miss.", tags: ["research", "data-science", "finance", "tech", "law"] },
      { label: "F", title: "I got something done that others said couldn't be done", description: "Execution under pressure. Delivery as identity.", tags: ["sports", "entrepreneurship", "management", "government"] },
    ]
  },
]
```

---

## STEP 4 — COMPREHENSIVE CAREER DATA

### `server/src/data/careers.js` — complete replacement

Each career object now contains deep, India-specific data. The schema is expanded. Remove all `emoji` fields. Replace with material symbol `icon` names.

**New career schema:**

```js
{
  id: String,
  title: String,
  icon: String,                    // Material Symbol name
  shortTitle: String,              // For path map nodes (max 12 chars)
  category: String,
  cluster: String,                 // Career cluster for path map branching:
                                   // "People & Society" | "Science & Health" |
                                   // "Technology & Data" | "Business & Law" |
                                   // "Creative & Expression" | "Physical & Outdoors"
  accent: String,                  // Hex colour — unique per cluster, shared within
  tagline: String,
  // ── Education & Entry ──────────────────────────────────────────────
  stream: String,                  // Stream required after Class 10
  education: {
    level: String,                 // "UG Degree" | "PG Degree" | "Diploma" | "Doctorate" | "Certification"
    duration: String,              // "4 years" | "5.5 years" etc.
    degrees: String[],             // Actual degree names
    key_subjects: String[],        // Core subjects studied
    entrance_exams: String[],      // Real Indian entrance exams
    licensing: String | null,      // Any mandatory license/registration
  },
  // ── Career Shape ───────────────────────────────────────────────────
  jobs: String[],                  // 5 specific job titles
  progression: String[],           // Career ladder: ["Junior", "Mid", "Senior", "Lead", "Principal/Partner"]
  entry_age: String,               // "21–23 years typically"
  work_schedule: String,           // "9–6 office hours" | "Shift-based" | "Project-based flexible" etc.
  work_location: String,           // "Office / WFH hybrid" | "Fieldwork" | "Hospital/Clinic" etc.
  // ── Industry & India Context ────────────────────────────────────────
  sectors: String[],               // 4–5 major employing industries
  employment_type: String[],       // "Private sector" | "Government" | "Self-employed" | "Freelance"
  india_demand: String,            // "High" | "Very High" | "Moderate" | "Emerging"
  india_size: String,              // Brief note on industry size in India
  govt_exams: String[] | null,     // UPSC, SSC, state exams if applicable
  // ── Compensation ────────────────────────────────────────────────────
  salary: {
    fresher: String,               // "Rs. X–Y LPA"
    mid: String,
    senior: String,
    note: String,                  // One line context
  },
  // ── Ratings ─────────────────────────────────────────────────────────
  workLife: Number,                // 1–5
  demand: Number,
  creativity: Number,
  // ── Discovery ───────────────────────────────────────────────────────
  scope: String,
  related: String[],               // IDs of 3 related careers
  certifications: String[],        // Optional but valuable certifications
  celebs: String[],
  tags: String[],
  // ── Path map positioning ─────────────────────────────────────────────
  ring: Number,
  angle: Number,
}
```

**Populate 25 careers with complete data. All salary figures are accurate for India, 2024–25. All exam names are real.**

The 6 career clusters and their accent colours are:
- "Technology & Data" → `#2563EB` (blue)
- "Science & Health" → `#16A34A` (green)
- "Business & Law" → `#D97706` (amber)
- "Creative & Expression" → `#9333EA` (purple)
- "People & Society" → `#E8572A` (the app accent — orange)
- "Physical & Outdoors" → `#0891B2` (cyan)

**Career list — fill all fields completely for each:**

**TECHNOLOGY & DATA cluster:**

1. `software-engineer` — Software Engineer — icon: `code`
   - Stream: Science PCM. Education: B.Tech CSE, 4 years. Exams: JEE Main, JEE Advanced, BITSAT, VITEEE, COMEDK. Degrees: B.Tech Computer Science, BCA + MCA, B.Sc CS. Key subjects: Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks. Licensing: None.
   - Jobs: Software Developer, Backend Engineer, Full Stack Engineer, DevOps Engineer, Engineering Manager. Progression: Junior Dev → Mid Dev → Senior Dev → Tech Lead → Engineering Manager / CTO.
   - Entry age: 21–23. Schedule: Office / WFH hybrid, 9–7 typical. Location: Office or remote.
   - Sectors: IT Services (TCS/Infosys/Wipro), Product Startups, Fintech, Edtech, FAANG/MNCs. Employment: Private, Freelance, Self-employed.
   - India demand: Very High. India size: India is the world's second largest developer market with ~5.8 million developers. 1.4 million new tech jobs expected by 2026.
   - Salary: fresher Rs. 6–15 LPA, mid Rs. 20–50 LPA, senior Rs. 60L–2Cr. Note: FAANG companies pay Rs. 50L–2Cr+ for senior roles.
   - Related: data-scientist, product-manager, cybersecurity. Tags: ["tech", "engineering", "data-science"]. Ring 1, angle 0.
   - Certs: AWS Solutions Architect, Google Cloud Professional, Meta React Developer, CKA (Kubernetes).
   - Celebs: Sundar Pichai (CEO Google), Satya Nadella (CEO Microsoft), Sridhar Vembu (Founder Zoho, IIT Madras dropout).

2. `data-scientist` — Data Scientist / AI Engineer — icon: `model_training`
   - Stream: Science PCM. Education: B.Tech + Data Science PG or M.Sc Statistics/ML, 4–6 years. Exams: JEE Main, GATE (CS/Statistics), GRE for MS abroad. Degrees: B.Tech CSE + ML specialisation, M.Sc Statistics, M.Tech AI from IITs. Key subjects: Linear Algebra, Statistics, ML Algorithms, Python, SQL, Data Visualisation.
   - Jobs: Data Scientist, ML Engineer, AI Research Scientist, Data Analyst, Business Intelligence Lead. Progression: Data Analyst → Data Scientist → Senior DS → Principal DS → Head of AI.
   - India demand: Very High. India size: India's AI market projected at $17B by 2027. Every major bank, e-commerce, and healthcare company is hiring AI/ML roles.
   - Salary: fresher Rs. 8–20 LPA, mid Rs. 25–70 LPA, senior Rs. 80L–3Cr. Note: AI/ML engineers are among the highest-paid in India; specialised skills command 3–5x premium.
   - Certs: Google Data Analytics, IBM Data Science Professional, TensorFlow Developer, Databricks Certified. Related: software-engineer, research-scientist, product-manager. Tags: ["tech", "data-science", "research"]. Ring 1, angle 20.

3. `cybersecurity` — Cybersecurity Expert — icon: `security`
   - Stream: Science PCM. Education: B.Tech CSE/IT or B.Sc IT + specialisation, 4 years + certs. Exams: JEE Main, GATE, CEH/CISSP certification exams. Degrees: B.Tech CSE, B.Sc Cybersecurity, PG Diploma Ethical Hacking.
   - Jobs: Ethical Hacker / Pen Tester, Security Analyst, Incident Response Analyst, Security Architect, CISO. Progression: SOC Analyst → Security Engineer → Sr. Security Engineer → Security Architect → CISO.
   - India demand: Very High. India size: India had 1.8M unfilled cybersecurity roles in 2023. CERT-In mandates driving demand in every regulated sector.
   - Salary: fresher Rs. 5–12 LPA, mid Rs. 18–45 LPA, senior Rs. 60L–1.5Cr.
   - Certs: CEH, OSCP, CISSP, CompTIA Security+. Related: software-engineer, data-scientist, product-manager. Tags: ["tech", "engineering", "research"]. Ring 2, angle 10.

4. `product-manager` — Product Manager — icon: `dashboard`
   - Stream: Any Stream (most PMs have engineering or business background). Education: Any UG + MBA preferred, 4–6 years. Exams: CAT, GMAT for MBA; no specific PM exam. Degrees: B.Tech/BBA + MBA (IIM preferred) or Product Management bootcamp.
   - Jobs: Product Manager, Associate PM, Senior PM, Group PM, VP of Product. Progression: APM → PM → Senior PM → Group PM → Director of Product → CPO.
   - India demand: Very High. India size: India has 50,000+ PM roles; growing at 25% YoY with startup ecosystem.
   - Salary: fresher Rs. 15–30 LPA (post-MBA), mid Rs. 35–80 LPA, senior Rs. 1–3Cr+.
   - Related: software-engineer, entrepreneur, data-scientist. Tags: ["tech", "management", "entrepreneurship", "business"]. Ring 2, angle 340.

**SCIENCE & HEALTH cluster:**

5. `doctor` — Doctor / Physician — icon: `stethoscope`
   - Stream: Science PCB. Education: MBBS 5.5 years + 1 year internship; MD/MS 3 years additional for specialisation. Exams: NEET UG, NEET PG for MD/MS, FMGE for foreign medical graduates. Degrees: MBBS, MD, MS, BDS (Dental), BAMS (Ayurveda). Key subjects: Anatomy, Physiology, Pathology, Pharmacology, Medicine, Surgery. Licensing: MCI/NMC registration mandatory — compulsory for all practising doctors.
   - Jobs: General Physician, Surgeon, Cardiologist, Psychiatrist, Dermatologist. Progression: Intern → Junior Resident → Senior Resident → Consultant → Senior Consultant / Professor.
   - Entry age: 23–24 for MBBS completion, 27–28 for specialist. Schedule: Shift-based for residents; clinic hours for consultants. Location: Hospital / Clinic.
   - Sectors: Government hospitals, Private hospitals (Apollo/Fortis/Max), Clinics, Medical colleges, Pharma companies (Clinical Research). Employment: Government, Private, Self-employed (own clinic).
   - India demand: Very High. India size: India has 1.3 doctors per 1,000 people — WHO standard is 1 per 1,000. Massive shortage drives demand. Telemedicine market growing 30% YoY.
   - Govt exams: UPSC CMS, State PSC Medical Officer exams, AIIMS Faculty positions. Professional associations: IMA (Indian Medical Association), NMC.
   - Salary: fresher Rs. 7–15 LPA (junior resident), mid Rs. 20–60 LPA (consultant), senior Rs. 1–10Cr (senior specialist / own practice).
   - Certs: DNB, MRCP, MRCS, USMLE (for USA). Related: psychologist, research-scientist, pharmacist. Tags: ["healthcare", "bio", "research"]. Ring 1, angle 45.

6. `psychologist` — Psychologist / Counsellor — icon: `psychology`
   - Stream: Arts (preferred) or Science PCB. Education: BA/BSc Psychology 3 years + MA/MSc Psychology 2 years + MPhil or PhD for clinical practice. Exams: CUET for UG; entrance exams at NIMHANS, TISS, DU for PG. Degrees: BA/BSc Psychology, MA/MSc Clinical Psychology, MPhil Clinical Psychology (required for RCI registration), PhD. Key subjects: Abnormal Psychology, Psychotherapy, Cognitive Behavioural Therapy, Research Methods, Assessment. Licensing: RCI (Rehabilitation Council of India) registration required for clinical psychology and rehabilitation practice.
   - Jobs: Clinical Psychologist, School Counsellor, Corporate EAP Counsellor, Psychotherapist, Research Psychologist. Progression: Trainee Counsellor → Counsellor → Senior Psychologist → Lead Psychologist → Consultant / Professor.
   - India demand: High, rapidly growing. India size: India has 0.07 psychiatrists per 100,000 people (WHO standard: 1 per 100,000). 75% of mental health conditions in India go untreated. Massive shortage.
   - Salary: fresher Rs. 3–8 LPA, mid Rs. 10–25 LPA, senior Rs. 25–60 LPA (private practice can earn significantly more).
   - Related: social-worker, doctor, education. Tags: ["counselling", "social", "healthcare", "research"]. Ring 2, angle 55.

7. `research-scientist` — Research Scientist — icon: `science`
   - Stream: Science PCM or PCB. Education: B.Tech / B.Sc + M.Tech / M.Sc + PhD (5–10 years total academic pathway). Exams: GATE, JEST, JAM, CSIR NET, DRDO CEPTAM, ISRO Centralised Recruitment Board. Degrees: B.Tech Engineering, B.Sc Physics/Chemistry/Biology, M.Tech, M.Sc, PhD.
   - Jobs: ISRO Scientist, DRDO Research Engineer, CSIR Senior Scientist, IIT/IISc Faculty, BARC Nuclear Scientist. Progression: Junior Research Fellow → Senior Research Fellow → Scientist B → Scientist C → Scientist F (Director Grade).
   - Govt exams: GATE (for IITs/PSUs/DRDO), JEST (for TIFR/IISC), ISRO ICRB, DRDO CEPTAM, DAE (BARC/NPCIL).
   - India demand: Moderate but premium positions. India size: India's R&D spend is 0.7% of GDP — government is actively expanding. ISRO's commercial launch programme, DRDO modernisation, National Research Foundation (NRF) all creating major opportunities.
   - Salary: fresher Rs. 8–14 LPA (government Grade Pay + allowances), mid Rs. 18–35 LPA, senior Rs. 35–75 LPA (Director grade, government scale). Note: Job security, pension, and prestige make this a premium track despite moderate private salaries.
   - Related: data-scientist, doctor, engineer. Tags: ["research", "engineering", "tech", "bio"]. Ring 2, angle 35.

**BUSINESS & LAW cluster:**

8. `lawyer` — Lawyer / Advocate — icon: `gavel`
   - Stream: Any Stream (Arts/Commerce preferred). Education: 5-year integrated BA LLB / BBA LLB, or 3-year LLB after any UG degree. Exams: CLAT (for NLUs), AILET (for NLU Delhi), LSAT India, various university entrance tests. Degrees: BA LLB, BBA LLB, BCom LLB, B.Sc LLB, LLM (optional specialisation). Key subjects: Constitutional Law, Contract Law, Criminal Law, Property Law, Jurisprudence, Civil Procedure. Licensing: Bar Council of India enrolment mandatory after LLB — must pass AIBE (All India Bar Examination).
   - Jobs: Litigation Advocate, Corporate Lawyer, Legal Counsel (In-house), Judicial Service (Judge), Law Professor. Progression: Junior Associate → Associate → Senior Associate → Partner → Senior Partner / Equity Partner (law firm track).
   - India demand: High. India size: India has ~1.7 million enrolled advocates — one of the world's largest legal communities. Corporate legal, arbitration, and IP sectors growing fastest.
   - Govt exams: Judicial Service exams (state-level), UPSC for IRS (Indian Revenue Service) / IPS (requires LLB + UPSC).
   - Salary: fresher Rs. 4–15 LPA (varies hugely between tier-1 firms and litigation), mid Rs. 20–60 LPA, senior Rs. 1Cr+ (equity partner at top firm). Note: Top NLU → top law firm track can reach Rs. 2Cr+ at partner level.
   - Related: ias-officer, journalist, management. Tags: ["law", "humanities", "government", "management"]. Ring 1, angle 120.

9. `ca-finance` — Chartered Accountant / Finance — icon: `monitoring`
   - Stream: Commerce (strongly preferred). Education: CA: Foundation (6 months) → Intermediate (1 year) → Final + 3 years articleship = 5+ years total. MBA Finance as alternative path. Exams: CA Foundation, CA Inter, CA Final (ICAI), CFA (Level I/II/III), CPA. Degrees: B.Com + CA, MBA Finance (IIM), B.Com + CFA. Key subjects: Financial Accounting, Cost Accounting, Taxation (Direct & Indirect), Auditing, Financial Management, Strategic Management. Licensing: ICAI membership mandatory to use "CA" designation.
   - Jobs: Chartered Accountant, Investment Banker, CFO, Financial Analyst, Tax Consultant. Progression: Article Assistant → Audit Associate → Senior Associate → Manager → Partner (CA firm) or VP → MD → CFO (corporate).
   - India demand: Very High. India size: India has ~3.7 lakh CAs for a Rs. 300 lakh crore economy — massive shortage. GST era, IBC, and capital market growth accelerating demand.
   - Salary: fresher Rs. 7–18 LPA (newly qualified CA), mid Rs. 20–60 LPA, senior Rs. 1–5Cr (CFO / Investment Banking Partner). Note: IB at Goldman/JP Morgan can pay Rs. 70L–2Cr for mid-level roles.
   - Related: entrepreneur, lawyer, management. Tags: ["finance", "business", "management", "law"]. Ring 1, angle 140.

10. `entrepreneur` — Entrepreneur / Founder — icon: `rocket_launch`
    - Stream: Any Stream. Education: No formal requirement — but most successful founders have relevant domain expertise and/or an MBA. Exams: None mandatory. Degrees: Any + MBA (IIMs, ISB) adds fundraising credibility and network.
    - Jobs: Founder/CEO, Co-founder, Startup Advisor, Venture Capitalist (after founding experience), Business Development Lead. Progression: Idea Stage → Early-stage → Growth Stage → Scale-up → Exit (IPO/Acquisition).
    - India demand: Very High (ecosystem level). India size: India is the 3rd largest startup ecosystem globally with 112,000+ startups (2023 DPIIT data). 111 unicorns as of 2024.
    - Salary: Highly variable. Early stage: Rs. 0–8 LPA (founder salary). Successful exit: crores to hundreds of crores.
    - Related: product-manager, ca-finance, management. Tags: ["entrepreneurship", "tech", "creative", "business", "management"]. Ring 1, angle 160.

11. `ias-officer` — Civil Servant (IAS / IPS / IFS) — icon: `account_balance`
    - Stream: Any Stream. Education: Any graduation degree (minimum). Most successful candidates study History, Political Science, or Public Administration for UPSC. Exams: UPSC Civil Services — Prelims (GS + CSAT) → Mains (9 papers, 1750 marks) → Personality Test (275 marks). This is India's hardest exam: 0.1% selection rate from 1M+ applicants. Degrees: Any graduation. Most toppers: Humanities, Engineering backgrounds. Key subjects: Indian History, Geography, Polity, Economy, Current Affairs, Ethics. Licensing: None — service allocation post-selection.
    - Jobs: District Collector (IAS), Superintendent of Police (IPS), Foreign Service Officer (IFS), Income Tax Commissioner (IRS), Indian Forest Service Officer (IFoS). Progression: Probationer → SDM / ASP → DM / SP → Commissioner → Secretary → Chief Secretary / DGP.
    - Govt exams: UPSC CSE is the primary exam. Also: State PSC for state civil services (cheaper and faster route).
    - India demand: Highly competitive, not based on market demand — fixed vacancies. India size: ~5,000 IAS officers run a country of 1.4B people. Extraordinary reach and authority.
    - Salary: Rs. 56,100/month (entry) to Rs. 2.5L+/month (Cabinet Secretary) + HRA + DA + govt housing + pension. Total CTC equivalent: Rs. 12–30 LPA entry level in market terms.
    - Related: lawyer, journalist, social-worker. Tags: ["government", "law", "humanities", "management"]. Ring 1, angle 100.

**CREATIVE & EXPRESSION cluster:**

12. `graphic-designer` — Designer (UI/UX / Graphic / Product) — icon: `palette`
    - Stream: Any Stream. Education: BDes 4 years or B.Sc Design / Diploma in Design 3 years. Exams: NID DAT (National Institute of Design), NIFT Entrance Test, MIT/Srishti/Symbiosis design entrance, UCEED (IIT design schools). Degrees: BDes (NID/NIFT/Srishti), B.Sc Visual Communication, B.Tech Design (IITs), PG Diploma Product Design. Key subjects: Design Thinking, Typography, Interaction Design, Visual Communication, User Research, Prototyping (Figma/Adobe).
    - Jobs: UI/UX Designer, Graphic Designer, Product Designer, Design Lead, Creative Director. Progression: Junior Designer → Designer → Senior Designer → Lead Designer → Design Director / Head of Design.
    - India demand: Very High. India size: India's design industry is growing at 18% YoY. Every startup, D2C brand, and tech company building dedicated design teams.
    - Salary: fresher Rs. 5–14 LPA, mid Rs. 18–45 LPA, senior Rs. 60L–1.5Cr.
    - Related: film-director, content-creator, architect. Tags: ["design", "creative", "arts", "tech"]. Ring 2, angle 200.

13. `film-director` — Filmmaker / Director / Writer — icon: `movie`
    - Stream: Any Stream. Education: Film/media school 3–4 years, or self-taught with portfolio. Exams: FTII Entrance (Film and Television Institute of India, Pune — India's most prestigious), SRFTI Entrance, Satyajit Ray Film & Television Institute, Whistling Woods entrance. Degrees: Direction / Screenplay Writing / Cinematography at FTII, Mass Communication at JMC/XIC, BA Film Studies. Key subjects: Screenplay Writing, Direction, Cinematography, Editing, Sound Design, Film History.
    - Jobs: Director, Screenwriter, Cinematographer, Film Editor, Casting Director. Progression: Assistant Director (AD) → Second AD → First AD → Associate Director → Director.
    - India demand: High. India size: India produces 1,800–2,000 films annually across languages — world's largest film producer by volume. OTT explosion (Netflix/Amazon/Sony) has tripled content demand.
    - Salary: fresher Rs. 2–6 LPA (assistant director level), mid Rs. 15–50 LPA (directing), senior Rs. 1Cr+ per project (established directors).
    - Related: content-creator, journalist, graphic-designer. Tags: ["film", "creative", "arts", "content"]. Ring 2, angle 215.

14. `content-creator` — Content Creator / Digital Media — icon: `play_circle`
    - Stream: Any Stream. Education: No formal degree required — portfolio and audience are the credentials. Optional: Mass Communication BA, Journalism, Film Studies. Exams: None mandatory. Relevant certifications: YouTube Creator Academy, Meta Blueprint, Google Digital Garage.
    - Jobs: YouTuber / Video Creator, Podcaster, Social Media Strategist, Brand Content Lead, Newsletter Writer. Progression: Creator (0–10K followers) → Mid-tier Creator → Established Creator → Brand Partnership Revenue → Agency / Media Company.
    - India demand: Very High. India size: India has 550M+ social media users. YouTube India has 460M+ monthly users — 2nd largest market globally. Creator economy valued at $600M in India, growing at 25% YoY.
    - Salary: Entry Rs. 2–8 LPA (brand deals, AdSense). Established: Rs. 30–3Cr+/year. Note: Highly variable — top creators earn crores but most earn modestly. Complementary skills (editing, SEO, strategy) accelerate monetisation.
    - Related: journalist, film-director, graphic-designer. Tags: ["content", "creative", "journalism", "performance"]. Ring 2, angle 230.

15. `fashion-designer` — Fashion Designer — icon: `checkroom`
    - Stream: Any Stream. Education: 4-year BDes / B.Sc Fashion Design. Exams: NIFT Entrance (most competitive design entrance in India for fashion), NID DAT, Pearl Academy entrance, Symbiosis entrance. Degrees: BDes Fashion Design (NIFT/NID/Pearl), B.Sc Apparel Design, Diploma Fashion Merchandising.
    - Jobs: Fashion Designer, Textile Designer, Costume Designer, Fashion Stylist, Merchandiser. Progression: Design Assistant → Junior Designer → Senior Designer → Design Head → Creative Director.
    - India demand: Moderate, premium. India size: India's fashion industry is Rs. 8 lakh crore; 3rd largest producer globally. Luxury segment + sustainable fashion + traditional textiles growing strongly.
    - Salary: fresher Rs. 3–8 LPA, mid Rs. 12–30 LPA, senior Rs. 40L–1Cr+.
    - Related: graphic-designer, architect, film-director. Tags: ["design", "fashion", "creative", "arts"]. Ring 3, angle 220.

**PEOPLE & SOCIETY cluster:**

16. `journalist` — Journalist / Media Professional — icon: `newspaper`
    - Stream: Arts or Any Stream. Education: BA Journalism / Mass Communication 3 years, or BJMC, or PG Diploma. Exams: IIMC entrance (Indian Institute of Mass Communication — Delhi), XIC Mumbai entrance, ACJ Chennai. Degrees: BA Journalism, BJMC, MA Mass Communication (IIMC/XIC/ACJ), PG Diploma Digital Journalism. Key subjects: Reporting, Editing, Media Law and Ethics, Digital Journalism, Data Journalism, Documentary Filmmaking.
    - Jobs: Reporter/Correspondent, News Anchor, Investigative Journalist, Editor, Data Journalist. Progression: Trainee Reporter → Reporter → Senior Reporter → Assistant Editor → Editor / Bureau Chief.
    - India demand: Moderate, transforming. India size: India has 100,000+ registered newspapers, 900+ TV channels, and a rapidly growing digital news ecosystem. Credible investigative journalism is in high demand despite overall media consolidation.
    - Salary: fresher Rs. 3–8 LPA, mid Rs. 12–30 LPA, senior Rs. 40–80 LPA (senior editor/anchor at national network).
    - Related: lawyer, content-creator, ias-officer. Tags: ["journalism", "content", "law", "humanities"]. Ring 2, angle 170.

17. `social-worker` — Social Worker / Development Sector — icon: `volunteer_activism`
    - Stream: Arts (preferred). Education: BSW 3 years + MSW 2 years. Exams: TISS (Mumbai/Hyderabad/Guwahati) entrance — most prestigious. IGNOU, Delhi School of Social Work, JNU, Jamia also strong. Degrees: BSW, MSW (Social Work), MA Development Studies, MBA Social Entrepreneurship (IRMA). Key subjects: Community Development, Social Policy, Gender Studies, Research Methods, Social Welfare Law, Community Organisation.
    - Jobs: Community Development Officer, NGO Programme Manager, CSR Manager (Corporate), Policy Analyst, Social Entrepreneur. Progression: Field Worker → Programme Officer → Project Manager → Programme Director → Executive Director (NGO) / CSR Head (corporate).
    - India demand: Moderate to High. India size: India has 31 lakh registered NGOs — one of the world's largest civil society sectors. CSR mandate (Companies Act 2013) has created permanent corporate funding stream.
    - Salary: fresher Rs. 3–7 LPA (NGO sector); Rs. 7–15 LPA (corporate CSR / international development). Senior: Rs. 20–50 LPA for Director-level at major NGOs or UN agencies.
    - Related: psychologist, ias-officer, journalist. Tags: ["social", "counselling", "government", "humanities"]. Ring 3, angle 170.

18. `teacher-educator` — Teacher / Educationist — icon: `school`
    - Stream: Any Stream. Education: B.Ed (Bachelor of Education) 2 years after any UG; for higher education: MA/M.Sc + NET/PhD. Exams: CTET (Central Teacher Eligibility Test), State TET, UGC NET (for university/college teaching), NTA entrance for central school jobs. Degrees: BA/BSc/BCom + B.Ed, MA/M.Sc + B.Ed, PhD for HE teaching. Licensing: B.Ed + TET mandatory for school teaching. UGC NET mandatory for college teaching.
    - Jobs: School Teacher, College Lecturer, Special Educator, Curriculum Designer, Edtech Content Creator. Progression: Teacher → Senior Teacher → Head of Department → Vice-Principal → Principal → Education Director.
    - Govt exams: CTET, State TET, DSSSB (Delhi), KVS (Kendriya Vidyalaya), NVS (Navodaya). These are among the most popular government job exams in India.
    - India demand: High, government sector has lakh-scale vacancies. India size: India has 15 lakh+ schools and 1.5 crore+ teachers. Edtech sector (BYJU's/Unacademy/PhysicsWallah) has created lakhs of new teaching roles.
    - Salary: fresher Rs. 3–8 LPA (government scales vary by state, central schools pay better), private schools Rs. 4–12 LPA. College lecturer: Rs. 7–20 LPA. Edtech: Rs. 8–25 LPA.
    - Related: psychologist, social-worker, content-creator. Tags: ["education", "social", "counselling", "humanities"]. Ring 3, angle 150.

**PHYSICAL & OUTDOORS cluster:**

19. `pilot` — Pilot / Commercial Aviation — icon: `flight`
    - Stream: Science PCM (mandatory). Education: CPL (Commercial Pilot Licence) — 18–24 months training + 200 hours flying. Exams: DGCA theory exams (Air Navigation, Technical General, RTR licence), AFCAT for Air Force. Degrees: No traditional degree required — CPL is the credential. Engineering degree beneficial for airline sponsorship. Licensing: CPL from DGCA is mandatory for commercial flying. ATPL (Airline Transport Pilot Licence) for captain rank.
    - Jobs: Commercial Airline Pilot (First Officer), Captain, Charter Pilot, Cargo Pilot, Flying Instructor. Progression: First Officer → Senior First Officer → Captain (short-haul) → Senior Captain → Training Captain / Chief Pilot.
    - India demand: Very High. India size: India's aviation sector is growing at 10% YoY — to be the 3rd largest aviation market by 2030. IndiGo alone plans to add 500+ aircraft. DGCA projects need for 10,000+ new pilots by 2030.
    - Salary: fresher Rs. 12–18 LPA (First Officer), mid Rs. 35–70 LPA (Senior First Officer), senior Rs. 80L–1.5Cr (Captain). Note: Training cost is Rs. 50–80 lakh — highest upfront cost of any profession.
    - Related: research-scientist, sports-athlete, software-engineer. Tags: ["aviation", "engineering", "physical", "outdoors"]. Ring 2, angle 300.

20. `architect` — Architect — icon: `architecture`
    - Stream: Science PCM. Education: B.Arch 5 years. Exams: NATA (National Aptitude Test for Architecture) — mandatory for admission. JEE Main Paper 2 (Architecture). Degrees: B.Arch, M.Arch (specialisations: Urban Design, Landscape, Sustainable). Licensing: CoA (Council of Architecture) registration mandatory to practise as an architect in India.
    - Jobs: Architect, Urban Designer, Interior Architect, Landscape Architect, Conservation Architect. Progression: Trainee Architect → Architect → Project Architect → Associate Architect → Principal / Founding Partner.
    - India demand: High. India size: India's construction sector is the 2nd largest employer after agriculture. Smart Cities Mission, infrastructure push, and housing demand driving enormous project pipeline.
    - Salary: fresher Rs. 4–9 LPA, mid Rs. 15–40 LPA, senior Rs. 50L–2Cr+ (principals of top firms / celebrity architects).
    - Related: graphic-designer, research-scientist, fashion-designer. Tags: ["architecture", "design", "engineering", "creative", "arts"]. Ring 2, angle 270.

21. `sports-athlete` — Professional Athlete / Sports Management — icon: `sports_cricket`
    - Stream: Any Stream (can continue alongside academics). Education: Formal degree not required for playing; Sports Management: BPEd, BSc Sports Science, MBA Sports Management. Exams: SAI (Sports Authority of India) trials, state association trials, TOPS (Target Olympic Podium Scheme) selection. Licensing: NOC (No Objection Certificate) from national federation for international events.
    - Jobs: Professional Cricketer / Footballer / Badminton Player, Sports Coach, Sports Physiotherapist, Sports Commentator, Sports Manager. Progression: State U-19 → State Senior → IPL/National → International. Management track: Assistant Coach → Head Coach → National Selector.
    - India demand: Growing rapidly. India size: Cricket is a Rs. 15,000 crore industry. IPL is the world's 2nd most valuable sporting league. Olympic sports (badminton, wrestling, shooting) growing with TOPS funding.
    - Salary: Highly variable. Club/state-level: Rs. 3–15 LPA. IPL contract: Rs. 20L–18Cr per season. International player retainer: Rs. 1–7Cr/year (BCCI Grade A+).
    - Related: pilot, social-worker, journalist. Tags: ["sports", "physical", "performance", "outdoors"]. Ring 3, angle 300.

22. `game-developer` — Game Developer / Interactive Media — icon: `sports_esports`
    - Stream: Science PCM or Any Stream. Education: B.Tech CSE with game specialisation, or BDes Game Design, or self-taught with portfolio. Exams: JEE Main for engineering path; NID / Srishti / MIT Pune for design path. Degrees: B.Tech Game Technology (VIT/Amity), BDes Game Design, BA Interactive Media.
    - Jobs: Game Developer, Game Designer, Level Designer, VR/AR Developer, Esports Manager. Progression: Junior Dev → Game Developer → Senior Dev → Lead Developer → Creative Director.
    - India demand: Emerging to High. India size: India's gaming industry crossed Rs. 25,000 crore in 2023 — 100% growth in 4 years. Nodwin, Dream11, Mobile Premier League among large employers.
    - Salary: fresher Rs. 5–12 LPA, mid Rs. 18–40 LPA, senior Rs. 50L–1Cr+.
    - Related: software-engineer, film-director, graphic-designer. Tags: ["tech", "creative", "design", "engineering"]. Ring 3, angle 330.

23. `chef-culinary` — Chef / Culinary Arts — icon: `restaurant`
    - Stream: Any Stream. Education: 3-year Hotel Management degree or 3-year Culinary Arts Diploma. Exams: NCHMCT JEE (National Council for Hotel Management and Catering Technology Joint Entrance Exam) — for IHMs. Degrees: BHM (Bachelor of Hotel Management), BSc Culinary Arts, Diploma Culinary Arts (IHM). Key subjects: Classical French/Indian Cuisine, Patisserie, Kitchen Management, Food Science, Nutrition.
    - Jobs: Sous Chef, Executive Chef, Pastry Chef, Food Stylist, Restaurant Owner. Progression: Commis Chef → Demi Chef → Chef de Partie → Sous Chef → Head Chef → Executive Chef.
    - India demand: High. India size: India's food service industry is Rs. 5.99 lakh crore and growing at 9%. Hotel and restaurant sector has 7.5 million employees.
    - Salary: fresher Rs. 2–6 LPA, mid Rs. 10–25 LPA, senior Rs. 30–80 LPA (Executive Chef in 5-star / own restaurant can earn significantly more).
    - Related: fashion-designer, content-creator, entrepreneur. Tags: ["culinary", "craft", "creative", "management"]. Ring 3, angle 250.

24. `management-consultant` — Management Consultant — icon: `business_center`
    - Stream: Any Stream (Engineering + MBA most common). Education: Any UG + MBA from tier-1 B-school. Exams: CAT (for IIMs), GMAT (for ISB / international MBAs). Degrees: B.Tech + MBA (IIM A/B/C/L/K, ISB Hyderabad) is the gold standard path. Consulting firms also recruit directly from top IITs/IIMs.
    - Jobs: Business Analyst (BA), Associate Consultant, Consultant, Engagement Manager, Partner. Progression: BA → Consultant → Senior Consultant → Manager → Principal → Partner / Director.
    - India demand: Very High. India size: McKinsey, BCG, Bain, Deloitte, KPMG all have large India operations. Indian consulting market growing at 12% YoY.
    - Salary: fresher Rs. 20–40 LPA (at MBB post-MBA), mid Rs. 50L–1.5Cr, senior Rs. 2–5Cr+ (Partner level).
    - Related: ca-finance, entrepreneur, product-manager. Tags: ["management", "business", "finance", "tech"]. Ring 3, angle 110.

25. `pharmacist` — Pharmacist / Drug Research — icon: `medication`
    - Stream: Science PCB. Education: D.Pharm 2 years or B.Pharm 4 years or Pharm.D 6 years. Exams: GPAT (Graduate Pharmacy Aptitude Test) for PG admissions, NIPER JEE for National Institute of Pharmaceutical Education and Research. Degrees: D.Pharm, B.Pharm, M.Pharm, Pharm.D, PhD (Pharmaceutical Sciences). Licensing: State Pharmacy Council registration mandatory for retail pharmacy practice.
    - Jobs: Hospital Pharmacist, Retail Pharmacist, Drug Regulatory Affairs Manager, Clinical Research Associate, Pharmaceutical Sales Representative. Progression: Trainee Pharmacist → Pharmacist → Senior Pharmacist → Pharmacy Manager → Director of Pharmacy.
    - India demand: High. India size: India is the world's 3rd largest pharma market by volume and the "pharmacy of the world" (supplies 20% of global generics). Sector employs 3 million people.
    - Salary: fresher Rs. 3–8 LPA, mid Rs. 10–25 LPA, senior Rs. 25–60 LPA (regulatory affairs / clinical research).
    - Related: doctor, research-scientist, data-scientist. Tags: ["healthcare", "bio", "research", "science"]. Ring 3, angle 60.

**Ensure every career has the complete expanded schema filled in — not placeholders.**

---

## STEP 5 — THE PATH MAP (REPLACES GALAXY)

### Concept

After quiz completion, instead of a galaxy map, the user sees an interactive **branching path visualization** — directly inspired by the uploaded image of a person at a crossroads with roads curving outward in multiple directions.

The visualization is a 2D SVG/canvas map viewed from slightly above (not isometric — clean flat design). The user's position is at the bottom centre. Six major roads branch outward, each representing a career cluster. Each main road then branches into the individual careers within that cluster. The roads curve naturally (cubic bezier paths) — not rigid straight lines.

### `client/src/screens/PathMap.jsx`

This screen completely replaces Galaxy.jsx. It is the core post-quiz experience.

```jsx
import { useEffect, useRef, useMemo, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCareers } from '../hooks/useCareers.js'
import useAppStore from '../store/useAppStore.js'
import { getMatchPercentage } from '../utils/scoring.js'
import SeekerNav from '../components/layout/SeekerNav.jsx'
import FloatingPaths from '../components/layout/FloatingPaths.jsx'
import CareerDrawer from '../components/career/CareerDrawer.jsx'
import Icon from '../components/ui/Icon.jsx'
```

**Layout structure:**

```
<div> fixed full-screen, overflow hidden, bg-paper, font-sans
  <FloatingPaths />               — fixed background layer
  <SeekerNav />                   — top nav

  <PathCanvas />                  — the main interactive SVG map, takes 70% of screen
  <RightPanel />                  — right side: filtered career list, search, filters

  <CareerDrawer />                — slides up from bottom when a career is selected
  <ChatFAB />                     — fixed bottom-right, minimal
</div>
```

**PathCanvas implementation:**

The SVG is responsive. The "YOU" node sits at SVG coordinate `(500, 520)`. The six cluster nodes are positioned at:

```js
const CLUSTER_NODES = [
  { id: "tech",     label: "Technology\n& Data",     x: 160,  y: 160,  color: "#2563EB" },
  { id: "health",   label: "Science\n& Health",      x: 340,  y: 100,  color: "#16A34A" },
  { id: "business", label: "Business\n& Law",        x: 560,  y: 80,   color: "#D97706" },
  { id: "creative", label: "Creative\n& Expression", x: 760,  y: 140,  color: "#9333EA" },
  { id: "people",   label: "People\n& Society",      x: 840,  y: 300,  color: "#E8572A" },
  { id: "physical", label: "Physical\n& Outdoors",   x: 800,  y: 430,  color: "#0891B2" },
]
```

Roads from YOU (500, 520) to each cluster node are cubic bezier paths. Calculate control points so paths curve outward naturally:

```js
function getCurvePath(x1, y1, x2, y2) {
  // Control point 1: midway horizontally from start
  const cp1x = x1 + (x2 - x1) * 0.3
  const cp1y = y1 - 60
  // Control point 2: midway from end, curve up
  const cp2x = x2 + (x1 - x2) * 0.3
  const cp2y = y2 + 60
  return `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`
}
```

From each cluster node, individual career sub-paths branch out further. Career nodes are smaller circles distributed around the cluster node at radius 80–110px.

**Path animation — paths draw sequentially on mount:**
- Main roads draw in first (pathLength 0 → 1), staggered 200ms apart
- Cluster nodes appear as the path reaches them (delay = stagger index * 0.2s + 0.8s)
- Career nodes appear after cluster node is visible (additional 300ms delay)

**Interaction states:**

1. **Default:** All paths visible but slightly faded. Recommended careers highlighted with accent colour ring.

2. **Cluster hover:** Hovering a cluster node highlights its main road (stroke to cluster colour, width increases slightly). Its sub-paths become vivid. Other clusters fade to 20% opacity.

3. **Career hover:** The career node expands slightly. A tooltip appears above it showing: career title, match percentage (if quiz completed), demand indicator. Road to this career pulses.

4. **Career click:** Sets `selectedCareer` in Zustand. Opens `CareerDrawer` sliding up from the bottom.

5. **"YOU" node at centre:**
   - 60×60px circle, filled with `#0D0D0D`, white text "YOU"
   - Has a subtle pulse ring animation (border expanding outward and fading)
   - Small label below: "Your starting point"

**Top-left controls:**
```
[ For You ] [ All Paths ]   ← toggle pill pair
[ Search careers... ]        ← search input
```

When "For You" is active: highlight only the recommended career nodes with accent ring, animate others to lower opacity. When "All Paths" is active: all nodes equally visible.

**No orbit rings. No galaxy. No stars.** The visual metaphor is roads on a landscape, not orbiting planets.

---

### `client/src/components/career/CareerDrawer.jsx`

The career drawer slides up from the bottom of the screen when a career is clicked on the path map. It is NOT a centred modal. It is a bottom sheet that occupies 65% of screen height with a drag handle at the top.

```
<motion.div
  style={{ y: drawerY }}
  drag="y"
  dragConstraints={{ top: 0, bottom: drawerHeight }}
  className="fixed bottom-0 left-0 right-0 bg-paper z-40 border-t border-ink-10 rounded-t-3xl shadow-2xl overflow-hidden"
  animate={{ y: selectedCareer ? 0 : drawerHeight }}
  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
>
```

**Drawer structure:**

```
Drag handle bar (centred, ink-20)

Two-column layout:
LEFT (40%):
  Career icon (Material Symbol, 48px, cluster colour)
  Career title — DM Serif Display, 32px, ink
  Category tag — small pill, cluster colour bg
  Tagline — DM Sans 16px, ink-60, italic
  Match % bar — if quiz completed
  Three key metrics row:
    [ Demand: ████░  ] [ Work-Life: ███░░ ] [ Creativity: ████░ ]
  Quick stats chips:
    [ Stream: Science PCM ] [ Duration: 4 years ] [ Entry age: 21–23 ]

RIGHT (60%):
  Tab navigation (underline style, no background):
    Overview | Education | Career Path | In India | Chat

  Tab content panels (see below)

Footer bar:
  [ ← Back to Map ]    [ Bookmark  ]    [ Ask Seeker about this → ]
```

**Tab: Overview**
- Tagline as a large pull-quote (DM Serif Display italic, 20px)
- "What you'd actually do" — 3 bullet points from jobs array
- "Typical day" — brief prose description
- Indian celebrities/role models section: small portrait placeholder + name + one-line context

**Tab: Education**
- Required stream: coloured badge
- Education timeline: vertical dotted line with nodes
  - Node 1: "Class 10 → Stream selection" → `career.stream`
  - Node 2: "Entrance exam(s)" → `career.education.entrance_exams` as tags
  - Node 3: "Degree" → `career.education.degrees[0]` + duration
  - Node 4: (if applicable) "Licensing" → `career.education.licensing`
- Key subjects: horizontal tag row in surface colour
- Certifications that add value: tag row in accent/10 colour

**Tab: Career Path**
- Progression ladder: vertical visual showing each step
  - Each step: numbered circle (outline, cluster colour) + title + brief note
- Salary band per stage (3 cards: Entry / Mid / Senior)
  - Each card: minimal — just the level name, Rs. figure in large DM Serif Display
  - Entry card: ink-60 bg. Mid: ink-20 bg. Senior: cluster-colour/10 bg with cluster-colour border
- Employment type tags: "Private" / "Government" / "Freelance"

**Tab: In India**
- Demand status: large badge (Very High / High / Moderate / Emerging) + India demand paragraph
- India size note (1–2 sentences from `career.india_size`)
- Government exams (if applicable): listed as info cards
- Top sectors: horizontal tags
- Related careers: 3 small cards with career icon + title + "Explore →"

**Tab: Chat**
- This tab directly triggers the Chat screen with this career as context
- Show a preview of what you can ask: 4 suggestion chips relevant to this career
- Large CTA: "Talk to Seeker about [career title] →"

---

## STEP 6 — SCREEN REVAMPS

### `client/src/screens/Splash.jsx` — complete replacement

Design language: The landing page of a premium, editorial product. Large typography. The floating paths as background. One strong CTA.

```
Full-screen layout, bg-paper:

<FloatingPaths />

Top navigation: SeekerNav (minimal, logo left, two links right)

Main content — vertically centred, left-aligned (not centred like before):

  Overline label — small caps, tracking-widest, ink-60:
  "A CAREER EXPLORATION TOOL FOR INDIAN STUDENTS"

  Headline — DM Serif Display, display-xl size, ink, text-balance:
  "Every path you
  haven't taken
  is still yours."

  Sub-headline — DM Sans 18px, ink-60, max-w-md:
  "Seeker helps you explore careers beyond what you've been told is possible.
   Take the quiz. Find your paths. Ask anything."

  CTA row — horizontally spaced:
  [ Begin Exploring → ]    (accent button)
  [ Choosing your stream in Class 9-10?  → ]  (ghost button)

  Below fold (subtle scroll hint):
  "↓ 25 careers • Unbiased quiz • AI counsellor"

Bottom right corner:
  Counter animation — counts up to 25 on mount:
  "25" (DM Serif Display, 120px, ink-10) — decorative, large
  "career paths" — small label below
```

**Entrance animation sequence:**
1. FloatingPaths fade in over 1s
2. Overline label fades up (delay 0.3s)
3. Headline draws in letter by letter using the same letter-by-letter animation from the provided code component (staggered spring per letter, delay 0.5s start)
4. Sub-headline fades up (delay 1.0s)
5. CTA row fades up (delay 1.3s)
6. Counter counts from 0 to 25 (delay 1.5s, 1.5s duration)

The letter-by-letter animation uses `motion.span` with:
```js
initial={{ y: 60, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ type: "spring", stiffness: 150, damping: 25, delay: wordIndex * 0.08 + letterIndex * 0.025 }}
```

### `client/src/screens/Quiz.jsx` — complete replacement

The quiz is the most emotionally important screen. It must feel deliberate, calm, and unhurried. Design: full-screen, one question at a time, large type, minimal UI.

```
Full-screen, bg-paper (default) transitions to surface for question cards

<FloatingPaths />

Layout: split-screen on desktop, single column on mobile

LEFT 40% (desktop):
  Progress indicator — not a bar, but a vertical counter:
    Large numeral: "03" — DM Serif Display, 96px, ink-10 (faint, decorative)
    Below it: "of 12" — DM Sans 14px, ink-30
  Current dimension label (Q3 = "Expression Style") — small caps, accent colour
  Quit prompt: "← Back" — ghost, bottom-left

RIGHT 60% (desktop):
  Icon — Material Symbol, 32px, ink-30 — the question's icon
  Question — DM Serif Display, display-md, ink, text-balance
  Subtext — DM Sans 15px, ink-60, italic, mb-8

  Options grid — 2 columns on desktop, 1 on mobile
    Each option (unselected):
      Left: letter badge — 32×32, border ink-20, ink-60 text, monospace
      Content: title (DM Sans 500, 16px, ink) + description (DM Sans 400, 13px, ink-60)
      Interaction: hover → border ink, bg surface, letter badge filled ink/text paper
      Selected: border accent, bg accent-10, letter badge filled accent/text white, title ink
      No check icon — the border and background change are sufficient signal

Navigation:
  No "Next" button by default — auto-advance 500ms after selection
  Manual "Next →" appears 2s after selecting if user hasn't moved (for hesitant users)
  "← Previous" is always visible as small ghost text

Transition between questions:
  Exit: current question slides left and fades (x: 0 → -40, opacity 1 → 0, 250ms)
  Enter: next question slides in from right (x: 40 → 0, opacity 0 → 1, 300ms)
  The large decorative numeral cross-fades
```

Progress display: instead of a progress bar, the bottom of the screen has 12 small circles (3×4 grid on mobile, row of 12 on desktop). Completed = filled ink. Current = filled accent. Remaining = outline ink-20.

### `client/src/screens/ResultsLoading.jsx`

The transition between quiz and PathMap. 2.5 seconds.

Design: full-screen paper background. Centre column. No spinner — instead, the concept of a path being drawn.

```
Full-screen bg-paper

Centre:
  An SVG path draws itself from bottom to top (a single road curve — 3 seconds to draw)
  Below the path origin: "YOUR" — DM Serif Display, 14px, ink-60
  As the path finishes: "PATHS ARE READY" appears letter by letter

  Below that, three lines fade in sequentially:
  "Analysed your 12 answers..." (0.5s)
  "Mapped against 25 careers..." (1.0s)
  "Found your strongest matches." (1.5s, accent colour)
```

### `client/src/screens/Chat.jsx` — complete replacement

Same functionality, completely new visual language. No cosmic background. Clean editorial.

```
Full-screen, bg-paper

<SeekerNav />

Main layout — centered column, max-w-2xl:

HEADER ROW:
  Left: "Ask Seeker" — DM Serif Display, 24px
  If contextCareer: small pill "Re: [career.title]" — accent bg, white text
  Right: icon button for clearing chat

MESSAGES AREA (flex-1, overflow-y-auto):
  Generous padding, no background differentiation per message

  AI message:
    No avatar icon — instead a small "S" monogram in a 24px circle (ink bg, paper text)
    Message text — DM Sans 15px, ink, line-height 1.7
    Markdown renders fully (bold = DM Sans 600, lists = properly indented)

  User message:
    Right-aligned
    Message text in a minimal surface box — bg surface, rounded-2xl, no border
    No avatar

  Typing indicator:
    Three dots, but styled as a small animated line (not bouncing circles)
    — a short horizontal line that stretches and contracts

INPUT AREA (sticky bottom):
  Clean input: DM Sans 15px placeholder "Ask about any career, exam, or choice..."
  No border on the input itself — instead a bottom line that glows accent on focus
  Send button: minimal ink circle, arrow icon inside
  Suggestion chips (only when chatMessages.length <= 1): horizontal scroll row of text-only pills
    No icons on chips — just text, small caps, ink border
```

### `client/src/screens/StreamGuide.jsx`

A dedicated screen for Class 9-10 students choosing their stream.

```
Full-screen, bg-paper

<FloatingPaths />
<SeekerNav />

Header section — left aligned, generous padding:
  Overline: "CLASS 9–10 GUIDE"
  Headline: DM Serif Display, "Which stream is right for you?"
  Subtext: "This is one of the first choices — not the only one. Every stream opens more doors than it closes."

Myth-busting BANNER — full width, ink bg, paper text:
  "The most dangerous thing you can believe: that your stream decides your entire future."
  Rotates through 3 different myth statements every 4s

5 stream cards — full-width stacked layout (not grid):
  Each card: minimal, left-aligned
  Stream name — DM Serif Display, 28px
  Subject tags — horizontal row of pills
  One-line description
  Expanding section (click to open — Framer Motion height animation):
    Myth: italic, orange accent
    Reality: regular, ink
    Key exams, top colleges, demand note
    "See careers in this stream →" accent ghost button

CTA bottom:
  "Ready to explore specific careers? Take the 12-question quiz →" accent button
```

---

## STEP 7 — APP SHELL UPDATES

### `client/src/App.jsx`

Add `CustomCursor`, update routes to include `/paths` for PathMap, update all transitions:

```jsx
import CustomCursor from './components/layout/CustomCursor.jsx'

// Add route:
{ path: '/paths', element: <PathMap /> },
{ path: '/streams', element: <StreamGuide /> },
```

Update `LoadingFallback` to match new visual language:
```jsx
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center">
      <span className="font-serif text-2xl text-ink-30 animate-pulse">Seeker</span>
    </div>
  )
}
```

Add `<CustomCursor />` as first child inside the App root div.

### `client/index.html`

Update:
- Title: "Seeker — Explore Your Paths"
- Remove `class="dark"` from html tag (the new design is light-first)
- Add meta description: "Seeker helps Indian students explore careers beyond convention. Unbiased quiz, 25 career paths, AI counsellor."
- Favicon: SVG with the letter S in accent colour

---

## STEP 8 — SCORING UTILITY UPDATE

### `client/src/utils/scoring.js`

The scoring engine is the same algorithm but the tag vocabulary has changed in the new quiz data. Update the file to work with the new tags:

The `buildTagMap` function remains the same — it reads `option.tags` from quiz data. No structural changes needed. Verify that all tags used in new quiz questions (`tech`, `engineering`, `data-science`, `creative`, `design`, `arts`, `film`, `social`, `counselling`, `healthcare`, `education`, `law`, `journalism`, `humanities`, `finance`, `management`, `entrepreneurship`, `government`, `research`, `bio`, `sports`, `physical`, `outdoors`, `aviation`, `performance`, `content`, `music`, `architecture`, `culinary`, `fashion`) map to at least one career's `tags` array. Add missing ones.

---

## STEP 9 — ROUTE TRANSITION

Update React Router's page transitions in App.jsx to use a path-appropriate animation:

```js
const pageTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -20 },
  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
}
```

This is a lateral slide — like walking forward down a path. More appropriate for the "choosing a direction" metaphor than a vertical fade.

---

## STEP 10 — TYPEFACE LOADING VERIFICATION

Confirm fonts are loading correctly. In the browser, run:
```js
document.fonts.ready.then(() => console.log('fonts ready', [...document.fonts].map(f => f.family)))
```
Both `DM Serif Display` and `DM Sans` must appear. If not, check the Google Fonts import URL in `index.css`.

---

## STEP 11 — VERIFICATION CHECKLIST

After all screens are built, verify:

**Visual**
- [ ] FloatingPaths SVG is visible on every screen (Splash, Quiz, PathMap, Chat, StreamGuide)
- [ ] No space/cosmic visual elements remain anywhere — no stars, no glassmorphic cards, no gradients involving violet or deep blue backgrounds
- [ ] DM Serif Display is used for all headlines and large display text
- [ ] DM Sans is used for all body text, UI labels, and inputs
- [ ] `#E8572A` (accent) is the ONLY non-monochrome colour used for interactive/highlight states
- [ ] Custom cursor visible on desktop (dot + lagging ring)
- [ ] Cursor ring changes to accent colour on hover

**Functionality**
- [ ] Quiz loads all 12 questions from API
- [ ] Auto-advance fires 500ms after option selection
- [ ] Path map shows all career nodes positioned correctly
- [ ] Career cluster hover highlights the correct subpaths and fades others
- [ ] Career click opens the CareerDrawer from the bottom
- [ ] All 5 tabs in CareerDrawer work with real data from API
- [ ] "In India" tab shows government exams where applicable
- [ ] Bookmark icon in drawer works and persists
- [ ] Chat opens with career context when triggered from drawer
- [ ] Stream guide myth statements rotate every 4s
- [ ] Page transitions are lateral slides, not vertical fades
- [ ] No console errors

---

*End of prompt. Execute all steps in order. The spatial metaphor — a person at a crossroads with branching roads — must be felt in every design decision. Every screen is a step along a path. The user is always the traveller, never a passive observer.*