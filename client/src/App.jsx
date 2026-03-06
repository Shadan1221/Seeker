import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { lazy, Suspense } from 'react'
import { ErrorBoundary } from './components/ErrorBoundary.jsx'
import CustomCursor from './components/layout/CustomCursor.jsx'

// Import PathMap directly to debug import errors
import Splash from './screens/Splash.jsx'
import StreamGuide from './screens/StreamGuide.jsx'
import Quiz from './screens/Quiz.jsx'
import ResultsLoading from './screens/ResultsLoading.jsx'
import PathMap from './screens/PathMap.jsx'
import Chat from './screens/Chat.jsx'

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center">
      <span className="font-serif text-2xl text-ink-30 animate-pulse">Seeker</span>
    </div>
  )
}

const router = createBrowserRouter([
  { path: '/', element: <Splash /> },
  { path: '/streams', element: <StreamGuide /> },
  { path: '/quiz', element: <Quiz /> },
  { path: '/results', element: <ResultsLoading /> },
  { path: '/paths', element: <PathMap /> },
  { path: '/chat', element: <Chat /> },
  { path: '*', element: <Splash /> },
])

export default function App() {
  return (
    <ErrorBoundary>
      <CustomCursor />
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
