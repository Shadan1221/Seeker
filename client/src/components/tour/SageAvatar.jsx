import { motion } from 'framer-motion'

export default function SageAvatar({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      {/* Outer ring — rotates slowly */}
      <motion.circle
        cx="20"
        cy="20"
        r="17"
        stroke="#E8572A"
        strokeWidth="1.5"
        fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '20px 20px' }}
      />

      {/* Four-point compass star — stays still */}
      <path
        d="M20 6 L22 18 L20 14 L18 18 Z"
        fill="#0D0D0D"
      />
      <path
        d="M20 34 L18 22 L20 26 L22 22 Z"
        fill="#0D0D0D"
      />
      <path
        d="M6 20 L18 18 L14 20 L18 22 Z"
        fill="#0D0D0D"
      />
      <path
        d="M34 20 L22 22 L26 20 L22 18 Z"
        fill="#0D0D0D"
      />

      {/* Center dot */}
      <circle cx="20" cy="20" r="2.5" fill="#E8572A" />
    </svg>
  )
}
