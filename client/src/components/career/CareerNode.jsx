import { memo } from 'react'
import Icon from '../ui/Icon.jsx'

function CareerNode({ career, onClick }) {
  return (
    <button
      onClick={onClick}
      className='absolute -translate-x-1/2 -translate-y-1/2 group text-left'
      style={{ filter: `drop-shadow(${career.glow})` }}
    >
      <div
        className='size-11 rounded-full border border-white/20 bg-cosmic-accent/70 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform'
        style={{ color: career.color }}
      >
        <Icon name={career.icon} className='text-[22px]' />
      </div>
      <div className='mt-1 text-[10px] text-slate-300 max-w-[80px] leading-tight'>{career.title}</div>
    </button>
  )
}

export default memo(CareerNode)
