import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { lazy, Suspense } from 'react'
import { ErrorBoundary, RouteBoundary } from './components/ErrorBoundary.jsx'
import CustomCursor from './components/layout/CustomCursor.jsx'
import BookmarksPanel from './components/career/BookmarksPanel.jsx'
import TourManager from './components/tour/TourManager.jsx'
import CareerComparison from './components/career/CareerComparison.jsx'
import { ProtectedRoute } from './components/auth/ProtectedRoute.jsx'
import { useAuth } from './hooks/useAuth.js'
import useAppStore from './store/useAppStore.js'
import { useCareers } from './hooks/useCareers.js'
import Quiz from './screens/Quiz.jsx'
import ResultsLoading from './screens/ResultsLoading.jsx'

// Wrapper for React.lazy to retry on chunk load failure
function lazyRetry(componentImport) {
  return lazy(async () => {
    try {
      return await componentImport()
    } catch (error) {
      const isChunkLoadFailed = error.message && (
        error.message.includes('fetch dynamically imported module') ||
        error.message.includes('Importing a module script failed') ||
        error.message.includes('Failed to fetch') ||
        error.message.includes('net::ERR_CACHE_READ_FAILURE')
      )
      
      const retryKey = `retry-lazy-${window.location.pathname}`
      
      if (isChunkLoadFailed && !sessionStorage.getItem(retryKey)) {
        sessionStorage.setItem(retryKey, 'true')
        window.location.reload()
        return new Promise(() => {})
      }
      
      sessionStorage.removeItem(retryKey)
      throw error
    }
  })
}

// Route-based code splitting
const Splash = lazyRetry(() => import('./screens/Splash'))
const StreamGuide = lazyRetry(() => import('./screens/StreamGuide'))
const PathMap = lazyRetry(() => import('./screens/PathMap'))
const Chat = lazyRetry(() => import('./screens/Chat'))
const Auth = lazyRetry(() => import('./screens/Auth'))
const Feedback = lazyRetry(() => import('./screens/Feedback'))

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center">
      <span className="font-serif text-2xl text-ink-30 animate-pulse">Seeker</span>
    </div>
  )
}

function RootLayout() {
  const compareIds = useAppStore(s => s.compareIds) || []
  const setCompareIds = useAppStore(s => s.setCompareIds)
  useAuth() // Initializes auth listener
  const { data } = useCareers()
  const careers = data?.careers || []
  const compareCareers = careers.filter(c => compareIds.includes(c.id))

  return (
    <div className='font-sans bg-paper min-h-screen text-ink overflow-x-hidden selection:bg-accent-20'>
      <CustomCursor />
      <BookmarksPanel />
      <TourManager />
      {compareIds.length === 2 && (
        <CareerComparison 
          careers={compareCareers} 
          onClose={() => setCompareIds && setCompareIds([])} 
        />
      )}
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
        <Outlet />
      </Suspense>
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RouteBoundary />,
    children: [
      { path: '/', element: <Auth /> },
      { path: '/auth', element: <Auth /> },
      {
        path: '/welcome',
        element: (
          <ProtectedRoute>
            <Splash />
          </ProtectedRoute>
        ),
      },
      {
        path: '/streams',
        element: (
          <ProtectedRoute>
            <StreamGuide />
          </ProtectedRoute>
        ),
      },
      {
        path: '/quiz',
        element: (
          <ProtectedRoute>
            <Quiz />
          </ProtectedRoute>
        ),
      },
      {
        path: '/results',
        element: (
          <ProtectedRoute>
            <ResultsLoading />
          </ProtectedRoute>
        ),
      },
      { 
        path: '/paths', 
        element: (
          <ProtectedRoute requireQuiz>
            <PathMap />
          </ProtectedRoute>
        ),
      },
      { 
        path: '/chat', 
        element: (
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        ),
      },
      {
        path: '/feedback',
        element: (
          <ProtectedRoute>
            <Feedback />
          </ProtectedRoute>
        ),
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ]
  }
])

export default function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
}
