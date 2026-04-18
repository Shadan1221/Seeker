import { useColleges } from '../../hooks/useCareers.js'
import SalaryCard from './SalaryCard.jsx'
import ExamTimeline from './ExamTimeline.jsx'
import { formatRelativeDate } from '../../utils/date.js'

export default function CareerModal({ career, onClose, onAskPathAI, onToggleBookmark, isBookmarked }) {
  const { data: collegeData, isLoading } = useColleges(career?.id)
  const colleges = collegeData?.colleges || []
  const dataSource = collegeData?.dataSource || 'static'
  const lastUpdated = collegeData?.lastUpdated || null

  if (!career) return null

  return (
    <div className='fixed inset-0 z-50 bg-black/60 p-4' onClick={onClose}>
      <div className='max-w-3xl mx-auto rounded-xl bg-cosmic-dark border border-white/10 p-5' onClick={(e) => e.stopPropagation()}>
        <div className='flex justify-between items-start gap-3'>
          <div>
            <h3 className='text-xl font-bold'>{career.title}</h3>
            <p className='text-sm text-slate-300'>{career.tagline}</p>
          </div>
          <button onClick={onClose}>Close</button>
        </div>
        <div className='mt-4 grid gap-4'>
          <SalaryCard salary={career.salary} />
          <ExamTimeline exams={career.exams} />
          <div className='text-sm text-slate-300'>{career.scope}</div>
          <div>
            <div className='flex items-center gap-2 mb-1'>
              <div className='text-sm font-semibold'>Top Colleges</div>
              {colleges.length > 0 && (
                <div className='flex items-center gap-1.5'>
                  <div className={`w-1.5 h-1.5 rounded-full ${dataSource === 'live' ? 'bg-green-500' : 'bg-ink-20'}`} />
                  <span className='text-[10px] text-slate-400 uppercase tracking-widest font-bold'>
                    {dataSource === 'live'
                      ? `Updated ${formatRelativeDate(lastUpdated)}`
                      : 'Curated data'}
                  </span>
                </div>
              )}
            </div>
            {isLoading && <div className='text-sm text-slate-400'>Loading colleges...</div>}
            <div className='space-y-1 text-sm text-slate-200'>
              {colleges.map((c) => (
                <div key={c.name || c.college_name}>
                  {c.name || c.college_name}{c.city ? `, ${c.city}` : ''}{c.entrance_exam ? ` (${c.entrance_exam})` : ''}
                  {c.nirf_rank ? ` — NIRF #${c.nirf_rank}` : ''}
                </div>
              ))}
            </div>
          </div>
          <div className='flex gap-2'>
            <button onClick={() => onToggleBookmark(career.id)} className='rounded-full px-4 py-2 bg-white/10'>{isBookmarked ? 'Remove Bookmark' : 'Bookmark'}</button>
            <button onClick={() => onAskPathAI(career)} className='rounded-full px-4 py-2 bg-primary'>Ask Path AI</button>
          </div>
        </div>
      </div>
    </div>
  )
}