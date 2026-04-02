import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import SeekerNav from '../components/layout/SeekerNav.jsx'
import FloatingPaths from '../components/layout/FloatingPaths.jsx'
import Icon from '../components/ui/Icon.jsx'
import SeekerButton from '../components/ui/SeekerButton.jsx'
import useAppStore from '../store/useAppStore.js'
import { supabase } from '../lib/supabase.js'

const CATEGORY_OPTIONS = [
  'Discovery Quiz',
  'Path Mapping',
  'Comparison',
  'Ask Seeker',
  'Streams Guide',
  'Overall Experience',
]

const RATING_COPY = {
  1: 'Needs major improvement',
  2: 'Below expectations',
  3: 'Good with room to improve',
  4: 'Very good experience',
  5: 'Excellent experience',
}

const SHARE_COPY = `I just tried Seeker for career discovery and path clarity, and it is genuinely useful.
If you are confused between career options, this makes the next step much clearer.
Try it now: https://pathseeker.app`

export default function Feedback() {
  const user = useAppStore(s => s.user)
  const profile = useAppStore(s => s.profile)

  const [rating, setRating] = useState(0)
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0])
  const [message, setMessage] = useState('')
  const [improvement, setImprovement] = useState('')
  const [recommend, setRecommend] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const canSubmit = useMemo(() => {
    return rating > 0 && message.trim().length >= 20 && !isSubmitting
  }, [rating, message, isSubmitting])

  const handleCopyShareText = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_COPY)
      toast.success('Share message copied. Paste it on WhatsApp or social media.')
    } catch {
      toast.error('Could not copy automatically. Please copy the message manually below.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canSubmit || !user?.id) return

    setIsSubmitting(true)
    const payload = {
      user_id: user.id,
      username_snapshot: profile?.username || null,
      email_snapshot: user.email || null,
      rating,
      category,
      message: message.trim(),
      improvement: improvement.trim() || null,
      recommend,
    }

    const { error } = await supabase.from('feedback_entries').insert(payload)

    if (error) {
      const rawMessage = String(error.message || '').toLowerCase()
      const rawCode = String(error.code || '').toLowerCase()
      const missingTable =
        rawCode === 'pgrst205' ||
        rawMessage.includes('feedback_entries') ||
        rawMessage.includes('not found') ||
        rawMessage.includes('relation')

      if (missingTable) {
        toast.error('Feedback DB table is missing. Please run supabase/schema.sql in Supabase SQL Editor.')
      } else {
        toast.error('Could not submit feedback. Please try again.')
      }
      setIsSubmitting(false)
      return
    }

    toast.success('Thanks for sharing your feedback with Seeker!')
    setRating(0)
    setCategory(CATEGORY_OPTIONS[0])
    setMessage('')
    setImprovement('')
    setRecommend(true)
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-paper text-ink relative overflow-hidden">
      <FloatingPaths position={2} className="opacity-40" />
      <SeekerNav />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 relative z-10">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[32px] border border-ink-10 bg-white/70 backdrop-blur-sm p-6 sm:p-8"
          >
            <p className="text-[11px] tracking-[0.24em] uppercase text-ink-40 font-black mb-2">Seeker Feedback</p>
            <h1 className="font-serif text-4xl sm:text-5xl leading-none mb-3">Tell Us What You Felt</h1>
            <p className="text-ink-60 text-sm sm:text-base mb-8 max-w-2xl">
              Your feedback helps us improve recommendations, quiz quality, and overall guidance quality for every learner.
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="text-[10px] font-black tracking-widest uppercase text-ink-40 block mb-3">Overall Rating</label>
                <div className="flex flex-wrap gap-3">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      type="button"
                      onClick={() => setRating(score)}
                      className={`group px-4 py-2.5 rounded-xl border transition-all ${
                        rating >= score
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-ink-10 text-ink-40 hover:border-ink-30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon name="grade" className={rating >= score ? 'text-accent' : 'text-ink-20 group-hover:text-ink-40'} />
                        <span className="text-sm font-bold">{score}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-xs text-ink-50 min-h-4">{rating ? RATING_COPY[rating] : 'Select a rating to continue.'}</p>
              </div>

              <div>
                <label className="text-[10px] font-black tracking-widest uppercase text-ink-40 block mb-3">Area</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORY_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setCategory(option)}
                      className={`px-3 py-2 text-xs font-bold uppercase tracking-wide rounded-full border transition-colors ${
                        category === option
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-ink-10 text-ink-50 hover:text-ink hover:border-ink-25'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black tracking-widest uppercase text-ink-40 block mb-2">Your Feedback</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  placeholder="What worked well, what felt confusing, and what you expected instead..."
                  className="w-full resize-none bg-paper border border-ink-10 px-4 py-4 rounded-2xl focus:outline-none focus:border-accent transition-colors"
                />
                <div className="mt-2 flex items-center justify-between text-xs text-ink-40">
                  <span>Minimum 20 characters</span>
                  <span>{message.trim().length} chars</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black tracking-widest uppercase text-ink-40 block mb-2">What Should We Improve? (Optional)</label>
                <textarea
                  value={improvement}
                  onChange={(e) => setImprovement(e.target.value)}
                  rows={4}
                  placeholder="Share one specific improvement you want next."
                  className="w-full resize-none bg-paper border border-ink-10 px-4 py-4 rounded-2xl focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] font-black tracking-widest uppercase text-ink-40 block mb-2">Would you recommend Seeker?</label>
                <div className="inline-flex rounded-xl border border-ink-10 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setRecommend(true)}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${recommend ? 'bg-ink text-paper' : 'bg-paper text-ink-50 hover:text-ink'}`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setRecommend(false)}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${!recommend ? 'bg-ink text-paper' : 'bg-paper text-ink-50 hover:text-ink'}`}
                  >
                    Not yet
                  </button>
                </div>
              </div>

              <SeekerButton type="submit" disabled={!canSubmit} className="w-full sm:w-auto px-8 py-4 text-sm">
                {isSubmitting ? 'Sending Feedback...' : 'Submit Feedback'}
              </SeekerButton>
            </form>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-[32px] border border-ink-10 bg-paper/90 p-6 sm:p-7 h-fit"
          >
            <h2 className="font-serif text-3xl mb-2">Share Seeker</h2>
            <p className="text-sm text-ink-50 mb-6">
              Help more students discover the right career path. Copy this ready-to-share message.
            </p>

            <div className="rounded-2xl border border-ink-10 bg-white/70 p-4 mb-5">
              <p className="text-sm text-ink-70 leading-relaxed whitespace-pre-line">{SHARE_COPY}</p>
            </div>

            <SeekerButton
              type="button"
              onClick={handleCopyShareText}
              className="w-full py-3 text-sm"
            >
              SHARE SEEKER
            </SeekerButton>

            <p className="text-xs text-ink-40 mt-3">Feedback submissions are stored in Supabase only for developer review.</p>
          </motion.aside>
        </div>
      </main>
    </div>
  )
}
