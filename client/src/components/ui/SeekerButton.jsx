import { motion } from 'framer-motion'
import Icon from './Icon.jsx'

/**
 * variants: 'primary' | 'outline' | 'ghost' | 'accent'
 */
export default function SeekerButton({
  children, onClick, variant = 'primary', disabled = false,
  className = '', icon, iconPosition = 'right', type = 'button'
}) {
  const base = "inline-flex items-center gap-3 font-sans font-medium tracking-wide transition-all duration-200 rounded-none select-none"

  const variants = {
    primary: "bg-ink text-paper px-8 py-4 text-sm hover:bg-ink-60 active:scale-[0.98]",
    outline:  "border border-ink text-ink px-8 py-4 text-sm hover:bg-ink hover:text-paper active:scale-[0.98]",
    ghost:    "text-ink text-sm px-0 py-2 hover-underline",
    accent:   "bg-accent text-white px-8 py-4 text-sm hover:bg-[#D44E25] active:scale-[0.98] shadow-[0_4px_20px_rgba(232,87,42,0.3)]",
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={`${base} ${variants[variant]} ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-none'} ${className}`}
    >
      {icon && iconPosition === 'left' && <Icon name={icon} size={18} />}
      {children}
      {icon && iconPosition === 'right' && <Icon name={icon} size={18} />}
    </motion.button>
  )
}
