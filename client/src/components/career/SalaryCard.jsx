export default function SalaryCard({ salary }) {
  return (
    <div className='grid grid-cols-3 gap-2 text-sm'>
      <div className='bg-white/5 rounded p-2'><div className='text-slate-400 text-xs'>Fresher</div><div>{salary.fresher}</div></div>
      <div className='bg-white/5 rounded p-2'><div className='text-slate-400 text-xs'>Mid</div><div>{salary.mid}</div></div>
      <div className='bg-white/5 rounded p-2'><div className='text-slate-400 text-xs'>Senior</div><div>{salary.senior}</div></div>
    </div>
  )
}