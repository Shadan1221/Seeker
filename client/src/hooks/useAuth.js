import { useEffect } from 'react'
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

  useEffect(() => {
    let mounted = true

    const fetchAllUserData = async (sessionUser) => {
      if (!sessionUser) {
        if (mounted) {
          setUser(null)
          setProfile(null)
          setAuthLoading(false)
        }
        return
      }

      try {
        if (mounted) {
          setUser(sessionUser)
          // Only trigger full-screen loading if we don't already have the user 
          // (prevents mount loops when useAuth is consumed by child components)
          if (!user || user.id !== sessionUser.id) {
            setAuthLoading(true)
          }
        }

        // Fetch everything in parallel silently if already logged in
        const [profileRes, bookmarksRes, quizRes] = await Promise.all([
          supabase.from('profiles').select('*').eq('id', sessionUser.id).single(),
          supabase.from('bookmarks').select('career_id').eq('user_id', sessionUser.id),
          supabase.from('quiz_attempts').select('*').eq('user_id', sessionUser.id).order('taken_at', { ascending: false }).limit(1).maybeSingle()
        ])

        if (!mounted) return

        // Sync Bookmarks
        if (bookmarksRes.data) {
          const remoteBookmarks = bookmarksRes.data.map(b => b.career_id)
          useAppStore.getState().setBookmarkedCareers(remoteBookmarks)
        }

        // Atomic Sync of Profile and Quiz (this also sets authLoading to false)
        syncAuthData(profileRes.data, quizRes.data)
      } catch (err) {
        console.error('Error fetching user data:', err)
        if (mounted) {
          setAuthLoading(false)
        }
      }
    }

    // Single source of truth: Listen for auth state changes
    // This fires INITIAL_SESSION automatically on start
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        if (session?.user) {
          fetchAllUserData(session.user)
        } else {
          setAuthLoading(false)
        }
      } else if (event === 'SIGNED_OUT') {
        fullReset()
        setAuthLoading(false)
      } else {
        // For other events like PASSWORD_RECOVERY etc
        if (!session?.user) setAuthLoading(false)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signInWithGoogle = async () => {
    setAuthLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth`
      }
    })
    if (error) setAuthLoading(false)
    return { error }
  }

  const signInWithEmail = async (email, password) => {
    setAuthLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setAuthLoading(false)
    return { error }
  }

  const signInWithPhone = async (phone, password) => {
    setAuthLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      phone: `+91${phone}`,
      password
    })
    if (error) setAuthLoading(false)
    return { error }
  }

  const signUp = async (identifier, password, method) => {
    setAuthLoading(true)
    let signUpData = {}
    if (method === 'email') {
      signUpData = { email: identifier, password }
    } else if (method === 'phone') {
      signUpData = { phone: `+91${identifier}`, password }
    }

    const { error } = await supabase.auth.signUp(signUpData)
    if (error) setAuthLoading(false)
    return { error }
  }

  const saveProfile = async (profileData) => {
    if (!user) return { error: new Error('No user authenticated') }

    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, ...profileData })
      .select()
      .single()

    if (data) {
      setProfile(data)
    }
    return { error }
  }

  const signOut = async () => {
    fullReset()
    localStorage.removeItem('seeker-auth')
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  return {
    user,
    profile,
    loading: authLoading,
    signInWithGoogle,
    signInWithEmail,
    signInWithPhone,
    signUp,
    saveProfile,
    signOut,
    isAuthenticated: !!user,
    profileComplete: !!profile
  }
}
