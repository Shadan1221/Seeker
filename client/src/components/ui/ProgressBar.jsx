export default function ProgressBar({ value = 0 }) {
  return (
    <div className='h-2 w-full bg-[#3e2219] rounded-full overflow-hidden shadow-inner'>
      <div
        className='h-full bg-flame-gradient rounded-full shadow-[0_0_15px_rgba(255,102,51,0.6)] transition-all duration-500'
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
