import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import useAppStore from '../store/useAppStore.js'
import { useChat } from '../hooks/useChat.js'
import SeekerNav from '../components/layout/SeekerNav.jsx'
import FloatingPaths from '../components/layout/FloatingPaths.jsx'
import Icon from '../components/ui/Icon.jsx'

const suggestionChips = [
  'What are the best colleges for this?',
  'What is a typical day like?',
  'How hard is the entrance exam?',
  'What is the starting salary in India?',
]

export default function Chat() {
  const [text, setText] = useState('')
  const { sendMessage } = useChat()
  const messagesEndRef = useRef(null)

  const chatMessages = useAppStore((s) => s.chatMessages)
  const chatLoading = useAppStore((s) => s.chatLoading)
  const contextCareer = useAppStore((s) => s.contextCareer)
  const clearChat = useAppStore((s) => s.clearChat)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages, chatLoading])

  const onSubmit = (e) => {
    e.preventDefault()
    if (!text.trim() || chatLoading) return
    sendMessage(text)
    setText('')
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col font-sans relative overflow-hidden">
      <FloatingPaths position={1} />
      <SeekerNav />

      <main className="flex-1 flex flex-col max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 relative z-10">
        {/* Header Area */}
        <div className="flex items-center justify-between mb-12 border-b border-ink-10 pb-6">
           <div className="flex items-baseline gap-4">
              <h1 className="font-serif text-3xl text-ink tracking-tight">Ask Seeker</h1>
              {contextCareer && (
                <span className="text-xs font-bold tracking-wider uppercase px-2 py-1 bg-accent-10 text-accent rounded">
                  Re: {contextCareer.title}
                </span>
              )}
           </div>
           {chatMessages.length > 1 && (
             <button 
               onClick={clearChat}
               className="text-xs font-medium text-ink-60 hover:text-ink hover-underline uppercase tracking-wider"
             >
               Clear Chat
             </button>
           )}
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-8 overflow-y-auto custom-scrollbar pr-2 pb-4">
          <AnimatePresence initial={false}>
            {chatMessages.map((msg, idx) => (
              <motion.div 
                key={`${msg.timestamp}-${idx}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="shrink-0 w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center font-serif text-sm mr-4 mt-1">
                    S
                  </div>
                )}
                <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-surface px-5 py-4 rounded-2xl rounded-tr-sm text-ink' : 'text-ink'}`}>
                  <div className="prose prose-sm md:prose-base prose-p:leading-relaxed prose-headings:font-serif prose-a:text-accent max-w-none">
                     <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {chatLoading && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex items-start"
            >
              <div className="shrink-0 w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center font-serif text-sm mr-4 mt-1">
                S
              </div>
              <div className="h-6 flex items-center">
                 <motion.div 
                   animate={{ width: [10, 24, 10] }}
                   transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                   className="h-[2px] bg-ink-30 rounded-full"
                 />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

      </main>

      {/* Input Area (Sticky Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-paper via-paper to-transparent pt-12 pb-8 px-4 z-30">
        <div className="max-w-3xl mx-auto">
           {/* Suggestion Chips */}
           {chatMessages.length <= 1 && contextCareer && (
             <div className="flex gap-2 mb-4 overflow-x-auto custom-scrollbar pb-2">
                {suggestionChips.map(chip => (
                  <button
                    key={chip}
                    onClick={() => sendMessage(chip)}
                    className="shrink-0 px-4 py-2 text-xs font-medium uppercase tracking-wider text-ink-60 border border-ink-20 rounded hover:border-ink hover:text-ink transition-colors bg-paper"
                  >
                    {chip}
                  </button>
                ))}
             </div>
           )}

           {/* Input Box */}
           <form onSubmit={onSubmit} className="relative group">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ask about any career, exam, or choice..."
                disabled={chatLoading}
                className="w-full bg-surface text-ink px-6 py-5 pr-16 rounded-xl focus:outline-none placeholder:text-ink-30 transition-shadow disabled:opacity-50"
              />
              <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-ink-10 group-focus-within:bg-accent transition-colors" />
              <button 
                type="submit" 
                disabled={!text.trim() || chatLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ink text-paper flex items-center justify-center disabled:opacity-30 disabled:bg-ink-30 hover:bg-ink-60 transition-colors"
              >
                <Icon name="arrow_upward" size={20} />
              </button>
           </form>
        </div>
      </div>
    </div>
  )
}
