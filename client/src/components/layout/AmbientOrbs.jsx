export default function AmbientOrbs() {
  return (
    <>
      <div className='fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] pointer-events-none z-0' style={{ background: 'radial-gradient(circle, rgba(255, 102, 51, 0.15) 0%, rgba(5, 5, 16, 0) 70%)' }} />
      <div className='fixed bottom-0 right-0 w-[600px] h-[600px] pointer-events-none z-0' style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(5, 5, 16, 0) 70%)' }} />
    </>
  )
}