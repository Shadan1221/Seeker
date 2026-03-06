import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-screen bg-paper flex flex-col items-center justify-center px-4 font-sans text-ink'>
          <div className='text-center max-w-md p-8 bg-surface border border-ink-10 rounded-3xl shadow-xl'>
            <div className='w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6'>
               <span className="material-symbols-outlined text-3xl">error</span>
            </div>
            <h1 className='font-serif text-3xl text-ink mb-4'>Oops! Something went wrong.</h1>
            <p className='text-ink-60 mb-8 leading-relaxed'>{this.state.error?.message || 'An unexpected rendering error occurred in the application.'}</p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null })
                window.location.href = '/'
              }}
              className='px-8 py-4 bg-ink text-paper font-bold tracking-widest uppercase text-sm rounded-full hover:bg-ink-60 transition-colors'
            >
              Return Home
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
