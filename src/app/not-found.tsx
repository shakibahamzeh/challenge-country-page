import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex items-center flex-col pt-16 gap-3'>
      <h2 className='text-primary text-xl font-semibold'>Not Found</h2>
      <p className='text-secondary'>Could not find requested resource</p>
      <Link href="/" className='underline text-primary'>Home</Link>
    </div>
  )
}