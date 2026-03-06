import Meter from '../ui/Meter.jsx'

export default function CareerComparison({ careers, onClose }) {
  if (!careers || careers.length !== 2) return null

  return (
    <div className='fixed inset-0 z-50 bg-black/70 p-4 sm:p-10'>
      <div className='max-w-5xl mx-auto bg-cosmic-dark border border-white/10 rounded-xl p-5'>
        <div className='flex justify-between mb-4'><h3 className='text-xl font-bold'>Career Comparison</h3><button onClick={onClose}>Close</button></div>
        <div className='grid md:grid-cols-2 gap-4'>
          {careers.map((c) => (
            <div key={c.id} className='bg-white/5 rounded p-4'>
              <h4 className='font-semibold mb-2'>{c.title}</h4>
              <div className='text-sm text-slate-300 mb-3'>{c.tagline}</div>
              <div className='space-y-2'>
                <Meter label='Work Life' value={c.workLife} />
                <Meter label='Demand' value={c.demand} />
                <Meter label='Creativity' value={c.creativity} />
              </div>
              <div className='text-sm mt-3'>Salary: {c.salary.fresher} → {c.salary.senior}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}