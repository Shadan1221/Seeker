# SEEKER — Production Bug Fix Prompt

## Context

Seeker is a full-stack React + Vite + Node.js/Express app deployed on:
- Frontend: Netlify at pathseeker.app
- Backend: Render at seeker-k9jg.onrender.com
- Database/Auth: Supabase
- AI: Groq API (llama-3.3-70b-versatile → llama-3.1-8b-instant → gemma2-9b-it)

There are exactly 4 bugs that work on localhost but are broken on the deployed production app.
Fix all 4. Do not change any code unrelated to these bugs.

---

## Bug 1 — Quiz Context Lost on Production (AI chat is blind to quiz answers)

### Symptom
On localhost, the AI in the CareerDrawer chat tab correctly says things like:
"I do know your quiz answers. I see you have a strong affinity for research, healthcare, law, content, and tech. You've shown a 67% match with this role."

On pathseeker.app, the same AI says:
"I don't have access to your quiz answers. Let's start fresh."

### Root Cause
`buildQuizContext()` in `client/src/components/career/CareerDrawer.jsx` reads from Zustand:
```js
const { quizCompleted, quizAnswers, customAnswers, skippedQuestions, careerScores } = store
if (!quizCompleted && Object.keys(quizAnswers).length === 0) return null
```

On production, when a user logs in, `useAuth.js` fetches their last quiz attempt from Supabase and calls `syncAuthData(profile, attempt)`. But `syncAuthData` in `useAppStore.js` sets `quizAnswers: attempt?.answers || {}` and `quizCompleted: !!attempt`. This part works.

The real problem is the ORDER of operations on first load:
1. Page loads → Zustand hydrates from localStorage (may be empty if different device/browser)
2. `onAuthStateChange` fires → fetches Supabase data → calls `syncAuthData`
3. But `CareerDrawer` already mounted and `DrawerChat` ran its `useEffect` which called `setContextCareer(career)` and `clearChat()` BEFORE step 2 completed
4. When user sends first message, `buildQuizContext` runs but `quizCompleted` is still false because `syncAuthData` hasn't finished yet

Additionally, `syncAuthData` in `useAppStore.js` needs to correctly map the Supabase quiz attempt structure. The Supabase `quiz_attempts` table stores `answers` and `custom_answers` as jsonb columns, and `scores` as jsonb. But `syncAuthData` receives the raw Supabase row which has `answers`, `custom_answers`, `scores` — it must map these correctly.

### Fix

**File: `client/src/store/useAppStore.js`**

Update `syncAuthData` to correctly handle the Supabase quiz attempt row and also set `careerScores`:

```js
syncAuthData: (profile, attempt) => set({
  profile: profile || null,
  quizAnswers: attempt?.answers || {},
  customAnswers: attempt?.custom_answers || {},
  skippedQuestions: attempt?.skipped_questions || [],
  recommendedCareers: attempt?.scores || [],
  careerScores: attempt?.scores || [],
  quizCompleted: !!attempt,
  isMinimalData: false,
  authLoading: false
}),
```

**File: `client/src/hooks/useAuth.js`**

Ensure the quiz attempt fetch includes all necessary columns:
```js
const quizRes = await supabase
  .from('quiz_attempts')
  .select('answers, custom_answers, skipped_questions, scores, taken_at')
  .eq('user_id', sessionUser.id)
  .order('taken_at', { ascending: false })
  .limit(1)
  .maybeSingle()
```

**File: `client/src/components/career/CareerDrawer.jsx`**

In the `DrawerChat` component, the `useEffect` that clears chat runs when `career?.id` changes. Add `authLoading` as a dependency guard so the chat context is not set until auth is fully resolved:

```js
// Add this import at top of DrawerChat component
const authLoading = useAppStore(s => s.authLoading)

// Modify the useEffect:
useEffect(() => {
  // Wait for auth to finish loading before setting context
  // This ensures quizAnswers are loaded from Supabase first
  if (authLoading) return
  clearChat()
  if (career) {
    setContextCareer(career)
  }
}, [career?.id, authLoading, clearChat, setContextCareer])
```

Also update the `onSubmit` in `DrawerChat` to read fresh store state at call time (not stale closure):

```js
const onSubmit = (e) => {
  e.preventDefault()
  if (!text.trim() || chatLoading) return
  // Read fresh store state at send time, not from stale closure
  const freshStore = useAppStore.getState()
  const quizContext = buildQuizContext(career, freshStore)
  sendMessage(text, quizContext)
  setText('')
}
```

