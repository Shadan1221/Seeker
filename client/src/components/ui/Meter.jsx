export default function Meter({ label, value }) {
  return (
    <div>
      <div className='text-xs text-slate-400 mb-1'>{label}</div>
      <div className='h-2 bg-white/10 rounded'>
        <div className='h-2 bg-primary rounded' style={{ width: `${(value / 5) * 100}%` }} />
      </div>
    </div>
  )
}
