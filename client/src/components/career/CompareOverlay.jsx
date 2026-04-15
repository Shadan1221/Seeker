import { motion, AnimatePresence } from 'framer-motion'
import useAppStore from '../../store/useAppStore.js'
import Icon from '../ui/Icon.jsx'

export default function CompareOverlay() {
  const { compareResult, exitCompareMode, setCompareResult } = useAppStore()

  const handleClose = () => {
    setCompareResult(null)
    exitCompareMode()
  }

  return (
    <AnimatePresence>
      {compareResult && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 280, damping: 32 }}
          className="fixed inset-0 z-50 bg-paper overflow-y-auto"
        >
          {/* ── Header ───────────────────────────────────────── */}
          <div className="sticky top-0 bg-paper/90 backdrop-blur-sm border-b border-ink-10
                          flex items-center justify-between px-8 py-5 z-10">
            <div>
              <p className="text-xs font-medium tracking-widest text-ink-60 uppercase mb-1">
                Path Comparison
              </p>
              <h2 className="font-serif text-display-sm text-ink">
                {compareResult.careerA.title}
                <span className="text-ink-30 mx-3 font-sans font-light">vs</span>
                {compareResult.careerB.title}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="flex items-center gap-2 text-sm text-ink-60 hover:text-ink"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          {/* ── AI Summary ────────────────────────────────────── */}
          <div className="max-w-4xl mx-auto px-8 pt-10 pb-6">
            <p className="font-serif italic text-display-sm text-ink leading-snug text-balance">
              "{compareResult.aiExplanation.summary}"
            </p>
          </div>

          {/* ── Main comparison grid ──────────────────────────── */}
          <div className="max-w-4xl mx-auto px-8 pb-24">

            {/* Career headers */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {[compareResult.careerA, compareResult.careerB].map((career, i) => (
                <div key={career.id}
                  className="rounded-2xl border border-ink-10 p-6"
                  style={{ borderColor: career.accent + '40',
                           backgroundColor: career.accent + '08' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon name={career.icon} size={28} className="text-ink-60" />
                    <div>
                      <p className="text-xs text-ink-60 uppercase tracking-widest">{i === 0 ? 'Path A' : 'Path B'}</p>
                      <h3 className="font-serif text-xl text-ink">{career.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-ink-60 italic">{career.tagline}</p>
                </div>
              ))}
            </div>

            {/* Metrics comparison table */}
            <div className="space-y-0 border border-ink-10 rounded-2xl overflow-hidden mb-8">
              {[
                {
                  label: 'Stream Required',
                  icon: 'school',
                  A: compareResult.comparison.stream.A,
                  B: compareResult.comparison.stream.B,
                  type: 'text'
                },
                {
                  label: 'Education Duration',
                  icon: 'schedule',
                  A: compareResult.comparison.educationDuration.A,
                  B: compareResult.comparison.educationDuration.B,
                  type: 'text'
                },
                {
                  label: 'Time to Stability',
                  icon: 'trending_up',
                  A: compareResult.comparison.timeToStability.A,
                  B: compareResult.comparison.timeToStability.B,
                  type: 'text'
                },
                {
                  label: 'Starting Salary',
                  icon: 'payments',
                  A: compareResult.comparison.salary.A.fresher,
                  B: compareResult.comparison.salary.B.fresher,
                  type: 'text'
                },
                {
                  label: 'Mid-Career Salary',
                  icon: 'savings',
                  A: compareResult.comparison.salary.A.mid,
                  B: compareResult.comparison.salary.B.mid,
                  type: 'text'
                },
                {
                  label: 'India Demand',
                  icon: 'signal_cellular_alt',
                  A: compareResult.comparison.indiaContext.A,
                  B: compareResult.comparison.indiaContext.B,
                  type: 'badge'
                },
                {
                  label: 'Work-Life Balance',
                  icon: 'balance',
                  A: compareResult.comparison.workLife.A,
                  B: compareResult.comparison.workLife.B,
                  type: 'meter'
                },
                {
                  label: 'Overall Difficulty',
                  icon: 'fitness_center',
                  A: compareResult.comparison.overallDifficulty.A,
                  B: compareResult.comparison.overallDifficulty.B,
                  type: 'difficulty'
                },
              ].map((row, idx) => (
                <div key={row.label}
                  className={`grid grid-cols-[1fr_180px_1fr] items-center
                    ${idx % 2 === 0 ? 'bg-paper' : 'bg-surface/50'}`}
                >
                  {/* Path A value */}
                  <div className="px-6 py-4 text-right">
                    <RowValue value={row.A} type={row.type} />
                  </div>

                  {/* Label — centre column */}
                  <div className="px-4 py-4 text-center border-x border-ink-10">
                    <div className="flex items-center justify-center gap-1.5">
                      <Icon name={row.icon} size={14} className="text-ink-30" />
                      <span className="text-xs font-medium text-ink-60 uppercase tracking-wide">
                        {row.label}
                      </span>
                    </div>
                  </div>

                  {/* Path B value */}
                  <div className="px-6 py-4 text-left">
                    <RowValue value={row.B} type={row.type} />
                  </div>
                </div>
              ))}
            </div>

            {/* Key challenges side by side */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {['A', 'B'].map(side => (
                <div key={side}>
                  <p className="text-xs font-medium tracking-widest text-ink-60 uppercase mb-3">
                    Key Challenges — Path {side}
                  </p>
                  <ul className="space-y-2">
                    {compareResult.comparison.topChallenges[side].map((challenge, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ink-60">
                        <span className="text-accent mt-0.5">—</span>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* AI detailed analysis cards */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { side: 'A', career: compareResult.careerA, insight: compareResult.aiExplanation.pathA },
                { side: 'B', career: compareResult.careerB, insight: compareResult.aiExplanation.pathB },
              ].map(({ side, career, insight }) => (
                <div key={side} className="rounded-2xl bg-surface p-6 space-y-4">
                  <p className="text-xs font-medium tracking-widest text-ink-60 uppercase">
                    Path {side} — {career.title}
                  </p>
                  <div>
                    <p className="text-xs text-ink-30 uppercase tracking-wide mb-1">Best for</p>
                    <p className="text-sm text-ink leading-relaxed">{insight.bestFor}</p>
                  </div>
                  <div>
                    <p className="text-xs text-green-600 uppercase tracking-wide mb-1">Strongest advantage</p>
                    <p className="text-sm text-ink leading-relaxed">{insight.strongestAdvantage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-accent uppercase tracking-wide mb-1">Biggest risk</p>
                    <p className="text-sm text-ink leading-relaxed">{insight.biggestRisk}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* AI verdict */}
            <div className="rounded-2xl border border-ink-10 p-8 mb-8">
              <p className="text-xs font-medium tracking-widest text-ink-60 uppercase mb-4">
                Ask Seeker's Take
              </p>
              <p className="text-[17px] text-ink leading-relaxed mb-6">
                {compareResult.aiExplanation.verdict}
              </p>
              <div className="border-t border-ink-10 pt-6">
                <p className="text-xs text-ink-60 uppercase tracking-widest mb-2">
                  Before you decide, ask yourself:
                </p>
                <p className="font-serif italic text-xl text-ink">
                  "{compareResult.aiExplanation.reflectionQuestion}"
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="sticky bottom-0 flex items-center gap-4 bg-paper/90 backdrop-blur-sm p-6 rounded-2xl border border-ink-10 -mx-8 px-8 mb-8">
              <button
                onClick={handleClose}
                className="flex items-center gap-2 text-sm font-medium text-ink-60
                           border border-ink-10 px-6 py-3 rounded-xl hover:border-ink-30 hover:text-ink transition-colors"
              >
                ← Back to Map
              </button>
              <button
                onClick={() => {
                  handleClose()
                  // Navigate to chat with context
                  window.location.href = `/chat?compare=${compareResult.careerA.id},${compareResult.careerB.id}`
                }}
                className="flex items-center gap-2 text-sm font-medium bg-accent text-white
                           px-6 py-3 rounded-xl hover:bg-[#D44E25] transition-colors ml-auto"
              >
                Discuss this with Ask Seeker →
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Helper component for table cell values ─────────────────────────────────
function RowValue({ value, type }) {
  if (type === 'meter') {
    return (
      <div className="flex items-center gap-1 justify-end">
        {[1,2,3,4,5].map(i => (
          <div key={i}
            className={`h-1.5 w-5 rounded-full ${i <= value ? 'bg-ink' : 'bg-ink-10'}`}
          />
        ))}
        <span className="text-xs text-ink-60 ml-1">{value}/5</span>
      </div>
    )
  }
  if (type === 'difficulty') {
    const colours = {
      'Moderate':  'bg-green-50 text-green-700',
      'Hard':      'bg-amber-50 text-amber-700',
      'Very Hard': 'bg-orange-50 text-orange-700',
      'Extreme':   'bg-red-50 text-red-700',
    }
    return (
      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${colours[value] || 'bg-surface text-ink-60'}`}>
        {value}
      </span>
    )
  }
  if (type === 'badge') {
    const colours = {
      'Very High': 'bg-green-50 text-green-700',
      'High':      'bg-blue-50 text-blue-700',
      'Moderate':  'bg-amber-50 text-amber-700',
      'Emerging':  'bg-purple-50 text-purple-700',
    }
    return (
      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${colours[value] || 'bg-surface text-ink-60'}`}>
        {value}
      </span>
    )
  }
  // Default: plain text
  return <span className="text-sm text-ink">{value}</span>
}