**File: `supabase/schema.sql`**

Add `skipped_questions` column to the quiz_attempts table if it doesn't exist:
```sql
ALTER TABLE public.quiz_attempts 
ADD COLUMN IF NOT EXISTS skipped_questions jsonb DEFAULT '[]'::jsonb;
```

---

## Bug 2 — `/api/quiz/interpret-answer` Returns 404 on Production

### Symptom
On pathseeker.app/quiz, when a user types a custom answer and submits, a toast error appears:
"Route not found: POST /api/quiz/interpret-answer"

The browser console shows:
`Failed to load resource: the server responded with a status of 404` for `seeker-k9jg.onrender.com/api/quiz/interpret-answer`

The same feature works perfectly on localhost:5173.

### Root Cause
Two issues:

**Issue A:** Render auto-deploys only when the main branch is pushed. The quiz interpret-answer route was added locally but the Render deployment is running stale code. This needs a redeploy trigger.

**Issue B (code fix needed):** In `server/src/routes/quiz.routes.js`, there are duplicate route registrations:
```js
router.post('/interpret-answer', interpretLimit, interpretCustomAnswer)
router.post('/interpret', interpretLimit, interpretCustomAnswer)
router.post('/interpret_answer', interpretLimit, interpretCustomAnswer)
```

Having all three is unnecessary and can cause confusion. Keep only `/interpret-answer` since that's what the client calls. Remove the other two.

**Issue C:** In `server/src/routes/index.js`, verify that the quiz router is properly imported and mounted. It should already be there but confirm:
```js
import quizRouter from './quiz.routes.js'
router.use('/quiz', quizRouter)
```

**Issue D:** The `server/src/controllers/quiz.controller.js` imports `interpretAnswerWithAI` from `../services/quiz.service.js`. Verify this file exists at exactly that path on the deployed server.

### Fix

**File: `server/src/routes/quiz.routes.js`**

Clean up to have only the routes that are actually needed. Remove duplicate registrations:

```js
import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { getQuiz, scoreQuiz, interpretCustomAnswer } from '../controllers/quiz.controller.js'

const router = Router()

const interpretLimit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  message: { error: 'Too many custom answers. Please wait a moment or use the standard options.' }
})

router.get('/', getQuiz)
router.post('/score', scoreQuiz)
router.post('/interpret-answer', interpretLimit, interpretCustomAnswer)

export default router
```

**File: `server/src/controllers/quiz.controller.js`**

Add explicit error logging to help debug if this route is still failing after redeploy:

```js
export async function interpretCustomAnswer(req, res, next) {
  try {
    const { questionId, questionText, customAnswer } = req.body

    if (!questionId || !questionText || !customAnswer) {
      return res.status(400).json({ error: 'questionId, questionText, and customAnswer are required' })
    }

    if (customAnswer.trim().length < 10) {
      return res.status(400).json({ error: 'Answer is too short to analyse meaningfully' })
    }

    const result = await interpretAnswerWithAI(questionId, questionText, customAnswer)
    res.json(result)
  } catch (err) {
    console.error('[interpret-answer] Error:', err.message)
    next(err)
  }
}
```

**File: `server/src/index.js`**

Add a visible log line when the server starts so you can confirm the deployed version is the new one:

```js
app.listen(config.port, () => {
  console.log(`Seeker server v2 running on port ${config.port}`)
  console.log(`Environment: ${config.nodeEnv}`)
  console.log(`Routes: /api/quiz/interpret-answer is registered`)
})
```

**IMPORTANT — After making these changes:**
Commit and push to the main branch. Then in the Render dashboard, manually trigger a redeploy if it doesn't auto-deploy. Wait for the build to succeed and check the Render logs for the startup message above confirming the new version is live.

---

## Bug 3 — Passive Event Listener Warnings Flooding Console

### Symptom
Browser console on pathseeker.app/paths shows hundreds of:
`Unable to preventDefault inside passive event listener invocation.`

These come from `react-vendor` chunk, indicating they are inside React's event system.

### Root Cause
In `client/src/screens/PathMap.jsx`, the wheel zoom handler is attached via JSX:
```jsx
<div onWheel={onWheel} ...>
```

React 17+ attaches wheel (and touch) event listeners as **passive** by default for performance. This means `e.preventDefault()` inside `onWheel` is silently blocked, and the browser logs a warning for every single scroll event. On pathseeker.app the map container is a fixed full-screen div so scroll events are constant.

Additionally, `e.preventDefault()` being blocked means the page ALSO scrolls while trying to zoom — bad UX.

