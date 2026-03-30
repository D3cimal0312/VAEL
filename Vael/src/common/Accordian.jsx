import  { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'

const Accordion = ({ Q, A }) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    
    setOpen(false)
  
  }, [Q,A]);
  return (
    <div className=''>

      <button
        onClick={() => setOpen(!open)}
        className='w-full flex items-center justify-between py-4 text-left cursor-pointer'
      >
        <h3 className='font-fair text-lg font-semibold text-ink'>{Q}</h3>
        <Plus
          size={18}
          className={`text-lux ml-4  transition-transform duration-700 ease-in-out ${open ? 'rotate-45' : 'rotate-0'}`}
        />
      </button>

      <div className={` text-hair tracking-wide overflow-hidden   transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? 'max-h-40 ' : 'max-h-0 '}`}>
      {A}
      </div>
<div className='h-px w-full bg-cream '/>
    </div>
  )
}

export default Accordion