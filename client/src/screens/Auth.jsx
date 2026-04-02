import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import useAppStore from '../store/useAppStore'
import FloatingPaths from '../components/layout/FloatingPaths'
import Icon from '../components/ui/Icon'
import SeekerButton from '../components/ui/SeekerButton'

const DEGREES = [
  { category: 'Undergraduate', options: ['B.Tech (Computer Science)', 'B.Tech (Electronics & Communication)', 'B.Tech (Mechanical Engineering)', 'B.Tech (Civil Engineering)', 'B.Tech (Electrical Engineering)', 'B.Tech (Chemical Engineering)', 'B.Tech (Aerospace Engineering)', 'B.Tech (Biotechnology)', 'B.Tech (Information Technology)', 'B.E. (Computer Engineering)', 'BCA (Bachelor of Computer Applications)', 'B.Sc (Computer Science)', 'B.Sc (Physics)', 'B.Sc (Chemistry)', 'B.Sc (Mathematics)', 'B.Sc (Biology)', 'B.Sc (Biotechnology)', 'B.Sc (Nursing)', 'MBBS', 'BDS (Dental)', 'BAMS (Ayurvedic Medicine)', 'BHMS (Homeopathic Medicine)', 'B.Pharm', 'B.Arch', 'B.Des (Design)', 'BFA (Fine Arts)', 'BA (History)', 'BA (Political Science)', 'BA (Economics)', 'BA (Sociology)', 'BA (Psychology)', 'BA (English Literature)', 'BA (Hindi Literature)', 'BA (Journalism & Mass Communication)', 'BJMC (Bachelor of Journalism)', 'B.Com (General)', 'B.Com (Honours)', 'BBA (Business Administration)', 'LLB (Law)', 'BA LLB (Integrated)', 'BBA LLB (Integrated)', 'B.Ed (Education)', 'BPES (Physical Education)', 'BHM (Hotel Management)', 'BSc (Culinary Arts)'] },
  { category: 'Postgraduate', options: ['M.Tech (Computer Science)', 'M.Tech (AI & Machine Learning)', 'M.Tech (VLSI Design)', 'MCA (Computer Applications)', 'M.Sc (Computer Science)', 'M.Sc (Data Science)', 'M.Sc (Physics)', 'M.Sc (Chemistry)', 'M.Sc (Mathematics)', 'M.Sc (Biotechnology)', 'MBA (General Management)', 'MBA (Finance)', 'MBA (Marketing)', 'MBA (Human Resources)', 'MBA (Operations)', 'MBA (Healthcare Management)', 'MA (Economics)', 'MA (Psychology)', 'MA (English Literature)', 'MA (Mass Communication)', 'MA (Social Work)', 'MSW (Social Work)', 'LLM (Law)', 'M.Arch', 'M.Des (Design)', 'MD (Medicine)', 'MS (Surgery)', 'M.Pharm', 'M.Ed (Education)'] },
  { category: 'Diploma & Certificate', options: ['Diploma (Computer Science)', 'Diploma (Mechanical Engineering)', 'Diploma (Civil Engineering)', 'Diploma (Electronics)', 'Diploma (Fashion Design)', 'Diploma (Hotel Management)', 'Polytechnic Diploma', 'ITI (Industrial Training)'] },
  { category: 'Doctoral', options: ['Ph.D (Computer Science)', 'Ph.D (Engineering)', 'Ph.D (Sciences)', 'Ph.D (Humanities)', 'Ph.D (Management)', 'Ph.D (Medicine)'] }
]

const CLASSES = [
  'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
  'Class 11 (Science PCM)', 'Class 11 (Science PCB)', 'Class 11 (Commerce)', 'Class 11 (Arts)',
  'Class 12 (Science PCM)', 'Class 12 (Science PCB)', 'Class 12 (Commerce)', 'Class 12 (Arts)'
]

const ROLES = [
  { id: 'student', label: 'Student', icon: 'school' },
  { id: 'teacher', label: 'Teacher', icon: 'person' },
  { id: 'career_counsellor', label: 'Career Counsellor', icon: 'support_agent' }
]

