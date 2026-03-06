export default function Badge({ children, className = '' }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs border border-white/15 bg-white/5 ${className}`}>
      {children}
    </span>
  )
}
