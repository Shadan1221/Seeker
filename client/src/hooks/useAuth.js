import { useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import useAppStore from '../store/useAppStore'

export function useAuth() {
  const user = useAppStore(s => s.user)
  const profile = useAppStore(s => s.profile)
  const authLoading = useAppStore(s => s.authLoading)
  const setUser = useAppStore(s => s.setUser)
  const setProfile = useAppStore(s => s.setProfile)
  const setAuthLoading = useAppStore(s => s.setAuthLoading)
  const fullReset = useAppStore(s => s.fullReset)
  const syncAuthData = useAppStore(s => s.syncAuthData)
  
  const hasInitialFetched = useRef(false)

  useEffect(() => {
    let mounted = true

    const fetchAllUserData = async (sessionUser) => {
      if (!sessionUser || hasInitialFetched.current) {
        if (!sessionUser && mounted) {
          setUser(null)
          setProfile(null)
          setAuthLoading(false)
        }
        return
      }

      hasInitialFetched.current = true

      try {
        if (mounted) {
          setUser(sessionUser)
          // Always show loader on first login/refresh to ensure sync
          setAuthLoading(true)
        }

        // 1. Fetch Profile and Bookmarks
        const [profileRes, bookmarksRes] = await Promise.all([
          supabase.from('profiles').select('*').eq('id', sessionUser.id).maybeSingle(),
          supabase.from('bookmarks').select('career_id').eq('user_id', sessionUser.id)
        ])

        if (!mounted) return

        // 2. Fetch Quiz (Robust against missing column)
        let quizRes = await supabase.from('quiz_attempts')
          .select('answers, custom_answers, skipped_questions, scores, taken_at')
          .eq('user_id', sessionUser.id)
          .order('taken_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        if (quizRes.error && quizRes.error.code === '42703') {
          console.warn('[useAuth] skipped_questions missing, retrying...')
          quizRes = await supabase.from('quiz_attempts')
            .select('answers, custom_answers, scores, taken_at')
            .eq('user_id', sessionUser.id)
            .order('taken_at', { ascending: false })
            .limit(1)
            .maybeSingle()
        }

        if (bookmarksRes.data) {
          const ids = bookmarksRes.data.map(b => b.career_id)
          useAppStore.getState().setBookmarkedCareers(ids)
        }

        if (mounted) {
          syncAuthData(profileRes.data, quizRes.data)
        }
      } catch (err) {
        console.error('[useAuth] Data sync failed:', err)
        if (mounted) setAuthLoading(false)
      }
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        if (session?.user) {
          fetchAllUserData(session.user)
        } else {
          setAuthLoading(false)
        }
      } else if (event === 'SIGNED_OUT') {
        hasInitialFetched.current = false
        fullReset()
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signInWithGoogle = async () => {
    setAuthLoading(true)
    return await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth` }
    })
  }

  const signInWithEmail = async (email, password) => {
    setAuthLoading(true)
    const res = await supabase.auth.signInWithPassword({ email, password })
    if (res.error) setAuthLoading(false)
    return res
  }

  const signUp = async (email, password) => {
    setAuthLoading(true)
    const res = await supabase.auth.signUp({ email, password })
    if (res.error) setAuthLoading(false)
    return res
  }

  const saveProfile = async (profileData) => {
    if (!user) return { error: new Error('No user authenticated') }
    const { data, error } = await supabase.from('profiles').upsert({ id: user.id, ...profileData }).select().single()
    if (data) setProfile(data)
    return { error }
  }

  const signOut = async () => {
    hasInitialFetched.current = false
    fullReset()
    localStorage.removeItem('seeker-auth')
    return await supabase.auth.signOut()
  }

  return {
    user, profile, loading: authLoading,
    signInWithGoogle, signInWithEmail, signUp, saveProfile, signOut,
    isAuthenticated: !!user,
    profileComplete: !!profile
  }
}
