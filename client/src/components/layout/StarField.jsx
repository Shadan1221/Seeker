export default function StarField() {
  return (
    <div
      className='fixed inset-0 opacity-20 pointer-events-none z-0'
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3Ccircle cx='60' cy='50' r='0.5'/%3E%3Ccircle cx='80' cy='10' r='0.8'/%3E%3Ccircle cx='10' cy='80' r='0.6'/%3E%3Ccircle cx='90' cy='90' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
      }}
    />
  )
}