import { useMemo } from 'react'

export default function BookmarksPanel({
  open,
  careers = [],
  selected = [],
  onClose,
  onToggleSelect,
  onCompare,
  onOpenCareer,
}) {
  const mapped = useMemo(() => careers.filter(Boolean), [careers])

  return (
    <aside
      className={`fixed right-0 top-0 z-40 h-full w-[340px] bg-cosmic-dark/95 border-l border-white/10 p-4 transition-transform ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className='flex justify-between items-center mb-4'>
        <h3 className='font-semibold'>Bookmarks</h3>
        <button onClick={onClose} className='text-slate-300 hover:text-white'>
          Close
        </button>
      </div>
      <div className='space-y-2 overflow-y-auto h-[calc(100%-90px)]'>
        {mapped.length === 0 && <div className='text-sm text-slate-400'>No bookmarked careers yet.</div>}
        {mapped.map((c) => (
          <div key={c.id} className='p-3 rounded bg-white/5 border border-white/10'>
            <div className='flex justify-between gap-2'>
              <button onClick={() => onOpenCareer(c)} className='text-left text-sm font-medium hover:text-primary'>
                {c.title}
              </button>
              <input
                type='checkbox'
                checked={selected.includes(c.id)}
                onChange={() => onToggleSelect(c.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        disabled={selected.length !== 2}
        onClick={onCompare}
        className='mt-3 w-full rounded-full py-2 bg-primary disabled:opacity-40'
      >
        Compare 2 Careers
      </button>
    </aside>
  )
}
