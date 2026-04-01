import { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import useAppStore from '../store/useAppStore'

export function useAuth() {
  const { 
    user, 
    profile, 
    authLoading, 
    setUser, 
    setProfile, 
    setAuthLoading, 
    clearAuth, 
    fullReset 
  } = useAppStore()

  useEffect(() => {
    // Initial session check
    const initSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          setUser(session.user)
          const [profileRes, bookmarksRes] = await Promise.all([
            supabase.from('profiles').select('*').eq('id', session.user.id).single(),
            supabase.from('bookmarks').select('career_id').eq('user_id', session.user.id)
          ])
          if (profileRes.data) setProfile(profileRes.data)
          if (bookmarksRes.data) {
            const remoteBookmarks = bookmarksRes.data.map(b => b.career_id)
            const localBookmarks = useAppStore.getState().bookmarkedCareers
            const merged = [...new Set([...remoteBookmarks, ...localBookmarks])]
            useAppStore.getState().setBookmarkedCareers(merged)
          }
        } else {
          setUser(null)
          setProfile(null)
        }
      } catch (err) {
        setUser(null)
        setProfile(null)
      } finally {
        setAuthLoading(false)
      }
    }

    initSession()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        if (session?.user) {
          setUser(session.user)

          // Fetch profile and bookmarks in parallel
          const [profileRes, bookmarksRes] = await Promise.all([
            supabase.from('profiles').select('*').eq('id', session.user.id).single(),
            supabase.from('bookmarks').select('career_id').eq('user_id', session.user.id)
          ])

          if (profileRes.data) {
            setProfile(profileRes.data)
          } else {
            setProfile(null)
          }

          if (bookmarksRes.data) {
            const remoteBookmarks = bookmarksRes.data.map(b => b.career_id)
            const localBookmarks = useAppStore.getState().bookmarkedCareers
            // Merge remote and local (unique)
            const merged = [...new Set([...remoteBookmarks, ...localBookmarks])]
            useAppStore.getState().setBookmarkedCareers(merged)

            // If there were local bookmarks not in remote, sync them to remote
            const toSync = localBookmarks.filter(id => !remoteBookmarks.includes(id))
            if (toSync.length > 0) {
              await supabase.from('bookmarks').insert(
                toSync.map(id => ({ user_id: session.user.id, career_id: id }))
              )
            }
          }
        } else {
          setUser(null)
          setProfile(null)
        }

        if (event === 'SIGNED_OUT') {
          fullReset()
        }
      } catch (err) {
        setUser(null)
        setProfile(null)
      } finally {
        setAuthLoading(false)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signInWithGoogle = async () => {
    // NOTE: The Google OAuth callback URL in the Supabase dashboard must be set to:
    // - http://localhost:5173/auth (for development)
    // - https://pathseeker.app/auth (for production)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth`
      }
    })
    return { error }
  }

  const signInWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { error }
  }

  const signInWithPhone = async (phone, password) => {
    // Note: This assumes password-based auth for phone for simplicity as requested
    const { data, error } = await supabase.auth.signInWithPassword({
      phone: `+91${phone}`,
      password
    })
    return { error }
  }

  const signUp = async (identifier, password, method) => {
    let signUpData = {}
    if (method === 'email') {
      signUpData = { email: identifier, password }
    } else if (method === 'phone') {
      signUpData = { phone: `+91${identifier}`, password }
    }

    const { data, error } = await supabase.auth.signUp(signUpData)
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
    // Always clear local app state first so UI signs out immediately.
    fullReset()
    localStorage.removeItem('seeker-auth')

    try {
      const { error } = await supabase.auth.signOut({ scope: 'global' })
      if (!error) return { error: null }

      // Fallback to local sign-out if global session invalidation fails.
      const fallback = await supabase.auth.signOut()
      return { error: fallback.error || null }
    } catch (err) {
      return { error: err }
    }
  }

  const isAuthenticated = !!user
  const profileComplete = !!profile

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
    isAuthenticated,
    profileComplete
  }
}