### Fix

**File: `client/src/screens/PathMap.jsx`**

Remove the `onWheel` JSX prop from the div entirely. Instead, attach the event listener imperatively using a `useRef` with `passive: false`.

Find the container div that currently has `onWheel={onWheel}` and add a ref to it:

```jsx
const mapContainerRef = useRef(null)
```

Replace the JSX prop approach with a `useEffect`:

```js
useEffect(() => {
  const container = mapContainerRef.current
  if (!container) return

  const handleWheel = (e) => {
    e.preventDefault()
    handleZoom(e.deltaY > 0 ? -0.1 : 0.1)
  }

  // Must use passive: false to allow preventDefault
  container.addEventListener('wheel', handleWheel, { passive: false })
  return () => container.removeEventListener('wheel', handleWheel)
}, []) // Empty deps — handleZoom uses setZoom (stable setter), no re-registration needed
```

Add `ref={mapContainerRef}` to the container div and remove `onWheel={onWheel}` from it.

The original `onWheel` function definition and the `onPan`/`startPan`/`endPan` functions stay as they are — only the wheel attachment changes.

Also note: the `handleZoom` function referenced in the useEffect should use the functional updater form to avoid stale closure:

```js
const handleZoom = useCallback((delta) => {
  setZoom(prev => Math.min(Math.max(prev + delta, 0.4), 3))
}, [])
```

---

## Bug 4 — Compare Feature Fires Multiple Requests and Floods Error Toasts

### Symptom
On pathseeker.app/paths, when using the Compare Paths feature, the screen floods with 9-10 "Could not generate comparison. Please try again." error toasts simultaneously, stacking vertically.

### Root Cause
Three problems working together:

**Problem A — No loading guard on the Compare button:**
In `client/src/screens/PathMap.jsx`, the `handleRunComparison` function is called on button click. But there is no check preventing it from being called while a previous request is in flight. If the user clicks twice, or if React re-renders cause multiple event fires, it fires multiple simultaneous API calls.

**Problem B — Groq AI failure causes 500 on production:**
The comparison route calls `getComparisonExplanation()` which calls Groq. On production, if Groq returns an error (rate limit, timeout, or malformed JSON response), the `catch` block in `comparison.service.js` is supposed to return a safe fallback. But if Groq returns a valid but non-JSON response, `JSON.parse(clean)` throws, the catch runs — BUT if the catch itself throws (e.g. `careerA.scope` is undefined), it propagates as a 500, and the client toast fires.

**Problem C — The fallback object accesses potentially undefined career fields:**
```js
} catch {
  return {
    summary: `Both ${careerA.title} and ${careerB.title} are strong career paths...`,
    pathA: {
      strongestAdvantage: careerA.scope || 'Strong long-term prospects',  // scope can be undefined
      biggestRisk: careerA.hurdles?.items?.[0]?.title || 'Requires sustained commitment'
    },
    ...
  }
}
```

### Fix

**File: `client/src/screens/PathMap.jsx`**

Add a ref-based lock to prevent multiple simultaneous compare calls, and also verify `compareLoading` state is checked:

```js
const compareInFlight = useRef(false)

const handleRunComparison = async () => {
  if (compareSelections.length !== 2) return
  if (compareInFlight.current) return  // Prevent double-fire
  
  compareInFlight.current = true
  setCompareLoading(true)
  try {
    const result = await compareCareers(compareSelections[0], compareSelections[1])
    setCompareResult(result)
  } catch (err) {
    console.error('[compare]', err)
    toast.error('Could not generate comparison. Please try again.', { id: 'compare-error' })
    // Using id: 'compare-error' deduplicates — only one toast shows no matter how many calls fail
  } finally {
    setCompareLoading(false)
    compareInFlight.current = false
  }
}
```

The key addition is `{ id: 'compare-error' }` in the toast call. React Hot Toast deduplicates toasts with the same `id` — so no matter how many times the error fires, only ONE toast appears.

Also update the Compare button JSX to be properly disabled during loading:

```jsx
<button
  onClick={handleRunComparison}
  disabled={compareLoading || compareSelections.length !== 2}
  className="bg-accent text-white text-sm font-bold px-6 py-2.5 rounded-xl
             hover:bg-[#D44E25] transition-all shadow-lg active:scale-95 
             disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
>
  {compareLoading ? (
    <span className="flex items-center gap-2">
      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
      </svg>
      Comparing...
    </span>
  ) : 'Compare →'}
</button>
```

**File: `server/src/services/comparison.service.js`**

