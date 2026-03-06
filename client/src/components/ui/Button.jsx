import { cn } from '../../utils/cn.js'

export default function Button({ className = '', children, ...props }) {
  return (
    <button
      className={cn('rounded-full px-5 py-2.5 font-semibold transition-transform active:scale-95', className)}
      {...props}
    >
      {children}
    </button>
  )
}