const SUPABASE_ERRORS = {
  'invalid_credentials': "That email or password isn't right. Please try again.",
  'email_already_exists': "This email is already registered. Try signing in instead.",
  'phone_already_exists': "This number is already registered. Try signing in instead.",
  'weak_password': "Password must be at least 8 characters with one number.",
  'invalid_email': "Please enter a valid email address.",
  'signup_disabled': "Sign up is currently unavailable. Please try again later.",
  'over_request_rate_limit': "Too many attempts. Please wait a minute and try again.",
  'network_error': "Could not connect. Please check your internet connection.",
}

const debounce = (fn, delay) => {
  let timeoutId
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

export default function Auth() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const mode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin'
  const step = parseInt(searchParams.get('step')) || 1
  const { 
    signInWithEmail, 
    signInWithPhone, 
    signInWithGoogle, 
    signUp, 
    saveProfile, 
    user, 
    profile,
    loading: authLoading
  } = useAuth()
  const quizCompleted = useAppStore(s => s.quizCompleted)

  const [activeTab, setActiveTab] = useState('email')
  const [formLoading, setFormLoading] = useState(false)
  const [error, setError] = useState('')
  const [welcomeMode, setWelcomeMode] = useState(false)

  // Form states
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    username: '',
    age: '',
    role: '',
    institutionType: '',
    institutionName: '',
    schoolClass: '',
    degree: ''
  })

  const [usernameAvailable, setUsernameAvailable] = useState(null)
  const [checkingUsername, setCheckingUsername] = useState(false)
  const usernameCheckRequestId = useRef(0)
  const usernameCheckCacheRef = useRef(new Map())
  const usernameCheckDisabledRef = useRef(false)

  // Redirect if already authenticated and profile is complete
  useEffect(() => {
    // Wait until auth bootstrap is complete so quiz/profile state is accurate.
    if (!authLoading && user && profile && !welcomeMode) {
      navigate(quizCompleted ? '/paths' : '/quiz')
    }
  }, [user, profile, navigate, quizCompleted, welcomeMode, authLoading])

  // Handle step 2 from URL
  useEffect(() => {
    if (user && !profile && step !== 2) {
      setSearchParams({ mode: 'signup', step: 2 })
    }
  }, [user, profile, step, setSearchParams])

  const checkUsername = useCallback(debounce(async (username) => {
    const requestId = ++usernameCheckRequestId.current

    if (username.length < 3) {
      setCheckingUsername(false)
      setUsernameAvailable(null)
      return
    }

    if (usernameCheckDisabledRef.current) {
      setCheckingUsername(false)
      setUsernameAvailable(true)
      return
    }

    if (usernameCheckCacheRef.current.has(username)) {
      setCheckingUsername(false)
      setUsernameAvailable(usernameCheckCacheRef.current.get(username))
      return
    }

    setCheckingUsername(true)
    try {
      const result = await Promise.race([
        supabase
          .from('profiles')
          .select('username')
          .eq('username', username)
          .limit(1)
          .maybeSingle(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('username-check-timeout')), 1800))
      ])

      if (requestId !== usernameCheckRequestId.current) return

      const { data, error } = result

      // If the check endpoint is unavailable, do not hard-block setup.
      if (error) {
        const message = String(error.message || '').toLowerCase()
        if (message.includes('permission') || message.includes('policy') || message.includes('not authorized') || message.includes('rls')) {
          usernameCheckDisabledRef.current = true
          setUsernameAvailable(true)
          return
        }
        setUsernameAvailable(null)
        return
      }

      const isAvailable = !data
      usernameCheckCacheRef.current.set(username, isAvailable)
      setUsernameAvailable(isAvailable)
    } catch (err) {
      if (requestId !== usernameCheckRequestId.current) return
      setUsernameAvailable(null)
    } finally {
      if (requestId === usernameCheckRequestId.current) {
        setCheckingUsername(false)
      }
    }
  }, 250), [])

  useEffect(() => {
    if (formData.username) {
      checkUsername(formData.username)
    } else {
      setCheckingUsername(false)
      setUsernameAvailable(null)
    }
  }, [formData.username, checkUsername])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'username') {
      const filteredValue = value.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase()
      setFormData(prev => ({ ...prev, [name]: filteredValue }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    setError('')
  }

  const validateStep1 = () => {
    if (activeTab === 'email') {
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        setError('Please enter a valid email address.')
        return false
      }
      if (formData.password.length < 8 || !/\d/.test(formData.password)) {
        setError('Password must be at least 8 characters with one number.')
        return false
      }
      if (mode === 'signup' && formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.')
        return false
      }
    } else if (activeTab === 'phone') {
      if (!formData.phone.match(/^[6-9]\d{9}$/)) {
        setError('Please enter a valid Indian mobile number (10 digits).')
        return false
      }
      if (formData.password.length < 8 || !/\d/.test(formData.password)) {
        setError('Password must be at least 8 characters with one number.')
        return false
      }
      if (mode === 'signup' && formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.')
        return false
      }
    }
    return true
  }

  const handleAuth = async (e) => {
    e.preventDefault()
    if (!validateStep1()) return

    setFormLoading(true)
    let res
    if (mode === 'signin') {
      if (activeTab === 'email') res = await signInWithEmail(formData.email, formData.password)
      else if (activeTab === 'phone') res = await signInWithPhone(formData.phone, formData.password)
    } else {
      const identifier = activeTab === 'email' ? formData.email : formData.phone
      res = await signUp(identifier, formData.password, activeTab)
      if (!res.error) {
        setSearchParams({ mode: 'signup', step: 2 })
      }
    }

    if (res?.error) {
      setError(SUPABASE_ERRORS[res.error.code] || SUPABASE_ERRORS[res.error.message] || 'Something went wrong. Please try again.')
    }
    setFormLoading(false)
  }

  const handleGoogleAuth = async () => {
    setFormLoading(true)
    const { error } = await signInWithGoogle()
    if (error) {
      const raw = `${error.code || ''} ${error.message || ''}`.toLowerCase()
      if (raw.includes('unsupported provider') || raw.includes('provider is not enabled')) {
        setError('Google sign-in is not enabled yet. Please enable Google provider in Supabase Authentication settings.')
      } else {
        setError(error.message)
      }
    }
    setFormLoading(false)
  }

  const handleProfileComplete = async (e) => {
    e.preventDefault()
    if (formData.username.length < 3 || usernameAvailable === false || !formData.age || !formData.role || !formData.institutionType) return
    
    if (formData.institutionType === 'school' && !formData.schoolClass) return
    if (formData.institutionType === 'university' && !formData.degree) return

    setFormLoading(true)
    const profileData = {
      username: formData.username,
      age: parseInt(formData.age),
      role: formData.role,
      institution_type: formData.institutionType,
      institution_name: formData.institutionName || null,
      school_class: formData.institutionType === 'school' ? formData.schoolClass : null,
      degree: formData.institutionType === 'university' ? formData.degree : null
    }

    const { error } = await saveProfile(profileData)
    if (error) {
      setError(error.message)
      setFormLoading(false)
    } else {
      setWelcomeMode(true)
      setTimeout(() => {
        navigate('/welcome')
      }, 1500)
    }
  }

  const switchMode = (newMode) => {
    setSearchParams({ mode: newMode })
    setError('')
  }

  const getPasswordStrength = () => {
    let score = 0
    if (formData.password.length >= 8) score++
    if (/\d/.test(formData.password)) score++
    if (/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) score++
    if (formData.password.length >= 12) score++
    return score
  }

  if (welcomeMode) {
    return (
      <div className="fixed inset-0 bg-paper z-[100] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.h1 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="font-serif text-5xl text-ink mb-4"
          >
            Welcome to Seeker
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-ink-60 tracking-widest uppercase text-sm"
          >
            Beginning your discovery...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-paper text-ink selection:bg-accent-20 overflow-hidden">
      <FloatingPaths position={1} className="opacity-30 pointer-events-none" />

      <div className="max-w-md mx-auto pt-16 pb-12 px-6 relative z-10">
        <header className="mb-12">
          <div className="flex items-end gap-2 mb-8">
            <h1 className="font-serif text-[5rem] leading-none tracking-tight text-ink">Seeker</h1>
            <span className="inline-block w-5 h-5 rounded-full bg-accent shadow-[0_0_24px_rgba(232,87,42,0.45)] mb-2" />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={mode + (step === 2 ? 'step2' : 'step1')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {mode === 'signin' ? (
                <div>
                  <h2 className="text-[2.1rem] font-bold tracking-tight">Sign in to your account</h2>
                  <p className="text-ink-60 mt-1 text-lg">Welcome back! Please enter your details.</p>
                </div>
              ) : step === 1 ? (
                <div>
                  <h2 className="text-[2.1rem] font-bold tracking-tight">Create your account</h2>
                  <p className="text-ink-60 mt-1 text-lg">Start your Seeker journey in under a minute.</p>
                </div>
              ) : (
                <div>
                  <h2 className="text-[28px] font-serif">Tell us about yourself</h2>
                  <p className="text-ink-60 mt-1">We'll personalise your experience</p>
                  <div className="flex gap-2 mt-6">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <div className="w-2 h-2 rounded-full bg-accent/20" />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </header>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => { setActiveTab('email'); setError('') }}
                  className={`flex-1 py-2.5 border text-xs font-bold tracking-widest uppercase transition-colors ${
                    activeTab === 'email' ? 'border-accent text-accent bg-accent/5' : 'border-ink-10 text-ink-40 hover:text-ink-70'
                  }`}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('phone'); setError('') }}
                  className={`flex-1 py-2.5 border text-xs font-bold tracking-widest uppercase transition-colors ${
                    activeTab === 'phone' ? 'border-accent text-accent bg-accent/5' : 'border-ink-10 text-ink-40 hover:text-ink-70'
                  }`}
                >
                  Phone
                </button>
              </div>

              <form onSubmit={handleAuth} className="space-y-5">
                {activeTab === 'email' ? (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest uppercase text-ink-40">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      required
                      className="w-full bg-white/55 border border-ink-10 px-5 py-4 text-lg focus:border-accent transition-colors outline-none"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest uppercase text-ink-40">Phone</label>
                    <div className="flex">
                      <div className="bg-white/55 border border-r-0 border-ink-10 px-4 py-4 text-ink-50">+91</div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="9876543210"
                        required
                        maxLength={10}
                        className="w-full bg-white/55 border border-ink-10 px-5 py-4 text-lg focus:border-accent transition-colors outline-none"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black tracking-widest uppercase text-ink-40">Password</label>
                    {mode === 'signin' && (
                      <button type="button" className="text-ink-50 text-sm hover:text-accent transition-colors">Forgot?</button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white/55 border border-ink-10 px-5 py-4 text-lg focus:border-accent transition-colors outline-none"
                    />
                    {mode === 'signup' && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                        {[1, 2, 3, 4].map(i => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${i <= getPasswordStrength() ? 'bg-accent' : 'bg-ink-10'}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {mode === 'signup' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest uppercase text-ink-40">Confirm Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/55 border border-ink-10 px-5 py-4 text-lg focus:border-accent transition-colors outline-none"
                      />
                      {formData.confirmPassword && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          {formData.password === formData.confirmPassword ? (
                            <Icon name="check_circle" className="text-green-600 !text-lg" />
                          ) : (
                            <Icon name="cancel" className="text-accent !text-lg" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <SeekerButton
                  type="submit"
                  disabled={formLoading}
                  className="w-full py-5 text-sm"
                >
                  {formLoading ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                      <Icon name="progress_activity" className="!text-lg" />
                    </motion.div>
                  ) : (
                    mode === 'signin' ? 'Sign in' : 'Create account'
                  )}
                </SeekerButton>
              </form>

              <div className="flex items-center gap-4">
                <div className="h-px bg-ink-10 flex-1" />
                <span className="text-xs text-ink-40 tracking-widest uppercase">OR</span>
                <div className="h-px bg-ink-10 flex-1" />
              </div>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => { setActiveTab('phone'); setError('') }}
                  className="w-full border-2 border-ink-15 bg-white/75 hover:bg-white transition-colors px-5 py-4 rounded-xl text-lg font-medium flex items-center justify-center gap-3"
                >
                  <Icon name="phone_iphone" size={22} />
                  {activeTab === 'phone' ? 'Using Phone Number' : 'Continue with Phone'}
                </button>
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={formLoading}
                  className="w-full border-2 border-ink-15 bg-white/75 hover:bg-white transition-colors px-5 py-4 rounded-xl text-lg font-medium flex items-center justify-center gap-3 disabled:opacity-60"
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                  Continue with Google
                </button>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0, x: [0, -8, 8, -8, 8, 0] }}
                  className="text-accent text-xs mt-2"
                >
                  {error}
                </motion.p>
              )}

              <div className="pt-4 text-center">
                {mode === 'signin' ? (
                  <p className="text-sm text-ink-40">
                    Don't have an account?{' '}
                    <button onClick={() => switchMode('signup')} className="text-accent font-bold hover:underline">
                      Begin Discovery
                    </button>
                  </p>
                ) : (
                  <p className="text-sm text-ink-40">
                    Already have an account?{' '}
                    <button onClick={() => switchMode('signin')} className="text-accent font-bold hover:underline">
                      Sign in
                    </button>
                  </p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <form onSubmit={handleProfileComplete} className="space-y-6">
                {/* Username */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black tracking-widest uppercase text-ink-30">Username</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. wanderer_42"
                      className="w-full bg-white/50 border border-ink-10 px-5 py-4 focus:border-accent transition-colors outline-none"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      {checkingUsername ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                          <Icon name="progress_activity" className="text-ink-30 !text-lg" />
                        </motion.div>
                      ) : formData.username.length >= 3 && (
                        usernameAvailable ? (
                          <Icon name="check_circle" className="text-green-600 !text-lg" />
                        ) : (
                          <Icon name="cancel" className="text-accent !text-lg" />
                        )
                      )}
                    </div>
                  </div>
                  <p className="text-[10px] text-ink-40 uppercase tracking-wider mt-1">
                    This is how you'll appear on Seeker
                  </p>
                </div>

                {/* Age */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black tracking-widest uppercase text-ink-30">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="10"
                    max="60"
                    required
                    className="w-full bg-white/50 border border-ink-10 px-5 py-4 focus:border-accent transition-colors outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>

                {/* Role Selector */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black tracking-widest uppercase text-ink-30">I am a...</label>
                  <CustomDropdown
                    options={ROLES}
                    value={formData.role}
                    onChange={(val) => handleInputChange({ target: { name: 'role', value: val } })}
                    placeholder="Select your role"
                  />
                </div>

                {/* Institution Type (Conditional) */}
                <AnimatePresence>
                  {(formData.role === 'student' || formData.role === 'teacher') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 overflow-hidden"
                    >
                      <label className="text-[10px] font-black tracking-widest uppercase text-ink-30">Institution Type</label>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { id: 'school', label: 'School', icon: 'domain' },
                          { id: 'university', label: 'University / College', icon: 'account_balance' }
                        ].map(type => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => handleInputChange({ target: { name: 'institutionType', value: type.id } })}
                            className={`p-4 flex flex-col items-center gap-3 border transition-all ${
                              formData.institutionType === type.id 
                              ? 'border-accent bg-accent/5 scale-[1.02]' 
                              : 'border-ink-10 bg-white/50 hover:border-ink-20'
                            }`}
                          >
                            <Icon name={type.icon} className={formData.institutionType === type.id ? 'text-accent' : 'text-ink-40'} />
                            <span className={`text-xs font-bold uppercase tracking-wider ${formData.institutionType === type.id ? 'text-accent' : 'text-ink-60'}`}>
                              {type.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* School Class (Conditional) */}
                <AnimatePresence>
                  {formData.institutionType === 'school' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-1 overflow-visible"
                    >
                      <label className="text-[10px] font-black tracking-widest uppercase text-ink-30">Which class are you in?</label>
                      <CustomDropdown
                        options={CLASSES}
                        value={formData.schoolClass}
                        onChange={(val) => handleInputChange({ target: { name: 'schoolClass', value: val } })}
                        placeholder="Select Class"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Degree (Conditional) */}
                <AnimatePresence>
                  {formData.institutionType === 'university' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-1 overflow-visible"
                    >
                      <label className="text-[10px] font-black tracking-widest uppercase text-ink-30">What are you studying?</label>
                      <DegreeDropdown
                        value={formData.degree}
                        onChange={(val) => handleInputChange({ target: { name: 'degree', value: val } })}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Institution Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black tracking-widest uppercase text-ink-30">Institution Name (Optional)</label>
                  <input
                    type="text"
                    name="institutionName"
                    value={formData.institutionName}
                    onChange={handleInputChange}
                    placeholder="Name of your school or college"
                    className="w-full bg-white/50 border border-ink-10 px-5 py-4 focus:border-accent transition-colors outline-none"
                  />
                </div>

                <SeekerButton
                  type="submit"
                  disabled={
                    formLoading || 
                    formData.username.length < 3 ||
                    usernameAvailable === false ||
                    !formData.age || 
                    !formData.role || 
                    !formData.institutionType || 
                    (formData.institutionType === 'school' && !formData.schoolClass) || 
                    (formData.institutionType === 'university' && !formData.degree)
                  }
                  className="w-full py-5 text-sm"
                >
                  {formLoading ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                      <Icon name="progress_activity" className="!text-lg" />
                    </motion.div>
                  ) : (
                    'Complete Setup'
                  )}
                </SeekerButton>

                {error && <p className="text-accent text-xs text-center">{error}</p>}
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function CustomDropdown({ options, value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/50 border border-ink-10 px-5 py-4 text-left flex justify-between items-center focus:border-accent outline-none"
      >
        <span className={value ? 'text-ink' : 'text-ink-40'}>
          {typeof options[0] === 'string' 
            ? (value || placeholder) 
            : (options.find(o => o.id === value)?.label || placeholder)}
        </span>
        <Icon name={isOpen ? 'expand_less' : 'expand_more'} className="text-ink-30" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          className="absolute z-50 w-full mt-1 bg-paper border border-ink-10 max-h-60 overflow-y-auto rounded-none shadow-xl"
          >            {options.map((option, i) => {
              const id = typeof option === 'string' ? option : option.id
              const label = typeof option === 'string' ? option : option.label
              const icon = typeof option === 'string' ? null : option.icon

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => { onChange(id); setIsOpen(false); }}
                  className={`w-full text-left py-3 px-5 text-sm flex items-center gap-3 transition-colors ${
                    value === id ? 'text-accent font-bold bg-accent/5' : 'hover:bg-surface'
                  }`}
                >
                  {icon && <Icon name={icon} className="!text-lg" />}
                  {label}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DegreeDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const dropdownRef = useRef(null)

  const filteredDegrees = DEGREES.map(cat => ({
    ...cat,
    options: cat.options.filter(opt => opt.toLowerCase().includes(search.toLowerCase()))
  })).filter(cat => cat.options.length > 0)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/50 border border-ink-10 px-5 py-4 text-left flex justify-between items-center focus:border-accent outline-none"
      >
        <span className={`truncate mr-4 ${value ? 'text-ink' : 'text-ink-40'}`}>
          {value || 'Select your degree'}
        </span>
        <Icon name={isOpen ? 'expand_less' : 'expand_more'} className="text-ink-30 flex-shrink-0" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute z-50 w-full mt-1 bg-paper border border-ink-10 max-h-80 flex flex-col"
          >
            <div className="p-2 border-b border-ink-10 bg-paper sticky top-0 z-10">
              <input
                type="text"
                placeholder="Search degrees..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
                className="w-full bg-surface border-none px-3 py-2 text-sm outline-none focus:ring-0"
              />
            </div>
            <div className="overflow-y-auto">
              {filteredDegrees.length === 0 ? (
                <div className="py-8 text-center text-xs text-ink-30 uppercase tracking-widest">No matches found</div>
              ) : (
                filteredDegrees.map(cat => (
                  <div key={cat.category}>
                    <div className="px-5 py-2 text-[10px] font-black uppercase tracking-widest text-ink-30 bg-surface/50">
                      {cat.category}
                    </div>
                    {cat.options.map(opt => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => { onChange(opt); setIsOpen(false); }}
                        className={`w-full text-left py-3 px-5 text-sm transition-colors ${
                          value === opt ? 'text-accent font-bold bg-accent/5' : 'hover:bg-surface'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
