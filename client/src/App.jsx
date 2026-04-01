import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { lazy, Suspense } from 'react'
import { ErrorBoundary } from './components/ErrorBoundary.jsx'
import CustomCursor from './components/layout/CustomCursor.jsx'
import BookmarksPanel from './components/career/BookmarksPanel.jsx'
import CareerComparison from './components/career/CareerComparison.jsx'
import { ProtectedRoute } from './components/auth/ProtectedRoute.jsx'
import { useAuth } from './hooks/useAuth.js'
import useAppStore from './store/useAppStore.js'
import { useCareers } from './hooks/useCareers.js'

// Route-based code splitting
const Splash = lazy(() => import('./screens/Splash'))
const StreamGuide = lazy(() => import('./screens/StreamGuide'))
const Quiz = lazy(() => import('./screens/Quiz'))
const ResultsLoading = lazy(() => import('./screens/ResultsLoading'))
const PathMap = lazy(() => import('./screens/PathMap'))
const Chat = lazy(() => import('./screens/Chat'))
const Auth = lazy(() => import('./screens/Auth'))

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center">
      <span className="font-serif text-2xl text-ink-30 animate-pulse">Seeker</span>
    </div>
  )
}

const router = createBrowserRouter([
  { path: '/', element: <Auth /> },
  { path: '/auth', element: <Auth /> },
  {
    path: '/welcome',
    element: (
      <ProtectedRoute>
        <Splash />
      </ProtectedRoute>
    )
  },
  {
    path: '/streams',
    element: (
      <ProtectedRoute>
        <StreamGuide />
      </ProtectedRoute>
    )
  },
  {
    path: '/quiz',
    element: (
      <ProtectedRoute>
        <Quiz />
      </ProtectedRoute>
    )
  },
  {
    path: '/results',
    element: (
      <ProtectedRoute>
        <ResultsLoading />
      </ProtectedRoute>
    )
  },
  { 
    path: '/paths', 
    element: (
      <ProtectedRoute requireQuiz>
        <PathMap />
      </ProtectedRoute>
    ) 
  },
  { 
    path: '/chat', 
    element: (
      <ProtectedRoute>
        <Chat />
      </ProtectedRoute>
    ) 
  },
  { path: '*', element: <Navigate to="/" replace /> },
])

export default function App() {
  const compareIds = useAppStore(s => s.compareIds) || []
  const setCompareIds = useAppStore(s => s.setCompareIds)
  useAuth() // Initializes auth listener
  const { data } = useCareers()
  const careers = data?.careers || []
  
  const compareCareers = careers.filter(c => compareIds.includes(c.id))

  return (
    <ErrorBoundary>
      <CustomCursor />
      <BookmarksPanel />
      {compareIds.length === 2 && (
        <CareerComparison 
          careers={compareCareers} 
          onClose={() => setCompareIds && setCompareIds([])} 
        />
      )}
      <div className='font-sans bg-paper min-h-screen text-ink overflow-x-hidden selection:bg-accent-20'>
        <Toaster
          position='top-center'
          toastOptions={{
            style: {
              background: '#0D0D0D',
              color: '#F8F6F1',
              border: '1px solid rgba(13,13,13,0.1)',
              fontFamily: 'DM Sans, sans-serif',
              borderRadius: '0px',
            },
          }}
        />
        <Suspense fallback={<LoadingFallback />}>
          <RouterProvider router={router} />
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}