Make the fallback object completely safe — wrap every field access with null coalescing:

```js
} catch (err) {
  console.error('[comparison.service] AI explanation failed, using fallback:', err.message)
  return {
    summary: `Both ${careerA?.title || 'Path A'} and ${careerB?.title || 'Path B'} are strong career paths in India with different trade-offs worth understanding.`,
    pathA: {
      bestFor: `Students drawn to ${careerA?.category || 'this field'} who are comfortable with sustained commitment`,
      strongestAdvantage: careerA?.scope || 'Strong long-term prospects in India',
      biggestRisk: careerA?.hurdles?.items?.[0]?.title || 'Requires sustained commitment over several years'
    },
    pathB: {
      bestFor: `Students drawn to ${careerB?.category || 'this field'} who are comfortable with sustained commitment`,
      strongestAdvantage: careerB?.scope || 'Strong long-term prospects in India',
      biggestRisk: careerB?.hurdles?.items?.[0]?.title || 'Requires sustained commitment over several years'
    },
    verdict: 'Both paths reward commitment and have strong demand in India. The right choice depends on your natural inclinations, not just the salary figures.',
    reflectionQuestion: 'Which of these two paths would you choose if both paid exactly the same salary?'
  }
}
```

Also add a timeout to the Groq call inside `getChatResponse` so a slow Groq response doesn't hang the comparison request indefinitely on production:

**File: `server/src/services/openrouter.service.js`**

Wrap the fetch call with a timeout:

```js
async function callGroq(model, messages) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 25000) // 25 second timeout

  try {
    const response = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
      signal: controller.signal
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Groq API error: ${error.error?.message || response.statusText}`)
    }

    const data = await response.json()
    const reply = data?.choices?.[0]?.message?.content
    if (!reply) throw new Error('Empty response from Groq')
    return reply
  } finally {
    clearTimeout(timeout)
  }
}
```

---

## Summary of All Files to Modify

```
client/src/store/useAppStore.js          — Bug 1: fix syncAuthData mapping
client/src/hooks/useAuth.js             — Bug 1: add skipped_questions to quiz fetch
client/src/components/career/CareerDrawer.jsx — Bug 1: authLoading guard + fresh store read
server/src/routes/quiz.routes.js        — Bug 2: remove duplicate route registrations
server/src/controllers/quiz.controller.js — Bug 2: add error logging
server/src/index.js                     — Bug 2: add startup log for deploy confirmation
client/src/screens/PathMap.jsx          — Bug 3 + Bug 4: passive wheel fix + compare lock
server/src/services/comparison.service.js — Bug 4: safe fallback + better error logging
server/src/services/openrouter.service.js — Bug 4: add 25s timeout to Groq fetch
supabase/schema.sql                     — Bug 1: add skipped_questions column
```

---

## Testing Checklist After Fixes

After deploying, verify each fix:

**Bug 1 — Quiz context:**
1. Log in to pathseeker.app
2. Complete the quiz if not done, then go to /paths
3. Click any career → go to Chat tab
4. Ask "do you know my quiz answers?"
5. Expected: AI references your actual quiz signals and match percentage

**Bug 2 — Interpret answer:**
1. Go to pathseeker.app/quiz
2. On any question, click "Describe in your own words"
3. Type at least 10 characters and click Confirm
4. Expected: Green toast "Got it — [interpretation]" appears, no 404 error

**Bug 3 — Passive events:**
1. Go to pathseeker.app/paths
2. Open browser DevTools console
3. Scroll/zoom on the path map
4. Expected: Zero "Unable to preventDefault" warnings in console

**Bug 4 — Compare:**
1. Go to pathseeker.app/paths
2. Click "Compare Paths"
3. Select two careers
4. Click "Compare →"
5. Expected: Button shows spinner, only ONE loading state, comparison result appears
6. If Groq fails: only ONE error toast appears, not multiple

---

## Important Notes

1. After pushing code changes to the main branch, Render will auto-deploy the server. Wait for the Render build to complete (check Render dashboard) before testing Bug 2 and Bug 4 server-side fixes.

2. The passive event listener fix (Bug 3) only requires a frontend deploy — Netlify will auto-build when you push.

3. For the Supabase schema change (adding `skipped_questions` column), run the ALTER TABLE statement in the Supabase SQL Editor. It uses `ADD COLUMN IF NOT EXISTS` so it's safe to run even if the column exists.

4. Do not change the Groq model list or API key. Do not change any Tailwind classes or design tokens. Do not refactor any code beyond the specific fixes described above.